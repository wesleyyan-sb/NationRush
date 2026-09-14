/**
 * NationRush - Motor Principal de Gameplay (Game Engine)
 * Controla os modos de jogo, temporizador, cálculo de pontuação,
 * progressão de multiplicador de streak, resposta do usuário e transições.
 */

class GameEngine {
    constructor() {
        this.questionGenerator = new QuestionGenerator();
        this.timerInterval = null;
        this.resetState();
    }

    // Resetar estado da partida
    resetState() {
        this.state = {
            isPlaying: false,
            isPaused: false,
            isTransitioning: false,
            mode: "rush", // 'rush', 'practice', 'daily', 'fetec'
            score: 0,
            streak: 0,
            maxStreak: 0,
            totalAnswered: 0,
            correctCount: 0,
            timeRemaining: 60,
            initialTime: 60,
            currentQuestion: null,
            questionNumber: 0,
            dailyMaxQuestions: 10,
            questionStartTime: 0,
            hadSpeedBonus: false,
            encounteredCountries: new Set(),
            dateKey: null
        };
    }

    // Obter multiplicador atual com base no streak
    getStreakMultiplier() {
        const s = this.state.streak;
        if (s >= 11) return 2.5;
        if (s >= 8) return 2.0;
        if (s >= 5) return 1.5;
        if (s >= 3) return 1.25;
        return 1.0;
    }

    // Iniciar uma nova partida
    start(mode = "rush") {
        this.stopTimer();
        this.resetState();

        this.state.mode = mode;
        this.state.isPlaying = true;

        if (mode === "rush") {
            this.state.timeRemaining = 60;
            this.state.initialTime = 60;
        } else if (mode === "fetec") {
            this.state.timeRemaining = 60;
            this.state.initialTime = 60;
        } else if (mode === "daily") {
            // Semente determinística com data de hoje YYYY-MM-DD
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            this.state.dateKey = `${year}-${month}-${day}`;
            this.questionGenerator.setSeed(this.state.dateKey);
            this.state.timeRemaining = 0; // Modo sem tempo limite estrito
        } else if (mode === "practice") {
            this.state.timeRemaining = 0; // Modo Livre infinito
        }

        // Se o modo possuir cronômetro regressivo
        if (mode === "rush" || mode === "fetec") {
            this.startTimer();
        }

        // Renderiza tela de jogo e prepara primeira questão
        UIManager.showScreen("game-screen");
        UIManager.updateHUD(this.state);
        this.loadNextQuestion();
    }

    // Iniciar cronômetro regressivo
    startTimer() {
        this.timerInterval = setInterval(() => {
            if (!this.state.isPlaying || this.state.isPaused) return;

            this.state.timeRemaining--;
            UIManager.updateTimer(this.state.timeRemaining, this.state.initialTime);

            if (this.state.timeRemaining <= 5 && this.state.timeRemaining > 0) {
                AudioEngine.playTimerWarning();
            }

            if (this.state.timeRemaining <= 0) {
                this.endGame("time_up");
            }
        }, 1000);
    }

    // Parar cronômetro
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    // Carregar próxima pergunta
    loadNextQuestion() {
        if (!this.state.isPlaying) return;

        // Limite para o Desafio Diário
        if (this.state.mode === "daily" && this.state.questionNumber >= this.state.dailyMaxQuestions) {
            this.endGame("daily_completed");
            return;
        }

        this.state.isTransitioning = false;
        this.state.questionNumber++;

        // Obter próxima pergunta
        const question = this.questionGenerator.nextQuestion();
        this.state.currentQuestion = question;
        this.state.questionStartTime = Date.now();

        // Rastrear país descoberto
        if (question.country && question.country.id) {
            this.state.encounteredCountries.add(question.country.id);
        }

        UIManager.renderQuestion(question, this.state);
        UIManager.updateHUD(this.state);
    }

    // Processar tentativa do jogador
    submitAnswer(userAnswer, extraData = {}) {
        if (!this.state.isPlaying || this.state.isTransitioning) return;
        this.state.isTransitioning = true;
        this.state.totalAnswered++;

        const responseTimeMs = Date.now() - this.state.questionStartTime;
        const q = this.state.currentQuestion;
        let isCorrect = false;
        let distanceKm = null;

        // Avaliar tipo de pergunta
        if (q.type === "map_locator") {
            // Para mapa interativo, extraData contém as coordenadas clicadas { x, y } em %
            const target = q.correctAnswer;
            const clicked = extraData.clickedCoords;
            if (clicked && target) {
                const dx = clicked.x - target.x;
                const dy = clicked.y - target.y;
                const distPct = Math.sqrt(dx * dx + dy * dy);

                // Se clicou a menos de 10% de distância da posição alvo no mapa
                if (distPct < 10) {
                    isCorrect = true;
                    distanceKm = Math.round(distPct * 200);
                } else if (distPct < 18) {
                    // Considerado acerto aproximado (Good)
                    isCorrect = true;
                    distanceKm = Math.round(distPct * 200);
                } else {
                    isCorrect = false;
                    distanceKm = Math.round(distPct * 200);
                }
            }
        } else {
            // Múltipla escolha padrão
            isCorrect = (String(userAnswer).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase());
        }

        let earnedPoints = 0;
        let speedBonusActive = false;

        if (isCorrect) {
            this.state.correctCount++;
            this.state.streak++;
            if (this.state.streak > this.state.maxStreak) {
                this.state.maxStreak = this.state.streak;
            }

            // Bônus de velocidade para respostas em menos de 1.8 segundos
            if (responseTimeMs < 1800) {
                speedBonusActive = true;
                this.state.hadSpeedBonus = true;
            }

            // Cálculo de pontuação
            const basePoints = q.type === "map_locator" || q.type === "twin_flags" ? 220 : 150;
            const streakMult = this.getStreakMultiplier();
            const speedMult = speedBonusActive ? 1.3 : 1.0;
            earnedPoints = Math.round(basePoints * streakMult * speedMult);

            this.state.score += earnedPoints;

            AudioEngine.playCorrect(this.state.streak);
        } else {
            this.state.streak = 0;
            AudioEngine.playError();
        }

        // Atualizar HUD
        UIManager.updateHUD(this.state);

        // Feedback visual da resposta na tela
        UIManager.showAnswerFeedback({
            isCorrect,
            userAnswer,
            correctAnswer: q.correctAnswer,
            earnedPoints,
            streak: this.state.streak,
            multiplier: this.getStreakMultiplier(),
            didYouKnow: q.didYouKnow,
            speedBonusActive,
            distanceKm,
            question: q
        });

        // Transição automática para próxima pergunta após absorver feedback
        const delay = isCorrect ? 1500 : 2500;
        setTimeout(() => {
            if (this.state.isPlaying) {
                this.loadNextQuestion();
            }
        }, delay);
    }

    // Finalizar partida
    endGame(reason = "completed") {
        this.stopTimer();
        this.state.isPlaying = false;
        AudioEngine.playGameOver();

        // Calcular XP ganho (10% da pontuação + bônus de precisão)
        const accuracy = this.state.totalAnswered > 0 
            ? Math.round((this.state.correctCount / this.state.totalAnswered) * 100) 
            : 0;

        const earnedXP = Math.round(this.state.score * 0.08) + (this.state.correctCount * 15);
        const xpResult = StorageManager.addXP(earnedXP);

        // Gravar no localStorage
        const saveResult = StorageManager.recordGame({
            mode: this.state.mode,
            score: this.state.score,
            maxStreak: this.state.maxStreak,
            questionsAnswered: this.state.totalAnswered,
            correctAnswers: this.state.correctCount,
            encounteredCountries: Array.from(this.state.encounteredCountries),
            hadSpeedBonus: this.state.hadSpeedBonus,
            dateKey: this.state.dateKey
        });

        // Se desbloqueou conquistas novas, tocar áudio especial
        if (saveResult.newlyUnlocked && saveResult.newlyUnlocked.length > 0) {
            setTimeout(() => {
                AudioEngine.playAchievement();
            }, 600);
        }

        // Renderizar modal de resultado
        UIManager.showResultModal({
            score: this.state.score,
            streak: this.state.maxStreak,
            accuracy,
            mode: this.state.mode,
            totalAnswered: this.state.totalAnswered,
            correctCount: this.state.correctCount,
            earnedXP,
            xpResult,
            newlyUnlocked: saveResult.newlyUnlocked,
            isNewHighScore: this.state.score >= (saveResult.highScores[this.state.mode] || 0)
        });
    }

    // Sair da partida antes do fim
    quit() {
        this.stopTimer();
        this.resetState();
        UIManager.showScreen("home-screen");
    }
}

// Instância global do motor
const Game = new GameEngine();
