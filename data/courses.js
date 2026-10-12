/* ==========================================================================
   EDS — data/courses.js
   Add a new course by pushing a new object into EDS_COURSES.
   `id` is used in the URL: course-details.html?id=your-id and quiz.html?course=your-id
   `icon` refers to a key rendered in js/main.js (renderCourseIcon).
   ========================================================================== */

window.EDS_COURSES = [
  {
    id: 'computer-skills',
    icon: 'computer',
    image: 'img2.jpg',
    gradient: 'linear-gradient(135deg,#52E9E8,#2C8FF0)',
    title: { en: 'Computer Skills', ar: 'مهارات الحاسوب' },
    summary: {
      en: 'Practical computer and smartphone skills, including Word, Excel, PowerPoint, email, and safe use of social media.',
      ar: 'مهارات عملية في استخدام الحاسوب والهاتف الذكي، بما في ذلك Word وExcel وPowerPoint والبريد الإلكتروني والاستخدام الآمن لوسائل التواصل الاجتماعي.'
    },
    topics: {
      en: ['Word processing basics', 'Excel spreadsheets', 'PowerPoint presentations', 'Email setup & etiquette', 'Safe social media use', 'Smartphone essentials'],
      ar: ['أساسيات معالجة النصوص', 'جداول بيانات Excel', 'عروض تقديمية PowerPoint', 'إعداد البريد الإلكتروني وآدابه', 'استخدام آمن لوسائل التواصل', 'أساسيات الهاتف الذكي']
    },
    outcomes: {
      en: ['Create and edit documents confidently', 'Build simple spreadsheets and presentations', 'Communicate professionally by email', 'Navigate a smartphone independently'],
      ar: ['إنشاء وتحرير المستندات بثقة', 'بناء جداول بيانات وعروض تقديمية بسيطة', 'التواصل باحترافية عبر البريد الإلكتروني', 'استخدام الهاتف الذكي باستقلالية']
    },
    why: {
      en: 'Digital literacy opens doors to jobs, education and independence — many women in our sessions had never opened a laptop before their first class.',
      ar: 'محو الأمية الرقمية يفتح أبواب العمل والتعليم والاستقلالية — كثير من النساء في جلساتنا لم يفتحن حاسوباً محمولاً قط قبل درسهن الأول.'
    }
  },
  {
    id: 'legal-awareness',
    image: 'img21.jpg',
    icon: 'legal',
    gradient: 'linear-gradient(135deg,#2C8FF0,#1668E8)',
    title: { en: 'Legal Awareness', ar: 'التوعية القانونية' },
    summary: {
      en: 'Understanding women\u2019s rights, protection from gender-based violence, and legal support resources.',
      ar: 'فهم حقوق المرأة، والحماية من العنف القائم على النوع الاجتماعي، وموارد الدعم القانوني.'
    },
    topics: {
      en: ['Fundamentals of women\u2019s rights', 'Recognizing gender-based violence', 'Reporting & protection pathways', 'Where to find legal support'],
      ar: ['أساسيات حقوق المرأة', 'التعرف على العنف القائم على النوع الاجتماعي', 'مسارات الإبلاغ والحماية', 'أماكن الحصول على الدعم القانوني']
    },
    outcomes: {
      en: ['Recognize your basic rights', 'Identify signs of gender-based violence', 'Know where to seek help and protection'],
      ar: ['التعرف على حقوقك الأساسية', 'تحديد علامات العنف القائم على النوع الاجتماعي', 'معرفة أين تطلبين المساعدة والحماية']
    },
    why: {
      en: 'Knowing your rights is the first step toward protection — this course gives women clear, practical legal knowledge in plain language.',
      ar: 'معرفة حقوقك هي الخطوة الأولى نحو الحماية — يمنح هذا المساق النساء معرفة قانونية واضحة وعملية بلغة مبسطة.'
    }
  },
  {
    id: 'psychological-support',
    image: 'img23.jpg',
    icon: 'support',
    gradient: 'linear-gradient(135deg,#7BC873,#45A17C)',
    title: { en: 'Psychological Support', ar: 'الدعم النفسي' },
    summary: {
      en: 'Providing safe spaces, guidance, and psychosocial support to strengthen resilience and mental well-being.',
      ar: 'توفير مساحات آمنة، وإرشاد، ودعم نفسي اجتماعي لتعزيز الصمود والصحة النفسية.'
    },
    topics: {
      en: ['Building a safe space', 'Coping with stress', 'Peer support techniques', 'Resilience & self-care'],
      ar: ['بناء مساحة آمنة', 'التعامل مع الضغط النفسي', 'تقنيات الدعم من الأقران', 'الصمود والعناية بالذات']
    },
    outcomes: {
      en: ['Practice healthy coping strategies', 'Feel more comfortable seeking support', 'Build resilience within your community'],
      ar: ['ممارسة استراتيجيات تأقلم صحية', 'الشعور براحة أكبر في طلب الدعم', 'بناء الصمود داخل مجتمعك']
    },
    why: {
      en: 'Knowledge of rights and skills is not enough without emotional strength — this course helps women feel heard, supported and capable.',
      ar: 'المعرفة بالحقوق والمهارات وحدها لا تكفي دون القوة العاطفية — يساعد هذا المساق النساء على الشعور بأنهن مسموعات ومدعومات وقادرات.'
    }
  },
  {
    id: 'digital-safety',
    image: 'img3.jpg',
    icon: 'shield',
    gradient: 'linear-gradient(135deg,#52E9E8,#45A17C)',
    title: { en: 'Digital Safety', ar: 'السلامة الرقمية' },
    summary: {
      en: 'Protecting against online threats, secure browsing, phishing awareness, strong passwords, and digital privacy.',
      ar: 'الحماية من التهديدات عبر الإنترنت، والتصفح الآمن، والتوعية بالتصيّد الاحتيالي، وكلمات المرور القوية، والخصوصية الرقمية.'
    },
    topics: {
      en: ['Strong passwords & app permissions', 'Recognizing phishing attempts', 'Safe app downloads', 'Privacy settings', 'Online harassment response'],
      ar: ['كلمات مرور قوية وأذونات التطبيقات', 'التعرف على محاولات التصيّد', 'تنزيل التطبيقات بأمان', 'إعدادات الخصوصية', 'التعامل مع التحرش الإلكتروني']
    },
    outcomes: {
      en: ['Set strong, unique passwords', 'Spot suspicious links and apps', 'Control your privacy settings confidently'],
      ar: ['وضع كلمات مرور قوية وفريدة', 'اكتشاف الروابط والتطبيقات المشبوهة', 'التحكم بإعدادات الخصوصية بثقة']
    },
    why: {
      en: 'The digital world carries real risks for women and girls — this course turns awareness into everyday protective habits.',
      ar: 'يحمل العالم الرقمي مخاطر حقيقية على النساء والفتيات — يحوّل هذا المساق الوعي إلى عادات وقائية يومية.'
    }
  },
  {
    id: 'reproductive-health',
    image: 'img28.jpg',
    icon: 'health',
    gradient: 'linear-gradient(135deg,#D8E466,#7BC873)',
    title: { en: 'Reproductive Health', ar: 'الصحة الإنجابية' },
    summary: {
      en: 'Knowledge and awareness on reproductive health, well-being, and safe practices.',
      ar: 'المعرفة والتوعية حول الصحة الإنجابية، والرفاه، والممارسات الآمنة.'
    },
    topics: {
      en: ['Reproductive health basics', 'Well-being through life stages', 'Safe practices & hygiene', 'When and where to seek care'],
      ar: ['أساسيات الصحة الإنجابية', 'الرفاه عبر مراحل الحياة', 'ممارسات آمنة والنظافة الصحية', 'متى وأين تطلبين الرعاية']
    },
    outcomes: {
      en: ['Understand your reproductive health', 'Recognize when to seek medical care', 'Make informed, confident decisions'],
      ar: ['فهم صحتك الإنجابية', 'إدراك متى تطلبين رعاية طبية', 'اتخاذ قرارات واعية وواثقة']
    },
    why: {
      en: 'Accurate, judgment-free health knowledge helps women make informed choices about their bodies and their well-being.',
      ar: 'المعرفة الصحية الدقيقة والخالية من الأحكام تساعد النساء على اتخاذ خيارات واعية بشأن أجسادهن وصحتهن.'
    }
  },
  {
    id: 'canva-ai-design',
    icon: 'design',
    image: 'img29.jpg',
    gradient: 'linear-gradient(135deg,#F5E96B,#52E9E8)',
    title: { en: 'Canva & AI Design', ar: 'التصميم عبر Canva والذكاء الاصطناعي' },
    summary: {
      en: 'Design basics with Canva, and using AI tools to generate images, video, sound effects and voice — including creating posts and reels.',
      ar: 'أساسيات التصميم عبر Canva، واستخدام أدوات الذكاء الاصطناعي لتوليد الصور والفيديو والمؤثرات الصوتية والصوت — بما في ذلك إنشاء المنشورات والريلز.'
    },
    topics: {
      en: ['Canva basics & templates', 'Using AI to generate images', 'Using AI to generate video & sound effects', 'AI voice generation', 'Creating a post in Canva', 'Creating a reel in Canva'],
      ar: ['أساسيات Canva والقوالب', 'استخدام الذكاء الاصطناعي لتوليد الصور', 'استخدام الذكاء الاصطناعي لتوليد الفيديو والمؤثرات الصوتية', 'توليد الصوت بالذكاء الاصطناعي', 'إنشاء منشور عبر Canva', 'إنشاء ريل عبر Canva']
    },
    outcomes: {
      en: ['Design simple, professional visuals independently', 'Use AI tools confidently for images, video and sound', 'Publish a finished post or reel from start to finish'],
      ar: ['تصميم عناصر بصرية بسيطة واحترافية باستقلالية', 'استخدام أدوات الذكاء الاصطناعي بثقة للصور والفيديو والصوت', 'نشر منشور أو ريل جاهز من البداية إلى النهاية']
    },
    why: {
      en: 'Design and content skills open new paths — from small businesses to storytelling — and AI tools make that possible without needing years of training.',
      ar: 'مهارات التصميم والمحتوى تفتح آفاقاً جديدة — من المشاريع الصغيرة إلى سرد القصص — وتجعل أدوات الذكاء الاصطناعي ذلك ممكناً دون الحاجة لسنوات من التدريب.'
    }
  }
];
