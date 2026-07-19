// قراءة اللغة التي اختارها المستخدم من الصفحة الرئيسية
let userLang = localStorage.getItem('ezidi_user_lang') || 'ar';

// جلب قائمة الأسئلة بناءً على اللغة
let questions = ezidiQuestions[userLang];

let currentQuestionIndex = 0;
let selectedOption = null;
let hearts = 5;
let isAnswerChecked = false;

// نصوص الأزرار والرسائل حسب لغة المستخدم
const localizedText = {
    ar: { check: "تحقق", next: "متابعة", correct: "إجابة رائعة وممتازة! 🎉", wrong: "إجابة خاطئة، الصحيح هو: ", win: "تهانينا! لقد أكملت مستوى A1 بنجاح! 🏆", lose: "نفدت القلوب! حاول مجدداً 💔" },
    en: { check: "Check", next: "Continue", correct: "Excellent job! 🎉", wrong: "Incorrect, correct is: ", win: "Congratulations! You completed A1 Level! 🏆", lose: "Out of hearts! Try again 💔" },
    de: { check: "Prüfen", next: "Weiter", correct: "Sehr gut! 🎉", wrong: "Falsch, richtig ist: ", win: "Glückwunsch! Du hast A1 Niveau geschafft! 🏆", lose: "Keine Leben mehr! Versuch es noch einmal 💔" }
};

// تشغيل اللعبة فور تحميل الصفحة
window.onload = function() {
    loadQuestion();
    updateTopBar();
};

function loadQuestion() {
    isAnswerChecked = false;
    selectedOption = null;
    
    // إعادة تعيين شكل الشريط السفلي ليكون طبيعياً
    const footer = document.getElementById('footerCheck');
    footer.className = 'footer-check';
    document.getElementById('feedbackMessage').innerText = '';
    
    const actionBtn = document.getElementById('actionBtn');
    actionBtn.innerText = localizedText[userLang].check;
    actionBtn.disabled = true;

    // التحقق من انتهاء الأسئلة
    if (currentQuestionIndex >= questions.length) {
        alert(localizedText[userLang].win);
        window.location.href = 'index.html';
        return;
    }

    // عرض السؤال الحالي
    let currentQuestion = questions[currentQuestionIndex];
    document.getElementById('questionText').innerText = currentQuestion.question;

    // عرض الخيارات الأربعة
    const grid = document.getElementById('optionsGrid');
    grid.innerHTML = '';
    
    currentQuestion.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = option;
        btn.onclick = function() { selectOption(btn, option); };
        grid.appendChild(btn);
    });
}

function selectOption(buttonElement, optionValue) {
    if (isAnswerChecked) return;

    // إلغاء تحديد أي زر آخر
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));

    // تحديد الزر الحالي
    buttonElement.classList.add('selected');
    selectedOption = optionValue;

    // تفعيل زر التحقق السفلي
    document.getElementById('actionBtn').disabled = false;
}

function handleActionClick() {
    if (!isAnswerChecked) {
        checkAnswer();
    } else {
        currentQuestionIndex++;
        updateProgressBar();
        loadQuestion();
    }
}

function checkAnswer() {
    isAnswerChecked = true;
    let currentQuestion = questions[currentQuestionIndex];
    const footer = document.getElementById('footerCheck');
    const feedbackText = document.getElementById('feedbackMessage');
    const actionBtn = document.getElementById('actionBtn');

    if (selectedOption === currentQuestion.correctAnswer) {
        // إجابة صحيحة
        footer.classList.add('correct');
        feedbackText.innerText = localizedText[userLang].correct;
    } else {
        // إجابة خاطئة
        footer.classList.add('wrong');
        feedbackText.innerText = localizedText[userLang].wrong + " " + currentQuestion.correctAnswer;
        
        // خصم قلب
        hearts--;
        updateTopBar();
        
        if (hearts <= 0) {
            alert(localizedText[userLang].lose);
            window.location.href = 'index.html';
            return;
        }
    }

    actionBtn.innerText = localizedText[userLang].next;
}

function updateTopBar() {
    document.getElementById('heartsCount').innerText = hearts;
}

function updateProgressBar() {
    let percentage = (currentQuestionIndex / questions.length) * 100;
    document.getElementById('progressBar').style.width = percentage + '%';
}

