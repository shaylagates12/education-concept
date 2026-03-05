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
            text: "Compound interest is interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods.", 
            type: "image", 
            content: "https://via.placeholder.com/600x350?text=Compound+Interest+Curve", 
            defs: ["Principal", "APY", "Liquidity"] 
        }],
        flashcards: [{ q: "What is the 50/30/20 rule?", a: "50% Needs, 30% Wants, 20% Savings." }],
        quiz: [{ q: "What is an Emergency Fund?", a: "3-6 months of expenses saved for surprises." }]
    }
};
// 1. NAVIGATION
function enterGarden() { document.getElementById('welcome-screen').style.display = 'none'; document.getElementById('app-shell').style.display = 'flex'; }
function showPage(id) { document.querySelectorAll('.page').forEach(p => p.classList.remove('active')); document.getElementById(id).classList.add('active'); }

// 2. KANBAN
function plantSeed() {
    const name = document.getElementById('new-subject').value;
    if (!name) return;
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = name;
    card.draggable = true;
    card.onclick = () => loadLesson(name);
    card.ondragstart = (e) => e.dataTransfer.setData("text", name);
    document.querySelector('#todo .zone').appendChild(card);
    document.getElementById('new-subject').value = "";
}

function allow(e) { e.preventDefault(); }
function drop(e) { e.preventDefault(); const name = e.dataTransfer.getData("text"); /* Simplified drop logic */ }

// 3. LESSON ENGINE
function loadLesson(name) {
    currentSubject = name;
    const data = subjectData[name] ? subjectData[name].lessons[0] : null;
    showPage('lesson-page');
    if (!data) { document.getElementById('lesson-title').innerText = name + " (No data yet)"; return; }

    document.getElementById('lesson-title').innerText = data.title;
    document.getElementById('lesson-text').innerText = data.text;
    
    // Media logic
    const mc = document.getElementById('media-container');
    mc.innerHTML = data.type === "video" ? `<video controls width="100%"><src src="${data.content}"></video>` : `<img src="${data.content}" style="width:100%">`;

    // Definitions
    const dl = document.getElementById('definitions-list');
    const db = document.getElementById('definitions-box');
    dl.innerHTML = "";
    if (data.defs) {
        db.style.display = 'block';
        data.defs.forEach(d => dl.innerHTML += `<li>${d}</li>`);
    }

    // Load Flashcard & Quiz for this subject
    loadHarvest(name);
}

function loadHarvest(name) {
    const data = subjectData[name];
    if (!data) return;
    document.getElementById('card-front').innerText = data.flashcards[0].q;
    document.getElementById('card-back').innerText = data.flashcards[0].a;
    
    const quiz = data.quiz[0];
    document.getElementById('quiz-question').innerText = quiz.q;
    const options = document.getElementById('quiz-options');
    options.innerHTML = "";
    quiz.options.forEach((opt, i) => {
        options.innerHTML += `<button onclick="checkQuiz(${i}, ${quiz.correct})">${opt}</button>`;
    });
}

function checkQuiz(choice, correct) {
    alert(choice === correct ? "Correct! Your garden grows." : "Not quite. Try tending to the lesson again.");
}

// 4. PIP
function askPip() {
    const input = document.getElementById('pip-input');
    const chat = document.getElementById('chat-display');
    chat.innerHTML += `<p><strong>You:</strong> ${input.value}</p>`;
    setTimeout(() => { chat.innerHTML += `<p><em>Pip:</em> I see you're learning about ${currentSubject}! That's a great seed to plant.</p>`; }, 600);
    input.value = "";
}
function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    
    // Find the closest drop zone
    let target = e.target;
    if (!target.classList.contains('zone')) {
        target = target.closest('.col').querySelector('.zone');
    }
    
    target.appendChild(draggedElement);
}
// 1. Creating the seed
function plantSeed() {
    const input = document.getElementById('new-subject');
    const name = input.value.trim();
    
    if (!name || !subjectData[name]) {
        alert("Please enter a valid subject: Life Insurance, Taxes, Stock Market, or Finances.");
        return;
    }

    const card = document.createElement('div');
    card.className = 'card';
    card.id = 'card-' + Date.now(); // Unique ID for dragging
    card.textContent = name;
    card.draggable = true;

    // Attach functionality
    card.onclick = () => loadLesson(name);
    card.ondragstart = (e) => {
        e.dataTransfer.setData("text", e.target.id);
    };

    document.querySelector('#todo .zone').appendChild(card);
    input.value = "";
}

// 2. Allowing the drop
function allow(e) {
    e.preventDefault(); // This is mandatory to allow dropping
}

// 3. Handling the drop
function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const draggedCard = document.getElementById(id);
    
    // Find the drop zone even if the user drops on a title or another card
    let targetZone = e.target;
    if (!targetZone.classList.contains('zone')) {
        targetZone = targetZone.closest('.col').querySelector('.zone');
    }
    
    targetZone.appendChild(draggedCard);
}

// 4. Initializing the Welcome Screen
window.onload = () => {
    // Check if everything is connected
    console.log("Financial Garden Loaded.");
};
// This ensures the code waits for the page to load
window.onload = () => {
    console.log("Garden is ready!"); 
};

function enterGarden() {
    const welcome = document.getElementById('welcome-screen');
    const shell = document.getElementById('app-shell');
    if(welcome && shell) {
        welcome.style.display = 'none';
        shell.style.display = 'flex';
    } else {
        console.error("Could not find the welcome screen or app shell IDs.");
    }
}
let currentLessonIndex = 0;

// Function to save notes to LocalStorage
function saveNotes() {
    if (currentSubject) {
        const notes = document.getElementById('field-notes').value;
        localStorage.setItem(`notes_${currentSubject}`, notes);
    }
}

// Function to load notes from LocalStorage
function loadNotes(subjectName) {
    const savedNotes = localStorage.getItem(`notes_${subjectName}`);
    document.getElementById('field-notes').value = savedNotes || "";
}

// Updated loadLesson function
function loadLesson(name, index = 0) {
    // 1. Save notes from the PREVIOUS subject before switching
    saveNotes();

    currentSubject = name;
    currentLessonIndex = index;
    
    const subject = subjectData[name];
    const data = subject ? subject.lessons[index] : null;

    if (!data) return;

    // 2. Load the new notes for THIS subject
    loadNotes(name);

    // Update UI elements
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
    
    showPage('lesson-page');
}

// Logic for the "Next Lesson" Button
function nextLesson() {
    const subject = subjectData[currentSubject];
    if (!subject) return;

    // Check if there is another lesson in the array
    if (currentLessonIndex < subject.lessons.length - 1) {
        loadLesson(currentSubject, currentLessonIndex + 1);
    } else {
        alert("You've reached the end of this 'branch'. Check back soon for more growth!");
    }
}
