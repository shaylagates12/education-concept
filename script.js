// --- INITIAL STATE ---
let currentSubject = "";
let userProfile = { role: '', focusPref: 15, rank: '🌱 Novice', masteredSeeds: 0 };
let timerInterval;
let secondsLeft;

// --- 1. GERMINATION (Onboarding) ---
function nextStepOnboarding(role) {
    userProfile.role = role;
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'block';
}

function germinate() {
    userProfile.focusPref = document.querySelector('input[name="focus"]:checked').value;
    localStorage.setItem('seedling_user_profile', JSON.stringify(userProfile));
    
    document.getElementById('onboarding-overlay').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';
    
    document.getElementById('rank-badge').innerText = userProfile.rank;
    document.getElementById('grove-role').innerText = userProfile.role;
}

// --- 2. KANBAN LOGIC ---
function plantNewSeed() {
    const input = document.getElementById('subject-seed-input');
    if (!input.value) return;
    
    const card = document.createElement('div');
    card.className = 'doodle-card';
    card.id = 'seed-' + Date.now();
    card.textContent = input.value;
    
    // Clicking card opens the lesson
    card.onclick = () => activateSubjectJourney(card.textContent);
    
    // Drag Setup
    card.draggable = true;
    card.ondragstart = (ev) => ev.dataTransfer.setData("text", ev.target.id);
    
    document.getElementById('kanban-todo').querySelector('.drop-zone').appendChild(card);
    input.value = "";
    userProfile.masteredSeeds++;
    document.getElementById('stat-planted').innerText = userProfile.masteredSeeds;
}

function allowDrop(ev) { ev.preventDefault(); }

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const targetCol = ev.target.closest('.doodle-col');
    if (targetCol) {
        targetCol.querySelector('.drop-zone').appendChild(document.getElementById(data));
    }
}

// --- 3. LESSON ENGINE ---
function activateSubjectJourney(name) {
    currentSubject = name;
    showPage('lesson-page');
    document.getElementById('current-lesson-topic').textContent = name;
    document.getElementById('lesson-content-summary').innerHTML = `
        <p>The subject of <strong>${name}</strong> is now Sprouting. Focus your mind to help it Bloom.</p>
    `;
    document.getElementById('lesson-continue-btn').style.display = 'block';
}

function continueJourney() {
    document.getElementById('lesson-content-summary').innerHTML += `
        <p><em>Lesson Expanded:</em> Use the Sun Dial to track your deep focus session for this subject.</p>
    `;
    document.getElementById('lesson-continue-btn').style.display = 'none';
}

// --- 4. NAVIGATION & TIMER ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
}

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
                alert("Your sprint is complete!");
                btn.innerText = "Start Sprint";
            }
        }, 1000);
    } else {
        clearInterval(timerInterval);
        btn.innerText = "Start Sprint";
    }
}

function playChime() {
    const context = new AudioContext();
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.connect(gain);
    gain.connect(context.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, context.currentTime); // A4 note
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1);
    osc.stop(context.currentTime + 1);
}

// --- 5. SYSTEM RESET ---
function confirmReset() {
    if (confirm("Return to the beginning? Your garden remains, but your persona resets.")) {
        document.getElementById('onboarding-overlay').style.display = 'flex';
        document.getElementById('app-shell').style.display = 'none';
        document.getElementById('step-1').style.display = 'block';
        document.getElementById('step-2').style.display = 'none';
    }
}
