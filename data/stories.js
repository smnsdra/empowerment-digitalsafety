/* ==========================================================================
   EDS — data/stories.js
   Real trainee stories. Each story carries both the Arabic original and its
   approved English translation — the website's current language decides
   which one is rendered (see js/stories.js). There is no separate language
   toggle inside the story itself.
   `slug` is used in the URL: story-details.html?id=slug
   `image` points to assets/images/stories/ — replace the file to update the photo.
   ========================================================================== */

window.EDS_STORIES = [
  {
    slug: 'marwa-abdul-wahid',
    name: 'Marwa Abdul Wahid',
    image: 'img7.jpg',
    context: {
      en: 'Marwa is a trainee who has a sister only slightly older than her.',
      ar: 'متدرّبة لديها أخت تكبرها بفارق عمر بسيط.'
    },
    quote: {
      ar: 'أنا مبارح كانت روضة عم تنزل تطبيق من الكوكل قلتلها قالت الميس رزان انو غير من المتجر الرسمي لا تنزلوا على تلفوناتكم، وانو لازم ننتبه على الأذونات يلي منسمح للتطبيق فيهم',
      en: 'Yesterday, Rawda was downloading an application from Google. I told her that Miss Razan said we should only download applications from the official store and that we should pay attention to the permissions we allow an application to access on our phones.'
    },
    followUp: {
      en: 'Marwa shared what she had learned with her sister, who was not enrolled in the course.',
      ar: 'شاركت مروة ما تعلمته مع أختها التي لم تكن مسجّلة في الدورة.'
    }
  },
  {
    slug: 'nour-al-huda-al-jarrah',
    name: 'Nour Al-Huda Al-Jarrah',
    image: 'img8.jpg',
    context: {
      en: 'Noor is an educated woman who holds a degree in Early Childhood Education and previously worked as a teacher. Today, she tells us that finding work abroad requires knowledge of the language as well as computer skills.',
      ar: 'نور امرأة متعلمة وحاصلة على شهادة في تعليم رياض الأطفال، وعملت سابقاً كمعلّمة. تخبرنا اليوم أن أي عمل في الغربة يتطلب معرفة باللغة ومعرفة بالحاسوب.'
    },
    quote: {
      ar: 'أنا الحقيقة استفدت كتير لانو هاد الشي الي تعلمته كله فيني طبقه كأنسة بكرا، واليوم قادرة قدم على وظائف وأنا متمكنة أكتر لانو كمان صارت عندي معرفة بالبرامج',
      en: 'Honestly, I benefited a lot because I can apply everything I learned as a teacher in the future. Today, I feel more capable of applying for jobs because I am more confident, and I also have knowledge of different computer programs.'
    },
    followUp: { en: '', ar: '' }
  },
  {
    slug: 'safa-al-saadi',
    name: 'Safa Al-Saadi',
    image: 'img9.jpg',
    context: { en: '', ar: '' },
    quote: {
      ar: 'ماما حضرت عندكم دورة كمبيوتر وصار عندها ظروف وضغط بالشغل ما قدرت تكمل وتستمر لتستفاد أكتر ببرنامج الاكسل وأنا وعدتها اتعلمه من الدورة هلئ لساعدها بشغلها',
      en: 'My mother attended a computer course with you, but due to circumstances and pressure at work, she was unable to continue and benefit more from the Excel program. I promised her that I would learn it through the course so I could help her with her work.'
    },
    followUp: {
      en: 'Safa performed well throughout the course and successfully mastered the skills she had hoped to learn.',
      ar: 'كان أداء صفا جيداً طوال الدورة، ونجحت في إتقان المهارات التي كانت تتمنى تعلّمها.'
    }
  },
  {
    slug: 'saba-roumiya',
    name: 'Saba Roumieh',
    image: 'img10.jpg',
    context: { en: '', ar: '' },
    quote: {
      ar: 'رزان أنا كنت بعرف كمبيوتر بس كيف كل شي على الخفيف ومرة صحلي قدم على منحة جامعية بس لازم اعمل بحث وقدم عرض، بصراحة عملتهم بس ما انقبلت، بالدورة اليوم صرت قادرة عدل على البحث تبعي والعرض وقدمّه لما يفتحوا باب التقديم من جديد، حتى طريقة كتابة السيفي والايميل صرت أعرف الفورم للايميل وللسيفي كيف',
      en: 'Razan, I knew how to use a computer before, but only at a very basic level. Once, I had the opportunity to apply for a university scholarship, but I needed to prepare a research paper and a presentation. Honestly, I prepared them, but I was not accepted. Today, after this course, I am able to edit my research and presentation and submit them when applications open again. I also learned how to write a CV and an email, including the proper format for both.'
    },
    followUp: {
      en: 'Saba is a student who completed her secondary education but did not have the opportunity to attend university. She is doing everything she can to develop herself and continue learning, and she even fears the possibility of remaining without access to education.',
      ar: 'صبا طالبة أنهت دراستها الثانوية ولم تتح لها فرصة الالتحاق بالجامعة، وهي تبذل قصارى جهدها لتطوير نفسها ومتابعة التعلّم، بل وتخاف من فكرة أن تبقى دون تعليم.'
    }
  },
  {
    slug: 'maram-al-abdallah',
    name: 'Maram Al-Abdallah',
    image: 'img11.jpg',
    context: {
      en: 'At the end of the course, we asked everyone a general question: did the course achieve what you had hoped for?',
      ar: 'في نهاية الدورة، وجّهنا للجميع سؤالاً عاماً: هل حقّقت الدورة الهدف الذي كنتِ ترجينه؟'
    },
    quote: {
      ar: 'أنا كنت مفكرة الكمبيوتر شغلة صعبة ومعقدة وما فيني عليها بس اليوم صار اذا بلاقي حدي لاب توب أو كمبيوتر بعرف افتحه واشتغل عليه',
      en: 'I used to think that computers were difficult and complicated and that I would not be able to use them. But today, if I find a laptop or a computer, I know how to turn it on and work with it.'
    },
    followUp: { en: '', ar: '' }
  },
  {
    slug: 'anwar-al-khasharfeh',
    name: 'Anwar Al-Khasharfeh',
    image: 'img12.jpg',
    context: {
      en: 'Anwar is a 17-year-old young woman who lives with a family that has held strongly to traditional customs. She was deprived of education when she was in the fourth grade because her family believed that education was not useful for girls and that she should instead help her mother at home. After presenting her PowerPoint presentation, which was successful despite containing some mistakes, she was extremely proud of herself and what she had achieved.',
      ar: 'أنور شابة في السابعة عشرة من عمرها، تعيش مع أسرة تتمسك بالعادات التقليدية. حُرمت من التعليم منذ كانت في الصف الرابع لأن أسرتها اعتقدت أن التعليم غير مفيد للفتيات، وأنه يجب عليها مساعدة والدتها في المنزل بدلاً من ذلك. بعد تقديم عرضها التقديمي عبر PowerPoint، الذي كان ناجحاً رغم بعض الأخطاء، كانت فخورة جداً بنفسها وبما حققته.'
    },
    quote: {
      ar: 'أنا كل يوم بختلف مع أمي لأجي لهون، أنا كتير بحب أتعلم وبحب العلم، فرحانة إني قدرت طبق هاد العرض البوربوينت أنا فرحانة بكل شي تعلمته',
      en: 'Every day I argue with my mother so I can come here. I really love learning and I love education. I am so happy that I was able to create and present this PowerPoint presentation. I am happy about everything I have learned.'
    },
    followUp: { en: '', ar: '' }
  },
  {
    slug: 'khadija-jamki',
    name: 'Khadija Jamki',
    image: 'img13.jpg',
    context: {
      en: 'Khadija is a young divorced woman who has lived with her divorced mother since childhood. She works entering invoices, but has always felt that she lacked the skills needed to perform her work well. She hopes to change jobs, but her lack of knowledge has kept her in the same position.',
      ar: 'خديجة امرأة شابة مطلّقة تعيش مع أمها المطلّقة أيضاً منذ الصغر. تعمل في إدخال الفواتير، لكنها دائماً ما شعرت بأنها تفتقر إلى المهارات اللازمة لإنجاز عملها بشكل جيد. تطمح لتغيير عملها، لكن غياب المعرفة أبقاها في المكان نفسه.'
    },
    quote: {
      ar: 'أنا هلئ يعني بعد ما تعلمت وأخدت إيدي أكتر ع لاب توب وتعلمت الورد والبوربوينت صار فيني غيري شغلي، لانو عندي رفيق بدو اشتغل معه ع لاب توب بس لانو كنت حس حالي مو متمكنة دائما ما اقبل',
      en: 'Now, after learning and becoming more comfortable using a laptop, and after learning Word and PowerPoint, I feel that I can change my job. I have a friend who wants me to work with him using a laptop, but because I always felt that I was not skilled enough, I would turn down the opportunity.'
    },
    followUp: { en: '', ar: '' }
  },
  {
    slug: 'fatima-darwish',
    name: 'Fatima Darwish',
    image: 'img14.jpg',
    context: {
      en: 'Fatima is a woman in her thirties, married, and a mother of five children. When we asked Fatima why she joined the course and what she had gained from it, she told us this:',
      ar: 'فاطمة امرأة في الثلاثينيات من عمرها، متزوجة، وأم لخمسة أطفال. عندما سألناها عن سبب التحاقها بالدورة وما استفادته منها، أخبرتنا:'
    },
    quote: {
      ar: 'أنا من شي سنتين في حدا ساعدني ودلني ع وظيفة مساعدة أنسة وما زبط الشغل لانو ما بعرف كمبيوتر ولا إنكليزي ومن يومها نويت انو لازم اتعلم، سجلت كتير إنكليزي حتى هلئ هيك شايفيني، وهلئ صرت بعرف كمبيوتر وأصلا هدول البرامج يلي سألوني عنهم الورد والبوربوينت',
      en: 'About two years ago, someone helped me find a job as a teacher\u2019s assistant, but it did not work out because I did not know how to use a computer or speak English. Since then, I decided that I had to learn. I enrolled in many English courses, as you can see today, and now I know how to use a computer. I also know the programs they asked me about, Word and PowerPoint.'
    },
    followUp: { en: '', ar: '' }
  },
  {
    slug: 'amal-al-baleekh',
    name: 'Amal Al-Baleekh',
    image: 'img15.jpg',
    context: {
      en: 'Amal is 23 years old, divorced, and has two children. She has always wanted to develop her skills and has consistently shown great enthusiasm for learning. When working on the PowerPoint project, Amal had already created a presentation on her own mobile phone at home about COVID-19. When we asked Amal whether she had any previous knowledge of the program, she answered:',
      ar: 'أمل تبلغ من العمر 23 عاماً، مطلّقة، ولديها طفلان. كانت دائماً ترغب في تطوير مهاراتها، وأظهرت دوماً حماساً كبيراً للتعلّم. عند العمل على مشروع PowerPoint، كانت أمل قد أنشأت مسبقاً عرضاً على هاتفها الخاص في المنزل حول كوفيد-19. وعندما سألناها إن كانت تملك معرفة سابقة بالبرنامج، أجابت:'
    },
    quote: {
      ar: 'لا، بس حملته ع الموبايل واتبعت يلي تعلمناه',
      en: 'No, but I downloaded it on my phone and followed what we learned.'
    },
    followUp: {
      en: 'She later created another presentation about gender during the final session.',
      ar: 'أنشأت لاحقاً عرضاً آخر حول النوع الاجتماعي في الجلسة الختامية.'
    }
  },
  {
    slug: 'amina-katou',
    name: 'Amina Katou',
    image: 'img16.jpg',
    context: {
      en: 'Amina had only basic and limited knowledge of using a mobile phone. Whenever we learned a new skill, she was immediately eager to practice it, while also expressing how many skills she had not known before.',
      ar: 'كانت معرفة أمينة باستخدام الهاتف المحمول بسيطة ومحدودة. في كل مرة كنا نتعلّم فيها مهارة جديدة، كانت متحمسة فوراً لتطبيقها، وتعبّر في الوقت نفسه عن عدد المهارات التي لم تكن تعرفها من قبل.'
    },
    quote: {
      ar: 'والله كلهم هدول أنا أول مرة بعرفهم وبقدر فوت عليهم من دون ما حس انو أنا غبية وما لازم خبص فيهم',
      en: 'Honestly, all of these things are completely new to me. Now I can access and use them without feeling that I am not smart enough or that I might do something wrong.'
    },
    followUp: { en: '', ar: '' }
  },
  {
    slug: 'basmeh-al-saadi',
    name: 'Basmeh Al-Saadi',
    image: 'img17.jpg',
    context: {
      en: 'Basma had basic and limited knowledge of using a mobile phone. She was always enthusiastic and openly expressed her happiness at learning how to use different tools.',
      ar: 'كانت معرفة بسمة باستخدام الهاتف المحمول بسيطة ومحدودة. كانت دائماً متحمسة وتعبّر بصراحة عن سعادتها بتعلّم استخدام أدوات مختلفة.'
    },
    quote: {
      ar: 'والله انا كل ما بدي شغلة بنادي لبنتي أو ابني، في كتير شغلات تعلمتهم هلئ هون ومالي بحاجة حدا يعملي ياهم',
      en: 'Whenever I needed something, I used to call my daughter or my son to help me. Now I have learned so many things here, and I no longer need someone else to do them for me.'
    },
    followUp: { en: '', ar: '' }
  },
  {
    slug: 'hanan-nawaf-al-ahmad',
    name: 'Hanan Nawaf Al-Ahmad',
    image: 'img18.jpg',
    context: {
      en: 'Hanan was always eager to learn more about using her phone. She often said that she relied completely on her husband to change any setting on her phone or even within applications.',
      ar: 'كانت حنان دائماً متحمسة لتتعلّم أكثر عن استخدام هاتفها. وكانت تكرر دائماً أنها تعتمد بشكل كامل على زوجها لضبط أي إعداد في هاتفها أو حتى داخل التطبيقات.'
    },
    quote: { ar: '', en: '' },
    followUp: {
      en: 'Today, Hanan is much more confident and capable. Attending the sessions and learning the basics helped break down the barrier she had built in her mind about using her phone.',
      ar: 'أصبحت حنان اليوم أكثر ثقة وقدرة بكثير. ساعدها حضور الجلسات وتعلّم الأساسيات على كسر الحاجز الذي بنته في مخيلتها حول استخدام هاتفها.'
    }
  },
  {
    slug: 'nahla-khalaf-al-hassan',
    name: 'Nahla Khalaf Al-Hassan',
    image: 'img19.jpg',
    context: {
      en: 'During one of the sessions about WhatsApp settings, Nahla expressed her happiness at learning and discovering these simple skills.',
      ar: 'خلال إحدى جلسات إعدادات تطبيق واتساب، عبّرت نهلة عن فرحتها بالتعلّم واكتشاف هذه المهارات البسيطة.'
    },
    quote: {
      ar: 'والله كنت ما أعرف غير انو هاد فيه زرين واحد يقول الو وواحد يسكر الخط',
      en: 'Honestly, I only knew that this had two buttons: one to answer and one to end the call.'
    },
    followUp: {
      en: 'Nahla learned how to manage different phone settings, such as sound, screen lock, and font settings. She became able to use her phone and activate its features without needing to ask her husband for help, as she told us.',
      ar: 'تعلّمت نهلة إدارة إعدادات الهاتف المختلفة، مثل الصوت وقفل الشاشة وحجم الخط، وأصبحت قادرة على استخدام هاتفها وتفعيل ميزاته دون الحاجة لطلب مساعدة زوجها، كما أخبرتنا.'
    }
  }
];
