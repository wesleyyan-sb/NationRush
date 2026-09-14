/**
 * NationRush - Inicializador e Roteador da Aplicação (App Controller)
 * Conecta eventos de clique, atalhos de teclado (1-4, V/F, Esc),
 * inicialização de preferências de áudio e fluxo entre telas.
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicializar UI e Configurações
    UIManager.init();

    const settings = StorageManager.getSettings();
    AudioEngine.updatePreferences(settings);

    // Sincronizar switches do modal de configurações
    const soundToggle = document.getElementById("setting-sound-toggle");
    if (soundToggle) {
        soundToggle.checked = settings.soundEnabled;
        soundToggle.addEventListener("change", (e) => {
            StorageManager.updateSettings({ soundEnabled: e.target.checked });
            AudioEngine.updatePreferences({ soundEnabled: e.target.checked });
        });
    }

    const motionToggle = document.getElementById("setting-motion-toggle");
    if (motionToggle) {
        motionToggle.checked = settings.reducedMotion;
        motionToggle.addEventListener("change", (e) => {
            StorageManager.updateSettings({ reducedMotion: e.target.checked });
            if (e.target.checked) {
                document.body.classList.add("reduced-motion");
            } else {
                document.body.classList.remove("reduced-motion");
            }
        });
        if (settings.reducedMotion) {
            document.body.classList.add("reduced-motion");
        }
    }

    // 2. Botões da Tela Inicial
    const btnPlayRush = document.getElementById("btn-play-rush");
    if (btnPlayRush) {
        btnPlayRush.addEventListener("click", () => {
            AudioEngine.playClick();
            Game.start("rush");
        });
    }

    const btnPlayDaily = document.getElementById("btn-play-daily");
    if (btnPlayDaily) {
        btnPlayDaily.addEventListener("click", () => {
            AudioEngine.playClick();
            // Verificar se já concluiu o desafio diário hoje
            const todayStr = new Date().toISOString().slice(0, 10);
            const prevDaily = StorageManager.getDailyStatus(todayStr);
            if (prevDaily) {
                UIManager.showToast(`Você já completou o Desafio Diário hoje! Pontos: ${prevDaily.score}`);
            }
            Game.start("daily");
        });
    }

    const btnOpenModes = document.getElementById("btn-open-modes");
    if (btnOpenModes) {
        btnOpenModes.addEventListener("click", () => {
            AudioEngine.playClick();
            UIManager.openModal("modes-modal");
        });
    }

    const btnOpenStats = document.getElementById("btn-open-stats");
    if (btnOpenStats) {
        btnOpenStats.addEventListener("click", () => {
            AudioEngine.playClick();
            UIManager.renderStatsModal();
        });
    }

    const btnOpenAchievements = document.getElementById("btn-open-achievements");
    if (btnOpenAchievements) {
        btnOpenAchievements.addEventListener("click", () => {
            AudioEngine.playClick();
            UIManager.renderAchievementsModal();
        });
    }

    const btnOpenHowToPlay = document.getElementById("btn-open-howtoplay");
    if (btnOpenHowToPlay) {
        btnOpenHowToPlay.addEventListener("click", () => {
            AudioEngine.playClick();
            UIManager.openModal("how-to-play-modal");
        });
    }

    const btnOpenSettings = document.getElementById("btn-open-settings");
    if (btnOpenSettings) {
        btnOpenSettings.addEventListener("click", () => {
            AudioEngine.playClick();
            UIManager.openModal("settings-modal");
        });
    }

    // 3. Seleção de Modos no Modal
    document.querySelectorAll("[data-start-mode]").forEach(card => {
        card.addEventListener("click", () => {
            const mode = card.getAttribute("data-start-mode");
            AudioEngine.playClick();
            UIManager.closeModal("modes-modal");
            Game.start(mode);
        });
    });

    // 4. Botões do HUD do Jogo (Pausar e Sair)
    const btnPauseGame = document.getElementById("btn-pause-game");
    if (btnPauseGame) {
        btnPauseGame.addEventListener("click", () => {
            AudioEngine.playClick();
            Game.state.isPaused = true;
            UIManager.openModal("pause-modal");
        });
    }

    const btnResumeGame = document.getElementById("btn-resume-game");
    if (btnResumeGame) {
        btnResumeGame.addEventListener("click", () => {
            AudioEngine.playClick();
            Game.state.isPaused = false;
            UIManager.closeModal("pause-modal");
        });
    }

    const btnQuitGame = document.getElementById("btn-quit-game");
    if (btnQuitGame) {
        btnQuitGame.addEventListener("click", () => {
            AudioEngine.playClick();
            UIManager.closeModal("pause-modal");
            Game.quit();
        });
    }

    // 5. Botões do Modal de Resultados
    const btnResultPlayAgain = document.getElementById("btn-result-play-again");
    if (btnResultPlayAgain) {
        btnResultPlayAgain.addEventListener("click", () => {
            AudioEngine.playClick();
            UIManager.closeModal("result-modal");
            Game.start(Game.state.mode || "rush");
        });
    }

    const btnResultHome = document.getElementById("btn-result-home");
    if (btnResultHome) {
        btnResultHome.addEventListener("click", () => {
            AudioEngine.playClick();
            UIManager.closeModal("result-modal");
            UIManager.showScreen("home-screen");
            UIManager.updateProfileSummary();
        });
    }

    const btnResultShare = document.getElementById("btn-result-share");
    if (btnResultShare) {
        btnResultShare.addEventListener("click", () => {
            AudioEngine.playClick();
            const score = Game.state.score;
            const streak = Game.state.maxStreak;
            const accuracy = Game.state.totalAnswered > 0 
                ? Math.round((Game.state.correctCount / Game.state.totalAnswered) * 100) 
                : 0;
            UIManager.shareResult(score, streak, accuracy);
        });
    }

    // 6. Reset de Dados com Confirmação
    const btnResetData = document.getElementById("btn-reset-data");
    if (btnResetData) {
        btnResetData.addEventListener("click", () => {
            if (confirm("Deseja realmente resetar todo o seu progresso, nível e estatísticas locais?")) {
                StorageManager.resetAll();
                UIManager.updateProfileSummary();
                UIManager.closeModal("settings-modal");
                UIManager.showToast("Progresso resetado com sucesso!");
            }
        });
    }

    // 7. Suporte a Atalhos de Teclado
    window.addEventListener("keydown", (e) => {
        // Se alguma caixa de texto tiver foco, ignorar atalhos
        if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

        // Esc: fechar modal aberto ou pausar jogo
        if (e.key === "Escape") {
            const openModal = document.querySelector(".modal.active");
            if (openModal) {
                UIManager.closeModal(openModal.id);
                if (openModal.id === "pause-modal" && Game.state.isPlaying) {
                    Game.state.isPaused = false;
                }
            } else if (Game.state.isPlaying && !Game.state.isPaused) {
                Game.state.isPaused = true;
                UIManager.openModal("pause-modal");
            }
            return;
        }

        // Teclas 1, 2, 3, 4 para múltipla escolha
        if (Game.state.isPlaying && !Game.state.isPaused && !Game.state.isTransitioning) {
            const options = document.querySelectorAll("#options-container .btn-option");
            if (!options || options.length === 0) return;

            if (["1", "2", "3", "4"].includes(e.key)) {
                const idx = parseInt(e.key, 10) - 1;
                if (options[idx]) {
                    options[idx].click();
                }
            } else if (e.key.toLowerCase() === "v") {
                // Verdadeiro
                const btnV = Array.from(options).find(b => b.dataset.answer === "Verdadeiro");
                if (btnV) btnV.click();
            } else if (e.key.toLowerCase() === "f") {
                // Falso
                const btnF = Array.from(options).find(b => b.dataset.answer === "Falso");
                if (btnF) btnF.click();
            }
        }
    });
});
