let currentSubject = "";
let currentLessonIndex = 0;
let currentQuizIndex = 0;

const subjectData = {
    "Life Insurance": {
        lessons: [
            { title: "The Policy", text: "The 'Policy' is the legal contract between the insurer and the owner.", type: "image", content: "https://via.placeholder.com/600x350?text=The+Policy", defs: ["Policy: Legal agreement."] },
            { title: "The Premium", text: "The 'Premium' is the payment to keep the coverage active.", type: "image", content: "https://via.placeholder.com/600x350?text=Premium", defs: ["Premium: Cost of insurance."] },
            { title: "The Beneficiary", text: "The person who receives funds if you pass away.", type: "image", content: "https://via.placeholder.com/600x350?text=Beneficiary", defs: ["Beneficiary: Fund recipient."] },
            { title: "Underwriting", text: "Process of risk assessment.", type: "video", content: "https://www.w3schools.com/html/mov_bbb.mp4", defs: ["Underwriting: Risk check."] },
            { title: "Death Benefit", text: "Total sum paid by the policy.", type: "image", content: "https://via.placeholder.com/600x350?text=Death+Benefit", defs: ["Death Benefit: Payout."] },
            { title: "Term Length", text: "Duration for which a policy provides coverage.", type: "image", content: "https://via.placeholder.com/600x350?text=Term", defs: ["Term: Set time."] },
            { title: "Cash Value", text: "Savings portion of a Whole Life policy.", type: "image", content: "https://via.placeholder.com/600x350?text=Cash+Value", defs: ["Cash Value: Equity."] },
            { title: "The Rider", text: "Optional add-on for extra benefits.", type: "image", content: "https://via.placeholder.com/600x350?text=Rider", defs: ["Rider: Add-on."] },
            { title: "Lapse", text: "When a policy ends due to non-payment.", type: "image", content: "https://via.placeholder.com/600x350?text=Lapse", defs: ["Lapse: Termination."] },
            { title: "Grace Period", text: "Extra time to pay before a lapse.", type: "video", content: "https://www.w3schools.com/html/mov_bbb.mp4", defs: ["Grace Period: Buffer."] }
        ],
        flashcards: [{ q: "What is a Rider?", a: "An optional add-on to a policy." }],
        quiz: [
            { q: "What is the cost of insurance?", options: ["Payout", "Premium", "Tax", "Equity"], correct: 1 },
            { q: "Who receives the money?", options: ["Agent", "Insurer", "Beneficiary", "Underwriter"], correct: 2 },
            { q: "What describes risk assessment?", options: ["Underwriting", "Lapsing", "Riding", "Saving"], correct: 0 },
            { q: "What is the payment buffer called?", options: ["Premium Time", "Grace Period", "Extension", "Lapse Window"], correct: 1 }
        ]
    }
    // (Other subjects follow this same structure)
};

function enterGarden() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('app-shell').style.display = 'flex';
    showPage('kanban-page');
}

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
    });
    const target = document.getElementById(id);
    target.classList.add('active');
    target.style.display = (id === 'lesson-page') ? 'grid' : 'block'; // Fixes squishing
}

function loadLesson(name, index = 0) {
    currentSubject = name;
    currentLessonIndex = index;
    const data = subjectData[name].lessons[index];
    document.getElementById('lesson-title').innerText = data.title;
    document.getElementById('lesson-text').innerText = data.text;
    const mc = document.getElementById('media-container');
    mc.innerHTML = data.type === "video" ? `<video controls width="100%"><source src="${data.content}"></video>` : `<img src="${data.content}" style="width:100%">`;
    updateProgress(name, index);
    showPage('lesson-page');
}

function updateProgress(name, index) {
    const total = subjectData[name].lessons.length;
    const percent = ((index + 1) / total) * 100;
    document.getElementById('progress-vine').style.width = percent + "%";
    document.querySelector('.vine-leaf').style.left = `calc(${percent}% - 15px)`;
}
// (PlantSeed, Drop/Allow, AskPip functions are preserved here)
