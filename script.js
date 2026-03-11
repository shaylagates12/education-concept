let currentSubject = "";
let currentLessonIndex = 0;
let currentHarvestIndex = 0;

const subjectData = {
    "Life Insurance": {
        lessons: [
            { title: "The Policy", text: "The 'Policy' is the formal legal contract between the insurance company and the owner.", content: "policy.jpg", defs: ["Policy: The legal agreement."] },
            { title: "The Premium", text: "A 'Premium' is the scheduled payment required to keep your insurance active.", content: "premium.jpg", defs: ["Premium: The cost of coverage."] }
        ],
        quiz: [
            { q: "What is the cost to keep a policy active?", options: ["The Benefit", "The Premium", "The Rider", "The Lapse"], correct: 1 }
        ]
    },
    "Taxes": {
        lessons: [
            { title: "Gross Income", text: "Your total earnings before any taxes or deductions are taken out.", content: "gross.jpg", defs: ["Gross: Total before cuts."] }
        ],
        quiz: [
            { q: "What is income BEFORE taxes called?", options: ["Net Income", "Taxable Income", "Gross Income", "Refund"], correct: 2 }
        ]
    }
};

function enterGarden() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';
    showPage('kanban-page');
}

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function plantSeed() {
    const input = document.getElementById('new-subject');
    const name = input.value.trim();
    if (name && subjectData[name]) {
        const card = document.createElement('div');
        card.className = 'card';
        card.draggable = true;
        card.innerText = name;
        card.id = 'seed-' + Date.now();
        card.ondragstart = (e) => e.dataTransfer.setData("text", e.target.id);
        card.onclick = () => loadLesson(name, 0);
        document.querySelector('#todo .zone').appendChild(card);
        input.value = "";
    } else {
        alert("Enter 'Taxes' or 'Life Insurance'");
    }
}

function allow(e) { e.preventDefault(); }
function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const zone = e.target.closest('.col').querySelector('.zone');
    zone.appendChild(document.getElementById(data));
}

function loadLesson(name, index) {
    currentSubject = name;
    currentLessonIndex = index;
    const data = subjectData[name].lessons[index];
    document.getElementById('lesson-title').innerText = data.title;
    document.getElementById('lesson-text').innerText = data.text;
    document.getElementById('active-subject-display').innerText = name;
    showPage('lesson-page');
}

function nextLesson() {
    if (currentLessonIndex < subjectData[currentSubject].lessons.length - 1) {
        currentLessonIndex++;
        loadLesson(currentSubject, currentLessonIndex);
    } else {
        showPage('quiz-page');
    }
}

function startHarvest(mode) {
    if (!currentSubject) return alert("Select a subject first!");
    document.getElementById('quiz-choice-screen').style.display = 'none';
    document.getElementById('harvest-action-area').style.display = 'block';
    mode === 'flashcards' ? loadFlashcard() : loadQuiz();
}

function loadFlashcard() {
    const item = subjectData[currentSubject].lessons[currentHarvestIndex];
    document.getElementById('flashcard-mode').style.display = 'block';
    document.getElementById('quiz-mode').style.display = 'none';
    document.getElementById('card-front').innerText = item.title;
    document.getElementById('card-back').innerText = item.defs[0];
}

function backToChoice() {
    document.getElementById('quiz-choice-screen').style.display = 'block';
    document.getElementById('harvest-action-area').style.display = 'none';
}
