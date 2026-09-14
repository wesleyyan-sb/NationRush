# 🌍 NationRush

> **Desafie o mundo. Aprenda sem perceber.**

**NationRush** é um jogo web de geografia rápido, educativo e altamente competitivo, desenvolvido para rodar **100% no lado do cliente (client-side)** no navegador. O projeto foi projetado com excelência visual e mecânicas modernas para apresentação em feiras de ciências e tecnologia (**FETEC**) e publicação imediata no **GitHub Pages**.

---

## 📌 Problema e Solução

### O Problema
Muitas vezes, o ensino e o aprendizado de geografia são associados à memorização passiva de capitais e mapas estáticos em livros didáticos, o que resulta em desinteresse e baixa retenção de conhecimento por parte dos estudantes.

### A Solução NationRush
NationRush transforma a geografia em uma experiência de **gamificação ativa e dinâmica**:
- Partidas rápidas e intensas (estilo *time rush*).
- Sequências de acertos (*streaks*) com multiplicadores de pontuação crescentes.
- Micro-aprendizado instantâneo através do componente **💡 Você Sabia?**, que exibe curiosidades geopolíticas, culturais e históricas logo após cada resposta.

---

## 🎮 Modos de Jogo

1. **⚡ Rush 60 (Modo Principal):**
   - 60 segundos contra o relógio para alcançar a maior pontuação possível.
   - Bônus de velocidade para respostas dadas em menos de 1,8 segundos.
   - Multiplicadores dinâmicos de sequência (de 1.0x até 2.5x).

2. **📅 Desafio Diário:**
   - 10 rodadas geradas determinística e proceduralmente a partir da data atual (`YYYY-MM-DD`).
   - Todos os jogadores no mundo que acessarem o jogo naquele dia recebem exatamente os mesmos desafios.

3. **🎪 Modo FETEC (Demonstração ao Vivo):**
   - Configurado especificamente para apresentações e estandes em feiras.
   - Início instantâneo, HUD maximizado, pontuação visual e ritmo acelerado para o público ao redor assistir e competir no estande.

4. **🧘 Modo Livre (Treino):**
   - Sem cronômetro regressivo. Permite explorar livremente o banco de dados de países e perguntas para estudo e aquecimento.

---

## 🧠 As 12 Mecânicas de Desafios

O NationRush conta com um motor procedural com sistema inteligente de anti-repetição que alterna aleatoriamente entre 12 mecânicas geográficas:

1. **🏳️ Bandeiras:** Identificar o país a partir de sua bandeira oficial.
2. **🏛️ Capitais (Direta e Inversa):** Perguntas diretas (*"Qual a capital do Japão?"*) e inversas (*"Canberra é a capital de qual país?"*).
3. **🗺️ Silhuetas Territoriais:** Reconhecimento visual de mapas vetoriais SVG de contorno.
4. **👥 População (Versus):** Comparação direta entre dois países com visualização posterior dos milhões de habitantes.
5. **🌐 Continentes:** Localização continental correta de nações ao redor do globo.
6. **📍 Localização no Mapa Interativo:** O jogador clica no mapa-múndi e o sistema calcula a precisão da distância geográfica com retorno de pontos.
7. **❓ Fato Geográfico (Verdadeiro ou Falso):** Julgamento de afirmações curiosas com explicação imediata.
8. **💰 Moedas:** Identificação da unidade monetária oficial de cada país.
9. **🗣️ Idiomas:** Associação de línguas oficiais aos respectivos povos.
10. **🚧 Fronteiras Terrestres:** Identificação de países vizinhos reais.
11. **🔍 Bandeiras Gêmeas / Difíceis:** Desafios de atenção com bandeiras historicamente parecidas (ex: Romênia × Chade, Indonésia × Mônaco, Austrália × Nova Zelândia).
12. **🚫 Qual Não Pertence? (Intruso):** Identificação de qual país não faz parte do mesmo continente dos outros três.

---

## 🏆 Gamificação, XP e Conquistas

- **Sistema de Níveis:** Progressão de Nível 1 a Nível 20 com títulos temáticos (*Turista Curioso*, *Mochileiro Aprendiz*, *Navegador de Mapas*, *Cartógrafo Júnior*, *Geógrafo Sênior*, *Diplomata Global* e *Mestre Planetário*).
- **11 Conquistas Desbloqueáveis:** *Primeiro Passo*, *Em Ritmo*, *Imparável*, *Pontuador*, *Lenda dos Mapas*, *Passaporte Carimbado*, *Volta ao Mundo*, *Velocista*, *Explorador Diário*, *Perfeição* e *Geógrafo Oficial*.
- **Recordes Locais:** Painel de estatísticas com total de partidas, taxa de acerto, melhor streak, países descobertos e maiores pontuações por modo.
- **Compartilhamento de Resultados:** Botão integrado com a Clipboard API para copiar o resumo do jogo com formatação para redes sociais e mensageiros.

---

## 🛠️ Tecnologias Utilizadas

O projeto adota intencionalmente uma arquitetura limpa, estável e independente:

- **HTML5 Semântico:** Estrutura acessível com tags semânticas e atributos ARIA.
- **CSS3 Moderno:** Design System baseado em variáveis CSS (Custom Properties), Grid, Flexbox, Glassmorphism e micro-animações.
- **JavaScript Moderno (ES6+):** Programação orientada a objetos e modularizada sem necessidade de bundlers ou transpilação.
- **Web Audio API:** Síntese procedural de áudio 100% nativa no navegador. Os sons de acerto, erro, combos de streak e fanfarras são sintetizados matematicamente via osciladores, sem depender de nenhum arquivo `.mp3` externo.
- **LocalStorage API:** Persistência local segura de preferências, recordes, XP e histórico.

---

## 📂 Arquitetura e Estrutura de Pastas

```text
NationRush/
│
├── index.html              # Estrutura semântica das telas, HUD e modais
├── favicon.svg             # Ícone vetorial estilizado
├── README.md               # Documentação técnica e guia
│
├── css/
│   ├── style.css           # Design system, temas, HUD, cards e animações
│   └── responsive.css      # Regras de responsividade para mobile, tablet e desktop
│
└── js/
    ├── data.js             # Dataset de 80+ países, capitais, fatos e silhuetas
    ├── storage.js          # Gerenciamento de persistência e estatísticas
    ├── audio.js            # Motor sonoro sintetizado nativo com Web Audio API
    ├── questions.js        # Gerador procedural das 12 mecânicas com anti-repetição
    ├── ui.js               # Renderização de interface, HUD, mapa SVG e partículas
    ├── game.js             # Motor do loop de jogo, temporizador e pontuação
    └── app.js              # Inicializador, atalhos de teclado (1-4, V/F, Esc)
```

---

## 🚀 Como Executar Localmente

Como o projeto é 100% estático e client-side:

### Opção 1: Abrir diretamente no navegador
Basta dar um duplo clique no arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox, Safari, Opera).

### Opção 2: Servidor local simples (Recomendado)
Para testar como se estivesse em um ambiente de produção:
```bash
# Usando Python (se disponível)
python -m http.server 8000

# Ou usando Node (npx)
npx serve .
```
Acesse `http://localhost:8000` no seu navegador.

---

## 🌐 Como Publicar no GitHub Pages

1. Crie um repositório no seu GitHub (ex: `nationrush`).
2. Envie os arquivos do projeto para o repositório:
   ```bash
   git init
   git add .
   git commit -m "feat: NationRush completo para FETEC"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/nationrush.git
   git push -u origin main
   ```
3. No repositório no GitHub, vá em **Settings** > **Pages**.
4. Em **Build and deployment** > **Source**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/ (root)`.
6. Clique em **Save**. Em alguns minutos, seu jogo estará online no endereço:
   `https://SEU_USUARIO.github.io/nationrush/`

---

## 🎪 Dicas de Apresentação na FETEC

- **Modo FETEC:** Utilize o *Modo FETEC* disponível na tela de modos durante as avaliações dos jurados e visitantes.
- **Teclado vs Toque:** Em computadores ou notebooks, oriente os jogadores a usarem as teclas `1`, `2`, `3` e `4` para respostas ultrarrápidas. Em tablets ou celulares, a interface é totalmente tátil.
- **Destaque Pedagógico:** Enfatize para os avaliadores que o jogo não atua apenas como teste avaliativo, mas sim como uma ferramenta de **fixação pedagógica contínua**, graças às informações dos cartões educativos e curiosidades apresentadas imediatamente após o feedback de cada resposta.

---

## 📄 Licença

Este projeto é de código aberto sob a licença [MIT](LICENSE). Desenvolvido com foco educacional e livre para uso em feiras escolares, mostras científicas e salas de aula.
