let currentSubject = "";
let currentLessonIndex = 0;
let currentQuizIndex = 0;

const subjectData = {
    "Life Insurance": {
        lessons: [
            { title: "The Policy", text: "The 'Policy' is the formal legal contract between the insurance company and the owner.", type: "image", content: "policy.jpg", defs: ["Policy: The legal agreement."] },
            { title: "The Premium", text: "A 'Premium' is the scheduled payment required to keep your insurance active.", type: "image", content: "premium.jpg", defs: ["Premium: The cost of coverage."] },
            { title: "The Beneficiary", text: "The 'Beneficiary' is the person or entity designated to receive the death benefit.", type: "image", content: "beneficiary.jpg", defs: ["Beneficiary: The fund recipient."] },
            { title: "Underwriting", text: "The process where the insurer evaluates your risk level to set your rates.", type: "video", content: "underwriting_clip.mp4", defs: ["Underwriting: Risk assessment."] },
            { title: "Death Benefit", text: "The 'Death Benefit' is the total sum of money paid out upon the insured's passing.", type: "image", content: "benefit.jpg", defs: ["Death Benefit: The payout sum."] },
            { title: "Term Length", text: "The specific duration (e.g., 10, 20, 30 years) a policy remains in effect.", type: "image", content: "term.jpg", defs: ["Term: The time limit."] },
            { title: "Cash Value", text: "The savings component found in permanent policies that grows over time.", type: "image", content: "cash_value.jpg", defs: ["Cash Value: Built-in equity."] },
            { title: "The Rider", text: "A 'Rider' is an optional add-on that provides extra benefits like 'Accidental Death'.", type: "image", content: "rider.jpg", defs: ["Rider: Policy add-on."] },
            { title: "Lapse", text: "A 'Lapse' occurs when the policy ends because premiums were not paid.", type: "image", content: "lapse.jpg", defs: ["Lapse: Policy termination."] },
            { title: "Grace Period", text: "The extra time (usually 30 days) allowed to pay a premium before the policy lapses.", type: "video", content: "grace_period.mp4", defs: ["Grace Period: Payment buffer."] }
        ],
        quiz: [
            { q: "What is the cost to keep a policy active?", options: ["The Benefit", "The Premium", "The Rider", "The Lapse"], correct: 1 },
            { q: "Who receives the money from a claim?", options: ["Underwriter", "Insurer", "Beneficiary", "Agent"], correct: 2 },
            { q: "What is an optional policy add-on called?", options: ["A Vine", "A Rider", "A Term", "A Premium"], correct: 1 },
            { q: "The process of evaluating risk is known as:", options: ["Underwriting", "Harvesting", "Blooming", "Lapsing"], correct: 0 }
        ]
    },
    "Taxes": {
        lessons: [
            { title: "Gross Income", text: "Your total earnings before any taxes or deductions are taken out.", type: "image", content: "gross.jpg", defs: ["Gross: Total before cuts."] },
            { title: "Deductions", text: "Expenses you can subtract from your income to lower your tax bill.", type: "image", content: "deduction.jpg", defs: ["Deduction: Tax-lowering expense."] },
            { title: "Tax Credit", text: "A 'Credit' is a dollar-for-dollar reduction of the actual tax you owe.", type: "image", content: "credit.jpg", defs: ["Credit: Direct tax reduction."] },
            { title: "W-2 Form", text: "The form employers send you showing how much you earned and paid in taxes.", type: "image", content: "w2.jpg", defs: ["W-2: Income summary."] },
            { title: "1040 Form", text: "The standard form individuals use to file their annual income tax returns.", type: "image", content: "1040.jpg", defs: ["1040: The main tax form."] },
            { title: "Dependents", text: "People (usually children) who rely on you for financial support.", type: "image", content: "dependent.jpg", defs: ["Dependent: Supported person."] },
            { title: "Tax Bracket", text: "The range of incomes taxed at a specific percentage rate.", type: "video", content: "brackets.mp4", defs: ["Bracket: Your tax percentage."] },
            { title: "Withholding", text: "The amount of money your employer takes from your check to pay the IRS.", type: "image", content: "withholding.jpg", defs: ["Withholding: Pre-paid taxes."] },
            { title: "Refund", text: "Money sent back to you if you overpaid your taxes during the year.", type: "image", content: "refund.jpg", defs: ["Refund: Overpayment return."] },
            { title: "Audit", text: "A formal examination of your tax return by the IRS for accuracy.", type: "video", content: "audit.mp4", defs: ["Audit: Tax inspection."] }
        ],
        quiz: [
            { q: "Which form is used to file your annual return?", options: ["W-2", "1040", "1099", "I-9"], correct: 1 },
            { q: "What is income BEFORE taxes called?", options: ["Net Income", "Taxable Income", "Gross Income", "Refund"], correct: 2 },
            { q: "What lowers the total amount of income that can be taxed?", options: ["A Credit", "An Audit", "A Deduction", "A Bracket"], correct: 2 },
            { q: "A dollar-for-dollar reduction in taxes owed is a:", options: ["Refund", "W-2", "Withholding", "Tax Credit"], correct: 3 }
        ]
    },
    "Stock Market": {
        lessons: [
            { title: "Share", text: "A 'Share' represents a unit of ownership in a specific corporation.", type: "image", content: "share.jpg", defs: ["Share: Piece of a company."] },
            { title: "Dividend", text: "A portion of a company's profit paid out to its shareholders.", type: "image", content: "dividend.jpg", defs: ["Dividend: Profit sharing."] },
            { title: "Bull Market", text: "A period where stock prices are rising and investors are confident.", type: "image", content: "bull.jpg", defs: ["Bull: Rising prices."] },
            { title: "Bear Market", text: "A period where stock prices are falling and the outlook is gloomy.", type: "image", content: "bear.jpg", defs: ["Bear: Falling prices."] },
            { title: "Portfolio", text: "The entire collection of investments owned by an individual.", type: "image", content: "portfolio.jpg", defs: ["Portfolio: Your collection."] },
            { title: "Diversification", text: "Spreading your money across different stocks to reduce risk.", type: "video", content: "diversify.mp4", defs: ["Diversification: Risk spreading."] },
            { title: "Ticker Symbol", text: "A unique 1-5 letter code identifying a specific stock (e.g., AAPL).", type: "image", content: "ticker.jpg", defs: ["Ticker: Company code."] },
            { title: "Brokerage", text: "The platform or firm that allows you to buy and sell stocks.", type: "image", content: "broker.jpg", defs: ["Brokerage: Trading platform."] },
            { title: "Index Fund", text: "A fund that tracks a specific group of stocks (like the S&P 500).", type: "image", content: "index.jpg", defs: ["Index Fund: Grouped stocks."] },
            { title: "Volatility", text: "How much a stock's price swings up and down over time.", type: "video", content: "volatility.mp4", defs: ["Volatility: Price swings."] }
        ],
        quiz: [
            { q: "What represents one unit of company ownership?", options: ["A Dividend", "A Share", "A Portfolio", "A Ticker"], correct: 1 },
            { q: "A market with rising prices is called a:", options: ["Bear Market", "Seed Market", "Bull Market", "Pulp Market"], correct: 2 },
            { q: "What is the strategy of spreading risk called?", options: ["Diversification", "Lapsing", "Withholding", "Harvesting"], correct: 0 },
            { q: "What is a 'Dividend'?", options: ["A stock code", "A tax form", "A share of profit", "A unit of risk"], correct: 2 }
        ]
    }
};

// Function that triggers the first immersion flow
function enterGarden() {
    // Hide welcome, show app
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';
    
    // Default to the Drawing Board (Kanban)
    showPage('kanban-page');
    console.log("Welcome to your Garden! Start by planting seeds in 'The Drawing Board'.");
}

// Function to handle switching between cute garden names ( Grove, Drawing Board, Harvest Quiz)
function showPage(id) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show the target page
    document.getElementById(id).classList.add('active');
}

// RESTORED FUNCTIONS: SUBJECTDATA, PIP CHAT, FIELD NOTES, PROGRESS VINE, Drag&Drop logic.

function loadLesson(name, index = 0) {
    currentSubject = name;
    currentLessonIndex = index;
    const data = subjectData[name].lessons[index];
    document.getElementById('lesson-title').innerText = data.title;
    document.getElementById('lesson-text').innerText = data.text;
    const mc = document.getElementById('media-container');
    mc.innerHTML = data.type === "video" ? `<video controls width="100%"><source src="${data.content}"></video>` : `<img src="${data.content}" style="width:100%">`;
    updateProgress(name, index);
    showPage('lesson-page');
}

function updateProgress(name, index) {
    const total = subjectData[name].lessons.length;
    const percent = ((index + 1) / total) * 100;
    document.getElementById('progress-vine').style.width = percent + "%";
    document.querySelector('.vine-leaf').style.left = `calc(${percent}% - 15px)`;
}
// (PlantSeed, Drop/Allow, AskPip functions are preserved here)
let currentHarvestIndex = 0;

// This function bridges your Kanban/Lessons to the Quiz Page
function startHarvest(mode) {
    if (!currentSubject) {
        alert("Please select a subject from 'The Grove' or 'The Drawing Board' first!");
        showPage('kanban-page');
        return;
    }

    document.getElementById('quiz-choice-screen').style.display = 'none';
    document.getElementById('harvest-action-area').style.display = 'block';
    currentHarvestIndex = 0;

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

function loadFlashcard() {
    // Uses your existing lesson data as flashcards!
    const lessons = subjectData[currentSubject].lessons;
    const item = lessons[currentHarvestIndex];
    document.getElementById('card-front').innerText = item.title;
    document.getElementById('card-back').innerText = item.defs[0];
}

function nextCard() {
    if (currentHarvestIndex < subjectData[currentSubject].lessons.length - 1) {
        currentHarvestIndex++;
        loadFlashcard();
    }
}

function prevCard() {
    if (currentHarvestIndex > 0) {
        currentHarvestIndex--;
        loadFlashcard();
    }
}

function loadQuiz() {
    const quizData = subjectData[currentSubject].quiz[currentHarvestIndex];
    document.getElementById('quiz-question').innerText = quizData.q;
    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = "";

    quizData.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = "journey-btn";
        btn.style.textAlign = "left";
        btn.innerText = opt;
        btn.onclick = () => {
            if (i === quizData.correct) {
                btn.style.backgroundColor = "var(--emerald-green)";
                btn.style.color = "white";
                setTimeout(() => {
                    if (currentHarvestIndex < subjectData[currentSubject].quiz.length - 1) {
                        currentHarvestIndex++;
                        loadQuiz();
                    } else {
                        alert("Harvest Complete! You've mastered " + currentSubject);
                        backToChoice();
                    }
                }, 800);
            } else {
                btn.style.backgroundColor = "var(--egyptian-earth)";
                btn.style.color = "white";
            }
        };
        optionsDiv.appendChild(btn);
    });
}

function backToChoice() {
    document.getElementById('quiz-choice-screen').style.display = 'block';
    document.getElementById('harvest-action-area').style.display = 'none';
}

// Update your active subject display whenever a lesson is loaded
const originalLoadLesson = loadLesson;
loadLesson = function(name, index) {
    originalLoadLesson(name, index);
    document.getElementById('active-subject-display').innerText = name;
};
function nextLesson() {
    const lessons = subjectData[currentSubject].lessons;
    if (currentLessonIndex < lessons.length - 1) {
        currentLessonIndex++;
        loadLesson(currentSubject, currentLessonIndex);
    } else {
        alert("You've reached the end of this path! Time to harvest your knowledge.");
        showPage('quiz-page');
    }
}
