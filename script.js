
// 1. NAVIGATION & INITIALIZATION
window.onload = () => {
    console.log("Financial Garden Loaded.");
    const caconst subjectData = {
    "Life Insurance": {
        lessons: [
            { title: "The Policy", text: "The 'Policy' is the legal contract between the insurer and the owner.", type: "image", content: "https://via.placeholder.com/600x350?text=The+Policy", defs: ["Policy: The legal agreement."] },
            { title: "The Premium", text: "The 'Premium' is the payment you make to keep the coverage active.", type: "image", content: "https://via.placeholder.com/600x350?text=The+Premium", defs: ["Premium: The cost of insurance."] },
            { title: "The Beneficiary", text: "The 'Beneficiary' is the person who receives the money if you pass away.", type: "image", content: "https://via.placeholder.com/600x350?text=Beneficiary", defs: ["Beneficiary: Recipient of funds."] },
            { title: "Underwriting", text: "The process of assessing risk to determine your premium price.", type: "video", content: "https://www.w3schools.com/html/mov_bbb.mp4", defs: ["Underwriting: Risk assessment."] },
            { title: "The Death Benefit", text: "The total sum of money paid out by the policy.", type: "image", content: "https://via.placeholder.com/600x350?text=Death+Benefit", defs: ["Death Benefit: Payout amount."] },
            { title: "Term Length", text: "The duration for which a 'Term' policy provides coverage.", type: "image", content: "https://via.placeholder.com/600x350?text=Term+Length", defs: ["Term: A set period of time."] },
            { title: "Cash Value", text: "The savings portion of a 'Whole Life' policy that grows over time.", type: "image", content: "https://via.placeholder.com/600x350?text=Cash+Value", defs: ["Cash Value: Built-up equity."] },
            { title: "The Rider", text: "An add-on to a policy that provides extra benefits (like disability).", type: "image", content: "https://via.placeholder.com/600x350?text=The+Rider", defs: ["Rider: Optional add-on."] },
            { title: "Lapse", text: "When a policy ends because premiums were not paid.", type: "image", content: "https://via.placeholder.com/600x350?text=Lapse", defs: ["Lapse: Policy termination."] },
            { title: "Grace Period", text: "The extra time you have to pay a late premium before a lapse.", type: "video", content: "https://www.w3schools.com/html/mov_bbb.mp4", defs: ["Grace Period: Payment buffer."] }
        ],
        flashcards: [{ q: "What is a Rider?", a: "An optional add-on to a life insurance policy." }],
        quiz: [
            { q: "What is the cost of the insurance called?", options: ["Payout", "Premium", "Deduction", "Equity"], correct: 1 },
            { q: "Who receives the money from a policy?", options: ["Underwriter", "Insurer", "Beneficiary", "Agent"], correct: 2 },
            { q: "Which term describes risk assessment?", options: ["Underwriting", "Lapsing", "Riding", "Saving"], correct: 0 },
            { q: "What is the extra time given to pay called?", options: ["Premium Time", "Extension", "Grace Period", "Lapse Window"], correct: 2 }
        ]
    },
    "Taxes": {
    lessons: [
        { title: "Taxable Income", text: "Your total income minus allowable deductions. This is the 'soil' your taxes grow from.", type: "image", content: "https://via.placeholder.com/600x350?text=Taxable+Income", defs: ["Taxable Income: What you actually pay tax on."] },
        { title: "The W-2 Form", text: "A form your employer sends you that reports your annual wages and taxes withheld.", type: "image", content: "https://via.placeholder.com/600x350?text=W-2+Form", defs: ["W-2: Annual wage report."] },
        { title: "Standard Deduction", text: "A fixed dollar amount that reduces the income you're taxed on.", type: "image", content: "https://via.placeholder.com/600x350?text=Standard+Deduction", defs: ["Standard Deduction: Automatic tax break."] },
        { title: "Itemized Deductions", text: "Specific expenses (like medical bills) you list to lower your tax bill.", type: "image", content: "https://via.placeholder.com/600x350?text=Itemized", defs: ["Itemize: Listing specific expenses."] },
        { title: "Tax Credit", text: "A dollar-for-dollar reduction of your actual tax bill. Very powerful!", type: "video", content: "https://www.w3schools.com/html/mov_bbb.mp4", defs: ["Tax Credit: Direct discount on taxes."] },
        { title: "Exemption", text: "A fixed amount allowed as a deduction for yourself or dependents.", type: "image", content: "https://via.placeholder.com/600x350?text=Exemption", defs: ["Exemption: Per-person tax reduction."] },
        { title: "Capital Gains", text: "Profit made from selling an asset like a stock or a home.", type: "image", content: "https://via.placeholder.com/600x350?text=Capital+Gains", defs: ["Capital Gain: Profit from an investment."] },
        { title: "Audit", text: "An official inspection of your tax return by the IRS.", type: "image", content: "https://via.placeholder.com/600x350?text=Audit", defs: ["Audit: Tax review."] },
        { title: "FICA", text: "Taxes that fund Social Security and Medicare.", type: "image", content: "https://via.placeholder.com/600x350?text=FICA", defs: ["FICA: Federal Insurance Contributions Act."] },
        { title: "Extension", text: "Extra time granted by the IRS to file your return (usually until Oct 15).", type: "video", content: "https://www.w3schools.com/html/mov_bbb.mp4", defs: ["Extension: Filing delay."] }
    ],
    flashcards: [{ q: "Credit vs Deduction?", a: "Credits lower the tax bill; Deductions lower taxable income." }],
    quiz: [
        { q: "Which lowers your tax bill dollar-for-dollar?", options: ["Deduction", "Exemption", "Tax Credit", "Audit"], correct: 2 },
        { q: "What form reports your annual salary?", options: ["1040", "W-2", "W-4", "1099"], correct: 1 },
        { q: "What is FICA used for?", options: ["Highways", "Military", "Social Security", "Education"], correct: 2 },
        { q: "A profit from selling a stock is called:", options: ["Interest", "Dividend", "Capital Gain", "Credit"], correct: 2 }
    ]
},
    "Stock Market": {
    lessons: [
        { title: "Initial Public Offering (IPO)", text: "The first time a company sells its stock to the public.", type: "image", content: "https://via.placeholder.com/600x350?text=IPO", defs: ["IPO: Going public."] },
        { title: "Market Capitalization", text: "The total value of all a company's shares.", type: "image", content: "https://via.placeholder.com/600x350?text=Market+Cap", defs: ["Market Cap: Company size value."] },
        { title: "P/E Ratio", text: "Price-to-Earnings ratio. A way to see if a stock is overpriced.", type: "image", content: "https://via.placeholder.com/600x350?text=PE+Ratio", defs: ["P/E Ratio: Valuation tool."] },
        { title: "Dividends", text: "A portion of company profits paid back to you as a shareholder.", type: "video", content: "https://www.w3schools.com/html/mov_bbb.mp4", defs: ["Dividend: Shareholder payout."] },
        { title: "Blue Chip Stocks", text: "Stocks of large, well-established, and financially sound companies.", type: "image", content: "https://via.placeholder.com/600x350?text=Blue+Chip", defs: ["Blue Chip: Reliable, large stocks."] },
        { title: "Bear Market", text: "A period where stock prices are falling and investors are pessimistic.", type: "image", content: "https://via.placeholder.com/600x350?text=Bear+Market", defs: ["Bear Market: Falling prices."] },
        { title: "Bull Market", text: "A period where stock prices are rising and investors are optimistic.", type: "image", content: "https://via.placeholder.com/600x350?text=Bull+Market", defs: ["Bull Market: Rising prices."] },
        { title: "Portfolio Diversification", text: "The practice of spreading your investments to reduce risk.", type: "image", content: "https://via.placeholder.com/600x350?text=Diversification", defs: ["Diversification: Risk spreading."] },
        { title: "Exchange Traded Fund (ETF)", text: "A basket of stocks you can buy all at once, like a pre-made bouquet.", type: "image", content: "https://via.placeholder.com/600x350?text=ETF", defs: ["ETF: A basket of assets."] },
        { title: "Volatility", text: "The rate at which the price of a stock increases or decreases.", type: "video", content: "https://www.w3schools.com/html/mov_bbb.mp4", defs: ["Volatility: Price swings."] }
    ],
    flashcards: [{ q: "What is an IPO?", a: "The first time a company offers shares to the public." }],
    quiz: [
        { q: "What animal represents a falling market?", options: ["Bull", "Bear", "Wolf", "Eagle"], correct: 1 },
        { q: "A 'Blue Chip' company is:", options: ["New and risky", "Established and stable", "Failing", "Only in tech"], correct: 1 },
        { q: "Spreading money across many stocks is:", options: ["Compounding", "Dividending", "Diversification", "Shorting"], correct: 2 },
        { q: "The 'P' in P/E Ratio stands for:", options: ["Profit", "Price", "Principal", "Payment"], correct: 1 }
    ]
},
"Finances": {
    lessons: [
        { title: "Net Worth", text: "Your total assets minus your total liabilities (what you own minus what you owe).", type: "image", content: "https://via.placeholder.com/600x350?text=Net+Worth", defs: ["Net Worth: Your financial value."] },
        { title: "Compound Interest", text: "Interest earned on both the principal and the interest already accumulated.", type: "image", content: "https://via.placeholder.com/600x350?text=Compound", defs: ["Compound: Growth on growth."] },
        { title: "Emergency Fund", text: "Money set aside for unexpected expenses like car repairs or medical bills.", type: "image", content: "https://via.placeholder.com/600x350?text=Emergency", defs: ["Emergency Fund: Safety cash."] },
        { title: "Credit Score", text: "A number representing your creditworthiness (how likely you are to pay back a loan).", type: "video", content: "https://www.w3schools.com/html/mov_bbb.mp4", defs: ["Credit Score: Loan-worthiness."] },
        { title: "401(k)", text: "A retirement savings plan sponsored by an employer.", type: "image", content: "https://via.placeholder.com/600x350?text=401k", defs: ["401k: Employer retirement plan."] },
        { title: "IRA", text: "Individual Retirement Account. A tax-advantaged account for retirement.", type: "image", content: "https://via.placeholder.com/600x350?text=IRA", defs: ["IRA: Personal retirement account."] },
        { title: "Inflation", text: "The rate at which the general level of prices for goods and services is rising.", type: "image", content: "https://via.placeholder.com/600x350?text=Inflation", defs: ["Inflation: Purchasing power loss."] },
        { title: "Liquidity", text: "How quickly an asset can be converted into cash without losing value.", type: "image", content: "https://via.placeholder.com/600x350?text=Liquidity", defs: ["Liquidity: Access to cash."] },
        { title: "Fixed vs. Variable Expenses", text: "Fixed (Rent) stays the same; Variable (Groceries) changes monthly.", type: "image", content: "https://via.placeholder.com/600x350?text=Expenses", defs: ["Fixed: Constant cost.", "Variable: Changing cost."] },
        { title: "APY", text: "Annual Percentage Yield. The actual rate of return on your savings including compounding.", type: "video", content: "https://www.w3schools.com/html/mov_bbb.mp4", defs: ["APY: Real savings return."] }
    ],
    flashcards: [{ q: "What is Net Worth?", a: "Total assets minus total liabilities." }],
    quiz: [
        { q: "Which interest type grows your money fastest?", options: ["Simple", "Compound", "Fixed", "None"], correct: 1 },
        { q: "Rent is usually what kind of expense?", options: ["Variable", "Fixed", "Discretionary", "Sudden"], correct: 1 },
        { q: "What is the safety cash for surprises called?", options: ["Retirement", "Emergency Fund", "Asset", "Dividend"], correct: 1 },
        { q: "What does APY measure?", options: ["Credit Score", "Investment Risk", "Savings Return", "Tax Rate"], correct: 2 }
    ]
}
};rd = document.querySelector('.flashcard');
    if(card) {
        card.onclick = () => card.classList.toggle('flipped');
    }
};

function enterGarden() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';
}

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// 2. KANBAN (PLANTING SEEDS)
function plantSeed() {
    const input = document.getElementById('new-subject');
    const name = input.value.trim();
    
    if (!name || !subjectData[name]) {
        alert("Please enter a valid subject: Life Insurance, Taxes, Stock Market, or Finances.");
        return;
    }

    const card = document.createElement('div');
    card.className = 'card';
    card.id = 'card-' + Date.now();
    card.textContent = name;
    card.draggable = true;
    card.onclick = () => loadLesson(name);
    card.ondragstart = (e) => e.dataTransfer.setData("text", e.target.id);

    document.querySelector('#todo .zone').appendChild(card);
    input.value = "";
}

function allow(e) { e.preventDefault(); }

function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const draggedCard = document.getElementById(id);
    let targetZone = e.target;
    if (!targetZone.classList.contains('zone')) {
        targetZone = targetZone.closest('.col').querySelector('.zone');
    }
    targetZone.appendChild(draggedCard);
}

// 3. LESSON & PROGRESS ENGINE
function loadLesson(name, index = 0) {
    saveNotes(); 
    currentSubject = name;
    currentLessonIndex = index;
    
    const subject = subjectData[name];
    if (!subject) return;
    const data = subject.lessons[index];

    document.getElementById('lesson-title').innerText = data.title;
    document.getElementById('lesson-text').innerText = data.text;
    const mc = document.getElementById('media-container');
    mc.innerHTML = data.type === "video" 
        ? `<video controls width="100%"><source src="${data.content}" type="video/mp4"></video>` 
        : `<img src="${data.content}" style="width:100%">`;

    const dl = document.getElementById('definitions-list');
    dl.innerHTML = "";
    data.defs.forEach(d => dl.innerHTML += `<li>${d}</li>`);

    updateProgress(name, index);
    loadNotes(name);
    loadHarvest(name); 
    showPage('lesson-page');
}

function updateProgress(name, index) {
    const subject = subjectData[name];
    if (!subject) return;

    const progressPercent = ((index + 1) / subject.lessons.length) * 100;
    const vine = document.getElementById('progress-vine');
    const leaf = document.querySelector('.vine-leaf');
    
    if (vine && leaf) {
        vine.style.width = progressPercent + "%";
        leaf.style.left = `calc(${progressPercent}% - 12px)`;
    }
}

let currentQuizIndex = 0; // Tracks which question we are on

function loadHarvest(name) {
    const data = subjectData[name];
    const cardContainer = document.querySelector('.flashcard');
    const front = document.getElementById('card-front');
    const back = document.getElementById('card-back');

    if (!data || !data.flashcards) return;

    // 1. Reset classes and apply the specific deck theme
    cardContainer.className = 'flashcard'; 
    if (name === "Life Insurance") cardContainer.classList.add('deck-life-insurance');
    else if (name === "Taxes") cardContainer.classList.add('deck-taxes');
    else if (name === "Stock Market") cardContainer.classList.add('deck-stocks');
    else cardContainer.classList.add('deck-finances');

    // 2. Insert an 'art-overlay' div so the CSS can tint the background image
    front.innerHTML = `<div class="art-overlay"></div><h3>${data.flashcards[0].q}</h3>`;
    back.innerHTML = `<h4>Definition:</h4><p>${data.flashcards[0].a}</p>`;

    // Reset and start the 4-question quiz
    currentQuizIndex = 0; 
    displayQuizQuestion(name);
}
    // --- QUIZ LOGIC ---
    currentQuizIndex = 0; // Reset to question 1
    displayQuizQuestion(name);
}

function displayQuizQuestion(name) {
    const quiz = subjectData[name].quiz[currentQuizIndex];
    const qTitle = document.getElementById('quiz-question');
    const optionsContainer = document.getElementById('quiz-options');

    qTitle.innerText = `Step ${currentQuizIndex + 1} of 4: ${quiz.q}`;
    optionsContainer.innerHTML = "";

    quiz.options.forEach((opt, i) => {
        optionsContainer.innerHTML += `<button class="journey-btn" onclick="checkQuiz(${i}, ${quiz.correct})">${opt}</button>`;
    });
}

function checkQuiz(choice, correct) {
    if (choice === correct) {
        currentQuizIndex++; // Move to next question
        const total = subjectData[currentSubject].quiz.length;

        if (currentQuizIndex < total) {
            alert("Correct! The garden grows taller...");
            displayQuizQuestion(currentSubject);
        } else {
            alert("Mastery! You have harvested all the knowledge in this subject.");
        }
    } else {
        alert("A weed in the garden! Review the lessons and try again.");
        currentQuizIndex = 0; // Optional: Reset to start on wrong answer
        displayQuizQuestion(currentSubject);
    }
}

// 5. NOTES & PIP
function saveNotes() {
    if (currentSubject) {
        const notes = document.getElementById('field-notes').value;
        localStorage.setItem(`notes_${currentSubject}`, notes);
    }
}

function loadNotes(subjectName) {
    const savedNotes = localStorage.getItem(`notes_${subjectName}`);
    document.getElementById('field-notes').value = savedNotes || "";
}

function askPip() {
    const input = document.getElementById('pip-input');
    const chat = document.getElementById('chat-display');
    if(!input.value) return;
    chat.innerHTML += `<p><strong>You:</strong> ${input.value}</p>`;
    setTimeout(() => { 
        chat.innerHTML += `<p><em>Pip:</em> Your interest in ${currentSubject} is inspiring! Keep growing.</p>`; 
    }, 600);
    input.value = "";
}

function nextLesson() {
    const subject = subjectData[currentSubject];
    if (currentLessonIndex < subject.lessons.length - 1) {
        loadLesson(currentSubject, currentLessonIndex + 1);
    } else {
        alert("End of the branch! You've mastered this subject.");
    }
}
