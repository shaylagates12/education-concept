/* --- DATA STORE --- */
const subjectData = {
    "Life Insurance": {
        lessons: [
            { title: "The Policy", text: "The formal legal contract between the insurance company and the owner.", content: "policy.jpg" },
            { title: "The Premium", text: "The scheduled payment required to keep your insurance active.", content: "premium.jpg" }
        ],
        quiz: [{ q: "What is the cost to keep a policy active?", options: ["The Benefit", "The Premium", "The Rider"], correct: 1 }]
    },
    "Taxes": {
        lessons: [
            { title: "Gross Income", text: "Total earnings before any taxes or deductions are taken out.", content: "gross.jpg" },
            { title: "Deductions", text: "Expenses you can subtract to lower your tax bill.", content: "deduction.jpg" }
        ],
        quiz: [{ q: "Which form is used for annual returns?", options: ["W-2", "1040", "I-9"], correct: 1 }]
    },
    "Stock Market": {
        lessons: [
            { title: "Share", text: "A unit of ownership in a specific corporation.", content: "share.jpg" },
            { title: "Bull Market", text: "A period where stock prices are rising.", content: "bull.jpg" }
        ],
        quiz: [{ q: "A market with rising prices is a:", options: ["Bear", "Seed", "Bull"], correct: 2 }]
    }
};

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
/* Pip's Glow Animation */
@keyframes pip-glow {
    0% { box-shadow: 0 0 5px rgba(45, 90, 39, 0.2); border-color: #2d5a27; }
    50% { box-shadow: 0 0 15px rgba(76, 175, 80, 0.6); border-color: #4CAF50; }
    100% { box-shadow: 0 0 5px rgba(45, 90, 39, 0.2); border-color: #2d5a27; }
}

.ask-pip-ad {
    border: 2px solid #2d5a27;
    transition: all 0.3s ease;
}

.pip-active {
    animation: pip-glow 2s infinite ease-in-out;
    background-color: rgba(232, 245, 233, 0.8) !important;
}

/* Flashcard Earthy Styling (Matching your Image) */
.flashcard-inner {
    border-radius: 15px;
    box-shadow: 0 8px 15px rgba(0,0,0,0.1);
}

.front { background-color: #e0d0b8; color: #2d5a27; border: 4px solid #c5b396; }
.back { background-color: #fdf5e6; color: #5d4037; border: 4px solid #d7ccc8; }

.front, .back {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
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
