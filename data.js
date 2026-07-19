// بنك أسئلة المستوى A1 المطور مع النطق الصوتي
const ezidiQuestions = {
    // 1. للناطقين بالعربية
    ar: [
        {
            question: "كيف تقول 'مرحباً / نهارك سعيد' بالإيزيدية؟",
            options: ["Spas", "Rojbaş", "Şev baş", "Roj baş"],
            correctAnswer: "Rojbaş",
            pronounce: "Rojbash" // الكلمة كما تنطق ليقرأها محرك الصوت بشكل صحيح
        },
        {
            question: "ما معنى كلمة 'Spas' بالإيزيدية؟",
            options: ["أهلاً", "شكراً", "صباح الخير", "وداعاً"],
            correctAnswer: "شكراً",
            pronounce: "Spas"
        },
        {
            question: "كيف تقول 'ليلة سعيدة / تصبح على خير'؟",
            options: ["Rojbaş", "Spas", "Şev baş", "Çawanî"],
            correctAnswer: "Şev baş",
            pronounce: "Shev bash"
        },
        {
            question: "كيف تسأل شخصاً 'كيف حالك؟'",
            options: ["Tu çawanî?", "Spas", "Ez baş im", "Navê tu çiye?"],
            correctAnswer: "Tu çawanî?",
            pronounce: "Tu chawani"
        },
        {
            question: "ما هي الإجابة الصحيحة لـ 'Ez baş im'؟",
            options: ["أنا لست بخير", "أنا بخير", "ما اسمك؟", "من أين أنت؟"],
            correctAnswer: "أنا بخير",
            pronounce: "Ez bash im"
        }
        // 💡 يمكنك إضافة أي كلمات جديدة هنا بنفس هذا الترتيب
    ],

    // 2. للناطقين بالإنجليزية (English)
    en: [
        {
            question: "How do you say 'Hello / Good day' in Ezidi?",
            options: ["Spas", "Rojbaş", "Şev baş", "Beyani baş"],
            correctAnswer: "Rojbaş",
            pronounce: "Rojbash"
        },
        {
            question: "What does 'Spas' mean?",
            options: ["Welcome", "Thank you", "Good morning", "Goodbye"],
            correctAnswer: "Thank you",
            pronounce: "Spas"
        },
        {
            question: "How do you say 'Good night' in Ezidi?",
            options: ["Rojbaş", "Spas", "Şev baş", "Tu çawanî?"],
            correctAnswer: "Şev baş",
            pronounce: "Shev bash"
        }
    ],

    // 3. للناطقين بالألمانية (Deutsch)
    de: [
        {
            question: "Wie sagt man 'Hallo / Guten Tag' auf Ezidisch?",
            options: ["Spas", "Rojbaş", "Şev baş", "Beyani baş"],
            correctAnswer: "Rojbaş",
            pronounce: "Rojbash"
        },
        {
            question: "Was bedeutet das Wort 'Spas'?",
            options: ["Bitte", "Danke", "Guten Morgen", "Tschüss"],
            correctAnswer: "Danke",
            pronounce: "Spas"
        },
        {
            question: "Wie sagt man 'Gute Nacht' auf Ezidisch?",
            options: ["Rojbaş", "Spas", "Şev baş", "Tu çawanî?"],
            correctAnswer: "Şev baş",
            pronounce: "Shev bash"
        }
    ]
};
