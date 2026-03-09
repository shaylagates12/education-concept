let currentSubject = "";
let currentLessonIndex = 0;

const subjectData = {
    "Life Insurance": {
        lessons: [
            { title: "The Policy", text: "The legal contract...", type: "image", content: "policy.jpg", defs: ["Policy: The contract."] },
            // ... (Includes all 10 lessons as previously defined)
        ],
        flashcards: [{ q: "What is a Rider?", a: "An optional add-on." }],
        quiz: [{ q: "What is the cost?", options: ["Payout", "Premium", "Tax"], correct: 1 }]
    },
    "Taxes": { /* ... Tax data preserved here */ }
};

function enterGarden() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';
    showPage('kanban-page');
}

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    const target = document.getElementById(id);
    // Restoration of the "Grid" look for lessons
    target.style.display = (id === 'lesson-page') ? 'grid' : 'block';
}

function plantSeed() {
    // Logic for adding cards to the Kanban board
    const name = document.getElementById('new-subject').value;
    if (subjectData[name]) {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = name;
        card.onclick = () => loadLesson(name);
        document.querySelector('#todo .zone').appendChild(card);
    }
}

function loadLesson(name, index = 0) {
    currentSubject = name;
    currentLessonIndex = index;
    const data = subjectData[name].lessons[index];
    document.getElementById('lesson-title').innerText = data.title;
    // Video feature preserved
    const mc = document.getElementById('media-container');
    mc.innerHTML = data.type === "video" ? `<video controls><source src="${data.content}"></video>` : `<img src="${data.content}">`;
    showPage('lesson-page');
}
