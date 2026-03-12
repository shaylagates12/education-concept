/* --- 1. THE CONSOLIDATED DATA GARDEN --- */
const subjectData = {
    "Stock Market": {
        lessons: [
            { title: "1. What is a Stock?", text: "A stock (or share) represents a tiny piece of ownership in a company. When you buy a share, you become a 'shareholder.'", img: "stock-cert.jpg" },
            { title: "2. The Exchange", text: "Stocks are traded on exchanges like the NYSE or NASDAQ. Think of it as a global digital farmers market for businesses.", img: "nyse-floor.jpg" },
            { title: "3. Bull vs. Bear", text: "A Bull market is charging ahead (prices rising). A Bear market is hibernating (prices falling 20% or more).", img: "bull-vs-bear.png" },
            { title: "4. Dividends", text: "Some companies pay you a 'thank you' in cash just for owning their stock. This is called a dividend.", img: "dividends.jpg" },
            { title: "5. Market Capitalization", text: "The total value of a company. It's calculated by (Price per Share) x (Total Shares).", img: "market-cap.png" },
            { title: "6. Diversification", text: "The 'Don't put all your eggs in one basket' rule. Owning different types of stocks lowers your risk.", img: "diversification-basket.jpg" },
            { title: "7. Index Funds & ETFs", text: "Instead of buying one stock, you buy a 'bundle' (like the S&P 500) that tracks the whole market at once.", img: "etf-bundle.png" },
            { title: "8. P/E Ratio", text: "Price-to-Earnings. It helps you see if a stock is 'expensive' or a 'bargain' compared to how much profit it makes.", img: "pe-ratio.jpg" },
            { title: "9. Volatility", text: "The speed and size of price changes. High volatility means the price swings wildly like a vine in a storm.", img: "volatility-graph.png" },
            { title: "10. Compound Interest", text: "The 'Eighth Wonder of the World.' Reinvesting your gains allows your money to grow exponentially over time.", img: "compounding-growth.jpg" }
        ],
        quiz: [
            { q: "What animal represents a rising market?", options: ["Bear", "Bull", "Wolf", "Eagle"], correct: 1 },
            { q: "What is a 'Dividend'?", options: ["A stock's price", "A cash payout to owners", "A type of tax", "A market crash"], correct: 1 },
            { q: "Which term describes 'spreading out' your investments?", options: ["Focusing", "Diversification", "Dividing", "Shorting"], correct: 1 },
            { q: "What does 'Market Cap' measure?", options: ["CEO Salary", "Total Company Value", "Number of Employees", "Daily Profit"], correct: 1 }
        ]
    },
    "Taxes": {
        lessons: [
            { title: "1. The Social Contract", text: "Taxes are mandatory contributions to state revenue. They fund public services like roads, schools, and emergency services.", img: "tax-basics.jpg" },
            { title: "2. Progressive vs. Regressive", text: "The US uses a progressive system: as you earn more, your tax rate increases in brackets.", img: "tax-brackets-chart.png" },
            { title: "3. The W-4 Form", text: "Filled out when you start a job, this tells your employer how much tax to withhold from your paycheck.", img: "w4-form.jpg" },
            { title: "4. Filing Status", text: "Your status (Single, Married, etc) determines your standard deduction.", img: "filing-status.jpg" },
            { title: "5. Gross vs. Taxable Income", text: "Gross income is everything you earn. Taxable income is what's left after deductions.", img: "income-calc.png" },
            { title: "6. Standard Deduction", text: "A flat amount the IRS allows you to subtract from your income to lower your tax bill.", img: "deduction.jpg" },
            { title: "7. Itemized Deductions", text: "If your specific expenses are higher than the standard deduction, you 'itemize'.", img: "itemizing.jpg" },
            { title: "8. Tax Credits", text: "Credits reduce your actual tax bill dollar-for-dollar.", img: "tax-credit-vs-deduction.png" },
            { title: "9. The 1040 Form", text: "This is the main form used by individual taxpayers to file returns.", img: "1040-form.jpg" },
            { title: "10. Tax Deadlines", text: "April 15th is the typical 'Tax Day.'", img: "calendar.jpg" }
        ],
        quiz: [
            { q: "Which form tells your employer how much to withhold?", options: ["1040", "W-4", "W-2", "1099"], correct: 1 },
            { q: "What is better: A $1,000 credit or a $1,000 deduction?", options: ["Deduction", "Credit", "They are the same", "Neither"], correct: 1 }
        ]
    },
    "Life Insurance": {
        lessons: [
            { title: "The Foundation", text: "Life insurance is a legal contract between a policyholder and an insurer.", img: "base.jpg" },
            { title: "Understanding Premiums", text: "A premium is the amount you pay... factors include age and health.", img: "premium.jpg" }
        ],
        quiz: [
            { q: "What is a premium?", options: ["A payout", "A monthly cost", "A tax break", "A contract"], correct: 1 }
        ]
    }
};

/* --- 2. GLOBAL STATE --- */
let currentSubject = "";
let currentLessonIndex = 0;
let currentCardIndex = 0;

/* --- 3. NAVIGATION & UI --- */
function enterGarden() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';
    showPage('kanban-page');
    
    const chat = document.getElementById('chat-display');
    if(chat) {
        setTimeout(() => {
            chat.innerHTML += `<p style="color: #2d5a27;"><strong>Pip 🌱:</strong> Welcome to the garden! Plant a seed in the Drawing Board to begin.</p>`;
        }, 1000);
    }
}

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => {
        p.style.display = 'none';
        p.classList.remove('active');
    });
    const target = document.getElementById(id);
    if(target) {
        target.style.display = 'block';
        target.classList.add('active');
    }
}

/* --- 4. CORE LOGIC --- */
function plantSeed() {
    const input = document.getElementById('new-subject');
    const name = input.value.trim();
    if (subjectData[name]) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerText = name;
        card.onclick = () => loadLesson(name);
        document.querySelector('#todo .zone').appendChild(card);
        input.value = "";
    } else {
        alert("Please enter: Taxes, Stock Market, or Life Insurance");
    }
}

function loadLesson(name, index = 0) {
    currentSubject = name;
    currentLessonIndex = index;
    const data = subjectData[name].lessons[index];
    
    document.getElementById('lesson-title').innerText = data.title;
    document.getElementById('lesson-text').innerText = data.text;
    document.getElementById('media-container').innerHTML = `<img src="${data.img}" style="width:100%; border-radius:8px;">`;
    
    updateProgress(name, index);
    showPage('lesson-page');
}

function updateProgress(name, index) {
    const total = subjectData[name].lessons.length;
    const percent = ((index + 1) / total) * 100;
    const vine = document.getElementById('progress-vine');
    if(vine) vine.style.width = percent + "%";
}

function nextLesson() {
    if (!currentSubject) return;
    if (currentLessonIndex < subjectData[currentSubject].lessons.length - 1) {
        currentLessonIndex++;
        loadLesson(currentSubject, currentLessonIndex);
    } else {
        showPage('quiz-page');
    }
}

/* --- 5. HARVEST (QUIZ & FLASHCARDS) --- */
function startHarvest(mode) {
    if (!currentSubject) return alert("Pick a seed in the Garden first!");
    
    document.getElementById('quiz-choice-screen').style.display = 'none';
    document.getElementById('harvest-action-area').style.display = 'block';

    if (mode === 'flashcards') {
        document.getElementById('flashcard-mode').style.display = 'block';
        document.getElementById('quiz-mode').style.display = 'none';
        loadFlashcard();
    } else {
        document.getElementById('flashcard-mode').style.display = 'none';
        document.getElementById('quiz-mode').style.display = 'block';
        loadQuiz();
    }
}

function loadQuiz() {
    const quiz = subjectData[currentSubject].quiz[0];
    document.getElementById('quiz-question').innerText = quiz.q;
    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = "";
    quiz.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = "quiz-option-btn";
        btn.innerText = opt;
        btn.onclick = () => alert(i === quiz.correct ? "Correct Harvest!" : "Try again!");
        optionsDiv.appendChild(btn);
    });
}

function loadFlashcard() {
    const data = subjectData[currentSubject];
    const card = data.lessons[currentCardIndex]; 
    document.getElementById('card-front').innerText = card.title;
    document.getElementById('card-back').innerText = card.text;
    document.querySelector('.flashcard-inner').classList.remove('flipped');
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % subjectData[currentSubject].lessons.length;
    loadFlashcard();
}

function prevCard() {
    const total = subjectData[currentSubject].lessons.length;
    currentCardIndex = (currentCardIndex - 1 + total) % total;
    loadFlashcard();
}

function backToChoice() {
    document.getElementById('quiz-choice-screen').style.display = 'block';
    document.getElementById('harvest-action-area').style.display = 'none';
}

/* --- 6. PIP CHAT --- */
function askPip() {
    const input = document.getElementById('pip-input');
    const display = document.getElementById('chat-display');
    const question = input.value.trim().toLowerCase();

    if (question !== "") {
        display.innerHTML += `<p><strong>You:</strong> ${input.value}</p>`;
        let response = "I'm still growing! Try asking about 'help' or 'lessons'.";
        
        if (question.includes("hello") || question.includes("hi")) {
            response = "Hello! Ready to do some gardening in the Grove?";
        } else if (question.includes("help")) {
            response = currentSubject ? `We are studying ${currentSubject}. Check the notes for clues!` : "Pick a seed in the garden to start!";
        }

        setTimeout(() => {
            display.innerHTML += `<p style="color: #2d5a27;"><strong>Pip 🌱:</strong> ${response}</p>`;
            display.scrollTop = display.scrollHeight;
        }, 600);

        input.value = "";
    }
}
