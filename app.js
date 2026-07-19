let userLang = localStorage.getItem('ezidi_user_lang') || 'ar';

// نسخ الأسئلة الأساسية في مصفوفة مرنة لتسمح بإضافة الأسئلة الخاطئة مجدداً في النهاية
let originalQuestions = [...ezidiQuestions[userLang]];
let questions = [...originalQuestions]; 

let currentQuestionIndex = 0;
let selectedOption = null;
let hearts = 5;
let isAnswerChecked = false;

const localizedText = {
    ar: { check: "تحقق", next: "متابعة", correct: "إجابة رائعة وممتازة! 🎉", wrong: "إجابة خاطئة، سنعيد هذا السؤال لاحقاً. الصحيح: ", win: "تهانينا! لقد أكملت الدرس وأصلحت أخطاءك بنجاح! 🏆", lose: "نفدت القلوب! حاول مجدداً 💔" },
    en: { check: "Check", next: "Continue", correct: "Excellent job! 🎉", wrong: "Incorrect, we will review this later. Correct: ", win: "Congratulations! You completed the lesson and fixed your mistakes! 🏆", lose: "Out of hearts! Try again 💔" },
    de: { check: "Prüfen", next: "Weiter", correct: "Sehr gut! 🎉", wrong: "Falsch, wir wiederholen das später. Richtig: ", win: "Glückwunsch! Du hast die Lektion und deine Fehler gemeistert! 🏆", lose: "Keine Leben mehr! Versuch es noch einmal 💔" }
};

window.onload = function() {
    loadQuestion();
    updateTopBar();
};

// 🔊 دالة النطق الصوتي التلقائي الذكي
function speakWord(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // إيقاف أي صوت سابق فوراً
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // اللاتينية تناسب نطق الحروف الكرمانجية/الإيزيدية المكتوبة لاتينياً
        utterance.rate = 0.85;    // نطق هادئ وواضح مثل دولينجو
        window.speechSynthesis.speak(utterance);
    }
}

function loadQuestion() {
    isAnswerChecked = false;
    selectedOption = null;
    
    const footer = document.getElementById('footerCheck');
    footer.className = 'footer-check';
    document.getElementById('feedbackMessage').innerText = '';
    
    const actionBtn = document.getElementById('actionBtn');
    actionBtn.innerText = localizedText[userLang].check;
    actionBtn.disabled = true;

    // التحقق من انتهاء كافة الأسئلة (بما فيها الأسئلة المعاد تصحيحها)
    if (currentQuestionIndex >= questions.length) {
        alert(localizedText[userLang].win);
        window.location.href = 'index.html';
        return;
    }

    let currentQuestion = questions[currentQuestionIndex];
    document.getElementById('questionText').innerText = currentQuestion.question;

    // نطق الكلمة الإيزيدية فور ظهور السؤال إذا كانت موجودة
    if(currentQuestion.pronounce) {
        speakWord(currentQuestion.pronounce);
    }

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

    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));

    buttonElement.classList.add('selected');
    selectedOption = optionValue;

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
        footer.classList.add('correct');
        feedbackText.innerText = localizedText[userLang].correct;
    } else {
        footer.classList.add('wrong');
        feedbackText.innerText = localizedText[userLang].wrong + " " + currentQuestion.correctAnswer;
        
        // 🔄 ميزة دولينجو: إضافة السؤال الخاطئ إلى نهاية قائمة الأسئلة ليعاد تكراره
        questions.push(currentQuestion);
        
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
    // حساب التقدم الفعلي بناءً على الأسئلة الأصلية المتبقية
    let percentage = (currentQuestionIndex / originalQuestions.length) * 100;
    if(percentage > 100) percentage = 100; // لضمان عدم خروج الشريط عن حده عند التكرار
    document.getElementById('progressBar').style.width = percentage + '%';
}
