// --- DATA: The "Seeds" of knowledge ---
const subjectData = {
    "Botany": {
        lessons: [
            { title: "The Seed's Awakening", text: "Germination is the process where a seed turns into a sprout.", type: "video", content: "https://www.w3schools.com/html/mov_bbb.mp4", defs: ["Germination", "Dormancy"] },
            { title: "Photosynthesis", text: "Plants convert light into energy.", type: "image", content: "https://via.placeholder.com/600x300?text=Photosynthesis+Chart", defs: ["Chlorophyll", "Glucose"] }
        ],
        flashcards: [{ q: "What is the green pigment in plants?", a: "Chlorophyll" }],
        quiz: [{ q: "Which gas do plants absorb?", options: ["Oxygen", "CO2", "Nitrogen"], correct: 1 }]
    }
};

let currentSubject = "";

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
