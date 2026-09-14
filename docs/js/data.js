/**
 * NationRush - Banco de Dados Geográfico Completo
 * Contém países, capitais, populações, moedas, idiomas, fronteiras,
 * coordenadas geográficas, fatos verificados e dados vetoriais de silhuetas.
 */

const NATION_DATA = {
    // Continentes disponíveis
    CONTINENTS: [
        "América do Sul",
        "América do Norte",
        "Europa",
        "África",
        "Ásia",
        "Oceania"
    ],

    // Banco de países (80+ países amplamente distribuídos pelo planeta)
    COUNTRIES: [
        // ================= AMÉRICA DO SUL =================
        {
            id: "BR",
            name: "Brazil",
            portugueseName: "Brasil",
            capital: "Brasília",
            continent: "América do Sul",
            population: 215300000,
            currency: "Real",
            currencySymbol: "R$",
            languages: ["Português"],
            neighbors: ["Argentina", "Bolívia", "Colômbia", "Guiana", "Paraguai", "Peru", "Suriname", "Uruguai", "Venezuela"],
            flag: "🇧🇷",
            coordinates: { lat: -14.235, lng: -51.925 },
            difficulty: 1,
            facts: [
                "O Brasil abriga cerca de 60% da Floresta Amazônica e a maior biodiversidade do planeta.",
                "Possui fronteira terrestre com quase todos os países da América do Sul, exceto Chile e Equador.",
                "Brasília foi construída em formato de avião (Plano Piloto) pelo urbanista Lúcio Costa."
            ],
            silhouette: "M 35 15 C 55 12 75 25 80 40 C 85 55 75 75 60 85 C 45 92 35 85 25 70 C 15 55 18 35 25 25 Z"
        },
        {
            id: "AR",
            name: "Argentina",
            portugueseName: "Argentina",
            capital: "Buenos Aires",
            continent: "América do Sul",
            population: 46000000,
            currency: "Peso Argentino",
            currencySymbol: "$",
            languages: ["Espanhol"],
            neighbors: ["Bolívia", "Brasil", "Chile", "Paraguai", "Uruguai"],
            flag: "🇦🇷",
            coordinates: { lat: -38.416, lng: -63.616 },
            difficulty: 1,
            facts: [
                "O pico mais alto das Américas, o Aconcágua (6.961 m), localiza-se na Argentina.",
                "A cidade de Ushuaia é considerada a cidade mais austral (ao sul) do mundo.",
                "A avenida 9 de Julho em Buenos Aires já foi considerada a mais larga do planeta."
            ],
            silhouette: "M 45 10 C 60 12 62 25 58 45 C 55 60 50 80 42 95 C 38 95 35 80 40 55 C 42 35 38 20 45 10 Z"
        },
        {
            id: "CL",
            name: "Chile",
            portugueseName: "Chile",
            capital: "Santiago",
            continent: "América do Sul",
            population: 19600000,
            currency: "Peso Chileno",
            currencySymbol: "$",
            languages: ["Espanhol"],
            neighbors: ["Argentina", "Bolívia", "Peru"],
            flag: "🇨🇱",
            coordinates: { lat: -35.675, lng: -71.543 },
            difficulty: 1,
            facts: [
                "O Chile é o país mais estreito e longo do mundo, estendendo-se por mais de 4.300 km.",
                "O Deserto do Atacama no Chile é o local não-polar mais seco da Terra.",
                "A Ilha de Páscoa, famosa pelos Moais gigantes, pertence ao Chile e fica a 3.700 km da costa."
            ],
            silhouette: "M 52 5 C 55 10 54 30 52 55 C 50 70 48 85 45 95 C 42 95 44 80 46 55 C 48 30 49 10 52 5 Z"
        },
        {
            id: "CO",
            name: "Colombia",
            portugueseName: "Colômbia",
            capital: "Bogotá",
            continent: "América do Sul",
            population: 52000000,
            currency: "Peso Colombiano",
            currencySymbol: "$",
            languages: ["Espanhol"],
            neighbors: ["Brasil", "Equador", "Panamá", "Peru", "Venezuela"],
            flag: "🇨🇴",
            coordinates: { lat: 4.570, lng: -74.297 },
            difficulty: 2,
            facts: [
                "É o único país da América do Sul banhado simultaneamente pelo Oceano Pacífico e pelo Mar do Caribe.",
                "A Colômbia é o maior produtor de esmeraldas de alta qualidade do mundo.",
                "Bogotá está situada a mais de 2.600 metros acima do nível do mar na Cordilheira dos Andes."
            ]
        },
        {
            id: "PE",
            name: "Peru",
            portugueseName: "Peru",
            capital: "Lima",
            continent: "América do Sul",
            population: 34000000,
            currency: "Sol",
            currencySymbol: "S/.",
            languages: ["Espanhol", "Quíchua"],
            neighbors: ["Bolívia", "Brasil", "Chile", "Colômbia", "Equador"],
            flag: "🇵🇪",
            coordinates: { lat: -9.190, lng: -75.015 },
            difficulty: 1,
            facts: [
                "O Peru abriga a icônica cidadela inca de Machu Picchu, no topo dos Andes.",
                "O Lago Titicaca, na fronteira entre Peru e Bolívia, é o lago navegável mais alto do mundo.",
                "Possui mais de 3.000 variedades nativas de batatas cultivadas desde a civilização inca."
            ]
        },
        {
            id: "UY",
            name: "Uruguay",
            portugueseName: "Uruguai",
            capital: "Montevidéu",
            continent: "América do Sul",
            population: 3500000,
            currency: "Peso Uruguaio",
            currencySymbol: "$",
            languages: ["Espanhol"],
            neighbors: ["Brasil", "Argentina"],
            flag: "🇺🇾",
            coordinates: { lat: -32.522, lng: -55.765 },
            difficulty: 2,
            facts: [
                "O Uruguai sediou e venceu a primeira Copa do Mundo de Futebol da história em 1930.",
                "É um dos países com maior proporção de vacas por habitante (cerca de 3,5 bovinos por pessoa).",
                "Quase 95% de sua eletricidade é gerada a partir de fontes renováveis."
            ]
        },
        {
            id: "PY",
            name: "Paraguay",
            portugueseName: "Paraguai",
            capital: "Assunção",
            continent: "América do Sul",
            population: 6800000,
            currency: "Guarani",
            currencySymbol: "₲",
            languages: ["Espanhol", "Guarani"],
            neighbors: ["Argentina", "Bolívia", "Brasil"],
            flag: "🇵🇾",
            coordinates: { lat: -23.442, lng: -58.443 },
            difficulty: 2,
            facts: [
                "A bandeira do Paraguai é a única do mundo com emblemas diferentes na frente e no verso.",
                "O guarani é falado por mais de 80% da população e é língua oficial junto com o espanhol.",
                "Divide com o Brasil a usina hidrelétrica de Itaipu, uma das maiores geradoras do mundo."
            ]
        },
        {
            id: "BO",
            name: "Bolivia",
            portugueseName: "Bolívia",
            capital: "Sucre",
            continent: "América do Sul",
            population: 12200000,
            currency: "Boliviano",
            currencySymbol: "Bs",
            languages: ["Espanhol", "Quíchua", "Aimará"],
            neighbors: ["Argentina", "Brasil", "Chile", "Paraguai", "Peru"],
            flag: "🇧🇴",
            coordinates: { lat: -16.290, lng: -63.588 },
            difficulty: 2,
            facts: [
                "A Bolívia possui duas capitais: Sucre (constitucional/judicial) e La Paz (sede do governo).",
                "O Salar de Uyuni é o maior deserto de sal do planeta, cobrindo mais de 10.000 km².",
                "Não possui litoral desde a Guerra do Pacífico no século XIX, mas mantém uma força naval em lagos e rios."
            ]
        },
        {
            id: "VE",
            name: "Venezuela",
            portugueseName: "Venezuela",
            capital: "Caracas",
            continent: "América do Sul",
            population: 28800000,
            currency: "Bolívar Soberano",
            currencySymbol: "Bs.S",
            languages: ["Espanhol"],
            neighbors: ["Brasil", "Colômbia", "Guiana"],
            flag: "🇻🇪",
            coordinates: { lat: 6.423, lng: -66.589 },
            difficulty: 2,
            facts: [
                "Abriga o Salto Ángel, a queda d'água ininterrupta mais alta do mundo com 979 metros.",
                "Possui a maior reserva comprovada de petróleo bruto do planeta.",
                "O Lago de Maracaibo é o lugar com mais raios por quilômetro quadrado na Terra (Relâmpago do Catatumbo)."
            ]
        },
        {
            id: "EC",
            name: "Ecuador",
            portugueseName: "Equador",
            capital: "Quito",
            continent: "América do Sul",
            population: 18000000,
            currency: "Dólar Americano",
            currencySymbol: "$",
            languages: ["Espanhol"],
            neighbors: ["Colômbia", "Peru"],
            flag: "🇪🇨",
            coordinates: { lat: -1.831, lng: -78.183 },
            difficulty: 2,
            facts: [
                "O cume do vulcão Chimborazo é o ponto da superfície terrestre mais próximo do Sol e do espaço.",
                "As Ilhas Galápagos pertencem ao Equador e inspiraram a teoria da evolução de Charles Darwin.",
                "Utiliza oficialmente o dólar dos Estados Unidos como moeda desde o ano 2000."
            ]
        },

        // ================= AMÉRICA DO NORTE E CENTRAL =================
        {
            id: "US",
            name: "United States",
            portugueseName: "Estados Unidos",
            capital: "Washington, D.C.",
            continent: "América do Norte",
            population: 334000000,
            currency: "Dólar Americano",
            currencySymbol: "$",
            languages: ["Inglês"],
            neighbors: ["Canadá", "México"],
            flag: "🇺🇸",
            coordinates: { lat: 37.090, lng: -95.712 },
            difficulty: 1,
            facts: [
                "O Alasca foi comprado do Império Russo em 1867 e é o maior estado americano em área.",
                "Os Estados Unidos não possuem um idioma oficial fixado em nível federal pela constituição.",
                "Possui a maior economia do mundo em Produto Interno Bruto nominal."
            ],
            silhouette: "M 15 20 L 85 20 L 88 40 L 75 60 L 60 70 L 45 70 L 30 65 L 12 40 Z"
        },
        {
            id: "CA",
            name: "Canada",
            portugueseName: "Canadá",
            capital: "Ottawa",
            continent: "América do Norte",
            population: 40000000,
            currency: "Dólar Canadense",
            currencySymbol: "C$",
            languages: ["Inglês", "Francês"],
            neighbors: ["Estados Unidos"],
            flag: "🇨🇦",
            coordinates: { lat: 56.130, lng: -106.346 },
            difficulty: 1,
            facts: [
                "O Canadá possui o maior litoral do mundo, com mais de 202.000 km de extensão.",
                "Possui mais de 60% de todos os lagos naturais de água doce do planeta.",
                "A fronteira entre Canadá e Estados Unidos é a mais longa fronteira terrestre desmilitarizada do mundo."
            ],
            silhouette: "M 15 15 C 40 10 70 12 90 20 C 85 45 75 65 60 70 C 40 68 25 55 15 35 Z"
        },
        {
            id: "MX",
            name: "Mexico",
            portugueseName: "México",
            capital: "Cidade do México",
            continent: "América do Norte",
            population: 129000000,
            currency: "Peso Mexicano",
            currencySymbol: "$",
            languages: ["Espanhol"],
            neighbors: ["Belize", "Estados Unidos", "Guatemala"],
            flag: "🇲🇽",
            coordinates: { lat: 23.634, lng: -102.552 },
            difficulty: 1,
            facts: [
                "A Cidade do México foi construída sobre as ruínas da antiga capital asteca de Tenochtitlán em um lago.",
                "O chocolate foi inventado pelos povos mesoamericanos (maias e astecas) que cultivavam o cacau.",
                "Chichén Itzá, uma das 7 Maravilhas do Mundo Moderno, está localizada na península de Yucatán."
            ]
        },
        {
            id: "CU",
            name: "Cuba",
            portugueseName: "Cuba",
            capital: "Havana",
            continent: "América do Norte",
            population: 11200000,
            currency: "Peso Cubano",
            currencySymbol: "$",
            languages: ["Espanhol"],
            neighbors: [],
            flag: "🇨🇺",
            coordinates: { lat: 21.521, lng: -77.781 },
            difficulty: 2,
            facts: [
                "Cuba é a maior ilha de todo o Mar do Caribe em extensão territorial.",
                "Possui uma das maiores taxas de médicos por habitante do planeta.",
                "É famosa pelos seus carros clássicos norte-americanos dos anos 1950 preservados nas ruas."
            ]
        },
        {
            id: "CR",
            name: "Costa Rica",
            portugueseName: "Costa Rica",
            capital: "San José",
            continent: "América do Norte",
            population: 5200000,
            currency: "Colón Costarriquenho",
            currencySymbol: "₡",
            languages: ["Espanhol"],
            neighbors: ["Nicarágua", "Panamá"],
            flag: "🇨🇷",
            coordinates: { lat: 9.748, lng: -83.753 },
            difficulty: 2,
            facts: [
                "A Costa Rica aboliu permanentemente suas Forças Armadas em 1948.",
                "Mais de 25% do seu território é composto por parques nacionais e reservas biológicas protegidas.",
                "Gera mais de 98% de sua eletricidade a partir de matrizes renováveis há vários anos."
            ]
        },
        {
            id: "PA",
            name: "Panama",
            portugueseName: "Panamá",
            capital: "Cidade do Panamá",
            continent: "América do Norte",
            population: 4400000,
            currency: "Balboa",
            currencySymbol: "B/.",
            languages: ["Espanhol"],
            neighbors: ["Colômbia", "Costa Rica"],
            flag: "🇵🇦",
            coordinates: { lat: 8.537, lng: -80.782 },
            difficulty: 2,
            facts: [
                "O Canal do Panamá conecta o Oceano Atlântico ao Oceano Pacífico, encurtando viagens em milhares de km.",
                "É o único lugar do mundo onde é possível ver o Sol nascer sobre o Pacífico e se pôr sobre o Atlântico da montanha.",
                "A moeda Balboa é pareada 1:1 com o dólar americano, que circula amplamente no país."
            ]
        },

        // ================= EUROPA =================
        {
            id: "FR",
            name: "France",
            portugueseName: "França",
            capital: "Paris",
            continent: "Europa",
            population: 68000000,
            currency: "Euro",
            currencySymbol: "€",
            languages: ["Francês"],
            neighbors: ["Alemanha", "Andorra", "Bélgica", "Espanha", "Itália", "Luxemburgo", "Mônaco", "Suíça"],
            flag: "🇫🇷",
            coordinates: { lat: 46.227, lng: 2.213 },
            difficulty: 1,
            facts: [
                "A França é o país mais visitado por turistas internacionais no mundo todo ano.",
                "Devido aos seus territórios ultramarinos, a França abrange 12 fusos horários diferentes.",
                "O Museu do Louvre em Paris é o maior museu de arte do mundo."
            ],
            silhouette: "M 30 10 L 70 15 L 85 45 L 75 80 L 40 85 L 20 50 Z"
        },
        {
            id: "DE",
            name: "Germany",
            portugueseName: "Alemanha",
            capital: "Berlim",
            continent: "Europa",
            population: 84400000,
            currency: "Euro",
            currencySymbol: "€",
            languages: ["Alemão"],
            neighbors: ["Áustria", "Bélgica", "Chéquia", "Dinamarca", "França", "Luxemburgo", "Países Baixos", "Polônia", "Suíça"],
            flag: "🇩🇪",
            coordinates: { lat: 51.165, lng: 10.451 },
            difficulty: 1,
            facts: [
                "A Alemanha faz fronteira terrestre com 9 países europeus diferentes.",
                "É o país mais populoso da União Europeia e a maior economia do continente.",
                "As famosas rodovias 'Autobahn' não possuem limite geral de velocidade em muitos trechos."
            ]
        },
        {
            id: "IT",
            name: "Italy",
            portugueseName: "Itália",
            capital: "Roma",
            continent: "Europa",
            population: 58800000,
            currency: "Euro",
            currencySymbol: "€",
            languages: ["Italiano"],
            neighbors: ["Áustria", "França", "San Marino", "Eslovênia", "Suíça", "Vaticano"],
            flag: "🇮🇹",
            coordinates: { lat: 41.871, lng: 12.567 },
            difficulty: 1,
            facts: [
                "A península itálica possui o formato inconfundível de uma bota chutando a Sicília.",
                "Contém dois países independentes encravados dentro de seu território: Vaticano e San Marino.",
                "A Itália abriga o maior número de Patrimônios Mundiais da UNESCO no planeta."
            ],
            silhouette: "M 20 20 C 40 15 65 20 70 25 C 60 40 50 55 58 75 C 65 80 62 88 50 85 C 45 80 40 70 42 60 C 35 50 25 35 20 20 Z"
        },
        {
            id: "ES",
            name: "Spain",
            portugueseName: "Espanha",
            capital: "Madri",
            continent: "Europa",
            population: 48000000,
            currency: "Euro",
            currencySymbol: "€",
            languages: ["Espanhol"],
            neighbors: ["Andorra", "França", "Portugal", "Marrocos"],
            flag: "🇪🇸",
            coordinates: { lat: 40.463, lng: -3.749 },
            difficulty: 1,
            facts: [
                "A Espanha é o maior produtor de azeite de oliva do planeta, superando a Itália e a Grécia somadas.",
                "Possui fronteira terrestre com a África através das cidades autônomas de Ceuta e Melilla.",
                "O hino nacional espanhol ('Marcha Real') é um dos poucos do mundo que não possui letra oficial."
            ]
        },
        {
            id: "PT",
            name: "Portugal",
            portugueseName: "Portugal",
            capital: "Lisboa",
            continent: "Europa",
            population: 10400000,
            currency: "Euro",
            currencySymbol: "€",
            languages: ["Português"],
            neighbors: ["Espanha"],
            flag: "🇵🇹",
            coordinates: { lat: 39.399, lng: -8.224 },
            difficulty: 1,
            facts: [
                "Portugal é uma das nações-estado com fronteiras mais antigas da Europa, definidas desde 1139.",
                "É o maior produtor mundial de cortiça, extraída do sobreiro.",
                "A Livraria Bertrand em Lisboa, fundada em 1732, é reconhecida pelo Guinness como a mais antiga em funcionamento contínuo."
            ]
        },
        {
            id: "GB",
            name: "United Kingdom",
            portugueseName: "Reino Unido",
            capital: "Londres",
            continent: "Europa",
            population: 67700000,
            currency: "Libra Esterlina",
            currencySymbol: "£",
            languages: ["Inglês"],
            neighbors: ["Irlanda"],
            flag: "🇬🇧",
            coordinates: { lat: 55.378, lng: -3.435 },
            difficulty: 1,
            facts: [
                "O Reino Unido é formado por quatro países constituintes: Inglaterra, Escócia, País de Gales e Irlanda do Norte.",
                "O metrô de Londres ('The Tube'), inaugurado em 1863, foi o primeiro sistema de metrô subterrâneo do mundo.",
                "A bandeira britânica (Union Jack) combina as cruzes dos santos patronos da Inglaterra, Escócia e Irlanda."
            ],
            silhouette: "M 45 15 C 60 20 65 35 55 50 C 65 65 55 85 45 90 C 35 85 30 65 40 50 C 35 30 40 20 45 15 Z"
        },
        {
            id: "RU",
            name: "Russia",
            portugueseName: "Rússia",
            capital: "Moscou",
            continent: "Europa",
            population: 144000000,
            currency: "Rublo Russo",
            currencySymbol: "₽",
            languages: ["Russo"],
            neighbors: ["Azerbaijão", "Bielorrússia", "China", "Estônia", "Finlândia", "Geórgia", "Cazaquistão", "Letônia", "Lituânia", "Mongólia", "Coreia do Norte", "Noruega", "Polônia", "Ucrânia"],
            flag: "🇷🇺",
            coordinates: { lat: 61.524, lng: 105.318 },
            difficulty: 1,
            facts: [
                "A Rússia é o maior país do mundo em área, cobrindo mais de um oitavo da superfície habitada da Terra.",
                "Estende-se por 11 fusos horários diferentes e é dividida pelos Montes Urais entre a Europa e a Ásia.",
                "O Lago Baikal na Sibéria contém mais de 20% de toda a água doce superficial não congelada do mundo."
            ],
            silhouette: "M 10 35 L 90 25 L 95 60 L 50 65 L 10 50 Z"
        },
        {
            id: "GR",
            name: "Greece",
            portugueseName: "Grécia",
            capital: "Atenas",
            continent: "Europa",
            population: 10400000,
            currency: "Euro",
            currencySymbol: "€",
            languages: ["Grego"],
            neighbors: ["Albânia", "Bulgária", "Macedônia do Norte", "Turquia"],
            flag: "🇬🇷",
            coordinates: { lat: 39.074, lng: 21.824 },
            difficulty: 1,
            facts: [
                "A Grécia é considerada o berço da democracia ocidental, da filosofia e dos Jogos Olímpicos.",
                "Possui mais de 6.000 ilhas e ilhotas, das quais apenas cerca de 227 são habitadas.",
                "Nenhum ponto do território grego fica a mais de 137 km da costa marítima."
            ]
        },
        {
            id: "NL",
            name: "Netherlands",
            portugueseName: "Países Baixos",
            capital: "Amsterdã",
            continent: "Europa",
            population: 17800000,
            currency: "Euro",
            currencySymbol: "€",
            languages: ["Holandês"],
            neighbors: ["Alemanha", "Bélgica"],
            flag: "🇳🇱",
            coordinates: { lat: 52.132, lng: 5.291 },
            difficulty: 2,
            facts: [
                "Cerca de um quarto de seu território fica abaixo do nível do mar, protegido por diques e pôlderes.",
                "Há mais bicicletas nos Países Baixos do que cidadãos registrados.",
                "Amsterdã é a capital oficial pela constituição, mas Haia é a sede do governo e da monarquia."
            ]
        },
        {
            id: "CH",
            name: "Switzerland",
            portugueseName: "Suíça",
            capital: "Berna",
            continent: "Europa",
            population: 8800000,
            currency: "Franco Suíço",
            currencySymbol: "CHF",
            languages: ["Alemão", "Francês", "Italiano", "Romanche"],
            neighbors: ["Alemanha", "Áustria", "França", "Itália", "Liechtenstein"],
            flag: "🇨🇭",
            coordinates: { lat: 46.818, lng: 8.227 },
            difficulty: 2,
            facts: [
                "A Suíça não possui uma capital oficial de jure; Berna é a 'cidade federal' sede do governo.",
                "Mantém política de neutralidade armada e não participa de conflitos militares internacionais desde 1815.",
                "Possui quatro línguas nacionais oficiais: alemão, francês, italiano e romanche."
            ]
        },
        {
            id: "SE",
            name: "Sweden",
            portugueseName: "Suécia",
            capital: "Estocolmo",
            continent: "Europa",
            population: 10500000,
            currency: "Coroa Sueca",
            currencySymbol: "kr",
            languages: ["Sueco"],
            neighbors: ["Finlândia", "Noruega"],
            flag: "🇸🇪",
            coordinates: { lat: 60.128, lng: 18.643 },
            difficulty: 2,
            facts: [
                "A Suécia possui mais de 260.000 ilhas, o maior número registrado para qualquer país do mundo.",
                "O Prêmio Nobel foi criado pelo químico e inventor sueco Alfred Nobel.",
                "Importa lixo de outros países europeus para alimentar suas usinas de incineração e reciclagem energética."
            ]
        },
        {
            id: "NO",
            name: "Norway",
            portugueseName: "Noruega",
            capital: "Oslo",
            continent: "Europa",
            population: 5500000,
            currency: "Coroa Norueguesa",
            currencySymbol: "kr",
            languages: ["Norueguês"],
            neighbors: ["Finlândia", "Rússia", "Suécia"],
            flag: "🇳🇴",
            coordinates: { lat: 60.472, lng: 8.468 },
            difficulty: 2,
            facts: [
                "Seus famosos fiordes foram esculpidos por geleiras maciças durante eras glaciais.",
                "É conhecida como a 'Terra do Sol da Meia-Noite', onde o sol não se põe no extremo norte no verão.",
                "Criou o maior Fundo Soberano do planeta a partir das receitas de petróleo no Mar do Norte."
            ]
        },
        {
            id: "PL",
            name: "Poland",
            portugueseName: "Polônia",
            capital: "Varsóvia",
            continent: "Europa",
            population: 37700000,
            currency: "Zloty",
            currencySymbol: "zł",
            languages: ["Polonês"],
            neighbors: ["Alemanha", "Bielorrússia", "Chéquia", "Eslováquia", "Lituânia", "Rússia", "Ucrânia"],
            flag: "🇵🇱",
            coordinates: { lat: 51.919, lng: 19.145 },
            difficulty: 2,
            facts: [
                "A astrônoma Marie Curie e o astrônomo Nicolau Copérnico nasceram na Polônia.",
                "Varsóvia foi quase 85% destruída na Segunda Guerra e minuciosamente reconstruída após o conflito.",
                "Abriga a Mina de Sal de Wieliczka, com catedrais e estátuas esculpidas inteiramente em sal subterrâneo."
            ]
        },
        {
            id: "IE",
            name: "Ireland",
            portugueseName: "Irlanda",
            capital: "Dublin",
            continent: "Europa",
            population: 5100000,
            currency: "Euro",
            currencySymbol: "€",
            languages: ["Irlandês", "Inglês"],
            neighbors: ["Reino Unido"],
            flag: "🇮🇪",
            coordinates: { lat: 53.142, lng: -7.692 },
            difficulty: 2,
            facts: [
                "Conhecida como a 'Ilha Esmeralda' devido à sua vegetação intensamente verde favorecida pelas chuvas.",
                "Não existem cobras nativas selvagens em toda a ilha da Irlanda.",
                "A harpa celta é o símbolo nacional oficial do país desde a Idade Média."
            ]
        },
        {
            id: "RO",
            name: "Romania",
            portugueseName: "Romênia",
            capital: "Bucareste",
            continent: "Europa",
            population: 19000000,
            currency: "Leu Romeno",
            currencySymbol: "lei",
            languages: ["Romeno"],
            neighbors: ["Bulgária", "Moldávia", "Sérvia", "Ucrânia", "Hungria"],
            flag: "🇷🇴",
            coordinates: { lat: 45.943, lng: 24.966 },
            difficulty: 2,
            facts: [
                "Sua bandeira tricolor é quase idêntica à do Chade (na África), variando apenas sutilmente no tom de azul.",
                "O Palácio do Parlamento em Bucareste é o edifício administrativo civil mais pesado do mundo.",
                "A região histórica da Transilvânia abriga o Castelo de Bran, ligado à lenda do Conde Drácula."
            ]
        },
        {
            id: "UA",
            name: "Ukraine",
            portugueseName: "Ucrânia",
            capital: "Kiev",
            continent: "Europa",
            population: 38000000,
            currency: "Hryvnia",
            currencySymbol: "₴",
            languages: ["Ucraniano"],
            neighbors: ["Bielorrússia", "Eslováquia", "Hungria", "Moldávia", "Polônia", "Romênia", "Rússia"],
            flag: "🇺🇦",
            coordinates: { lat: 48.379, lng: 31.165 },
            difficulty: 2,
            facts: [
                "É o segundo maior país inteiramente em território europeu após a Rússia européia.",
                "Possui um dos solos mais férteis do mundo ('chernozem'), sendo historicamente chamado de celeiro da Europa.",
                "A estação de metrô Arsenalna em Kiev é uma das mais profundas do mundo (105,5 metros sob o solo)."
            ]
        },

        // ================= ÁSIA =================
        {
            id: "JP",
            name: "Japan",
            portugueseName: "Japão",
            capital: "Tóquio",
            continent: "Ásia",
            population: 125000000,
            currency: "Iene",
            currencySymbol: "¥",
            languages: ["Japonês"],
            neighbors: [],
            flag: "🇯🇵",
            coordinates: { lat: 36.204, lng: 138.252 },
            difficulty: 1,
            facts: [
                "A Região Metropolitana de Tóquio é a área urbana mais populosa do planeta, com mais de 37 milhões de habitantes.",
                "O Japão é um arquipélago formado por mais de 6.800 ilhas, com quatro ilhas principais.",
                "Possui mais de 10% de todos os vulcões ativos da Terra, incluindo o Monte Fuji."
            ],
            silhouette: "M 20 80 C 35 70 50 60 65 40 C 75 25 80 15 85 10 C 75 25 60 45 45 65 C 30 75 22 80 20 80 Z"
        },
        {
            id: "CN",
            name: "China",
            portugueseName: "China",
            capital: "Pequim",
            continent: "Ásia",
            population: 1412000000,
            currency: "Yuan",
            currencySymbol: "¥",
            languages: ["Mandarim"],
            neighbors: ["Afeganistão", "Butão", "Cazaquistão", "Coreia do Norte", "Índia", "Laos", "Mianmar", "Mongólia", "Nepal", "Paquistão", "Quirguistão", "Rússia", "Tadjiquistão", "Vietnã"],
            flag: "🇨🇳",
            coordinates: { lat: 35.861, lng: 104.195 },
            difficulty: 1,
            facts: [
                "A Grande Muralha da China é a maior estrutura defensiva já erguida pela humanidade, com mais de 21.000 km somados.",
                "Apesar de cobrir uma área equivalente aos EUA continental, a China adota apenas um único fuso horário oficial (Horário de Pequim).",
                "Inventou a pólvora, a bússola magnética, o papel e a imprensa móvel de tipos."
            ],
            silhouette: "M 15 35 C 30 20 60 20 85 25 C 80 55 75 75 55 85 C 35 80 25 65 15 35 Z"
        },
        {
            id: "IN",
            name: "India",
            portugueseName: "Índia",
            capital: "Nova Délhi",
            continent: "Ásia",
            population: 1428000000,
            currency: "Rúpia Indiana",
            currencySymbol: "₹",
            languages: ["Hindi", "Inglês"],
            neighbors: ["Bangladesh", "Butão", "China", "Mianmar", "Nepal", "Paquistão"],
            flag: "🇮🇳",
            coordinates: { lat: 20.593, lng: 78.962 },
            difficulty: 1,
            facts: [
                "Superou recentemente a China como o país mais populoso de todo o planeta Terra.",
                "O xadrez primitivo ('Chaturanga') foi inventado na Índia durante o Império Gupta no século VI.",
                "O Taj Mahal, construído em mármore branco em Agra, é considerado uma das Sete Maravilhas do Mundo Moderno."
            ],
            silhouette: "M 45 10 C 65 15 70 35 65 55 C 60 70 50 85 45 92 C 40 85 30 70 25 55 C 20 35 25 15 45 10 Z"
        },
        {
            id: "KR",
            name: "South Korea",
            portugueseName: "Coreia do Sul",
            capital: "Seul",
            continent: "Ásia",
            population: 51700000,
            currency: "Won Sul-coreano",
            currencySymbol: "₩",
            languages: ["Coreano"],
            neighbors: ["Coreia do Norte"],
            flag: "🇰🇷",
            coordinates: { lat: 35.907, lng: 127.766 },
            difficulty: 1,
            facts: [
                "A capital Seul concentra quase metade de toda a população do país em sua região metropolitana.",
                "Possui uma das velocidades médias de conexão à internet mais rápidas e maior penetração de 5G do mundo.",
                "O alfabeto coreano (Hangul) foi criado cientificamente em 1443 pelo Rei Sejong para erradicar o analfabetismo."
            ]
        },
        {
            id: "SA",
            name: "Saudi Arabia",
            portugueseName: "Arábia Saudita",
            capital: "Riade",
            continent: "Ásia",
            population: 36000000,
            currency: "Riyal Saudita",
            currencySymbol: "﷼",
            languages: ["Árabe"],
            neighbors: ["Catar", "Emirados Árabes Unidos", "Iêmen", "Iraque", "Jordânia", "Kuwait", "Omã"],
            flag: "🇸🇦",
            coordinates: { lat: 23.885, lng: 45.079 },
            difficulty: 2,
            facts: [
                "É o maior país do mundo sem nenhum rio permanente natural em sua superfície.",
                "Abriga as duas cidades mais sagradas do Islã: Meca e Medina.",
                "O deserto de Rub' al-Khali é o maior mar contínuo de areia de todo o planeta."
            ]
        },
        {
            id: "IL",
            name: "Israel",
            portugueseName: "Israel",
            capital: "Jerusalém",
            continent: "Ásia",
            population: 9800000,
            currency: "Novo Shekel",
            currencySymbol: "₪",
            languages: ["Hebraico"],
            neighbors: ["Egito", "Jordânia", "Líbano", "Síria"],
            flag: "🇮🇱",
            coordinates: { lat: 31.046, lng: 34.851 },
            difficulty: 2,
            facts: [
                "O Mar Morto, na fronteira com a Jordânia, é o ponto em terra firme mais baixo do planeta (-430 metros).",
                "O hebraico é a única língua morta da antiguidade a ser revivida com sucesso como idioma falado cotidiano.",
                "Lidera o mundo na reciclagem e reutilização de águas residuais para a agricultura (mais de 85%)."
            ]
        },
        {
            id: "TR",
            name: "Turkey",
            portugueseName: "Turquia",
            capital: "Ancara",
            continent: "Ásia",
            population: 85000000,
            currency: "Lira Turca",
            currencySymbol: "₺",
            languages: ["Turco"],
            neighbors: ["Armênia", "Azerbaijão", "Bulgária", "Geórgia", "Grécia", "Irã", "Iraque", "Síria"],
            flag: "🇹🇷",
            coordinates: { lat: 38.963, lng: 35.243 },
            difficulty: 1,
            facts: [
                "A Turquia é transcontinental: cerca de 3% de sua área fica na Europa e 97% na Ásia (Anatólia).",
                "Istambul é a única metrópole do mundo situada simultaneamente em dois continentes diferentes.",
                "Ancara é a capital do país, embora Istambul seja a maior e mais famosa cidade."
            ]
        },
        {
            id: "TH",
            name: "Thailand",
            portugueseName: "Tailândia",
            capital: "Bangkok",
            continent: "Ásia",
            population: 71000000,
            currency: "Baht",
            currencySymbol: "฿",
            languages: ["Tailandês"],
            neighbors: ["Camboja", "Laos", "Malásia", "Mianmar"],
            flag: "🇹🇭",
            coordinates: { lat: 15.870, lng: 100.992 },
            difficulty: 2,
            facts: [
                "É o único país do Sudeste Asiático que nunca foi colonizado por potências europeias.",
                "O nome cerimonial completo de Bangkok possui 168 letras e é o nome de cidade mais longo do mundo.",
                "O elefante-branco é reverenciado como animal sagrado e símbolo da monarquia tailandesa."
            ]
        },
        {
            id: "ID",
            name: "Indonesia",
            portugueseName: "Indonésia",
            capital: "Jacarta",
            continent: "Ásia",
            population: 277000000,
            currency: "Rúpia Indonésia",
            currencySymbol: "Rp",
            languages: ["Indonésio"],
            neighbors: ["Malásia", "Papua Nova Guiné", "Timor-Leste"],
            flag: "🇮🇩",
            coordinates: { lat: -0.789, lng: 113.921 },
            difficulty: 2,
            facts: [
                "É o maior país arquipelágico do mundo, composto por mais de 17.500 ilhas espalhadas pelo equador.",
                "Possui a maior população muçulmana de qualquer nação do planeta.",
                "Sua bandeira bicolor é idêntica à de Mônaco, diferenciando-se apenas na proporção de tamanho oficial."
            ]
        },
        {
            id: "VN",
            name: "Vietnam",
            portugueseName: "Vietnã",
            capital: "Hanói",
            continent: "Ásia",
            population: 98000000,
            currency: "Dong",
            currencySymbol: "₫",
            languages: ["Vietnamita"],
            neighbors: ["Camboja", "China", "Laos"],
            flag: "🇻🇳",
            coordinates: { lat: 14.058, lng: 108.277 },
            difficulty: 2,
            facts: [
                "É o segundo maior produtor e exportador de café de todo o planeta, atrás apenas do Brasil.",
                "A Baía de Ha Long conta com milhares de ilhotas calcárias cobertas de vegetação tropical e é Patrimônio da UNESCO.",
                "Possui Son Doong, a maior caverna natural conhecida do planeta, que possui seu próprio ecossistema interno."
            ]
        },
        {
            id: "AE",
            name: "United Arab Emirates",
            portugueseName: "Emirados Árabes Unidos",
            capital: "Abu Dhabi",
            continent: "Ásia",
            population: 9500000,
            currency: "Dirham",
            currencySymbol: "د.إ",
            languages: ["Árabe"],
            neighbors: ["Omã", "Arábia Saudita"],
            flag: "🇦🇪",
            coordinates: { lat: 23.424, lng: 53.847 },
            difficulty: 2,
            facts: [
                "O Burj Khalifa em Dubai é a estrutura e edifício mais alto já construído pelo homem (828 metros).",
                "É uma federação composta por 7 emirados, sendo Abu Dhabi a capital e Dubai o centro comercial.",
                "Aproximadamente 88% da população residente nos Emirados é composta por estrangeiros de mais de 200 países."
            ]
        },

        // ================= ÁFRICA =================
        {
            id: "EG",
            name: "Egypt",
            portugueseName: "Egito",
            capital: "Cairo",
            continent: "África",
            population: 109000000,
            currency: "Libra Egípcia",
            currencySymbol: "E£",
            languages: ["Árabe"],
            neighbors: ["Israel", "Líbia", "Sudão"],
            flag: "🇪🇬",
            coordinates: { lat: 26.820, lng: 30.802 },
            difficulty: 1,
            facts: [
                "A Grande Pirâmide de Gizé é a mais antiga e a única remanescente das 7 Maravilhas do Mundo Antigo.",
                "Mais de 95% da população egípcia vive ao longo das margens férteis e do delta do Rio Nilo.",
                "O Canal de Suez, inaugurado em 1869 no Egito, liga diretamente o Mar Mediterrâneo ao Mar Vermelho."
            ],
            silhouette: "M 15 15 L 85 15 L 85 85 L 35 85 L 15 50 Z"
        },
        {
            id: "ZA",
            name: "South Africa",
            portugueseName: "África do Sul",
            capital: "Pretória",
            continent: "África",
            population: 60000000,
            currency: "Rand",
            currencySymbol: "R",
            languages: ["Zulu", "Xhosa", "Africâner", "Inglês"],
            neighbors: ["Botsuana", "Lesoto", "Moçambique", "Namíbia", "Essuatíni", "Zimbábue"],
            flag: "🇿🇦",
            coordinates: { lat: -30.559, lng: 22.937 },
            difficulty: 1,
            facts: [
                "Possui três capitais oficiais: Pretória (executiva), Cidade do Cabo (legislativa) e Bloemfontein (judiciária).",
                "O país circunda inteiramente o reino independente de Lesoto dentro de seu território.",
                "Reconhece 12 línguas oficiais em sua constituição pós-apartheid."
            ],
            silhouette: "M 20 20 C 50 15 80 20 85 45 C 80 75 60 90 35 85 C 20 70 15 45 20 20 Z"
        },
        {
            id: "NG",
            name: "Nigeria",
            portugueseName: "Nigéria",
            capital: "Abuja",
            continent: "África",
            population: 224000000,
            currency: "Naira",
            currencySymbol: "₦",
            languages: ["Inglês", "Hauçá", "Iorubá", "Ibo"],
            neighbors: ["Benin", "Camarões", "Chade", "Níger"],
            flag: "🇳🇬",
            coordinates: { lat: 9.082, lng: 8.675 },
            difficulty: 1,
            facts: [
                "A Nigéria é o país mais populoso de todo o continente africano e o 6º mais populoso do mundo.",
                "Sua indústria cinematográfica ('Nollywood') produz mais filmes por ano do que a americana Hollywood.",
                "Lagos é a maior metrópole da África subsaariana, embora a capital administrativa tenha sido transferida para Abuja em 1991."
            ]
        },
        {
            id: "MA",
            name: "Morocco",
            portugueseName: "Marrocos",
            capital: "Rabat",
            continent: "África",
            population: 37500000,
            currency: "Dirham Marroquino",
            currencySymbol: "MAD",
            languages: ["Árabe", "Berbere"],
            neighbors: ["Argélia", "Espanha", "Mauritânia"],
            flag: "🇲🇦",
            coordinates: { lat: 31.791, lng: -7.092 },
            difficulty: 2,
            facts: [
                "A Universidade de al-Qarawiyyin em Fez, fundada em 859 d.C., é a mais antiga instituição de ensino superior em operação contínua do mundo.",
                "Fica a apenas 14 km da Europa através do Estreito de Gibraltar.",
                "A famosa cidade de Casablanca é o maior centro econômico e porto do país."
            ]
        },
        {
            id: "KE",
            name: "Kenya",
            portugueseName: "Quênia",
            capital: "Nairóbi",
            continent: "África",
            population: 55000000,
            currency: "Xelim Queniano",
            currencySymbol: "KSh",
            languages: ["Suaíli", "Inglês"],
            neighbors: ["Etiópia", "Somália", "Sudão do Sul", "Tanzânia", "Uganda"],
            flag: "🇰🇪",
            coordinates: { lat: -0.023, lng: 37.906 },
            difficulty: 2,
            facts: [
                "O Vale do Rift no Quênia abriga alguns dos mais antigos fósseis de hominídeos da história da humanidade.",
                "O país é mundialmente famoso por dominar provas de corrida de longa distância e maratonas internacionais.",
                "Nairóbi é a única capital do planeta que abriga um Parque Nacional com leões e girafas a poucos quilômetros dos arranha-céus."
            ]
        },
        {
            id: "ET",
            name: "Ethiopia",
            portugueseName: "Etiópia",
            capital: "Adis Abeba",
            continent: "África",
            population: 126000000,
            currency: "Birr Etíope",
            currencySymbol: "Br",
            languages: ["Amárico"],
            neighbors: ["Djibuti", "Eritreia", "Quênia", "Somália", "Sudão", "Sudão do Sul"],
            flag: "🇪🇹",
            coordinates: { lat: 9.145, lng: 40.489 },
            difficulty: 2,
            facts: [
                "A Etiópia é uma das poucas nações da África que nunca foi colonizada por potências europeias.",
                "É o berço original do café (Coffea arabica), descoberto na região histórica de Kaffa.",
                "Utiliza seu próprio calendário tradicional, que possui 13 meses e está cerca de 7 anos atrás do calendário gregoriano."
            ]
        },
        {
            id: "MG",
            name: "Madagascar",
            portugueseName: "Madagascar",
            capital: "Antananarivo",
            continent: "África",
            population: 30000000,
            currency: "Ariary",
            currencySymbol: "Ar",
            languages: ["Malgaxe", "Francês"],
            neighbors: [],
            flag: "🇲🇬",
            coordinates: { lat: -18.766, lng: 46.869 },
            difficulty: 2,
            facts: [
                "É a 4ª maior ilha do planeta, separada da África continental há cerca de 88 milhões de anos.",
                "Mais de 90% de sua vida selvagem nativa, incluindo todos os lêmures, não existe em nenhum outro lugar da Terra.",
                "É o maior produtor e exportador mundial de baunilha natural."
            ]
        },
        {
            id: "AO",
            name: "Angola",
            portugueseName: "Angola",
            capital: "Luanda",
            continent: "África",
            population: 35500000,
            currency: "Kwanza",
            currencySymbol: "Kz",
            languages: ["Português"],
            neighbors: ["República Democrática do Congo", "Namíbia", "Zâmbia", "República do Congo"],
            flag: "🇦🇴",
            coordinates: { lat: -11.202, lng: 17.873 },
            difficulty: 2,
            facts: [
                "É o segundo maior país lusófono (de língua oficial portuguesa) do mundo em população e território.",
                "Possui um enclave territorial descontinuado ao norte, a província de Cabinda, rica em petróleo.",
                "As Quedas de Kalandula em Angola estão entre as maiores cachoeiras da África em volume de água."
            ]
        },
        {
            id: "MZ",
            name: "Mozambique",
            portugueseName: "Moçambique",
            capital: "Maputo",
            continent: "África",
            population: 33000000,
            currency: "Metical",
            currencySymbol: "MT",
            languages: ["Português"],
            neighbors: ["Malawi", "África do Sul", "Essuatíni", "Tanzânia", "Zâmbia", "Zimbábue"],
            flag: "🇲🇿",
            coordinates: { lat: -18.665, lng: 35.529 },
            difficulty: 2,
            facts: [
                "A bandeira de Moçambique é a única do mundo a estampar um fuzil de assalto moderno (AK-47) cruzado com uma enxada.",
                "O Canal de Moçambique separa o país da ilha de Madagascar por mais de 400 km de mar.",
                "O Parque Nacional da Gorongosa é um dos maiores sucessos mundiais em recuperação ecológica e de fauna pós-guerra."
            ]
        },

        // ================= OCEANIA =================
        {
            id: "AU",
            name: "Australia",
            portugueseName: "Austrália",
            capital: "Canberra",
            continent: "Oceania",
            population: 26500000,
            currency: "Dólar Australiano",
            currencySymbol: "A$",
            languages: ["Inglês"],
            neighbors: [],
            flag: "🇦🇺",
            coordinates: { lat: -25.274, lng: 133.775 },
            difficulty: 1,
            facts: [
                "Canberra foi construída como cidade planejada de compromisso após disputa acirrada entre Sydney e Melbourne.",
                "A Grande Barreira de Corais da Austrália é o maior organismo vivo do mundo, visível até do espaço sideral.",
                "Possui mais cangurus e coalas do que seres humanos em seu vasto território continental."
            ],
            silhouette: "M 20 30 C 45 20 70 20 85 35 C 80 65 65 85 45 80 C 25 75 15 50 20 30 Z"
        },
        {
            id: "NZ",
            name: "New Zealand",
            portugueseName: "Nova Zelândia",
            capital: "Wellington",
            continent: "Oceania",
            population: 5200000,
            currency: "Dólar Neozelandês",
            currencySymbol: "NZ$",
            languages: ["Inglês", "Maori"],
            neighbors: [],
            flag: "🇳🇿",
            coordinates: { lat: -40.900, lng: 174.885 },
            difficulty: 1,
            facts: [
                "A Nova Zelândia foi o primeiro país autogovernado do mundo a conceder às mulheres o direito ao voto, em 1893.",
                "Wellington é a capital nacional mais ao sul de todo o planeta Terra.",
                "Foi o cenário de filmagem das trilogias cinematográficas de 'O Senhor dos Anéis' e 'O Hobbit'."
            ]
        },
        {
            id: "FJ",
            name: "Fiji",
            portugueseName: "Fiji",
            capital: "Suva",
            continent: "Oceania",
            population: 930000,
            currency: "Dólar Fijiano",
            currencySymbol: "FJ$",
            languages: ["Inglês", "Fijiano", "Hindi"],
            neighbors: [],
            flag: "🇫🇯",
            coordinates: { lat: -17.713, lng: 178.065 },
            difficulty: 3,
            facts: [
                "O meridiano de 180° (Linha Internacional de Data original) corta exatamente o arquipélago de Fiji.",
                "O rugby de sete é quase uma religião nacional, tendo rendido as primeiras medalhas de ouro olímpicas ao país.",
                "É formado por 333 ilhas vulcânicas, das quais cerca de um terço são permanentemente habitadas."
            ]
        }
    ],

    // Desafio das Bandeiras Gêmeas / Confusas (Mecânica 11)
    SIMILAR_FLAGS: [
        {
            pair: ["RO", "TD"], // Romênia vs Chade
            names: ["Romênia", "Chade"],
            explanation: "As bandeiras de Romênia e Chade são praticamente idênticas! A única diferença técnica é que o Chade usa um tom ligeiramente mais escuro de azul índigo."
        },
        {
            pair: ["MC", "ID"], // Mônaco vs Indonésia
            names: ["Mônaco", "Indonésia"],
            explanation: "Ambas possuem duas faixas horizontais (vermelha em cima e branca embaixo). A diferença é apenas a proporção de aspecto (Mônaco é 4:5 e a Indonésia é 2:3)."
        },
        {
            pair: ["AU", "NZ"], // Austrália vs Nova Zelândia
            names: ["Austrália", "Nova Zelândia"],
            explanation: "A Austrália possui 6 estrelas brancas de 7 pontas. A Nova Zelândia possui apenas 4 estrelas, vermelhas com bordas brancas e de 5 pontas."
        },
        {
            pair: ["IE", "CI"], // Irlanda vs Costa do Marfim
            names: ["Irlanda", "Costa do Marfim"],
            explanation: "A Irlanda tem faixas verde, branca e laranja (da esquerda para a direita). A Costa do Marfim é o espelho exato: laranja, branca e verde."
        },
        {
            pair: ["NL", "LU"], // Países Baixos vs Luxemburgo
            names: ["Países Baixos", "Luxemburgo"],
            explanation: "Ambas são tricolores (vermelho, branco e azul). Luxemburgo usa um tom de azul-celeste bem mais claro e proporção mais alongada."
        },
        {
            pair: ["NO", "IS"], // Noruega vs Islândia
            names: ["Noruega", "Islândia"],
            explanation: "Ambas usam a Cruz Nórdica. A Noruega tem fundo vermelho com cruz azul contornada de branco. A Islândia inverte: fundo azul com cruz vermelha contornada de branco."
        }
    ],

    // Banco de Fatos Geográficos (Verdadeiro ou Falso - Mecânica 7)
    GEOGRAPHY_FACTS: [
        {
            statement: "O Canadá possui a maior linha costeira entre todos os países do mundo.",
            isTrue: true,
            explanation: "Verdadeiro! O litoral do Canadá soma mais de 202.000 quilômetros devido a milhares de ilhas árticas e baías."
        },
        {
            statement: "A Rússia abrange 11 fusos horários diferentes em seu território.",
            isTrue: true,
            explanation: "Verdadeiro! Indo de Kaliningrado no oeste até Kamchatka no extremo oriente, a Rússia cobre 11 fusos horários."
        },
        {
            statement: "A Austrália é tanto um país soberano quanto um continente inteiro.",
            isTrue: true,
            explanation: "Verdadeiro! A massa terrestre continental principal da Oceania forma a massa continental australiana."
        },
        {
            statement: "A capital oficial da Austrália é Sydney.",
            isTrue: false,
            explanation: "Falso! A capital da Austrália é Canberra, construída como cidade planejada entre Sydney e Melbourne."
        },
        {
            statement: "O Rio Nilo é o único rio do planeta que corre de sul para norte.",
            isTrue: false,
            explanation: "Falso! Vários rios correm de sul para norte no mundo (como o Rio Reno na Europa e o Rio Mackenzie no Canadá). A gravidade é o que dita o fluxo da altitude maior para menor."
        },
        {
            statement: "O Vaticano é o menor país soberano independente do mundo em área e população.",
            isTrue: true,
            explanation: "Verdadeiro! O Vaticano possui apenas 0,49 km² e menos de 900 habitantes, totalmente cercado por Roma."
        },
        {
            statement: "O Brasil faz fronteira terrestre com todos os países da América do Sul.",
            isTrue: false,
            explanation: "Falso! O Brasil faz fronteira com quase todos, com exceção de apenas dois: Chile e Equador."
        },
        {
            statement: "O ponto mais profundo dos oceanos da Terra é a Fossa das Marianas.",
            isTrue: true,
            explanation: "Verdadeiro! A Depressão Challenger na Fossa das Marianas atinge quase 11.000 metros de profundidade no Oceano Pacífico."
        },
        {
            statement: "A África é o continente que possui o maior número de países independentes.",
            isTrue: true,
            explanation: "Verdadeiro! O continente africano conta com 54 países soberanos reconhecidos pela ONU."
        },
        {
            statement: "O Alasca é o estado mais oriental e ocidental dos Estados Unidos simultaneamente.",
            isTrue: true,
            explanation: "Verdadeiro! Devido às Ilhas Aleutas cruzarem o meridiano de 180° (Linha Internacional de Data), o Alasca toca os dois hemisférios."
        },
        {
            statement: "A montanha mais alta do mundo medida da base no fundo do oceano até o topo é o Monte Everest.",
            isTrue: false,
            explanation: "Falso! Medido da base oceânica, o vulcão Mauna Kea no Havaí tem mais de 10.200 metros (contra 8.848 m de altitude do Everest)."
        },
        {
            statement: "O Deserto do Saara é o maior deserto do planeta Terra.",
            isTrue: false,
            explanation: "Falso! O maior deserto do mundo é a Antártica (deserto polar de gelo), seguido pelo Ártico. O Saara é o maior deserto *quente*."
        },
        {
            statement: "A cidade de Istambul, na Turquia, está situada simultaneamente na Europa e na Ásia.",
            isTrue: true,
            explanation: "Verdadeiro! O estreito de Bósforo divide a metrópole de Istambul exatamente entre os continentes europeu e asiático."
        },
        {
            statement: "A moeda oficial do Japão é o Yuan.",
            isTrue: false,
            explanation: "Falso! A moeda do Japão é o Iene (¥). O Yuan (¥) é a unidade monetária da China."
        },
        {
            statement: "A Groenlândia é a maior ilha do mundo que não é considerada um continente.",
            isTrue: true,
            explanation: "Verdadeiro! A Groenlândia possui mais de 2,1 milhões de km² e é um território autônomo da Dinamarca."
        }
    ],

    // Mapeamento de coordenadas aproximadas no mapa SVG (para o teste de mapa-múndi)
    // Coordenadas projetadas em sistema relativo X% (0-100) e Y% (0-100) na projeção equirretangular
    MAP_LOCATIONS: {
        "BR": { x: 31, y: 64, name: "Brasil" },
        "AR": { x: 28, y: 80, name: "Argentina" },
        "CL": { x: 26, y: 78, name: "Chile" },
        "US": { x: 19, y: 35, name: "Estados Unidos" },
        "CA": { x: 21, y: 22, name: "Canadá" },
        "MX": { x: 18, y: 44, name: "México" },
        "FR": { x: 48, y: 32, name: "França" },
        "DE": { x: 51, y: 29, name: "Alemanha" },
        "IT": { x: 52, y: 34, name: "Itália" },
        "ES": { x: 46, y: 36, name: "Espanha" },
        "PT": { x: 44, y: 36, name: "Portugal" },
        "GB": { x: 47, y: 27, name: "Reino Unido" },
        "RU": { x: 72, y: 22, name: "Rússia" },
        "JP": { x: 88, y: 36, name: "Japão" },
        "CN": { x: 75, y: 38, name: "China" },
        "IN": { x: 69, y: 46, name: "Índia" },
        "EG": { x: 56, y: 42, name: "Egito" },
        "ZA": { x: 54, y: 76, name: "África do Sul" },
        "AU": { x: 86, y: 73, name: "Austrália" },
        "NZ": { x: 95, y: 82, name: "Nova Zelândia" }
    }
};

// Congelar para prevenir mutações acidentais
Object.freeze(NATION_DATA);
