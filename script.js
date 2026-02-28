let currentSubject = "";
let userProfile = { role: '', focusPref: '', rank: '🌱 Novice', masteredSeeds: [] };

// 1. GERMINATION PHASE (Onboarding)
function nextStepOnboarding(role) {
    userProfile.role = role;
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'block';
}

function germinate() {
    userProfile.focusPref = document.querySelector('input[name="focus"]:checked').value;
    
    // Save to Local Storage for Persistence
    localStorage.setItem('seedling_user_profile', JSON.stringify(userProfile));
    
    // Switch Views
    document.getElementById('onboarding-overlay').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';
}

// 2. KANBAN GARDEN LOGIC (Connected Subjects)
function plantNewSeed() {
    const name = document.getElementById('subject-seed-input').value;
    if (!name) return;
    
    // Create the hand-drawn "Sticky Note" card
    const card = document.createElement('div');
    card.className = 'doodle-card';
    card.id = 'seed-' + Date.now();
    card.textContent = name;
    card.onclick = () => activateSubjectJourney(name);
    card.draggable = true;
    card.ondragstart = drag;
    
    document.getElementById('kanban-todo').querySelector('.drop-zone').appendChild(card);
    document.getElementById('subject-seed-input').value = "";
    saveGarden();
}

// Connect Kanban Choice to Learning Area
function activateSubjectJourney(name) {
    currentSubject = name;
    
    // Switch to Learning Area
    showPage('lesson-page');
    
    // Update the Ornate Picture Frame Content
    document.getElementById('current-lesson-topic').textContent = name;
    
    // Simulate Opening Summary (This would pull from a database in a real app)
    document.getElementById('lesson-content-summary').innerHTML = `
        <p><strong>Opening Summary:</strong> The subject of ${name} is a cornerstone of this learning garden. Before you can unlock the full breadth of the topic, you must absorb this introductory concept.</p>
        <p>This is the soil that Pip will use to nurture your understanding.</p>
    `;
    
    // Show the "Continue" Button (Unlocking the lesson)
    document.getElementById('lesson-continue-btn').style.display = 'block';
}

function continueJourney() {
    // Reveal the rest of the lesson
    document.getElementById('lesson-content-summary').innerHTML += `
        <p><strong>Lesson Continued:</strong> Excellent. Now that you have grasped the initial concepts, Pip can help you explore technical details.</p>
        <p>Write your detailed conceptual thoughts in the Field Notes area to the right.</p>
    `;
    document.getElementById('lesson-continue-btn').style.display = 'none';
}

// 3. PAGE LOGIC
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    // Sync Nav Column state
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    // (Nav button syncing logic needed here based on the index of the page)
}

// 4. PERSISTENCE SYSTEMS (Persistence)
function saveGarden() {
    const gardenState = {
        todo: getCardData('#kanban-todo'),
        doing: getCardData('#kanban-doing'),
        done: getCardData('#kanban-done')
    };
    localStorage.setItem('seedling_garden', JSON.stringify(gardenState));
}

function getCardData(colId) {
    return Array.from(document.querySelector(colId).querySelectorAll('.doodle-card')).map(c => ({ id: c.id, text: c.textContent }));
}

// Drag & Drop
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
function allowDrop(ev) { ev.preventDefault(); }
function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const targetCol = ev.target.closest('.doodle-col');
    if (targetCol) {
        targetCol.querySelector('.drop-zone').appendChild(document.getElementById(data));
        saveGarden();
    }
}
function returnToRoots() {
    // 1. Show the onboarding overlay again
    document.getElementById('onboarding-overlay').style.display = 'flex';
    
    // 2. Hide the main app shell
    document.getElementById('app-shell').style.display = 'none';
    
    // 3. Reset the onboarding to the first step
    document.getElementById('step-1').style.display = 'block';
    document.getElementById('step-2').style.display = 'none';
    
    // 4. (Optional) Clear the saved profile if you want a total fresh start
    // localStorage.removeItem('seedling_user_profile');
}
