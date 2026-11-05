const questions = [
    {
        era: "🏹 Ежелгі Қазақстан — Сақтар",
        image: "ancient.jpg",
        question: "Сақтардың әйгілі тарихи ескерткіші қалай аталады?",
        answers: [
            "Алтын адам",
            "Бәйтерек",
            "Тайқазан",
            "Ақорда"
        ],
        correct: 0,
        fact: "📜 Алтын адам 1969–1970 жылдары Алматы облысындағы Есік қорғанынан табылды. Оның киімінде мыңдаған алтын әшекей болғандықтан, ол Қазақстанның маңызды тарихи символдарының біріне айналды."
    },

    {
        era: "🐺 Түркі дәуірі",
        image: "turkic.jpg",
        question: "Бірінші Түрік қағанаты қай жылы құрылды?",
        answers: [
            "1219 жылы",
            "552 жылы",
            "1465 жылы",
            "1991 жылы"
        ],
        correct: 1,
        fact: "📜 Бірінші Түрік қағанаты 552 жылы құрылды. Бұл мемлекет түркі халықтарының тарихында маңызды орын алады және көптеген түркі тайпаларын біріктірген ірі мемлекеттердің бірі болды."
    },

    {
        era: "🏰 Алтын Орда",
        image: "horde.jpg",
        question: "Алтын Орданың негізін қалаған кім?",
        answers: [
            "Абылай хан",
            "Керей хан",
            "Батый хан",
            "Тәуке хан"
        ],
        correct: 2,
        fact: "📜 Алтын Орданың негізін Жошы ханның ұлы Батый хан қалады. XIII ғасырда Алтын Орда Еуразиядағы ең ірі мемлекеттердің біріне айналып, Қазақстан тарихына үлкен әсер етті."
    },

    {
        era: "👑 Қазақ хандығы",
        image: "khanate.jpg",
        question: "Қазақ хандығын құрған хандар кімдер?",
        answers: [
            "Абылай мен Тәуке",
            "Керей мен Жәнібек",
            "Шыңғыс хан мен Батый",
            "Қасым мен Есім"
        ],
        correct: 1,
        fact: "📜 Қазақ хандығы XV ғасырда Керей мен Жәнібек хандардың басшылығымен құрылды. Бұл оқиға қазақ халқының ұлттық мемлекеттілігінің қалыптасуындағы маңызды кезеңдердің бірі болды."
    },

    {
        era: "🇰🇿 Тәуелсіз Қазақстан",
        image: "independence.jpg",
        question: "Қазақстан тәуелсіздігін қай жылы жариялады?",
        answers: [
            "1986 жылы",
            "2000 жылы",
            "1945 жылы",
            "1991 жылы"
        ],
        correct: 3,
        fact: "📜 Қазақстан 1991 жылғы 16 желтоқсанда тәуелсіздігін жариялады. Бұл күн Қазақстан Республикасының Тәуелсіздік күні ретінде тарихта ерекше орын алады."
    }
];

let currentQuestion = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");

const eraElement = document.getElementById("era");
const scoreElement = document.getElementById("score");

const progressBar = document.getElementById("progress-bar");
const eraImage = document.getElementById("era-image");

const questionNumber = document.getElementById("question-number");
const totalQuestions = document.getElementById("total-questions");

totalQuestions.textContent = questions.length;

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

function startGame() {
    currentQuestion = 0;
    score = 0;

    startScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    gameScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    const current = questions[currentQuestion];

    eraElement.textContent = current.era;
    questionElement.textContent = current.question;
    eraImage.src = current.image;

    questionNumber.textContent = currentQuestion + 1;
    scoreElement.textContent = "⭐ Ұпай: " + score;

    answersElement.innerHTML = "";

    current.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer-btn");

        button.addEventListener("click", function () {
            checkAnswer(index);
        });

        answersElement.appendChild(button);
    });

    const progress = (currentQuestion / questions.length) * 100;
    progressBar.style.width = progress + "%";
}

function checkAnswer(selectedIndex) {
    const current = questions[currentQuestion];
    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(function (button) {
        button.disabled = true;
    });

    if (selectedIndex === current.correct) {
        score++;

        buttons[selectedIndex].classList.add("correct");

        setTimeout(function () {
            nextQuestion();
        }, 1000);

    } else {
        buttons[selectedIndex].classList.add("wrong");
        buttons[current.correct].classList.add("correct");

        setTimeout(function () {
            showFact(current);
        }, 1200);
    }

    scoreElement.textContent = "⭐ Ұпай: " + score;
}

function showFact(current) {
    answersElement.innerHTML = `
        <div class="fact-card">
            <div class="fact-icon">📜</div>

            <h3>Қызықты тарихи факт</h3>

            <p>${current.fact}</p>

            <button id="next-btn">
                Келесі сұрақ →
            </button>
        </div>
    `;

    document
        .getElementById("next-btn")
        .addEventListener("click", nextQuestion);
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    gameScreen.classList.remove("active");
    resultScreen.classList.add("active");

    progressBar.style.width = "100%";

    document.getElementById("final-score").textContent =
        "Нәтижеңіз: " + score + " / " + questions.length;

    const message = document.getElementById("result-message");

    if (score === 5) {
        message.textContent =
            "КЕРЕМЕТ! Сіз Қазақстан тарихының нағыз білгірісіз! 🇰🇿🏆";

        createConfetti();

    } else if (score >= 3) {
        message.textContent =
            "Өте жақсы нәтиже! Қазақстан тарихы туралы біліміңіз жақсы! 🇰🇿";

    } else {
        message.textContent =
            "Жақсы әрекет! Қайта саяхат жасап, біліміңізді арттырыңыз! 🕰️";
    }
}

function createConfetti() {
    const container = document.getElementById("confetti-container");

    container.innerHTML = "";

    const colors = [
        "#f2ca6a",
        "#ffffff",
        "#c99b4a",
        "#8f6428",
        "#5fa8d3"
    ];

    for (let i = 0; i < 120; i++) {
        const confetti = document.createElement("div");

        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.animationDelay =
            Math.random() * 1 + "s";

        container.appendChild(confetti);
    }
}
