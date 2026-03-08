const subjectData = {
    "Life Insurance": {
        lessons: [
            { 
                title: "The Safety Net", 
                text: "Life insurance provides a financial payout to beneficiaries upon the death of the insured. It is the foundation of a protective financial plan.", 
                type: "image", 
                content: "https://via.placeholder.com/600x350?text=Life+Insurance+Basics", 
                defs: ["Policy: The contract.", "Premium: The cost."] 
            },
            { 
                title: "Term vs. Whole Life", 
                text: "Term insurance covers you for a specific period (e.g., 20 years), while Whole Life is permanent and can build cash value.", 
                type: "image", 
                content: "https://via.placeholder.com/600x350?text=Term+vs+Whole+Comparison", 
                defs: ["Cash Value: An investment component.", "Term: The duration."] 
            }
        ],
        flashcards: [{ q: "What is a 'Beneficiary'?", a: "The person or entity designated to receive the death benefit." }],
        quiz: [{ q: "Which policy builds cash value?", options: ["Term Life", "Whole Life"], correct: 1 }]
    },
    "Taxes": {
        lessons: [
            { 
                title: "Tax Brackets 101", 
                text: "The US uses a progressive tax system. You only pay higher rates on the dollars within that specific bracket.", 
                type: "image", 
                content: "https://via.placeholder.com/600x350?text=Tax+Bracket+Flow", 
                defs: ["Progressive Tax: Higher income = higher rate.", "Marginal Rate: The tax on your last dollar."] 
            },
            { 
                title: "Deductions & Credits", 
                text: "Deductions lower your taxable income; Credits lower your actual tax bill dollar-for-dollar.", 
                type: "image", 
                content: "https://via.placeholder.com/600x350?text=Deductions+vs+Credits", 
                defs: ["Standard Deduction: A flat reduction.", "Tax Credit: A direct discount on tax owed."] 
            }
        ],
        flashcards: [{ q: "Which is more powerful?", a: "A Tax Credit, because it reduces your bill directly." }],
        quiz: [{ q: "What does a deduction do?", options: ["Lowers taxable income", "Reduces tax bill directly"], correct: 0 }]
    },
    "Stock Market": {
        lessons: [
            { 
                title: "Buying Ownership", 
                text: "A stock is a share of ownership in a company. You profit through price appreciation or dividends.", 
                type: "video", 
                content: "https://www.w3schools.com/html/mov_bbb.mp4", 
                defs: ["Ticker Symbol: A unique code (e.g., AAPL).", "Equity: Ownership value."] 
            },
            { 
                title: "Market Cycles", 
                text: "Markets fluctuate. A 'Bull' market is charging up, while a 'Bear' market is hibernating or falling.", 
                type: "image", 
                content: "https://via.placeholder.com/600x350?text=Bull+vs+Bear+Market", 
                defs: ["Volatility: How fast prices change.", "Diversification: Spreading risk."] 
            }
        ],
        flashcards: [{ q: "What is a Dividend?", a: "A reward paid to shareholders from company profits." }],
        quiz: [{ q: "What animal represents a rising market?", options: ["Bear", "Bull"], correct: 1 }]
    },
    "Finances": {
        lessons: [
            { 
                title: "The Magic of Compounding", 
                text: "Compound interest is when you earn interest on your interest. Time is your greatest asset here.", 
                type: "image", 
                content: "https://via.placeholder.com/600x350?text=Compound+Interest+Graph", 
                defs: ["Principal: Original investment.", "APY: Annual Percentage Yield."] 
            }
        ],
        flashcards: [{ q: "What is Liquidity?", a: "How quickly you can turn an asset into cash." }],
        quiz: [{ q: "When should you start saving?", options: ["When I'm 40", "As early as possible"], correct: 1 }]
    }
};
// --- DATA: The "Seeds" of knowledge ---
    }
};

let currentSubject = "";
let currentLessonIndex = 0;

// 1. NAVIGATION & INITIALIZATION
window.onload = () => {
    console.log("Financial Garden Loaded.");
    // Add click listener to flashcard for flipping
    const card = document.querySelector('.flashcard');
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
    saveNotes(); // Save what you were writing
    currentSubject = name;
    currentLessonIndex = index;
    
    const subject = subjectData[name];
    if (!subject) return;
    const data = subject.lessons[index];

    // Update Text & Media
    document.getElementById('lesson-title').innerText = data.title;
    document.getElementById('lesson-text').innerText = data.text;
    const mc = document.getElementById('media-container');
    mc.innerHTML = data.type === "video" 
        ? `<video controls width="100%"><source src="${data.content}" type="video/mp4"></video>` 
        : `<img src="${data.content}" style="width:100%">`;

    // Update Definitions
    const dl = document.getElementById('definitions-list');
    dl.innerHTML = "";
    data.defs.forEach(d => dl.innerHTML += `<li>${d}</li>`);

    // Update Progress Vine
    const progressPercent = ((index + 1) / subject.lessons.length) * 100;
    document.getElementById('progress-vine').style.width = progressPercent + "%";
    document.querySelector('.vine-leaf').style.left = `calc(${progressPercent}% - 10px)`;

    loadNotes(name);
    loadHarvest(name); // Update Flashcards & Quiz
    showPage('lesson-page');
}

// 4. FLASHCARDS & QUIZ (THE HARVEST)
function loadHarvest(name) {
    const data = subjectData[name];
    const cardContainer = document.querySelector('.flashcard');
    const front = document.getElementById('card-front');
    const back = document.getElementById('card-back');

    if (!data || !data.flashcards) return;

    // Reset Classes & Apply Theme
    cardContainer.className = 'flashcard'; 
    if (name === "Life Insurance") cardContainer.classList.add('deck-life-insurance');
    else if (name === "Taxes") cardContainer.classList.add('deck-taxes');
    else if (name === "Stock Market") cardContainer.classList.add('deck-stocks');
    else cardContainer.classList.add('deck-finances');

    // Update Card Content
    front.innerHTML = `<h3>${data.flashcards[0].q}</h3><p style="font-size: 0.8rem; opacity: 0.7;">Click to Flip</p>`;
    back.innerHTML = `<h4>Definition:</h4><p>${data.flashcards[0].a}</p>`;

    // Update Quiz
    const quiz = data.quiz[0];
    document.getElementById('quiz-question').innerText = quiz.q;
    const options = document.getElementById('quiz-options');
    options.innerHTML = "";
    quiz.options.forEach((opt, i) => {
        options.innerHTML += `<button class="journey-btn" onclick="checkQuiz(${i}, ${quiz.correct})">${opt}</button>`;
    });
}

function checkQuiz(choice, correct) {
    alert(choice === correct ? "Correct! Your garden grows." : "Not quite. Try tending to the lesson again.");
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
