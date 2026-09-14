/**
 * NationRush - Gerenciador de Interface de Usuário (UI & Render)
 * Controla as telas, transições, animações, HUD dinâmico, mapa-múndi SVG interativo,
 * cartões educativos "Você Sabia?", partículas e modais.
 */

const UIManager = {
    // Inicialização de referências DOM
    init() {
        this.cacheDOM();
        this.bindGlobalEvents();
        this.updateProfileSummary();
    },

    // Mapear elementos fixos do DOM
    cacheDOM() {
        this.screens = document.querySelectorAll(".screen");
        this.modals = document.querySelectorAll(".modal");
        
        // HUD
        this.hudScore = document.getElementById("hud-score");
        this.hudStreak = document.getElementById("hud-streak");
        this.hudStreakBadge = document.getElementById("hud-streak-badge");
        this.hudTimer = document.getElementById("hud-timer");
        this.hudTimerBar = document.getElementById("hud-timer-bar");
        this.hudMode = document.getElementById("hud-mode");
        this.hudProgress = document.getElementById("hud-progress");

        // Arena de perguntas
        this.questionCard = document.getElementById("question-card");
        this.questionTypeBadge = document.getElementById("question-type-badge");
        this.questionTitle = document.getElementById("question-title");
        this.questionVisual = document.getElementById("question-visual");
        this.optionsContainer = document.getElementById("options-container");
        this.feedbackCard = document.getElementById("feedback-card");

        // Toast container
        this.toastContainer = document.getElementById("toast-container");
    },

    // Eventos globais de botões fixos
    bindGlobalEvents() {
        // Fechar modais com clique no botão de fechar ou no backdrop
        document.querySelectorAll("[data-close-modal]").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const targetModal = e.target.closest(".modal");
                if (targetModal) this.closeModal(targetModal.id);
            });
        });

        // Fechar modal clicando fora da caixa de conteúdo
        this.modals.forEach(modal => {
            modal.addEventListener("click", (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    },

    // Alternar telas
    showScreen(screenId) {
        this.screens.forEach(screen => {
            screen.classList.remove("active");
        });
        const target = document.getElementById(screenId);
        if (target) {
            target.classList.add("active");
            window.scrollTo(0, 0);
        }
    },

    // Abrir modal
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("active");
            AudioEngine.playClick();
        }
    },

    // Fechar modal
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove("active");
        }
    },

    // Atualizar sumário do jogador na tela inicial (Nível, Título, Barra de XP)
    updateProfileSummary() {
        const data = StorageManager.load();
        const levelEl = document.getElementById("profile-level");
        const titleEl = document.getElementById("profile-title");
        const xpText = document.getElementById("profile-xp-text");
        const xpFill = document.getElementById("profile-xp-fill");

        if (levelEl) levelEl.textContent = `Nível ${data.level}`;
        if (titleEl) titleEl.textContent = StorageManager.getTitleForLevel(data.level);

        const reqXP = StorageManager.getXPRequired(data.level);
        const pct = Math.min(100, Math.round((data.xp / reqXP) * 100));

        if (xpText) xpText.textContent = `${data.xp} / ${reqXP} XP`;
        if (xpFill) xpFill.style.width = `${pct}%`;
    },

    // Atualizar HUD durante a partida
    updateHUD(state) {
        if (this.hudScore) {
            this.hudScore.textContent = state.score.toLocaleString("pt-BR");
        }

        if (this.hudStreak) {
            this.hudStreak.textContent = `🔥 ${state.streak}`;
            // Se o streak for 5 ou mais, adiciona classe de chamas
            if (state.streak >= 5) {
                this.hudStreak.classList.add("fire-mode");
            } else {
                this.hudStreak.classList.remove("fire-mode");
            }
        }

        if (this.hudStreakBadge) {
            const mult = Game.getStreakMultiplier();
            this.hudStreakBadge.textContent = `x${mult.toFixed(2)}`;
            if (mult > 1.0) {
                this.hudStreakBadge.style.display = "inline-flex";
            } else {
                this.hudStreakBadge.style.display = "none";
            }
        }

        if (this.hudMode) {
            const modeLabels = {
                rush: "⚡ RUSH 60",
                practice: "🎯 MODO LIVRE",
                daily: "📅 DESAFIO DIÁRIO",
                fetec: "🎪 MODO FETEC"
            };
            this.hudMode.textContent = modeLabels[state.mode] || "NATIONRUSH";
        }

        if (this.hudProgress) {
            if (state.mode === "daily") {
                this.hudProgress.style.display = "block";
                this.hudProgress.textContent = `Desafio ${state.questionNumber} / ${state.dailyMaxQuestions}`;
            } else {
                this.hudProgress.style.display = "none";
            }
        }
    },

    // Atualizar cronômetro regressivo
    updateTimer(secondsLeft, totalSeconds) {
        if (this.hudTimer) {
            const mins = Math.floor(secondsLeft / 60);
            const secs = secondsLeft % 60;
            this.hudTimer.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            
            if (secondsLeft <= 10) {
                this.hudTimer.classList.add("timer-urgent");
            } else {
                this.hudTimer.classList.remove("timer-urgent");
            }
        }

        if (this.hudTimerBar) {
            const pct = Math.max(0, (secondsLeft / totalSeconds) * 100);
            this.hudTimerBar.style.width = `${pct}%`;
        }
    },

    // Renderizar pergunta na arena
    renderQuestion(q, state) {
        // Esconder feedback anterior
        if (this.feedbackCard) {
            this.feedbackCard.classList.remove("active");
            this.feedbackCard.innerHTML = "";
        }

        // Tipo e Título
        if (this.questionTypeBadge) {
            this.questionTypeBadge.textContent = q.typeLabel || "Desafio";
        }
        if (this.questionTitle) {
            this.questionTitle.textContent = q.title;
        }

        // Renderizar elemento visual
        this.renderVisualContent(q);

        // Renderizar alternativas
        this.renderOptions(q);
    },

    // Renderizar o miolo visual (Bandeira, Silhueta SVG, Versus, Mapa, etc.)
    renderVisualContent(q) {
        if (!this.questionVisual) return;
        this.questionVisual.innerHTML = "";

        switch (q.visualType) {
            case "flag":
                this.questionVisual.innerHTML = `
                    <div class="visual-flag-display" aria-label="Bandeira">
                        <span class="flag-huge">${q.visualData}</span>
                    </div>
                `;
                break;

            case "silhouette":
                this.questionVisual.innerHTML = `
                    <div class="visual-silhouette-container">
                        <svg class="silhouette-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
                                </pattern>
                            </defs>
                            <rect width="100" height="100" fill="url(#grid)" />
                            <path d="${q.visualData}" class="silhouette-path" />
                        </svg>
                        <span class="silhouette-hint">🗺️ Contorno Territorial</span>
                    </div>
                `;
                break;

            case "versus":
                const { countryA, countryB } = q.visualData;
                this.questionVisual.innerHTML = `
                    <div class="visual-versus-container">
                        <div class="versus-card">
                            <span class="versus-flag">${countryA.flag}</span>
                            <span class="versus-name">${countryA.name}</span>
                        </div>
                        <div class="versus-divider">VS</div>
                        <div class="versus-card">
                            <span class="versus-flag">${countryB.flag}</span>
                            <span class="versus-name">${countryB.name}</span>
                        </div>
                    </div>
                `;
                break;

            case "interactive_map":
                this.renderInteractiveMap(q);
                break;

            case "statement":
            case "badge":
            default:
                this.questionVisual.innerHTML = `
                    <div class="visual-badge-display">
                        <div class="badge-icon-wrap">${q.visualData}</div>
                    </div>
                `;
                break;
        }
    },

    // Renderizar Mapa-Múndi Interativo em SVG com clique
    renderInteractiveMap(q) {
        this.questionVisual.innerHTML = `
            <div class="map-interactive-wrapper" id="map-click-arena">
                <div class="map-instruction-overlay">📍 Clique na posição aproximada do país</div>
                <svg class="world-map-svg" viewBox="0 0 100 60" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#0a192f" />
                            <stop offset="100%" stop-color="#020c1b" />
                        </linearGradient>
                    </defs>
                    <rect width="100" height="60" fill="url(#oceanGrad)" />
                    <!-- Linhas do Equador e Trópicos -->
                    <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.15)" stroke-dasharray="1,1" stroke-width="0.3"/>
                    <line x1="0" y1="18" x2="100" y2="18" stroke="rgba(255,255,255,0.08)" stroke-dasharray="1,1" stroke-width="0.2"/>
                    <line x1="0" y1="42" x2="100" y2="42" stroke="rgba(255,255,255,0.08)" stroke-dasharray="1,1" stroke-width="0.2"/>

                    <!-- Massas continentais simplificadas -->
                    <!-- América do Norte -->
                    <path d="M 8 10 Q 25 8 35 15 Q 32 30 22 35 Q 15 32 10 20 Z" class="continent-land" />
                    <!-- América do Sul -->
                    <path d="M 23 38 Q 38 40 33 55 Q 26 58 24 45 Z" class="continent-land" />
                    <!-- Europa -->
                    <path d="M 44 14 Q 60 12 58 24 Q 48 26 44 18 Z" class="continent-land" />
                    <!-- África -->
                    <path d="M 43 26 Q 62 25 58 48 Q 48 52 44 32 Z" class="continent-land" />
                    <!-- Ásia -->
                    <path d="M 60 12 Q 92 10 90 32 Q 75 35 62 28 Z" class="continent-land" />
                    <!-- Oceania / Austrália -->
                    <path d="M 78 44 Q 92 42 88 54 Q 78 55 78 44 Z" class="continent-land" />
                </svg>
                <div id="map-pins-layer" class="map-pins-layer"></div>
            </div>
        `;

        const arena = document.getElementById("map-click-arena");
        const pinsLayer = document.getElementById("map-pins-layer");

        if (arena) {
            arena.addEventListener("click", (e) => {
                if (Game.state.isTransitioning) return;

                const rect = arena.getBoundingClientRect();
                const clickX = ((e.clientX - rect.left) / rect.width) * 100;
                const clickY = ((e.clientY - rect.top) / rect.height) * 100;

                AudioEngine.playMapPin();

                // Colocar pin do usuário
                const userPin = document.createElement("div");
                userPin.className = "map-pin user-pin";
                userPin.style.left = `${clickX}%`;
                userPin.style.top = `${clickY}%`;
                pinsLayer.appendChild(userPin);

                // Colocar pin alvo do país
                const targetPin = document.createElement("div");
                targetPin.className = "map-pin target-pin";
                targetPin.style.left = `${q.correctAnswer.x}%`;
                targetPin.style.top = `${q.correctAnswer.y}%`;
                targetPin.innerHTML = `<span class="target-pin-label">${q.country ? q.country.portugueseName : ''}</span>`;
                pinsLayer.appendChild(targetPin);

                // Enviar resposta
                Game.submitAnswer(null, { clickedCoords: { x: clickX, y: clickY } });
            }, { once: true });
        }
    },

    // Renderizar botões de múltipla escolha
    renderOptions(q) {
        if (!this.optionsContainer) return;
        this.optionsContainer.innerHTML = "";

        // Se for questão de mapa interativo, as opções não são botões
        if (q.type === "map_locator") {
            this.optionsContainer.innerHTML = `
                <div class="map-helper-tip">
                    <span>💡 Toque diretamente na região correspondente do globo acima</span>
                </div>
            `;
            return;
        }

        const isTrueFalse = q.options.length === 2 && q.options.includes("Verdadeiro");

        q.options.forEach((optText, index) => {
            const btn = document.createElement("button");
            btn.className = isTrueFalse ? "btn-option btn-option-tf" : "btn-option";
            btn.dataset.answer = optText;
            btn.dataset.index = index;

            // Atalho de teclado visível
            let keyLabel = index + 1;
            if (isTrueFalse) {
                keyLabel = optText === "Verdadeiro" ? "V" : "F";
            }

            btn.innerHTML = `
                <span class="option-shortcut-key">${keyLabel}</span>
                <span class="option-text">${optText}</span>
            `;

            btn.addEventListener("click", () => {
                AudioEngine.playClick();
                Game.submitAnswer(optText);
            });

            this.optionsContainer.appendChild(btn);
        });
    },

    // Feedback visual imediato da resposta
    showAnswerFeedback({ isCorrect, userAnswer, correctAnswer, earnedPoints, streak, multiplier, didYouKnow, speedBonusActive, distanceKm, question }) {
        // Desativar botões de alternativas e pintar cores
        const buttons = this.optionsContainer.querySelectorAll(".btn-option");
        buttons.forEach(btn => {
            btn.disabled = true;
            const btnAnswer = btn.dataset.answer;
            if (btnAnswer && btnAnswer.trim().toLowerCase() === String(correctAnswer).trim().toLowerCase()) {
                btn.classList.add("option-correct");
            } else if (btnAnswer && btnAnswer.trim().toLowerCase() === String(userAnswer).trim().toLowerCase()) {
                btn.classList.add("option-wrong");
            }
        });

        // Cartão "💡 Você Sabia?"
        if (this.feedbackCard) {
            let statusBadge = isCorrect
                ? `<div class="feedback-badge correct"><span class="icon">✓</span> ACERTOU! <span class="pts">+${earnedPoints} pts</span></div>`
                : `<div class="feedback-badge wrong"><span class="icon">✕</span> INCORRETO!</div>`;

            let bonusTag = speedBonusActive ? `<span class="speed-bonus-pill">⚡ Bônus de Velocidade +30%</span>` : "";

            let mapDetail = "";
            if (distanceKm !== null) {
                mapDetail = `<p class="feedback-subinfo">Distância aproximada: <strong>${distanceKm} km</strong></p>`;
            }

            this.feedbackCard.innerHTML = `
                <div class="feedback-content ${isCorrect ? 'correct' : 'wrong'}">
                    <div class="feedback-top-row">
                        ${statusBadge}
                        ${bonusTag}
                    </div>
                    ${mapDetail}
                    <div class="did-you-know-box">
                        <div class="did-you-know-header">
                            <span class="lamp-icon">💡</span>
                            <strong>VOCÊ SABIA?</strong>
                        </div>
                        <p class="did-you-know-text">${didYouKnow || 'A geografia conecta história, cultura e meio ambiente.'}</p>
                    </div>
                </div>
            `;
            this.feedbackCard.classList.add("active");
        }
    },

    // Exibir Modal de Resultados
    showResultModal({ score, streak, accuracy, mode, totalAnswered, correctCount, earnedXP, xpResult, newlyUnlocked, isNewHighScore }) {
        const modal = document.getElementById("result-modal");
        if (!modal) return;

        const scoreEl = document.getElementById("result-score");
        const streakEl = document.getElementById("result-streak");
        const accuracyEl = document.getElementById("result-accuracy");
        const answeredEl = document.getElementById("result-answered");
        const xpEl = document.getElementById("result-xp-earned");
        const recordTag = document.getElementById("result-record-tag");
        const achievementsBox = document.getElementById("result-achievements-box");

        if (scoreEl) scoreEl.textContent = score.toLocaleString("pt-BR");
        if (streakEl) streakEl.textContent = streak;
        if (accuracyEl) accuracyEl.textContent = `${accuracy}%`;
        if (answeredEl) answeredEl.textContent = `${correctCount} / ${totalAnswered}`;
        if (xpEl) xpEl.textContent = `+${earnedXP} XP`;

        if (recordTag) {
            recordTag.style.display = isNewHighScore ? "inline-block" : "none";
        }

        // Se desbloqueou conquistas nesta partida
        if (achievementsBox) {
            if (newlyUnlocked && newlyUnlocked.length > 0) {
                achievementsBox.style.display = "block";
                achievementsBox.innerHTML = `
                    <div class="new-achievements-title">🏆 NOVA CONQUISTA DESBLOQUEADA!</div>
                    <div class="new-achievements-list">
                        ${newlyUnlocked.map(a => `
                            <div class="achievement-pill">
                                <span class="pill-icon">${a.icon}</span>
                                <div>
                                    <strong>${a.title}</strong>
                                    <small>${a.desc}</small>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                achievementsBox.style.display = "none";
                achievementsBox.innerHTML = "";
            }
        }

        // Atualizar sumário de nível na tela inicial
        this.updateProfileSummary();

        // Disparar confetes se pontuação foi alta ou se foi novo recorde
        if (score > 4000 || isNewHighScore) {
            this.fireConfetti();
        }

        this.openModal("result-modal");
    },

    // Renderizar painel de Estatísticas
    renderStatsModal() {
        const data = StorageManager.load();
        
        document.getElementById("stats-total-games").textContent = data.totalGames;
        document.getElementById("stats-total-questions").textContent = data.totalQuestions;
        document.getElementById("stats-accuracy").textContent = data.totalQuestions > 0 
            ? `${Math.round((data.correctAnswers / data.totalQuestions) * 100)}%` 
            : "0%";
        document.getElementById("stats-best-streak").textContent = data.bestStreak;
        document.getElementById("stats-high-rush").textContent = (data.highScores.rush || 0).toLocaleString("pt-BR");
        document.getElementById("stats-high-fetec").textContent = (data.highScores.fetec || 0).toLocaleString("pt-BR");
        document.getElementById("stats-discovered-countries").textContent = `${(data.discoveredCountries || []).length} / ${NATION_DATA.COUNTRIES.length}`;

        this.openModal("stats-modal");
    },

    // Renderizar lista de Conquistas
    renderAchievementsModal() {
        const achievements = StorageManager.getAllAchievements();
        const container = document.getElementById("achievements-grid");
        if (!container) return;

        container.innerHTML = achievements.map(ach => `
            <div class="achievement-card ${ach.unlocked ? 'unlocked' : 'locked'}">
                <div class="ach-icon-circle">${ach.icon}</div>
                <div class="ach-details">
                    <h4 class="ach-title">${ach.title}</h4>
                    <p class="ach-desc">${ach.desc}</p>
                    <span class="ach-status">${ach.unlocked ? '✓ Desbloqueada' : '🔒 Bloqueada'}</span>
                </div>
            </div>
        `).join('');

        this.openModal("achievements-modal");
    },

    // Notificação Toast rápida
    showToast(message, duration = 2500) {
        if (!this.toastContainer) return;
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = message;
        this.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("toast-fade");
            setTimeout(() => toast.remove(), 400);
        }, duration);
    },

    // Compartilhar resultado via Clipboard API
    shareResult(score, streak, accuracy) {
        const text = `🌍 NATIONRUSH — Desafio Geográfico!\n\n` +
                     `⭐ Pontuação: ${score.toLocaleString('pt-BR')}\n` +
                     `🔥 Maior Streak: ${streak}\n` +
                     `🎯 Precisão: ${accuracy}%\n\n` +
                     `Você consegue superar meus conhecimentos de geografia?`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast("📋 Resultado copiado para a área de transferência!");
            }).catch(() => {
                this.showToast("Falha ao copiar automaticamente.");
            });
        } else {
            this.showToast("Área de transferência indisponível no navegador.");
        }
    },

    // Efeito de Confetes simples e leve com Canvas (Zero bibliotecas externas)
    fireConfetti() {
        const canvas = document.getElementById("confetti-canvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ["#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ffffff"];
        const particles = [];
        for (let i = 0; i < 70; i++) {
            particles.push({
                x: canvas.width * 0.5,
                y: canvas.height * 0.4,
                vx: (Math.random() - 0.5) * 14,
                vy: (Math.random() - 0.7) * 16,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                spin: (Math.random() - 0.5) * 10,
                opacity: 1
            });
        }

        let frame = 0;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let activeCount = 0;

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.4; // gravidade
                p.rotation += p.spin;
                p.opacity -= 0.012;

                if (p.opacity > 0) {
                    activeCount++;
                    ctx.save();
                    ctx.globalAlpha = Math.max(0, p.opacity);
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation * Math.PI) / 180);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    ctx.restore();
                }
            });

            frame++;
            if (activeCount > 0 && frame < 120) {
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
        animate();
    }
};
