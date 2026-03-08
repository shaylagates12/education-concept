
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
    "Taxes": { /* Follow the 10-page pattern here */ },
    "Stock Market": { /* Follow the 10-page pattern here */ },
    "Finances": { /* Follow the 10-page pattern here */ }
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

// 4. FLASHCARDS & QUIZ (THE HARVEST)
function loadHarvest(name) {
    const data = subjectData[name];
    const cardContainer = document.querySelector('.flashcard');
    const front = document.getElementById('card-front');
    const back = document.getElementById('card-back');

    if (!data || !data.flashcards) return;

    cardContainer.className = 'flashcard'; 
    if (name === "Life Insurance") cardContainer.classList.add('deck-life-insurance');
    else if (name === "Taxes") cardContainer.classList.add('deck-taxes');
    else if (name === "Stock Market") cardContainer.classList.add('deck-stocks');
    else cardContainer.classList.add('deck-finances');

    front.innerHTML = `<h3>${data.flashcards[0].q}</h3><p style="font-size: 0.8rem; opacity: 0.7;">Click to Flip</p>`;
    back.innerHTML = `<h4>Definition:</h4><p>${data.flashcards[0].a}</p>`;

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
