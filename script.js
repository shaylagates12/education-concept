let userProfile = { role: '', focus: '', layout: '', rank: 'Novice', score: 0 };

// 1. ONBOARDING FLOW
function nextOnboarding(role) {
    userProfile.role = role;
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'block';
}

function completeOnboarding() {
    userProfile.focus = document.getElementById('focus-pref').value;
    userProfile.layout = document.getElementById('layout-pref').value;
    
    // Switch to visual mode if preferred
    if(userProfile.layout === 'visual') document.body.classList.add('visual-mode');
    
    document.body.classList.add('onboarding-complete');
    saveProgress();
}

// 2. PAGE NAVIGATION
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    
    document.getElementById(pageId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 3. RANK SYSTEM
const ranks = ["Novice", "Advanced Beginner", "Competent", "Proficient", "Expert"];
function takeQuiz() {
    userProfile.score += 25;
    let idx = Math.min(Math.floor(userProfile.score / 50), 4);
    userProfile.rank = ranks[idx];
    document.getElementById('rank-display').textContent = userProfile.rank;
    saveProgress();
}

function saveProgress() {
    localStorage.setItem('seedling_user', JSON.stringify(userProfile));
}

// Check for returning user
window.onload = () => {
    const saved = localStorage.getItem('seedling_user');
    if (saved) {
        userProfile = JSON.parse(saved);
        document.body.classList.add('onboarding-complete');
        document.getElementById('rank-display').textContent = userProfile.rank;
    }
};
