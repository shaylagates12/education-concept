// --- DATA: The "Seeds" of knowledge ---
const subjectData = {
    "Life Insurance": {
        lessons: [{ 
            title: "Protecting the Future", 
            text: "Life insurance is a contract between an insurer and a policy owner. It guarantees payment of a death benefit to beneficiaries.", 
            type: "image", 
            content: "https://via.placeholder.com/600x350?text=Term+vs+Whole+Life+Chart", 
            defs: ["Premium", "Beneficiary", "Underwriting"] 
        }],
        flashcards: [{ q: "What is a 'Premium'?", a: "The amount you pay periodically to keep the policy active." }],
        quiz: [{ q: "Which type of insurance usually only lasts for a specific period?", options: ["Whole Life", "Term Life"], correct: 1 }]
    },
    "Taxes": {
        lessons: [{ 
            title: "Understanding the Tax Bracket", 
            text: "A progressive tax system means your tax rate increases as your taxable amount increases.", 
            type: "image", 
            content: "https://via.placeholder.com/600x350?text=Tax+Bracket+Visualization", 
            defs: ["Deduction", "Credit", "Taxable Income"] 
        }],
        flashcards: [{ q: "What is a Tax Deduction?", a: "An amount that lowers your overall taxable income." }],
        quiz: [{ q: "Which is more valuable?", options: ["$1,000 Deduction", "$1,000 Credit"], correct: 1 }]
    },
    "Stock Market": {
        lessons: [{ 
            title: "The Engine of Growth", 
            text: "Stocks represent ownership in a corporation. When the company grows, your share value often grows with it.", 
            type: "video", 
            content: "https://www.w3schools.com/html/mov_bbb.mp4", 
            defs: ["Dividend", "Bull Market", "Volatility"] 
        }],
        flashcards: [{ q: "What is a Dividend?", a: "A portion of company earnings paid out to shareholders." }],
        quiz: [{ q: "What do we call a market where prices are rising?", options: ["Bear Market", "Bull Market"], correct: 1 }]
    },
    "Finances": {
        lessons: [{ 
            title: "The Power of Compounding", 
            text: "Compound interest is interest calculated on the initial principal, including accumulated interest.", 
            type: "image", 
            content: "https://via.placeholder.com/600x350?text=Compound+Interest+Curve", 
            defs: ["Principal", "APY", "Liquidity"] 
        }],
        flashcards: [{ q: "What is the 50/30/20 rule?", a: "50% Needs, 30% Wants, 20% Savings." }],
        quiz: [{ q: "What is an Emergency Fund?", a: "3-6 months of expenses saved for surprises." }]
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
