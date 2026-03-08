let currentSubject = "";
let currentLessonIndex = 0;
let currentQuizIndex = 0;

const subjectData = {
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
    "Taxes": {
        lessons: [
            { title: "Taxable Income", text: "Your total income minus allowable deductions.", type: "image", content: "https://via.placeholder.com/600x350?text=Taxable+Income", defs: ["Taxable Income: What you pay tax on."] },
            { title: "The W-2 Form", text: "A form your employer sends reporting wages and taxes.", type: "image", content: "https://via.placeholder.com/600x350?text=W-2+Form", defs: ["W-2: Annual wage report."] }
            // ... Add remaining 8 tax lessons here
        ],
        flashcards: [{ q: "Credit vs Deduction?", a: "Credits lower tax; Deductions lower taxable income." }],
        quiz: [
            { q: "Which lowers your tax bill dollar-for-dollar?", options: ["Deduction", "Exemption", "Tax Credit", "Audit"], correct: 2 },
            { q: "What form reports your annual salary?", options: ["1040", "W-2", "W-4", "1099"], correct: 1 },
            { q: "What is FICA used for?", options: ["Highways", "Military", "Social Security", "Education"], correct: 2 },
            { q: "A profit from selling a stock is called:", options: ["Interest", "Dividend", "Capital Gain", "Credit"], correct: 2 }
        ]
    }
    // ... Repeat structure for "Stock Market" and "Finances"
};

function enterGarden() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';
}

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function plantSeed() {
    const input = document.getElementById('new-subject');
    const name = input.value.trim();
    if (!name || !subjectData[name]) {
        alert("Enter: Life Insurance, Taxes, Stock Market, or Finances.");
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
    let targetZone = e.target.classList.contains('zone') ? e.target : e.target.closest('.col').querySelector('.zone');
    targetZone.appendChild(draggedCard);
}

function loadLesson(name, index = 0) {
    currentSubject = name;
    currentLessonIndex = index;
    const data = subjectData[name].lessons[index];
    document.getElementById('lesson-title').innerText = data.title;
    document.getElementById('lesson-text').innerText = data.text;
    const mc = document.getElementById('media-container');
    mc.innerHTML = data.type === "video" ? `<video controls width="100%"><source src="${data.content}"></video>` : `<img src="${data.content}" style="width:100%">`;
    const dl = document.getElementById('definitions-list');
    dl.innerHTML = "";
    data.defs.forEach(d => dl.innerHTML += `<li>${d}</li>`);
    document.getElementById('definitions-box').style.display = "block";
    updateProgress(name, index);
    loadHarvest(name);
    showPage('lesson-page');
}

function updateProgress(name, index) {
    const total = subjectData[name].lessons.length;
    const percent = ((index + 1) / total) * 100;
    document.getElementById('progress-vine').style.width = percent + "%";
    document.querySelector('.vine-leaf').style.left = `calc(${percent}% - 15px)`;
}

function loadHarvest(name) {
    const data = subjectData[name];
    const card = document.querySelector('.flashcard');
    card.className = 'flashcard ' + 'deck-' + name.toLowerCase().replace(" ", "-");
    document.getElementById('card-front').innerHTML = `<h3>${data.flashcards[0].q}</h3>`;
    document.getElementById('card-back').innerHTML = `<p>${data.flashcards[0].a}</p>`;
    currentQuizIndex = 0;
    displayQuizQuestion(name);
}

function displayQuizQuestion(name) {
    const quiz = subjectData[name].quiz[currentQuizIndex];
    document.getElementById('quiz-question').innerText = `Question ${currentQuizIndex + 1}: ${quiz.q}`;
    const container = document.getElementById('quiz-options');
    container.innerHTML = "";
    quiz.options.forEach((opt, i) => {
        container.innerHTML += `<button class="journey-btn" onclick="checkQuiz(${i}, ${quiz.correct})">${opt}</button>`;
    });
}

function checkQuiz(choice, correct) {
    if (choice === correct) {
        currentQuizIndex++;
        if (currentQuizIndex < subjectData[currentSubject].quiz.length) {
            displayQuizQuestion(currentSubject);
        } else {
            alert("Mastery achieved!");
        }
    } else {
        alert("Try again!");
        currentQuizIndex = 0;
        displayQuizQuestion(currentSubject);
    }
}

function nextLesson() {
    if (currentLessonIndex < subjectData[currentSubject].lessons.length - 1) {
        loadLesson(currentSubject, currentLessonIndex + 1);
    }
}
