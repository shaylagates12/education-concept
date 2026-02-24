let timeLeft = 1500;
let timerId = null;
let currentCardId = null;

// 1. PERSONALIZATION & ROLE LOGIC
function calibrateSystem() {
    const form = document.getElementById('style-quiz');
    const formData = new FormData(form);
    const role = document.getElementById('role-selector').value;
    const focusTime = parseInt(formData.get('focus'));
    const inputPref = formData.get('input');

    timeLeft = focusTime * 60;
    updateTimerDisplay();

    if (inputPref === 'visual') document.body.classList.add('visual-mode');
    document.body.className += ` role-${role}`;

    localStorage.setItem('nexusProfile', JSON.stringify({role, focusTime, inputPref, setup: true}));
    document.getElementById('quiz-container').style.display = 'none';
}

// 2. KANBAN DRAG & DROP
function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const targetCol = ev.target.closest('.kanban-cards');
    
    if (targetCol) {
        const colId = targetCol.parentElement.id;
        // Limit Progress for focus
        if (colId === 'in-progress' && targetCol.children.length >= 2) {
            alert("Cognitive Load Warning: Finish your current topics first!");
            return;
        }
        targetCol.appendChild(document.getElementById(data));
        if (colId === 'mastered') triggerCelebration(document.getElementById(data).textContent);
        saveBoard();
    }
}

// 3. STORAGE SYSTEM
function saveBoard() {
    const board = {
        'to-learn': getCardData('#to-learn'),
        'in-progress': getCardData('#in-progress'),
        'mastered': getCardData('#mastered')
    };
    localStorage.setItem('nexusBoard', JSON.stringify(board));
}

function getCardData(selector) {
    return Array.from(document.querySelector(selector + ' .kanban-cards').children).map(c => ({id: c.id, text: c.textContent}));
}

function loadBoard() {
    const saved = JSON.parse(localStorage.getItem('nexusBoard'));
    if (!saved) return;
    Object.keys(saved).forEach(colId => {
        const col = document.querySelector(`#${colId} .kanban-cards`);
        saved[colId].forEach(c => {
            const card = createCardElement(c.id, c.text);
            col.appendChild(card);
        });
    });
}

// 4. UTILITIES
function createCardElement(id, text) {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.id = id;
    card.textContent = text;
    card.onclick = () => openDetails(id, text);
    card.ondragstart = drag;
    return card;
}

function addNewCard() {
    const txt = document.getElementById('new-card-text').value;
    if (!txt) return;
    const card = createCardElement('card-' + Date.now(), txt);
    document.querySelector('#to-learn .kanban-cards').appendChild(card);
    document.getElementById('new-card-text').value = '';
    saveBoard();
}

function triggerCelebration(name) {
    alert(`🎉 Mastery Achieved: ${name}! Take a break!`);
}

// 5. INITIALIZE
window.onload = () => {
    loadBoard();
    const profile = localStorage.getItem('nexusProfile');
    if (!profile) document.getElementById('quiz-container').style.display = 'flex';
    else updateTimerDisplay();
};

function updateTimerDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    document.getElementById('timer').textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
}

// --- Detail Sidebar ---
function openDetails(id, text) {
    currentCardId = id;
    document.getElementById('details-title').textContent = text;
    document.getElementById('card-notes').value = localStorage.getItem('notes-' + id) || "";
    document.getElementById('details-sidebar').classList.add('open');
}

function saveNotes() {
    localStorage.setItem('notes-' + currentCardId, document.getElementById('card-notes').value);
    alert("Progress saved!");
}

function closeDetails() { document.getElementById('details-sidebar').classList.remove('open'); }
function showClearModal() { document.getElementById('clearModal').style.display = 'flex'; }
function hideClearModal() { document.getElementById('clearModal').style.display = 'none'; }
function clearAllProgress() { localStorage.clear(); location.reload(); }
