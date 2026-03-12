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
    }
}
