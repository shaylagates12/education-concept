/* --- KEEPING ALL YOUR ORIGINAL DATA --- */
const SUPABASE_URL = 'https://nxowmzxwckzswsqsnhih.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uK3TDV-ERwEc1JIpxSy5KA_gBXRGEWZ';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let currentSubject = "";
let currentLessonIndex = 0;
let currentHarvestIndex = 0;

/* --- NEW KNOWLEDGE BASE (TAXONOMY) --- */
const knowledgeBase = {
    categories: [
        { id: "academic", name: "Academic Learning" },
        { id: "career", name: "Career Pathways" },
        { id: "life_skills", name: "Life Skills & Personal Dev" }
    ],
    subjects: [
        // Existing Data mapped
        { id: "life_insurance", name: "Life Insurance", categoryId: "life_skills", desc: "Understand policies, premiums, and beneficiaries.", dataKey: "Life Insurance" },
        { id: "taxes", name: "Taxes", categoryId: "life_skills", desc: "Learn about income, deductions, and filing taxes.", dataKey: "Taxes" },
        { id: "stock_market", name: "Stock Market", categoryId: "career", desc: "Basics of shares, portfolios, and investing.", dataKey: "Stock Market" },
        // New Data for Phase 1
        { id: "nursing", name: "Nursing & Health", categoryId: "career", desc: "Patient care, medical terms, and clinical skills.", dataKey: null },
        { id: "cs", name: "Computer Science", categoryId: "academic", desc: "Programming, algorithms, and software design.", dataKey: null },
        { id: "mental_health", name: "Mental Health", categoryId: "life_skills", desc: "Stress management, anxiety coping, and wellbeing.", dataKey: null },
        { id: "business", name: "Business Management", categoryId: "career", desc: "Leadership, operations, and corporate strategy.", dataKey: null }
    ]
};

const subjectData = {
    "Life Insurance": {
        lessons: [
            { title: "The Policy", text: "The 'Policy' is the formal legal contract between the insurance company and the owner.", type: "image", content: "policy.jpg", defs: ["Policy: The legal agreement."] },
            { title: "The Premium", text: "A 'Premium' is the scheduled payment required to keep your insurance active.", type: "image", content: "premium.jpg", defs: ["Premium: The cost of coverage."] },
            { title: "The Beneficiary", text: "The 'Beneficiary' is the person or entity designated to receive the death benefit.", type: "image", content: "beneficiary.jpg", defs: ["Beneficiary: The fund recipient."] },
            { title: "Underwriting", text: "The process where the insurer evaluates your risk level to set your rates.", type: "video", content: "underwriting_clip.mp4", defs: ["Underwriting: Risk assessment."] },
            { title: "Death Benefit", text: "The 'Death Benefit' is the total sum of money paid out upon the insured's passing.", type: "image", content: "benefit.jpg", defs: ["Death Benefit: The payout sum."] },
            { title: "Term Length", text: "The specific duration (e.g., 10, 20, 30 years) a policy remains in effect.", type: "image", content: "term.jpg", defs: ["Term: The time limit."] },
            { title: "Cash Value", text: "The savings component found in permanent policies that grows over time.", type: "image", content: "cash_value.jpg", defs: ["Cash Value: Built-in equity."] },
            { title: "The Rider", text: "A 'Rider' is an optional add-on that provides extra benefits like 'Accidental Death'.", type: "image", content: "rider.jpg", defs: ["Rider: Policy add-on."] },
            { title: "Lapse", text: "A 'Lapse' occurs when the policy ends because premiums were not paid.", type: "image", content: "lapse.jpg", defs: ["Lapse: Policy termination."] },
            { title: "Grace Period", text: "The extra time (usually 30 days) allowed to pay a premium before the policy lapses.", type: "video", content: "grace_period.mp4", defs: ["Grace Period: Payment buffer."] }
        ],
        quiz: [
            { q: "What is the cost to keep a policy active?", options: ["The Benefit", "The Premium", "The Rider", "The Lapse"], correct: 1 },
            { q: "Who receives the money from a claim?", options: ["Underwriter", "Insurer", "Beneficiary", "Agent"], correct: 2 },
            { q: "What is an optional policy add-on called?", options: ["A Vine", "A Rider", "A Term", "A Premium"], correct: 1 },
            { q: "The process of evaluating risk is known as:", options: ["Underwriting", "Harvesting", "Blooming", "Lapsing"], correct: 0 }
        ]
    },
    "Taxes": {
        lessons: [
            { title: "Gross Income", text: "Your total earnings before any taxes or deductions are taken out.", type: "image", content: "gross.jpg", defs: ["Gross: Total before cuts."] },
            { title: "Deductions", text: "Expenses you can subtract from your income to lower your tax bill.", type: "image", content: "deduction.jpg", defs: ["Deduction: Tax-lowering expense."] },
            { title: "Tax Credit", text: "A 'Credit' is a dollar-for-dollar reduction of the actual tax you owe.", type: "image", content: "credit.jpg", defs: ["Credit: Direct tax reduction."] },
            { title: "W-2 Form", text: "The form employers send you showing how much you earned and paid in taxes.", type: "image", content: "w2.jpg", defs: ["W-2: Income summary."] },
            { title: "1040 Form", text: "The standard form individuals use to file their annual income tax returns.", type: "image", content: "1040.jpg", defs: ["1040: The main tax form."] },
            { title: "Dependents", text: "People (usually children) who rely on you for financial support.", type: "image", content: "dependent.jpg", defs: ["Dependent: Supported person."] },
            { title: "Tax Bracket", text: "The range of incomes taxed at a specific percentage rate.", type: "video", content: "brackets.mp4", defs: ["Bracket: Your tax percentage."] },
            { title: "Withholding", text: "The amount of money your employer takes from your check to pay the IRS.", type: "image", content: "withholding.jpg", defs: ["Withholding: Pre-paid taxes."] },
            { title: "Refund", text: "Money sent back to you if you overpaid your taxes during the year.", type: "image", content: "refund.jpg", defs: ["Refund: Overpayment return."] },
            { title: "Audit", text: "A formal examination of your tax return by the IRS for accuracy.", type: "video", content: "audit.mp4", defs: ["Audit: Tax inspection."] }
        ],
        quiz: [
            { q: "Which form is used to file your annual return?", options: ["W-2", "1040", "1099", "I-9"], correct: 1 },
            { q: "What is income BEFORE taxes called?", options: ["Net Income", "Taxable Income", "Gross Income", "Refund"], correct: 2 },
            { q: "What lowers the total amount of income that can be taxed?", options: ["A Credit", "An Audit", "A Deduction", "A Bracket"], correct: 2 },
            { q: "A dollar-for-dollar reduction in taxes owed is a:", options: ["Refund", "W-2", "Withholding", "Tax Credit"], correct: 3 }
        ]
    },
    "Stock Market": {
        lessons: [
            { title: "Share", text: "A 'Share' represents a unit of ownership in a specific corporation.", type: "image", content: "share.jpg", defs: ["Share: Piece of a company."] },
            { title: "Dividend", text: "A portion of a company's profit paid out to its shareholders.", type: "image", content: "dividend.jpg", defs: ["Dividend: Profit sharing."] },
            { title: "Bull Market", text: "A period where stock prices are rising and investors are confident.", type: "image", content: "bull.jpg", defs: ["Bull: Rising prices."] },
            { title: "Bear Market", text: "A period where stock prices are falling and the outlook is gloomy.", type: "image", content: "bear.jpg", defs: ["Bear: Falling prices."] },
            { title: "Portfolio", text: "The entire collection of investments owned by an individual.", type: "image", content: "portfolio.jpg", defs: ["Portfolio: Your collection."] },
            { title: "Diversification", text: "Spreading your money across different stocks to reduce risk.", type: "video", content: "diversify.mp4", defs: ["Diversification: Risk spreading."] },
            { title: "Ticker Symbol", text: "A unique 1-5 letter code identifying a specific stock (e.g., AAPL).", type: "image", content: "ticker.jpg", defs: ["Ticker: Company code."] },
            { title: "Brokerage", text: "The platform or firm that allows you to buy and sell stocks.", type: "image", content: "broker.jpg", defs: ["Brokerage: Trading platform."] },
            { title: "Index Fund", text: "A fund that tracks a specific group of stocks (like the S&P 500).", type: "image", content: "index.jpg", defs: ["Index Fund: Grouped stocks."] },
            { title: "Volatility", text: "How much a stock's price swings up and down over time.", type: "video", content: "volatility.mp4", defs: ["Volatility: Price swings."] }
        ],
        quiz: [
            { q: "What represents one unit of company ownership?", options: ["A Dividend", "A Share", "A Portfolio", "A Ticker"], correct: 1 },
            { q: "A market with rising prices is called a:", options: ["Bear Market", "Seed Market", "Bull Market", "Pulp Market"], correct: 2 },
            { q: "What is the strategy of spreading risk called?", options: ["Diversification", "Lapsing", "Withholding", "Harvesting"], correct: 0 },
            { q: "What is a 'Dividend'?", options: ["A stock code", "A tax form", "A share of profit", "A unit of risk"], correct: 2 }
        ]
    }
};

/* --- FIXED FUNCTIONS --- */

function enterGarden() {
    // FIXED: Corrected the property call
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';
    showPage('kanban-page');
}

function showPage(id) {
    // FIXED: This now clears all pages properly before showing the new one
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none'; 
    });
    
    const target = document.getElementById(id);
    target.classList.add('active');
    target.style.display = 'block';
    
    if (id === 'library-page') {
        renderLibraryCategories();
    }
}

function plantSeed() {
    const input = document.getElementById('new-subject');
    const rawName = input.value.trim();
    const name = Object.keys(subjectData).find(key => key.toLowerCase() === rawName.toLowerCase());
    if (name) {
        const card = createKanbanCard(name);
        document.getElementById('zone-todo').appendChild(card);
        input.value = "";
        updateKanbanCounts();
    } else {
        alert("Please enter: Life Insurance, Taxes, or Stock Market");
    }
}

function continueLearning() {
    if (currentSubject) {
        loadLesson(currentSubject, currentLessonIndex);
    } else {
        showPage('library-page');
    }
}

function findCardBySubject(subjectName) {
    const cards = document.querySelectorAll('.card');
    for (let card of cards) {
        if (card.querySelector('.card-title') && card.querySelector('.card-title').innerText === subjectName) {
            return card;
        } else if (card.innerText === subjectName) { // Fallback for legacy simple cards
            return card;
        }
    }
    return null;
}

function moveCardToZone(subjectName, zoneId) {
    const card = findCardBySubject(subjectName);
    const targetZone = document.getElementById(zoneId);
    if (card && targetZone && card.parentElement !== targetZone) {
        targetZone.appendChild(card);
        updateKanbanCounts();
    }
    return card;
}

function loadLesson(name, index = 0) {
    // Force save any pending note before switching lesson contexts
    if (saveTimeout) {
        clearTimeout(saveTimeout);
        saveNote();
    }

    currentSubject = name;
    currentLessonIndex = index;
    const data = subjectData[name].lessons[index];
    
    // Update text
    document.getElementById('lesson-title').innerText = data.title;
    document.getElementById('lesson-text').innerText = data.text;
    
    // Update the "Today Focus" text
    if(document.getElementById('focus-now-title')) {
        document.getElementById('focus-now-title').innerText = name + ` (Lesson ${index + 1})`;
    }
    
    // Auto Move Kanaban Card to "Doing"
    moveCardToZone(name, 'zone-doing');
    
    // FIXED: Populating definitions box
    const defBox = document.getElementById('definitions-box');
    const defList = document.getElementById('definitions-list');
    if (data.defs && data.defs.length > 0) {
        defList.innerHTML = data.defs.map(d => `<li>${d}</li>`).join('');
        defBox.style.display = 'block';
    } else {
        defBox.style.display = 'none';
        defList.innerHTML = '';
    }

    // FIXED: Better media handling
    const mc = document.getElementById('media-container');
    if(data.type === "video") {
        mc.innerHTML = `<video controls width="100%"><source src="${data.content}"></video>`;
    } else {
        mc.innerHTML = `<img src="${data.content}" onerror="this.src='https://placehold.co/600x400?text=Missing+Asset'" style="width:100%; border-radius: 8px;">`;
    }
    
    // Update the "Active Subject" display in the quiz page early
    if(document.getElementById('active-subject-display')) {
        document.getElementById('active-subject-display').innerText = name;
    }
    
    updateProgress(name, index);
    showPage('lesson-page');
    
    // Load note for this lesson
    document.getElementById('save-status-text').innerText = "Loading...";
    loadNote(name, index);
}

function nextLesson() {
    if (!currentSubject) return;
    const lessons = subjectData[currentSubject].lessons;
    if (currentLessonIndex < lessons.length - 1) {
        currentLessonIndex++;
        loadLesson(currentSubject, currentLessonIndex);
    } else {
        alert("The Grove is fully grown! Heading to Harvest.");
        showPage('quiz-page');
    }
}

function updateProgress(name, index) {
    const total = subjectData[name].lessons.length;
    const percent = ((index + 1) / total) * 100;
    document.getElementById('progress-vine').style.width = percent + "%";
    document.querySelector('.vine-leaf').style.left = `calc(${percent}% - 15px)`;
}

/* --- DATABASE LOGIC --- */
let loggedInUserId = null;

async function handleSignup() {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value.trim();
    const errorMsg = document.getElementById('auth-error');
    
    if(!email || !password) {
        errorMsg.innerText = "Please fill in email and password.";
        return;
    }
    
    const { data: existingUser } = await supabaseClient.from('users').select('*').eq('email', email).maybeSingle();
    if(existingUser) {
        errorMsg.innerText = "Email already exists! Please login.";
        return;
    }
    
    const { data, error } = await supabaseClient.from('users').insert([{ email, password }]).select().single();
    if(error) {
        errorMsg.innerText = "Error signing up: " + error.message;
    } else {
        loggedInUserId = data.id;
        enterGarden();
    }
}

async function handleLogin() {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value.trim();
    const errorMsg = document.getElementById('auth-error');
    
    if(!email || !password) {
        errorMsg.innerText = "Please fill in email and password.";
        return;
    }
    
    const { data, error } = await supabaseClient.from('users').select('*').eq('email', email).eq('password', password).maybeSingle();
    
    if (error) {
        errorMsg.innerText = "Error logging in.";
    } else if (data) {
        loggedInUserId = data.id;
        enterGarden();
    } else {
        errorMsg.innerText = "Invalid email or password.";
    }
}

async function loadNote(subject, index) {
    if (!loggedInUserId) return; // safety
    const notesArea = document.getElementById('field-notes');
    notesArea.value = "Loading note...";
    notesArea.disabled = true;

    const { data, error } = await supabaseClient
        .from('notes')
        .select('note_text')
        .eq('user_id', loggedInUserId)
        .eq('subject', subject)
        .eq('lesson_index', index)
        .maybeSingle();
    
    notesArea.disabled = false;

    if (error) {
        console.error("Error loading note:", error);
        notesArea.value = "";
        document.getElementById('save-status-text').innerText = "Unsaved";
    } else if (data) {
        notesArea.value = data.note_text || "";
        document.getElementById('save-status-text').innerText = "Loaded from cloud";
    } else {
        notesArea.value = "";
        document.getElementById('save-status-text').innerText = "New blank note";
    }
}

let saveTimeout = null;
async function saveNote() {
    saveTimeout = null; // Clear timeout indicator
    if (!currentSubject || !loggedInUserId) return;
    
    const notesArea = document.getElementById('field-notes');
    const noteText = notesArea.value;
    const statusText = document.getElementById('save-status-text');
    
    statusText.innerText = "Saving...";
    
    const { error } = await supabaseClient
        .from('notes')
        .upsert({ 
            user_id: loggedInUserId,
            subject: currentSubject, 
            lesson_index: currentLessonIndex, 
            note_text: noteText,
            updated_at: new Date().toISOString()
        }, { onConflict: 'user_id,subject,lesson_index' });
        
    if (error) {
        statusText.innerText = "Error saving";
        statusText.style.color = "#e74c3c";
        console.error("Error saving note:", error);
    } else {
        const timeStr = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        statusText.innerText = `Saved at ${timeStr}`;
        statusText.style.color = "var(--emerald-green)";
        console.log("Note saved successfully.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const notesArea = document.getElementById('field-notes');
    if (notesArea) {
        notesArea.addEventListener('input', () => {
            if (saveTimeout) clearTimeout(saveTimeout);
            saveTimeout = setTimeout(saveNote, 1000);
        });
    }
});

/* --- KANBAN LOGIC & AUTOMATION --- */

function dragStart(e) { e.dataTransfer.setData("text", e.target.id); e.target.classList.add('dragging'); }
function dragEnd(e) { e.target.classList.remove('dragging'); updateKanbanCounts(); }
function allow(e) { e.preventDefault(); e.target.closest('.kanban-col')?.classList.add('drag-over'); }
function dragLeave(e) { e.target.closest('.kanban-col')?.classList.remove('drag-over'); }

function drop(e) {
    e.preventDefault();
    const col = e.target.closest('.kanban-col');
    if (col) col.classList.remove('drag-over');
    
    const data = e.dataTransfer.getData("text");
    const card = document.getElementById(data);
    const zone = col?.querySelector('.zone');
    if (zone && card) {
        zone.appendChild(card);
        updateKanbanCounts();
    }
}

function updateKanbanCounts() {
    ['todo', 'doing', 'done'].forEach(col => {
        const zone = document.getElementById(`zone-${col}`);
        const count = zone.querySelectorAll('.card').length;
        document.getElementById(`count-${col}`).innerText = count;
        
        const empty = zone.querySelector('.empty-state');
        if(empty) {
            empty.style.display = count > 0 ? 'none' : 'block';
        }
    });
    
    // Increment lessons stat if cards in done just conceptually for the UI
    const doneCount = document.getElementById('zone-done').querySelectorAll('.card').length;
    if(document.getElementById('stat-lessons')) {
        document.getElementById('stat-lessons').innerText = doneCount;
    }
}

function createKanbanCard(subjectName) {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.id = 'seed-' + Date.now();
    card.ondragstart = dragStart;
    card.ondragend = dragEnd;
    
    let catName = "Subject";
    const subObj = knowledgeBase.subjects.find(s => s.name.toLowerCase() === subjectName.toLowerCase() || s.dataKey === subjectName);
    if (subObj) {
        const catObj = knowledgeBase.categories.find(c => c.id === subObj.categoryId);
        if (catObj) catName = catObj.name;
    }
    
    let timeEst = subjectData[subjectName] ? (subjectData[subjectName].lessons.length * 5) + "m" : "20m";

    card.innerHTML = `
        <div class="card-content">
            <span class="card-tag">${catName}</span>
            <h4 class="card-title">${subjectName}</h4>
            <div class="card-meta"><span>⏱️ ${timeEst}</span><span style="opacity:0.3">✔</span></div>
        </div>
    `;

    card.onclick = () => {
        if (!subjectData[subjectName]) {
            alert("Detailed lessons for " + subjectName + " will be added in Phase 2!");
            return;
        }
        loadLesson(subjectName, 0);
    };
    return card;
}

/* --- HARVEST / QUIZ LOGIC --- */
function startHarvest(mode) {
    if (!currentSubject) {
        alert("Select a subject in the Garden first!");
        showPage('kanban-page');
        return;
    }
    document.getElementById('quiz-choice-screen').style.display = 'none';
    document.getElementById('harvest-action-area').style.display = 'block';
    currentHarvestIndex = 0;

    if (mode === 'flashcards') {
        document.getElementById('flashcard-mode').style.display = 'block';
        document.getElementById('quiz-mode').style.display = 'none';
        loadFlashcard();
    } else {
        document.getElementById('flashcard-mode').style.display = 'none';
        document.getElementById('quiz-mode').style.display = 'block';
        loadQuiz();
    }
}

function loadFlashcard() {
    const cardElement = document.querySelector('.flashcard');
    if(cardElement) cardElement.classList.remove('flipped');
    
    const lessons = subjectData[currentSubject].lessons;
    const item = lessons[currentHarvestIndex];
    document.getElementById('card-front').innerText = item.title;
    document.getElementById('card-back').innerText = item.defs[0];
}

function nextCard() {
    if (currentHarvestIndex < subjectData[currentSubject].lessons.length - 1) {
        currentHarvestIndex++;
        loadFlashcard();
    }
}

function prevCard() {
    if (currentHarvestIndex > 0) {
        currentHarvestIndex--;
        loadFlashcard();
    }
}

let isAnimating = false;

function loadQuiz() {
    isAnimating = false;
    const quizData = subjectData[currentSubject].quiz[currentHarvestIndex];
    document.getElementById('quiz-question').innerText = quizData.q;
    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = "";

    quizData.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = "journey-btn";
        btn.innerText = opt;
        btn.onclick = () => {
            if (isAnimating) return;
            isAnimating = true;

            if (i === quizData.correct) {
                btn.style.backgroundColor = "var(--emerald-green)";
                btn.style.color = "white";
                setTimeout(() => {
                    if (currentHarvestIndex < subjectData[currentSubject].quiz.length - 1) {
                        currentHarvestIndex++;
                        loadQuiz();
                    } else {
                        // AUTO-MOVE KANBAN CARD
                        const finishedCard = moveCardToZone(currentSubject, 'zone-done');
                        if (finishedCard) {
                            finishedCard.classList.add('pulse-animate');
                            setTimeout(() => finishedCard.classList.remove('pulse-animate'), 600);
                        }
                        
                        alert("Harvest Complete! The seed has bloomed in your Garden.");
                        backToChoice();
                    }
                }, 600);
            } else {
                btn.style.backgroundColor = "#e74c3c";
                setTimeout(() => { isAnimating = false; btn.style.backgroundColor = ""; }, 600);
            }
        };
        optionsDiv.appendChild(btn);
    });
}

function backToChoice() {
    document.getElementById('quiz-choice-screen').style.display = 'block';
    document.getElementById('harvest-action-area').style.display = 'none';
}

function askPip() {
    const input = document.getElementById('pip-input');
    const display = document.getElementById('chat-display');
    const msg = input.value.trim();
    
    if (msg) {
        display.innerHTML += `<p style="margin: 5px 0; font-size: 0.9rem;"><strong>You:</strong> ${msg}</p>`;
        input.value = "";
        
        setTimeout(() => {
            display.innerHTML += `<p style="margin: 5px 0; font-size: 0.9rem; color: var(--emerald-green);"><strong>Pip:</strong> I'm taking notes! 🌱</p>`;
            display.scrollTop = display.scrollHeight;
        }, 500);
    }
}

/* --- TIMER LOGIC --- */
let timerInterval = null;
let timeLeft = 0; // seconds
let isTimerRunning = false;

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function setTimer(minutes) {
    clearInterval(timerInterval);
    timeLeft = minutes * 60;
    isTimerRunning = false;
    if(document.getElementById('timer-display')) {
        document.getElementById('timer-display').innerText = formatTime(timeLeft);
        document.getElementById('timer-toggle-btn').innerText = "Start";
        document.getElementById('timer-toggle-btn').style.background = "var(--dusty-pink)";
    }
}

function startQuickTimer(minutes) {
    showPage('lesson-page');
    setTimer(minutes);
    toggleTimer();
}

function toggleTimer() {
    if (timeLeft <= 0) return;
    const btn = document.getElementById('timer-toggle-btn');
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        btn.innerText = "Resume";
        btn.style.background = "var(--dusty-pink)";
    } else {
        isTimerRunning = true;
        btn.innerText = "Pause";
        btn.style.background = "var(--emerald-green)";
        btn.style.color = "white";
        timerInterval = setInterval(() => {
            timeLeft--;
            document.getElementById('timer-display').innerText = formatTime(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                isTimerRunning = false;
                btn.innerText = "Start";
                btn.style.background = "var(--dusty-pink)";
                btn.style.color = "var(--noir-de-vigne)";
                alert("Time is up! Great session 🌿");
            }
        }, 1000);
    }
}

function resetTimer() {
    setTimer(15);
}

// Call on startup
document.addEventListener('DOMContentLoaded', () => {
    setTimer(15);
    updateKanbanCounts();
});
function renderLibraryCategories() {
    const container = document.getElementById('categories-container');
    container.innerHTML = "";

    knowledgeBase.categories.forEach(cat => {
        const catHead = document.createElement('div');
        catHead.style.fontWeight = 'bold';
        catHead.style.marginTop = '15px';
        catHead.style.color = 'var(--egyptian-earth)';
        catHead.style.borderBottom = '1px solid var(--creased-khaki)';
        catHead.style.paddingBottom = '5px';
        catHead.innerText = cat.name;
        container.appendChild(catHead);

        const subjects = knowledgeBase.subjects.filter(s => s.categoryId === cat.id);
        subjects.forEach(sub => {
            const btn = document.createElement('button');
            btn.className = "journey-btn";
            btn.style.padding = "10px";
            btn.style.marginTop = "8px";
            btn.style.fontSize = "1rem";
            btn.style.textAlign = "left";
            btn.innerText = `📄 ${sub.name}`;
            btn.onclick = () => showLibrarySubjectCard(sub.id);
            container.appendChild(btn);
        });
    });
}

function handleLibrarySearch() {
    const query = document.getElementById('library-search').value.toLowerCase();
    const container = document.getElementById('categories-container');
    container.innerHTML = "";

    if (!query) {
        renderLibraryCategories();
        return;
    }

    const results = knowledgeBase.subjects.filter(s => 
        s.name.toLowerCase().includes(query) || s.desc.toLowerCase().includes(query)
    );
    
    if (results.length === 0) {
        container.innerHTML = "<p style='font-family: Caveat, cursive; font-size: 1.2rem; color: var(--egyptian-earth);'>No paths discovered yet.</p>";
        return;
    }

    results.forEach(sub => {
        const btn = document.createElement('button');
        btn.className = "journey-btn";
        btn.style.padding = "10px";
        btn.style.marginTop = "8px";
        btn.style.fontSize = "1rem";
        btn.style.textAlign = "left";
        btn.innerText = `📄 ${sub.name}`;
        btn.onclick = () => showLibrarySubjectCard(sub.id);
        container.appendChild(btn);
    });
}

let currentLibrarySubject = null;

function showLibrarySubjectCard(subjectId) {
    const sub = knowledgeBase.subjects.find(s => s.id === subjectId);
    if (!sub) return;
    
    currentLibrarySubject = sub;
    
    document.getElementById('subject-card-placeholder').style.display = 'none';
    const card = document.getElementById('library-subject-card');
    card.style.display = 'block';
    card.classList.remove('flipped');
    
    const cat = knowledgeBase.categories.find(c => c.id === sub.categoryId);
    
    // Front update
    document.getElementById('lib-card-title').innerText = sub.name;
    document.getElementById('lib-card-category').innerText = cat ? cat.name : "Uncategorized";
    
    // Back update
    document.getElementById('lib-card-back-title').innerText = sub.name + " Overview";
    document.getElementById('lib-card-desc').innerText = sub.desc;
    
    const topicsList = document.getElementById('lib-card-topics');
    topicsList.innerHTML = "";
    
    if (sub.dataKey && subjectData[sub.dataKey]) {
        const lessons = subjectData[sub.dataKey].lessons;
        lessons.slice(0, 4).forEach(l => {
            topicsList.innerHTML += `<li>${l.title}</li>`;
        });
        if (lessons.length > 4) topicsList.innerHTML += `<li>...and more in the Grove!</li>`;
    } else {
        topicsList.innerHTML = "<li>Beginner Roadmap</li><li>Core Concepts</li><li>Project Portfolio Ideas</li><li>Next Career Steps</li>";
    }
}

function plantSubjectFromLibrary(event) {
    event.stopPropagation(); // Stop card from flipping
    if (!currentLibrarySubject) return;
    
    const nameToPlant = currentLibrarySubject.dataKey || currentLibrarySubject.name;
    const input = document.getElementById('new-subject');
    input.value = nameToPlant;
    
    showPage('kanban-page');
    
    if (subjectData[nameToPlant]) {
        plantSeed();
    } else {
        const card = createKanbanCard(nameToPlant);
        document.getElementById('zone-todo').appendChild(card);
        input.value = "";
        updateKanbanCounts();
    }
}
