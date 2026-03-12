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
}
"Taxes": {
    lessons: [
        { title: "1. The Social Contract", text: "Taxes are mandatory contributions to state revenue. They fund public services like roads, schools, and emergency services.", img: "tax-basics.jpg" },
        { title: "2. Progressive vs. Regressive", text: "The US uses a progressive system: as you earn more, your tax rate increases in brackets. Regressive taxes (like sales tax) affect lower incomes more heavily.", img: "tax-brackets-chart.png" },
        { title: "3. The W-4 Form", text: "Filled out when you start a job, this tells your employer how much tax to withhold from your paycheck.", img: "w4-form.jpg" },
        { title: "4. Filing Status", text: "Your status (Single, Married Filing Jointly, Head of Household) determines your standard deduction and tax rates.", img: "filing-status.jpg" },
        { title: "5. Gross vs. Taxable Income", text: "Gross income is everything you earn. Taxable income is what's left after deductions and adjustments.", img: "income-calc.png" },
        { title: "6. Standard Deduction", text: "A flat amount the IRS allows you to subtract from your income, no questions asked, to lower your tax bill.", img: "deduction.jpg" },
        { title: "7. Itemized Deductions", text: "If your specific expenses (mortgage interest, charity) are higher than the standard deduction, you 'itemize' to save more money.", img: "itemizing.jpg" },
        { title: "8. Tax Credits", text: "Credits are more powerful than deductions. While deductions lower taxable income, credits reduce your actual tax bill dollar-for-dollar.", img: "tax-credit-vs-deduction.png" },
        { title: "9. The 1040 Form", text: "This is the main form used by individual taxpayers to file their annual income tax returns.", img: "1040-form.jpg" },
        { title: "10. Tax Deadlines", text: "April 15th is the typical 'Tax Day.' Filing an extension gives you until October, but you still must pay estimated taxes by April.", img: "calendar.jpg" }
    ],
    quiz: [
        { q: "Which form tells your employer how much to withhold?", options: ["1040", "W-4", "W-2", "1099"], correct: 1 },
        { q: "What is better: A $1,000 credit or a $1,000 deduction?", options: ["Deduction", "Credit", "They are the same", "Neither"], correct: 1 },
        { q: "Which tax system charges higher earners a higher %?", options: ["Regressive", "Flat", "Progressive", "Direct"], correct: 2 },
        { q: "When is the typical deadline to file taxes?", options: ["January 1", "April 15", "July 4", "December 31"], correct: 1 }
    ]
}
let currentSubject = "";
let currentLessonIndex = 0;

/* --- NAVIGATION --- */
function enterGarden() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';
    showPage('kanban-page');
    
    // Pip's Auto-Welcome Message
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
    target.style.display = 'block';
    target.classList.add('active');
}

/* --- LOGIC --- */
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
    document.getElementById('media-container').innerHTML = `<img src="${data.content}" style="width:100%; border-radius:8px;">`;
    document.getElementById('active-subject-display').innerText = name;
    
    updateProgress(name, index);
    showPage('lesson-page');
}

function updateProgress(name, index) {
    const total = subjectData[name].lessons.length;
    const percent = ((index + 1) / total) * 100;
    document.getElementById('progress-vine').style.width = percent + "%";
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

function startHarvest() {
    if (!currentSubject) return alert("Pick a seed in the Garden first!");
    document.getElementById('quiz-choice-screen').style.display = 'none';
    document.getElementById('quiz-mode').style.display = 'block';
    loadQuiz();
}

function loadQuiz() {
    const quiz = subjectData[currentSubject].quiz[0];
    document.getElementById('quiz-question').innerText = quiz.q;
    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = "";
    quiz.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = "journey-btn";
        btn.innerText = opt;
        btn.onclick = () => alert(i === quiz.correct ? "Correct Harvest!" : "Try again!");
        optionsDiv.appendChild(btn);
    });
}

function allow(e) { e.preventDefault(); }
function drop(e) { e.preventDefault(); }
function backToChoice() {
    document.getElementById('quiz-choice-screen').style.display = 'block';
    document.getElementById('harvest-action-area').style.display = 'none';
}

// PASTE THE askPip() FUNCTION HERE AT THE VERY BOTTOM
function askPip() {
    const input = document.getElementById('pip-input');
    const display = document.getElementById('chat-display');
    const question = input.value.trim().toLowerCase();

    if (question !== "") {
        display.innerHTML += `<p><strong>You:</strong> ${input.value}</p>`;
        
        let response = "I'm still growing! Try asking about 'help' or 'lessons'.";
        
        if (question.includes("hello") || question.includes("hi")) {
            response = "Hello! Ready to do some gardening in the Grove?";
        } else if (question.includes("help") || question.includes("study")) {
            response = currentSubject ? `We are studying ${currentSubject}. Check the definitions box for clues!` : "Pick a seed in the garden to start learning!";
        } else if (question.includes("tax")) {
            response = "Taxes are like pruning—nobody likes it, but it's part of the process!";
        } else if (question.includes("stock") || question.includes("invest")) {
    response = "The stock market is like a forest. Some trees grow fast, others slow, but the best gardeners wait for the long term!";
}

        setTimeout(() => {
            display.innerHTML += `<p style="color: #2d5a27;"><strong>Pip 🌱:</strong> ${response}</p>`;
            display.scrollTop = display.scrollHeight;
        }, 600);

        input.value = "";
        // Add this inside your askPip function's setTimeout
const pipBox = document.querySelector('.ask-pip-ad');
pipBox.classList.add('pip-active');
    }
}
function updateRank(status) {
    const badge = document.getElementById('rank-badge');
    if (status === "bloomed") {
        badge.innerText = "Master Gardener";
        badge.style.color = "#d4af37"; // Gold color
        
        const chat = document.getElementById('chat-display');
        chat.innerHTML += `<p style="color: #2d5a27;"><strong>Pip 🌱:</strong> Wow! You've reached Master Gardener status!</p>`;
    }
}

// Add this at the bottom of your JS to stop the glow when you focus
document.getElementById('pip-input').addEventListener('focus', () => {
    document.querySelector('.ask-pip-ad').classList.remove('pip-active');
});
function switchDeck(subjectKey) {
    // 1. Update the current subject
    currentSubject = subjectKey; 
    
    // 2. Refresh the flashcard with the new subject data
    loadFlashcard(); 
    
    // 3. Have Pip comment on the choice
    const chat = document.getElementById('chat-display');
    const subjectNames = {
        lifeInsurance: "Life Insurance Fundamentals",
        taxes: "The Tax Gardener's Tools",
        stocks: "Stock Market Mechanics"
    };
    
    chat.innerHTML += `<p style="color: #2d5a27;"><strong>Pip 🌱:</strong> Swapping to the ${subjectNames[subjectKey]} deck!</p>`;
    chat.scrollTop = chat.scrollHeight;
    
    // Trigger Pip's glow to show he's excited about the new deck
    document.querySelector('.ask-pip-ad').classList.add('pip-active');
}
let currentCardIndex = 0;

function loadFlashcard() {
    const data = subjectData[currentSubject];
    if (!data) return;

    // Use the lessons as flashcards for now
    const card = data.lessons[currentCardIndex];
    document.getElementById('card-front').innerText = card.title;
    document.getElementById('card-back').innerText = card.text;
    
    // Reset flip state
    document.querySelector('.flashcard').classList.remove('flipped');
}

// Add these to make the prev/next buttons work too!
function nextCard() {
    const total = subjectData[currentSubject].lessons.length;
    currentCardIndex = (currentCardIndex + 1) % total;
    loadFlashcard();
}

function prevCard() {
    const total = subjectData[currentSubject].lessons.length;
    currentCardIndex = (currentCardIndex - 1 + total) % total;
    loadFlashcard();
}
function loadFlashcard() {
    const data = subjectData[currentSubject];
    if (!data) return;

    const card = data.lessons[currentCardIndex]; // Uses lesson vocab as cards
    document.getElementById('card-front').innerText = card.title;
    document.getElementById('card-back').innerText = card.text;
    
    // Ensure the card is not flipped when loading a new one
    document.querySelector('.flashcard').classList.remove('flipped');
}

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
function updateLessonUI() {
    const lesson = subjectData[currentSubject].lessons[currentLessonIndex];
    document.getElementById('lesson-title').innerText = lesson.title;
    document.getElementById('lesson-text').innerHTML = `<p>${lesson.text}</p>`;
    
    // Injects the picture/chart
    document.getElementById('media-container').innerHTML = `<img src="${lesson.img}" style="max-width:100%; border-radius:10px;">`;
}
function updateLessonUI() {
    const lesson = subjectData[currentSubject].lessons[currentLessonIndex];
    document.getElementById('lesson-title').innerText = lesson.title;
    document.getElementById('lesson-text').innerHTML = `<p>${lesson.text}</p>`;
    
    // Injects the picture/chart
    document.getElementById('media-container').innerHTML = `<img src="${lesson.img}" style="max-width:100%; border-radius:10px;">`;
}
function showLesson(index) {
    const lesson = subjectData[currentSubject].lessons[index];
    document.getElementById('lesson-title').innerText = lesson.title;
    document.getElementById('lesson-text').innerText = lesson.text;
    
    // This part handles your charts/pictures!
    const mediaContainer = document.getElementById('media-container');
    mediaContainer.innerHTML = `<img src="${lesson.img}" alt="${lesson.title}" style="max-width:100%; border-radius:8px;">`;
}
