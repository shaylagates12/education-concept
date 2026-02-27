let timeLeft = 900, timerId = null, currentCardId = null;
let currentDeck = [], currentFCIndex = 0;

// 1. SYSTEM LOGIC
function calibrateSystem() {
    const role = document.getElementById('role-selector').value;
    const focus = document.querySelector('input[name="focus"]:checked').value;
    timeLeft = parseInt(focus) * 60;
    updateTimer();
    localStorage.setItem('seedlingProfile', JSON.stringify({role, focus}));
    document.getElementById('teacher-dashboard').style.display = (role === 'teacher') ? 'block' : 'none';
    document.getElementById('quiz-container').style.display = 'none';
    initializeGarden();
}

// 2. FLASHCARD LOGIC
function addFlashcard() {
    const f = document.getElementById('fc-f').value;
    const b = document.getElementById('fc-b').value;
    if (!f || !b) return;
    let deck = JSON.parse(localStorage.getItem('fc-' + currentCardId)) || [];
    deck.push({ front: f, back: b, mastery: 0 }); // Mastery added
    localStorage.setItem('fc-' + currentCardId, JSON.stringify(deck));
    document.getElementById('fc-f').value = ''; document.getElementById('fc-b').value = '';
    renderFlashcards();
}

function renderFlashcards() {
    currentDeck = JSON.parse(localStorage.getItem('fc-' + currentCardId)) || [];
    currentFCIndex = 0;
    updateCardDisplay();
}

function updateCardDisplay() {
    const inner = document.getElementById('flashcard-inner');
    inner.classList.remove('flipped');
    if (currentDeck.length === 0) {
        document.getElementById('card-front-text').textContent = "No seeds yet.";
        document.getElementById('card-back-text').textContent = "Add a question below.";
    } else {
        const card = currentDeck[currentFCIndex];
        document.getElementById('card-front-text').textContent = card.front;
        document.getElementById('card-back-text').textContent = card.back;
        updateStars(card.mastery);
    }
    document.getElementById('fc-counter').textContent = `${currentDeck.length > 0 ? currentFCIndex + 1 : 0} / ${currentDeck.length}`;
}

function rateMastery(level, event) {
    event.stopPropagation(); // Don't flip card when clicking stars
    currentDeck[currentFCIndex].mastery = level;
    localStorage.setItem('fc-' + currentCardId, JSON.stringify(currentDeck));
    updateStars(level);
}

function updateStars(level) {
    const stars = document.querySelectorAll('.mastery-rating span');
    stars.forEach((s, i) => s.classList.toggle('active', i < level));
}

// 3. CORE FUNCTIONS (Merged)
function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const targetCol = ev.target.closest('.kanban-cards');
    if (targetCol) {
        if (targetCol.parentElement.id === 'in-progress' && targetCol.children.length >= 2) return alert("Focus!");
        targetCol.appendChild(document.getElementById(data));
        saveGarden();
    }
}

function saveGarden() {
    const board = {
        'to-learn': getCData('#to-learn'),
        'in-progress': getCData('#in-progress'),
        'mastered': getCData('#mastered')
    };
    localStorage.setItem('seedlingBoard', JSON.stringify(board));
}

function getCData(sel) {
    return Array.from(document.querySelector(sel + ' .kanban-cards').children).map(c => ({id: c.id, text: c.textContent}));
}

function openDetails(id, text) {
    currentCardId = id;
    document.getElementById('details-title').textContent = text;
    document.getElementById('card-notes').value = localStorage.getItem('notes-' + id) || "";
    document.getElementById('details-sidebar').classList.add('open');
    renderFlashcards();
}

function openTab(t) {
    document.getElementById('notes-tab').style.display = (t === 'notes') ? 'block' : 'none';
    document.getElementById('flashcards-tab').style.display = (t === 'flashcards') ? 'block' : 'none';
}

function flipCard() { document.getElementById('flashcard-inner').classList.toggle('flipped'); }
function nextCard() { if (currentFCIndex < currentDeck.length - 1) { currentFCIndex++; updateCardDisplay(); } }
function prevCard() { if (currentFCIndex > 0) { currentFCIndex--; updateCardDisplay(); } }
function closeDetails() { document.getElementById('details-sidebar').classList.remove('open'); }
function updateTimer() {
    const m = Math.floor(timeLeft / 60), s = timeLeft % 60;
    document.getElementById('timer').textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
}

// Initialize
window.onload = () => { if (localStorage.getItem('seedlingProfile')) calibrateSystem(); };
