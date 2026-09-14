/**
 * NationRush - Motor Sonoro Procedural (Web Audio API)
 * Gera todos os efeitos sonoros diretamente no navegador via sintetizadores sonoros nativos.
 * 100% offline, zero dependências de arquivos de áudio externos e latência instantânea.
 */

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.volume = 0.7;
    }

    // Inicialização atrasada no primeiro clique (respeitando política de autoplay dos navegadores)
    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === "suspended") {
            this.ctx.resume();
        }
    }

    // Atualizar estado de áudio a partir das preferências do usuário
    updatePreferences(settings) {
        if (settings) {
            this.isMuted = !settings.soundEnabled;
            this.volume = settings.soundVolume !== undefined ? settings.soundVolume : 0.7;
        }
    }

    // Criar oscilador com envelope ADSR simplificado
    _playTone({ freq = 440, type = "sine", duration = 0.15, gainVal = 0.2, pitchBend = null, delay = 0 }) {
        if (this.isMuted || !this.ctx) return;

        setTimeout(() => {
            try {
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = type;
                osc.frequency.setValueAtTime(freq, now);

                if (pitchBend) {
                    osc.frequency.exponentialRampToValueAtTime(pitchBend, now + duration);
                }

                // Master volume scaling
                const targetGain = gainVal * this.volume;
                gain.gain.setValueAtTime(0.001, now);
                gain.gain.linearRampToValueAtTime(targetGain, now + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(now);
                osc.stop(now + duration + 0.05);
            } catch (err) {
                // Silenciosamente ignorar caso o contexto ainda não esteja ativo
            }
        }, delay * 1000);
    }

    // Clique de botão tátil e sutil
    playClick() {
        this.init();
        this._playTone({ freq: 650, type: "sine", duration: 0.04, gainVal: 0.1, pitchBend: 400 });
    }

    // Resposta Correta: Arpejo ascendente alegre com pitch aumentando conforme o streak
    playCorrect(streak = 0) {
        this.init();
        // Escala pentatônica maior subindo com a sequência
        const baseOffset = Math.min(streak, 12) * 20;
        const freqs = [523.25 + baseOffset, 659.25 + baseOffset, 783.99 + baseOffset, 1046.50 + baseOffset];

        freqs.forEach((freq, idx) => {
            this._playTone({
                freq: freq,
                type: "triangle",
                duration: 0.18,
                gainVal: 0.15,
                delay: idx * 0.05
            });
        });

        // Se o streak for alto (5, 10, etc.), tocar som adicional de fogo
        if (streak >= 5 && streak % 5 === 0) {
            this.playStreakFire();
        }
    }

    // Resposta Incorreta: Tom baixo amortecido e suave
    playError() {
        this.init();
        this._playTone({ freq: 280, type: "sawtooth", duration: 0.22, gainVal: 0.18, pitchBend: 140 });
        this._playTone({ freq: 220, type: "sine", duration: 0.25, gainVal: 0.15, pitchBend: 110, delay: 0.04 });
    }

    // Efeito de combo / fogo no streak (multiplicador ativado)
    playStreakFire() {
        this.init();
        const chords = [440, 554.37, 659.25, 880];
        chords.forEach((freq, i) => {
            this._playTone({
                freq: freq,
                type: "sine",
                duration: 0.35,
                gainVal: 0.12,
                pitchBend: freq * 1.25,
                delay: i * 0.03
            });
        });
    }

    // Aviso de contagem regressiva nos últimos segundos
    playTimerWarning() {
        this.init();
        this._playTone({ freq: 880, type: "sine", duration: 0.06, gainVal: 0.1 });
    }

    // Radar ping ao clicar no mapa interativo
    playMapPin() {
        this.init();
        this._playTone({ freq: 700, type: "sine", duration: 0.15, gainVal: 0.2, pitchBend: 1100 });
    }

    // Fanfarra de Conquista / Subida de Nível
    playAchievement() {
        this.init();
        const fanfareNotes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
        fanfareNotes.forEach((f, idx) => {
            this._playTone({
                freq: f,
                type: "triangle",
                duration: 0.28,
                gainVal: 0.22,
                delay: idx * 0.08
            });
        });
    }

    // Fim de partida (Game Over)
    playGameOver() {
        this.init();
        const wrapNotes = [659.25, 587.33, 523.25, 440];
        wrapNotes.forEach((f, idx) => {
            this._playTone({
                freq: f,
                type: "sine",
                duration: 0.3,
                gainVal: 0.15,
                delay: idx * 0.1
            });
        });
    }
}

// Instância global única
const AudioEngine = new SoundEngine();
