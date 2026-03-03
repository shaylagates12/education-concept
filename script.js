alert("The garden is awake!");

// --- INITIAL STATE & PERSISTENCE ---
let currentSubject = "";
let userProfile = JSON.parse(localStorage.getItem('seedling_user_profile')) || { 
    role: '', 
    focusPref: 15, 
    rank: '🌱 Novice', 
    masteredSeeds: 0 
};

let timerInterval;
let secondsLeft;

// --- 1. GERMINATION PHASE (Onboarding) ---
function nextStepOnboarding(role) {
    userProfile.role = role;
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'block';
}

function germinate() {
    const selectedFocus = document.querySelector('input[name="focus"]:checked');
    userProfile.focusPref = selectedFocus ? selectedFocus.value : 15;
    
    // Save to Local Storage
    localStorage.setItem('seedling_user_profile', JSON.stringify(userProfile));
    
    // Switch Views
    document.getElementById('onboarding-overlay').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';
    
    // Update UI
    document.getElementById('rank-badge').innerText = userProfile.rank;
    document.getElementById('grove-role').innerText = userProfile.role;
    document.getElementById('stat-planted').innerText = userProfile.masteredSeeds;
}

// --- 2. KANBAN GARDEN LOGIC ---
function plantNewSeed() {
    const input = document.getElementById('subject-seed-input');
    const name = input.value.trim();
    if (!name) return;
    
    const card = document.createElement('div');
    card.className = 'doodle-card sprouting-card'; // Added the animation class here
    card.id = 'seed-' + Date.now();
    card.textContent = name;
    
    // Connect click to Journey
    card.onclick = () => activateSubjectJourney(name);
    
    // Drag & Drop Setup
    card.draggable = true;
    card.ondragstart = drag;
    
    const todoZone = document.getElementById('kanban-todo').querySelector('.drop-zone');
    todoZone.appendChild(card);
    
    // Clear input and update stats
    input.value = "";
    userProfile.masteredSeeds++;
    document.getElementById('stat-planted').innerText = userProfile.masteredSeeds;
    
    // Remove the animation class after it plays so it doesn't interfere with dragging
    setTimeout(() => {
        card.classList.remove('sprouting-card');
    }, 700);

    saveGarden();
}
// --- 3. DRAG & DROP SYSTEM ---
function drag(ev) { 
    ev.dataTransfer.setData("text", ev.target.id); 
}

function allowDrop(ev) { 
    ev.preventDefault(); 
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const targetCol = ev.target.closest('.doodle-col');
    const draggedElement = document.getElementById(data);
    
    if (targetCol && draggedElement) {
        targetCol.querySelector('.drop-zone').appendChild(draggedElement);
        saveGarden();
    }
}

// --- 4. LESSON ENGINE ---
function activateSubjectJourney(name) {
    currentSubject = name;
    showPage('lesson-page');
    
    document.getElementById('current-lesson-topic').textContent = name;
    document.getElementById('lesson-content-summary').innerHTML = `
        <p><strong>Opening Summary:</strong> The subject of ${name} is a cornerstone of this learning garden. Before you can unlock the full breadth of the topic, you must absorb this introductory concept.</p>
        <p>This is the soil that Pip will use to nurture your understanding.</p>
    `;
    
    document.getElementById('lesson-continue-btn').style.display = 'block';
}

function continueJourney() {
    document.getElementById('lesson-content-summary').innerHTML += `
        <p><strong>Lesson Continued:</strong> Excellent. Now that you have grasped the initial concepts, Pip can help you explore technical details.</p>
        <p>Use the <strong>Sun Dial</strong> below to track your focus session for this subject.</p>
    `;
    document.getElementById('lesson-continue-btn').style.display = 'none';
}

// --- 5. PAGE NAVIGATION & UI ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');
    
    // Update Sidebar Buttons
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(pageId)) {
            btn.classList.add('active');
        }
    });
}

// --- 6. SUN DIAL (TIMER) & AUDIO ---
function toggleTimer() {
    const btn = document.getElementById('timer-btn');
    const display = document.getElementById('timer-display');

    if (btn.innerText === "Start Sprint") {
        secondsLeft = userProfile.focusPref * 60;
        btn.innerText = "Pause";
        
        timerInterval = setInterval(() => {
            secondsLeft--;
            let mins = Math.floor(secondsLeft / 60);
            let secs = secondsLeft % 60;
            display.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                playChime();
                alert("Your sprint is complete! The sun has set on this session.");
                btn.innerText = "Start Sprint";
            }
        }, 1000);
    } else {
        clearInterval(timerInterval);
        btn.innerText = "Start Sprint";
    }
}

function playChime() {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.connect(gain);
    gain.connect(context.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, context.currentTime);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1);
    osc.stop(context.currentTime + 1);
}

// --- 7. PIP AI CHAT ---
function askPip() {
    const input = document.getElementById('ai-input');
    const chat = document.getElementById('ai-chat');
    if (!input.value.trim()) return;

    chat.innerHTML += `<p class="user-msg"><strong>You:</strong> ${input.value}</p>`;
    
    setTimeout(() => {
        const responses = [
            `That's a vital question for ${currentSubject || 'our journey'}. Have you added that to your field notes?`,
            `The roots of ${currentSubject || 'this topic'} run deep. Let's focus on the core concepts first.`,
            `Fascinating! Pip thinks you're making great progress in the garden today.`
        ];
        const randomRes = responses[Math.floor(Math.random() * responses.length)];
        chat.innerHTML += `<p class="pip-msg"><em>Pip:</em> ${randomRes}</p>`;
        chat.scrollTop = chat.scrollHeight;
    }, 600);
    
    input.value = "";
}

// --- 8. PERSISTENCE & RESET ---
function saveGarden() {
    const gardenState = {
        todo: getCardData('#kanban-todo'),
        doing: getCardData('#kanban-doing'),
        done: getCardData('#kanban-done')
    };
    localStorage.setItem('seedling_garden', JSON.stringify(gardenState));
}

function getCardData(colId) {
    const col = document.querySelector(colId);
    if (!col) return [];
    return Array.from(col.querySelectorAll('.doodle-card')).map(c => ({ 
        id: c.id, 
        text: c.textContent 
    }));
}

function confirmReset() {
    if (confirm("Are you sure you want to return to the beginning? Your garden progress will remain, but you will need to recalibrate your persona.")) {
        returnToRoots();
    }
}

function returnToRoots() {
    document.getElementById('onboarding-overlay').style.display = 'flex';
    document.getElementById('app-shell').style.display = 'none';
    document.getElementById('step-1').style.display = 'block';
    document.getElementById('step-2').style.display = 'none';
}
// --- FLASHCARD LOGIC ---
function flipCard(cardElement) {
    // This finds the "inner" part of the card and toggles the 'flipped' class
    const inner = cardElement.querySelector('.flashcard-inner');
    inner.classList.toggle('flipped');
}
