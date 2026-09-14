/**
 * NationRush - Gerenciador de Persistência (Storage)
 * Centraliza todo o acesso a dados no LocalStorage:
 * XP, Níveis, Conquistas, Recordes, Estatísticas e Preferências.
 */

const STORAGE_KEY = "nationrush_save_v1";

// Lista de conquistas pré-definidas
const ACHIEVEMENTS_LIST = [
    {
        id: "first_game",
        title: "Primeiro Passo",
        desc: "Complete sua primeira partida no NationRush.",
        icon: "🧭",
        condition: (s) => s.totalGames >= 1
    },
    {
        id: "streak_5",
        title: "Em Ritmo",
        desc: "Alcance uma sequência de 5 acertos seguidos.",
        icon: "⚡",
        condition: (s) => s.bestStreak >= 5
    },
    {
        id: "streak_10",
        title: "Imparável",
        desc: "Acumule 10 acertos consecutivos sem errar.",
        icon: "🔥",
        condition: (s) => s.bestStreak >= 10
    },
    {
        id: "score_5k",
        title: "Pontuador",
        desc: "Supere 5.000 pontos em uma única partida.",
        icon: "⭐",
        condition: (s) => s.highScores.rush >= 5000 || s.highScores.fetec >= 5000
    },
    {
        id: "score_10k",
        title: "Lenda dos Mapas",
        desc: "Ultrapasse a marca de 10.000 pontos em uma partida.",
        icon: "👑",
        condition: (s) => s.highScores.rush >= 10000 || s.highScores.fetec >= 10000
    },
    {
        id: "countries_20",
        title: "Passaporte Carimbado",
        desc: "Responda sobre pelo menos 20 países diferentes.",
        icon: "✈️",
        condition: (s) => (s.discoveredCountries || []).length >= 20
    },
    {
        id: "countries_35",
        title: "Volta ao Mundo",
        desc: "Descubra e responda sobre 35 países no jogo.",
        icon: "🌍",
        condition: (s) => (s.discoveredCountries || []).length >= 35
    },
    {
        id: "speedster",
        title: "Velocista",
        desc: "Acerte uma pergunta em menos de 1.5 segundos.",
        icon: "⚡",
        condition: (s) => s.hasSpeedBonus === true
    },
    {
        id: "daily_complete",
        title: "Explorador Diário",
        desc: "Complete com sucesso o Desafio Diário.",
        icon: "📅",
        condition: (s) => s.dailyCompletedCount >= 1
    },
    {
        id: "perfect_game",
        title: "Perfeição",
        desc: "Termine uma partida com 100% de precisão (mínimo 8 perguntas).",
        icon: "🎯",
        condition: (s) => s.hasPerfectGame === true
    },
    {
        id: "level_5",
        title: "Geógrafo Oficial",
        desc: "Alcance o Nível 5 de jogador.",
        icon: "🎓",
        condition: (s) => s.level >= 5
    }
];

// Títulos por faixa de nível
const LEVEL_TITLES = [
    { level: 1, title: "Turista Curioso" },
    { level: 3, title: "Mochileiro Aprendiz" },
    { level: 5, title: "Navegador de Mapas" },
    { level: 8, title: "Cartógrafo Júnior" },
    { level: 12, title: "Geógrafo Sênior" },
    { level: 16, title: "Diplomata Global" },
    { level: 20, title: "Mestre Planetário" }
];

const StorageManager = {
    // Estado inicial padrão
    getDefaultState() {
        return {
            totalGames: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            bestStreak: 0,
            dailyCompletedCount: 0,
            hasSpeedBonus: false,
            hasPerfectGame: false,
            xp: 0,
            level: 1,
            highScores: {
                rush: 0,
                practice: 0,
                daily: 0,
                fetec: 0
            },
            discoveredCountries: [],
            unlockedAchievements: [],
            dailyHistory: {}, // mapeia 'YYYY-MM-DD': { score, streak, completed }
            settings: {
                soundEnabled: true,
                soundVolume: 0.7,
                reducedMotion: false,
                highContrast: false
            }
        };
    },

    // Carregar dados salvos ou criar padrão
    load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                const initial = this.getDefaultState();
                this.save(initial);
                return initial;
            }
            const data = JSON.parse(raw);
            return Object.assign(this.getDefaultState(), data);
        } catch (e) {
            console.warn("Falha ao carregar localStorage, restaurando padrões:", e);
            return this.getDefaultState();
        }
    },

    // Salvar estado
    save(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error("Falha ao gravar no localStorage:", e);
        }
    },

    // Retornar dados atuais
    getData() {
        return this.load();
    },

    // Obter título pelo nível
    getTitleForLevel(level) {
        let currentTitle = LEVEL_TITLES[0].title;
        for (const entry of LEVEL_TITLES) {
            if (level >= entry.level) {
                currentTitle = entry.title;
            }
        }
        return currentTitle;
    },

    // Calcular XP necessário para o próximo nível (curva exponencial suave)
    getXPRequired(level) {
        return Math.round(300 * Math.pow(1.25, level - 1));
    },

    // Adicionar XP e calcular se subiu de nível
    addXP(points) {
        const data = this.load();
        data.xp += Math.round(points);

        let leveledUp = false;
        let nextReq = this.getXPRequired(data.level);

        while (data.xp >= nextReq) {
            data.xp -= nextReq;
            data.level += 1;
            leveledUp = true;
            nextReq = this.getXPRequired(data.level);
        }

        this.save(data);
        return {
            leveledUp,
            currentLevel: data.level,
            currentXP: data.xp,
            requiredXP: nextReq,
            title: this.getTitleForLevel(data.level)
        };
    },

    // Registrar término de partida
    recordGame(gameResult) {
        const data = this.load();
        data.totalGames += 1;
        data.totalQuestions += (gameResult.questionsAnswered || 0);
        data.correctAnswers += (gameResult.correctAnswers || 0);

        // Atualiza melhor streak
        if (gameResult.maxStreak > data.bestStreak) {
            data.bestStreak = gameResult.maxStreak;
        }

        // Atualiza recorde no modo
        const mode = gameResult.mode || "rush";
        if (!data.highScores[mode] || gameResult.score > data.highScores[mode]) {
            data.highScores[mode] = gameResult.score;
        }

        // Países descobertos
        if (Array.isArray(gameResult.encounteredCountries)) {
            const currentSet = new Set(data.discoveredCountries || []);
            gameResult.encounteredCountries.forEach(id => currentSet.add(id));
            data.discoveredCountries = Array.from(currentSet);
        }

        // Partida perfeita?
        if (gameResult.questionsAnswered >= 8 && gameResult.correctAnswers === gameResult.questionsAnswered) {
            data.hasPerfectGame = true;
        }

        // Bônus de velocidade registrado?
        if (gameResult.hadSpeedBonus) {
            data.hasSpeedBonus = true;
        }

        // Se for desafio diário
        if (mode === "daily" && gameResult.dateKey) {
            data.dailyHistory[gameResult.dateKey] = {
                score: gameResult.score,
                streak: gameResult.maxStreak,
                completed: true,
                playedAt: new Date().toISOString()
            };
            data.dailyCompletedCount = Object.keys(data.dailyHistory).length;
        }

        this.save(data);

        // Checar e desbloquear conquistas
        const newlyUnlocked = this.checkAchievements(data);

        return {
            highScores: data.highScores,
            newlyUnlocked,
            totalDiscovered: data.discoveredCountries.length
        };
    },

    // Verificar se há conquistas a liberar
    checkAchievements(data) {
        const unlockedNow = [];
        const alreadyUnlocked = new Set(data.unlockedAchievements || []);

        ACHIEVEMENTS_LIST.forEach(ach => {
            if (!alreadyUnlocked.has(ach.id)) {
                if (ach.condition(data)) {
                    alreadyUnlocked.add(ach.id);
                    unlockedNow.push(ach);
                }
            }
        });

        if (unlockedNow.length > 0) {
            data.unlockedAchievements = Array.from(alreadyUnlocked);
            this.save(data);
        }

        return unlockedNow;
    },

    // Obter todas as conquistas com status de desbloqueio
    getAllAchievements() {
        const data = this.load();
        const unlockedSet = new Set(data.unlockedAchievements || []);
        return ACHIEVEMENTS_LIST.map(ach => ({
            ...ach,
            unlocked: unlockedSet.has(ach.id)
        }));
    },

    // Obter configurações
    getSettings() {
        return this.load().settings;
    },

    // Atualizar configurações
    updateSettings(newSettings) {
        const data = this.load();
        data.settings = Object.assign(data.settings, newSettings);
        this.save(data);
        return data.settings;
    },

    // Verificar status do desafio diário de hoje
    getDailyStatus(dateKey) {
        const data = this.load();
        return data.dailyHistory[dateKey] || null;
    },

    // Resetar progresso
    resetAll() {
        const fresh = this.getDefaultState();
        this.save(fresh);
        return fresh;
    }
};

// Congelar métodos do gerenciador
Object.freeze(StorageManager);
