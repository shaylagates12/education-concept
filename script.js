let currentSubject = "";
let currentLessonIndex = 0;
let currentQuizIndex = 0;

const subjectData = {
    "Life Insurance": {
        lessons: [
            { title: "The Policy", text: "The 'Policy' is the legal contract between the insurer and the owner.", type: "image", content: "https://via.placeholder.com/600x350?text=The+Policy", defs: ["Policy: The legal agreement."] },
            { title: "The Premium", text: "The 'Premium' is the payment you make to keep the coverage active.", type: "image", content: "https://via.placeholder.com/600x350?text=The+Premium", defs: ["Premium: The cost of insurance."] }
        ],
        flashcards: [{ q: "What is a Rider?", a: "An optional add-on to a life insurance policy." }],
        quiz: [{ q: "What is the cost of the insurance called?", options: ["Payout", "Premium", "Deduction", "Equity"], correct: 1 }]
    },
    "Taxes": {
        lessons: [
            { title: "Taxable Income", text: "Your total income minus allowable deductions.", type: "image", content: "https://via.placeholder.com/600x350?text=Taxable+Income", defs: ["Taxable Income: What you pay tax on."] }
        ],
        flashcards: [{ q: "Credit vs Deduction?", a: "Credits lower tax; Deductions lower taxable income." }],
        quiz: [{ q: "Which lowers your tax bill dollar-for-dollar?", options: ["Deduction", "Exemption", "Tax Credit", "Audit"], correct: 2 }]
    }
};

// Navigation Flow
function enterGarden() {
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';
    showPage('kanban-page'); // Start at the Garden
}

function showPage(id) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
    });

    // Show selected page
    const activePage = document.getElementById(id);
    activePage.classList.add('active');
    
    // Maintain grid for lessons, block for others
    if(id === 'lesson-page') {
        activePage.style.display = 'grid';
    } else {
        activePage.style.display = 'block';
    }
}

// Kanban Logic
function plantSeed() {
    const input = document.getElementById('new-subject');
    const name = input.value.trim();
    if (!name || !subjectData[name]) {
        alert("Enter: Life Insurance or Taxes.");
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
    let targetZone = e.target.classList.contains('zone') ? e.target : e.target.closest('.col').querySelector('.zone');
    targetZone.appendChild(draggedCard);
}

// Lesson & Quiz Loading
function loadLesson(name, index = 0) {
    currentSubject = name;
    currentLessonIndex = index;
    const data = subjectData[name].lessons[index];
    
    document.getElementById('lesson-title').innerText = data.title;
    document.getElementById('lesson-text').innerText = data.text;
    
    const mc = document.getElementById('media-container');
    mc.innerHTML = data.type === "video" 
        ? `<video controls width="100%"><source src="${data.content}"></video>` 
        : `<img src="${data.content}" style="width:100%">`;
    
    const dl = document.getElementById('definitions-list');
    dl.innerHTML = "";
    data.defs.forEach(d => dl.innerHTML += `<li>${d}</li>`);
    document.getElementById('definitions-box').style.display = "block";
    
    updateProgress(name, index);
    loadHarvest(name);
    showPage('lesson-page');
}

function updateProgress(name, index) {
    const total = subjectData[name].lessons.length;
    const percent = ((index + 1) / total) * 100;
    document.getElementById('progress-vine').style.width = percent + "%";
    document.querySelector('.vine-leaf').style.left = `calc(${percent}% - 15px)`;
}

function loadHarvest(name) {
    const data = subjectData[name];
    const card = document.querySelector('.flashcard');
    card.className = 'flashcard ' + 'deck-' + name.toLowerCase().replace(" ", "-");
    document.getElementById('card-front').innerHTML = `<h3>${data.flashcards[0].q}</h3>`;
    document.getElementById('card-back').innerHTML = `<p>${data.flashcards[0].a}</p>`;
    currentQuizIndex = 0;
    displayQuizQuestion(name);
}

function displayQuizQuestion(name) {
    const quiz = subjectData[name].quiz[currentQuizIndex];
    document.getElementById('quiz-question').innerText = quiz.q;
    const container = document.getElementById('quiz-options');
    container.innerHTML = "";
    quiz.options.forEach((opt, i) => {
        container.innerHTML += `<button class="journey-btn" onclick="checkQuiz(${i}, ${quiz.correct})">${opt}</button>`;
    });
}

function checkQuiz(choice, correct) {
    if (choice === correct) {
        alert("Correct!");
    } else {
        alert("Try again!");
    }
}
