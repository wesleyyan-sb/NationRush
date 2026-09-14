/**
 * NationRush - Gerador Procedural de Perguntas e Desafios
 * Implementa as 12 mecânicas geográficas com sistema inteligente de anti-repetição,
 * gerador de semente diária determinística e controle de dificuldade.
 */

class QuestionGenerator {
    constructor() {
        this.countries = NATION_DATA.COUNTRIES;
        this.facts = NATION_DATA.GEOGRAPHY_FACTS;
        this.similarFlags = NATION_DATA.SIMILAR_FLAGS;
        this.continents = NATION_DATA.CONTINENTS;
        this.mapLocations = NATION_DATA.MAP_LOCATIONS;

        // Fila de controle anti-repetição de países recentes
        this.recentCountryIds = [];
        this.maxRecentMemory = 8;

        // Fila de tipos recentes para garantir variedade contínua
        this.recentTypes = [];
        this.maxRecentTypes = 4;

        // PRNG determinístico para modo Diário
        this.seed = null;
    }

    // Definir semente numérica a partir de uma string (ex: '2026-09-14')
    setSeed(seedString) {
        let hash = 0;
        for (let i = 0; i < seedString.length; i++) {
            hash = (hash << 5) - hash + seedString.charCodeAt(i);
            hash |= 0;
        }
        this.seed = Math.abs(hash);
    }

    // Número pseudo-aleatório entre 0 e 1
    random() {
        if (this.seed !== null) {
            // Algoritmo LCG simples e determinístico
            this.seed = (this.seed * 9301 + 49297) % 233280;
            return this.seed / 233280;
        }
        return Math.random();
    }

    // Embaralhar array com algoritmo Fisher-Yates usando o gerador de números aleatórios
    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(this.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Obter país aleatório excluindo os recentes
    getRandomCountry(filterFn = null) {
        let pool = this.countries.filter(c => !this.recentCountryIds.includes(c.id));
        if (filterFn) {
            pool = pool.filter(filterFn);
        }
        if (pool.length === 0) {
            // Se o pool esgotou, limpa metade da memória recente
            this.recentCountryIds.splice(0, Math.floor(this.recentCountryIds.length / 2));
            pool = filterFn ? this.countries.filter(filterFn) : this.countries;
        }
        const selected = pool[Math.floor(this.random() * pool.length)];
        this.recentCountryIds.push(selected.id);
        if (this.recentCountryIds.length > this.maxRecentMemory) {
            this.recentCountryIds.shift();
        }
        return selected;
    }

    // Obter 3 alternativas falsas do mesmo continente quando possível (para maior desafio)
    getDistractorCountries(correctCountry, count = 3, propertyExtractor = (c) => c.portugueseName) {
        const sameContinent = this.countries.filter(c => c.id !== correctCountry.id && c.continent === correctCountry.continent);
        let pool = sameContinent.length >= count ? sameContinent : this.countries.filter(c => c.id !== correctCountry.id);
        
        const shuffled = this.shuffle(pool);
        const distractors = [];
        const seenValues = new Set([propertyExtractor(correctCountry)]);

        for (const item of shuffled) {
            const val = propertyExtractor(item);
            if (val && !seenValues.has(val)) {
                seenValues.add(val);
                distractors.push(val);
                if (distractors.length === count) break;
            }
        }
        return distractors;
    }

    // Selecionar o próximo tipo de mecânica garantindo alternância contínua
    pickNextType(allowedTypes = null) {
        const allTypes = [
            "flag",
            "capital",
            "silhouette",
            "population",
            "continent",
            "map_locator",
            "fact",
            "currency",
            "language",
            "neighbors",
            "twin_flags",
            "odd_one_out"
        ];

        let candidates = allowedTypes || allTypes;
        candidates = candidates.filter(t => !this.recentTypes.includes(t));

        if (candidates.length === 0) {
            this.recentTypes = [];
            candidates = allowedTypes || allTypes;
        }

        const picked = candidates[Math.floor(this.random() * candidates.length)];
        this.recentTypes.push(picked);
        if (this.recentTypes.length > this.maxRecentTypes) {
            this.recentTypes.shift();
        }
        return picked;
    }

    // ================= GERADORES DAS 12 MECÂNICAS =================

    // 1. Bandeiras
    generateFlagQuestion() {
        const country = this.getRandomCountry();
        const distractors = this.getDistractorCountries(country, 3, c => c.portugueseName);
        const options = this.shuffle([country.portugueseName, ...distractors]);

        return {
            type: "flag",
            typeLabel: "Bandeira",
            title: "Qual país utiliza esta bandeira?",
            visualType: "flag",
            visualData: country.flag,
            country: country,
            options: options,
            correctAnswer: country.portugueseName,
            didYouKnow: country.facts[0]
        };
    }

    // 2. Capitais (Direta ou Inversa)
    generateCapitalQuestion() {
        const country = this.getRandomCountry();
        const isReverse = this.random() > 0.6;

        if (isReverse) {
            const distractors = this.getDistractorCountries(country, 3, c => c.portugueseName);
            const options = this.shuffle([country.portugueseName, ...distractors]);
            return {
                type: "capital",
                typeLabel: "Capital",
                title: `${country.capital} é a capital de qual país?`,
                visualType: "badge",
                visualData: `🏛️ ${country.capital}`,
                country: country,
                options: options,
                correctAnswer: country.portugueseName,
                didYouKnow: country.facts[0]
            };
        } else {
            const distractors = this.getDistractorCountries(country, 3, c => c.capital);
            const options = this.shuffle([country.capital, ...distractors]);
            return {
                type: "capital",
                typeLabel: "Capital",
                title: `Qual é a capital de ${country.portugueseName}?`,
                visualType: "flag",
                visualData: country.flag,
                country: country,
                options: options,
                correctAnswer: country.capital,
                didYouKnow: country.facts[0]
            };
        }
    }

    // 3. Silhuetas (Apenas países com vetor SVG de contorno)
    generateSilhouetteQuestion() {
        const country = this.getRandomCountry(c => !!c.silhouette);
        const distractors = this.getDistractorCountries(country, 3, c => c.portugueseName);
        const options = this.shuffle([country.portugueseName, ...distractors]);

        return {
            type: "silhouette",
            typeLabel: "Silhueta",
            title: "Que país possui esta silhueta territorial?",
            visualType: "silhouette",
            visualData: country.silhouette,
            country: country,
            options: options,
            correctAnswer: country.portugueseName,
            didYouKnow: country.facts[0]
        };
    }

    // 4. População (Comparativo País A vs País B)
    generatePopulationQuestion() {
        const countryA = this.getRandomCountry();
        // Escolhe país B com população significativamente diferente (diferença mínima de 15%)
        const countryB = this.getRandomCountry(c => c.id !== countryA.id && Math.abs(c.population - countryA.population) / Math.max(c.population, countryA.population) > 0.15);

        const correctCountry = countryA.population > countryB.population ? countryA : countryB;

        return {
            type: "population",
            typeLabel: "População",
            title: "Qual destes países possui a MAIOR população?",
            visualType: "versus",
            visualData: {
                countryA: { name: countryA.portugueseName, flag: countryA.flag, pop: countryA.population },
                countryB: { name: countryB.portugueseName, flag: countryB.flag, pop: countryB.population }
            },
            country: correctCountry,
            options: [countryA.portugueseName, countryB.portugueseName],
            correctAnswer: correctCountry.portugueseName,
            comparisonDetails: `${countryA.portugueseName}: ~${(countryA.population / 1e6).toFixed(1)}M hab. vs ${countryB.portugueseName}: ~${(countryB.population / 1e6).toFixed(1)}M hab.`,
            didYouKnow: `A população de ${correctCountry.portugueseName} é de aproximadamente ${(correctCountry.population / 1e6).toFixed(1)} milhões de pessoas.`
        };
    }

    // 5. Continentes
    generateContinentQuestion() {
        const country = this.getRandomCountry();
        const otherContinents = this.continents.filter(ct => ct !== country.continent);
        const distractors = this.shuffle(otherContinents).slice(0, 3);
        const options = this.shuffle([country.continent, ...distractors]);

        return {
            type: "continent",
            typeLabel: "Continente",
            title: `Em qual continente fica o país ${country.portugueseName}?`,
            visualType: "flag",
            visualData: country.flag,
            country: country,
            options: options,
            correctAnswer: country.continent,
            didYouKnow: `${country.portugueseName} localiza-se na ${country.continent}. ${country.facts[0]}`
        };
    }

    // 6. Localização no Mapa Interativo
    generateMapQuestion() {
        const keys = Object.keys(this.mapLocations);
        const targetId = keys[Math.floor(this.random() * keys.length)];
        const country = this.countries.find(c => c.id === targetId) || this.countries[0];
        const targetCoords = this.mapLocations[targetId];

        return {
            type: "map_locator",
            typeLabel: "Mapa Interativo",
            title: `Clique no mapa onde fica: ${country.portugueseName}`,
            visualType: "interactive_map",
            visualData: targetCoords,
            country: country,
            options: [], // Resolvido por clique no mapa
            correctAnswer: targetCoords,
            didYouKnow: `Coordenadas aproximadas de ${country.portugueseName}: ${country.coordinates.lat.toFixed(1)}° Lat, ${country.coordinates.lng.toFixed(1)}° Lng.`
        };
    }

    // 7. Fato Geográfico (Verdadeiro ou Falso)
    generateFactQuestion() {
        const fact = this.facts[Math.floor(this.random() * this.facts.length)];

        return {
            type: "fact",
            typeLabel: "Fato Geográfico",
            title: fact.statement,
            visualType: "statement",
            visualData: "🌍 AFIRMAÇÃO GEOGRÁFICA",
            country: null,
            options: ["Verdadeiro", "Falso"],
            correctAnswer: fact.isTrue ? "Verdadeiro" : "Falso",
            didYouKnow: fact.explanation
        };
    }

    // 8. Moeda
    generateCurrencyQuestion() {
        const country = this.getRandomCountry(c => !!c.currency);
        const distractors = this.getDistractorCountries(country, 3, c => c.currency);
        const options = this.shuffle([country.currency, ...distractors]);

        return {
            type: "currency",
            typeLabel: "Moeda",
            title: `Qual é a moeda oficial de ${country.portugueseName}?`,
            visualType: "badge",
            visualData: `${country.flag} ${country.currencySymbol || "💰"}`,
            country: country,
            options: options,
            correctAnswer: country.currency,
            didYouKnow: `A moeda de ${country.portugueseName} é o ${country.currency} (${country.currencySymbol || ''}).`
        };
    }

    // 9. Idioma
    generateLanguageQuestion() {
        const country = this.getRandomCountry(c => c.languages && c.languages.length > 0);
        const correctLang = country.languages[0];

        // Obter outros idiomas
        const allLangs = Array.from(new Set(this.countries.flatMap(c => c.languages || [])));
        const distractors = this.shuffle(allLangs.filter(l => !country.languages.includes(l))).slice(0, 3);
        const options = this.shuffle([correctLang, ...distractors]);

        return {
            type: "language",
            typeLabel: "Idioma",
            title: `Qual destes idiomas é oficial ou principal em ${country.portugueseName}?`,
            visualType: "flag",
            visualData: country.flag,
            country: country,
            options: options,
            correctAnswer: correctLang,
            didYouKnow: `Em ${country.portugueseName}, o idioma oficial é o ${country.languages.join(", ")}.`
        };
    }

    // 10. Fronteiras
    generateNeighborsQuestion() {
        const country = this.getRandomCountry(c => c.neighbors && c.neighbors.length > 0);
        const correctNeighbor = country.neighbors[Math.floor(this.random() * country.neighbors.length)];

        // Países que comprovadamente NÃO fazem fronteira
        const nonNeighbors = this.countries
            .map(c => c.portugueseName)
            .filter(name => name !== country.portugueseName && !country.neighbors.includes(name));

        const distractors = this.shuffle(nonNeighbors).slice(0, 3);
        const options = this.shuffle([correctNeighbor, ...distractors]);

        return {
            type: "neighbors",
            typeLabel: "Fronteiras",
            title: `Qual destes países faz fronteira terrestre com ${country.portugueseName}?`,
            visualType: "badge",
            visualData: `🗺️ Fronteira de ${country.flag} ${country.portugueseName}`,
            country: country,
            options: options,
            correctAnswer: correctNeighbor,
            didYouKnow: `${country.portugueseName} faz fronteira com: ${country.neighbors.slice(0, 4).join(", ")}...`
        };
    }

    // 11. Bandeiras Gêmeas / Difíceis
    generateTwinFlagsQuestion() {
        const pairData = this.similarFlags[Math.floor(this.random() * this.similarFlags.length)];
        const countryA = this.countries.find(c => c.id === pairData.pair[0]) || this.countries[0];
        const countryB = this.countries.find(c => c.id === pairData.pair[1]) || this.countries[1];

        const targetCountry = this.random() > 0.5 ? countryA : countryB;

        return {
            type: "twin_flags",
            typeLabel: "Atenção: Bandeiras Gêmeas",
            title: `Esta bandeira pertence a qual destes países?`,
            visualType: "flag",
            visualData: targetCountry.flag,
            country: targetCountry,
            options: this.shuffle([countryA.portugueseName, countryB.portugueseName]),
            correctAnswer: targetCountry.portugueseName,
            didYouKnow: pairData.explanation
        };
    }

    // 12. Qual Não Pertence (Intruso por continente)
    generateOddOneOutQuestion() {
        const continents = ["América do Sul", "Europa", "Ásia", "África"];
        const mainContinent = continents[Math.floor(this.random() * continents.length)];
        const oddContinent = continents.filter(c => c !== mainContinent)[Math.floor(this.random() * (continents.length - 1))];

        const mainCountries = this.shuffle(this.countries.filter(c => c.continent === mainContinent)).slice(0, 3);
        const oddCountry = this.shuffle(this.countries.filter(c => c.continent === oddContinent))[0];

        const allFour = this.shuffle([...mainCountries, oddCountry]);
        const options = allFour.map(c => `${c.flag} ${c.portugueseName}`);
        const correctAnswer = `${oddCountry.flag} ${oddCountry.portugueseName}`;

        return {
            type: "odd_one_out",
            typeLabel: "Qual Não Pertence?",
            title: "Qual destes países NÃO fica no mesmo continente dos outros três?",
            visualType: "badge",
            visualData: "🔍 Encontre o Intruso",
            country: oddCountry,
            options: options,
            correctAnswer: correctAnswer,
            didYouKnow: `${oddCountry.portugueseName} fica na ${oddCountry.continent}, enquanto os outros pertencem à ${mainContinent}!`
        };
    }

    // Gerador principal de próxima pergunta
    nextQuestion(forcedType = null) {
        const type = forcedType || this.pickNextType();

        switch (type) {
            case "flag": return this.generateFlagQuestion();
            case "capital": return this.generateCapitalQuestion();
            case "silhouette": return this.generateSilhouetteQuestion();
            case "population": return this.generatePopulationQuestion();
            case "continent": return this.generateContinentQuestion();
            case "map_locator": return this.generateMapQuestion();
            case "fact": return this.generateFactQuestion();
            case "currency": return this.generateCurrencyQuestion();
            case "language": return this.generateLanguageQuestion();
            case "neighbors": return this.generateNeighborsQuestion();
            case "twin_flags": return this.generateTwinFlagsQuestion();
            case "odd_one_out": return this.generateOddOneOutQuestion();
            default: return this.generateFlagQuestion();
        }
    }
}
