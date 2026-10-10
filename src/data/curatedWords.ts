import { WordEntry } from '../types/dictionary';

export const POS_ARABIC_MAP: Record<string, string> = {
  noun: 'اسم',
  verb: 'فعل',
  adjective: 'صفة',
  adverb: 'ظرف',
  preposition: 'حرف جر',
  conjunction: 'أداة ربط',
  pronoun: 'ضمير',
  idiom: 'تعبير اصطلاحي',
  phrase: 'عبارة',
};

export const CURATED_WORDS: WordEntry[] = [
  // ===================== A1 (Beginner) =====================
  {
    id: 'a1-ability',
    word: 'ability',
    phonetic: '/əˈbɪl.ə.ti/',
    pos: 'noun',
    posArabic: 'اسم',
    cefr: 'A1',
    arabic: 'قدرة / استطاعة',
    arabicAlts: ['مهارة', 'كفاءة'],
    definition: 'The physical or mental power or skill needed to do something.',
    examples: [
      'She has the ability to speak three languages fluently.',
      'He showed great musical ability at an early age.'
    ],
    examplesArabic: [
      'لديها القدرة على التحدث بثلاث لغات بطلاقة.',
      'أظهر قدرة موسيقية رائعة في سن مبكرة.'
    ],
    topic: 'Skills & Daily Life',
    synonyms: ['capability', 'skill', 'talent'],
    antonyms: ['inability', 'weakness'],
    collocations: ['natural ability', 'show ability']
  },
  {
    id: 'a1-accept',
    word: 'accept',
    phonetic: '/əkˈsept/',
    pos: 'verb',
    posArabic: 'فعل',
    cefr: 'A1',
    arabic: 'يقبل / يوافق على',
    arabicAlts: ['يستلم', 'يرضى'],
    definition: 'To agree to take something, or to say yes to an offer or invitation.',
    examples: [
      'He accepted the job offer with enthusiasm.',
      'Please accept this gift from our family.'
    ],
    examplesArabic: [
      'قبل عرض العمل بحماس كبير.',
      'يرجى قبول هذه الهدية من عائلتنا.'
    ],
    topic: 'Communication',
    synonyms: ['receive', 'agree', 'take'],
    antonyms: ['refuse', 'reject', 'decline']
  },
  {
    id: 'a1-achieve',
    word: 'achieve',
    phonetic: '/əˈtʃiːv/',
    pos: 'verb',
    posArabic: 'فعل',
    cefr: 'A1',
    arabic: 'يحقق / ينجز',
    arabicAlts: ['يصل إلى', 'ينال'],
    definition: 'To succeed in finishing something or reaching an aim, especially after a lot of work.',
    examples: [
      'She worked hard to achieve her dream of becoming a doctor.',
      'We achieved all our goals this quarter.'
    ],
    examplesArabic: [
      'عملت بجد لتحقيق حلمها في أن تصبح طبيبة.',
      'حققنا جميع أهدافنا هذا الربع.'
    ],
    topic: 'Success & Goals',
    synonyms: ['accomplish', 'attain', 'reach'],
    antonyms: ['fail', 'lose'],
    collocations: ['achieve a goal', 'achieve success']
  },
  {
    id: 'a1-activity',
    word: 'activity',
    phonetic: '/ækˈtɪv.ə.ti/',
    pos: 'noun',
    posArabic: 'اسم',
    cefr: 'A1',
    arabic: 'نشاط / فاعلية',
    arabicAlts: ['حركة', 'عمل'],
    definition: 'The situation in which a lot of things are happening or being done.',
    examples: [
      'Physical activity is essential for good health.',
      'The club offers a wide range of outdoor activities.'
    ],
    examplesArabic: [
      'النشاط البدني ضروري لصحة جيدة.',
      'يقدم النادي مجموعة واسعة من الأنشطة الخارجية.'
    ],
    topic: 'Health & Lifestyle',
    synonyms: ['action', 'exercise', 'movement'],
    collocations: ['physical activity', 'leisure activity']
  },
  {
    id: 'a1-advice',
    word: 'advice',
    phonetic: '/ədˈvaɪs/',
    pos: 'noun',
    posArabic: 'اسم',
    cefr: 'A1',
    arabic: 'نصيحة / إرشاد',
    arabicAlts: ['مشورة', 'توجيه'],
    definition: 'An opinion that someone gives you about what you should do in a particular situation.',
    examples: [
      'Can you give me some advice on how to improve my English?',
      'I took my doctor’s advice and started exercising.'
    ],
    examplesArabic: [
      'هل يمكنك إعطائي بعض النصائح حول كيفية تحسين لغتي الإنجليزية؟',
      'أخذت بنصيحة طبيبي وبدأت بممارسة الرياضة.'
    ],
    topic: 'Communication',
    synonyms: ['guidance', 'counsel', 'recommendation'],
    collocations: ['give advice', 'take advice', 'ask for advice']
  },
  {
    id: 'a1-afford',
    word: 'afford',
    phonetic: '/əˈfɔːrd/',
    pos: 'verb',
    posArabic: 'فعل',
    cefr: 'A1',
    arabic: 'يقدر على تحمل التكلفة / يستطيع شراء',
    arabicAlts: ['يتحمل نفقات'],
    definition: 'To be able to buy or do something because you have enough money or time.',
    examples: [
      'We cannot afford to buy a new car this year.',
      'She can afford to take a long holiday.'
    ],
    examplesArabic: [
      'لا يمكننا تحمل تكلفة شراء سيارة جديدة هذا العام.',
      'تستطيع تحمل نفقات أخذ عطلة طويلة.'
    ],
    topic: 'Money & Shopping',
    synonyms: ['pay for', 'bear the cost'],
    collocations: ['can afford', 'afford to buy']
  },
  {
    id: 'a1-agree',
    word: 'agree',
    phonetic: '/əˈɡriː/',
    pos: 'verb',
    posArabic: 'فعل',
    cefr: 'A1',
    arabic: 'يتفق / يوافق',
    arabicAlts: ['يشاطر الرأي'],
    definition: 'To have the same opinion, or to accept a proposal or suggestion.',
    examples: [
      'I completely agree with your viewpoint.',
      'Both sides agreed on the terms of the contract.'
    ],
    examplesArabic: [
      'أتفق تماماً مع وجهة نظرك.',
      'اتفق كلا الجانبين على شروط العقد.'
    ],
    topic: 'Communication',
    synonyms: ['concur', 'consent', 'assent'],
    antonyms: ['disagree', 'differ'],
    collocations: ['agree with', 'agree on']
  },
  {
    id: 'a1-allow',
    word: 'allow',
    phonetic: '/əˈlaʊ/',
    pos: 'verb',
    posArabic: 'فعل',
    cefr: 'A1',
    arabic: 'يسمح / يأذن',
    arabicAlts: ['يتيح'],
    definition: 'To give permission for someone to do something, or not to prevent what someone does.',
    examples: [
      'Smoking is not allowed inside the building.',
      'His parents allowed him to stay out late.'
    ],
    examplesArabic: [
      'التدخين غير مسموح به داخل المبنى.',
      'سمح له والداه بالبقاء في الخارج لوقت متأخر.'
    ],
    topic: 'Rules & Society',
    synonyms: ['permit', 'let', 'authorize'],
    antonyms: ['forbid', 'prohibit', 'ban']
  },
  {
    id: 'a1-almost',
    word: 'almost',
    phonetic: '/ˈɔːl.moʊst/',
    pos: 'adverb',
    posArabic: 'ظرف',
    cefr: 'A1',
    arabic: 'تقريباً / على وشك',
    arabicAlts: ['كاد أن', 'حوالي'],
    definition: 'Nearly, but not completely or not quite.',
    examples: [
      'Dinner is almost ready, please wash your hands.',
      'It was almost midnight when we arrived.'
    ],
    examplesArabic: [
      'العشاء جاهز تقريباً، يرجى غسل يديك.',
      'كان الوقت يقارب منتصف الليل عندما وصلنا.'
    ],
    topic: 'Time & Quantity',
    synonyms: ['nearly', 'practically', 'virtually']
  },
  {
    id: 'a1-amount',
    word: 'amount',
    phonetic: '/əˈmaʊnt/',
    pos: 'noun',
    posArabic: 'اسم',
    cefr: 'A1',
    arabic: 'كمية / مقدار / مبلغ',
    arabicAlts: ['قيمة'],
    definition: 'A collection or mass, especially of something that cannot be counted.',
    examples: [
      'A small amount of exercise each day is very beneficial.',
      'The total amount came to fifty dollars.'
    ],
    examplesArabic: [
      'كمية صغيرة من التمارين كل يوم مفيدة جداً.',
      'وصل المبلغ الإجمالي إلى خمسين دولاراً.'
    ],
    topic: 'Quantity',
    synonyms: ['quantity', 'volume', 'total']
  },
  {
    id: 'a1-ancient',
    word: 'ancient',
    phonetic: '/ˈeɪn.ʃənt/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'A1',
    arabic: 'قديم / عتيق / أثري',
    arabicAlts: ['تاريخي', 'سحيق'],
    definition: 'From a long time ago, having lasted for a very long time.',
    examples: [
      'Egypt is famous for its ancient pyramids and temples.',
      'They discovered ancient coins buried in the garden.'
    ],
    examplesArabic: [
      'تشتهر مصر بأهراماتها ومعابدها القديمة.',
      'اكتشفوا عملات معدنية قديمة مدفونة في الحديقة.'
    ],
    topic: 'History & Culture',
    synonyms: ['antique', 'historic', 'age-old'],
    antonyms: ['modern', 'contemporary', 'new']
  },
  {
    id: 'a1-appear',
    word: 'appear',
    phonetic: '/əˈpɪr/',
    pos: 'verb',
    posArabic: 'فعل',
    cefr: 'A1',
    arabic: 'يظهر / يبدو',
    arabicAlts: ['يتراءى'],
    definition: 'To start to be seen or to be present, or to give the impression of being something.',
    examples: [
      'A rainbow appeared in the sky after the rain.',
      'He appeared very calm despite the stress.'
    ],
    examplesArabic: [
      'ظهر قوس قزح في السماء بعد المطر.',
      'بدا هادئاً جداً على الرغم من التوتر.'
    ],
    topic: 'Perception',
    synonyms: ['seem', 'emerge', 'surface'],
    antonyms: ['disappear', 'vanish']
  },

  // ===================== A2 (Elementary) =====================
  {
    id: 'a2-benefit',
    word: 'benefit',
    phonetic: '/ˈben.ə.fɪt/',
    pos: 'noun',
    posArabic: 'اسم',
    cefr: 'A2',
    arabic: 'فائدة / منفعة / ميزة',
    arabicAlts: ['جدوى', 'مكسب'],
    definition: 'A helpful or good effect, or something intended to help.',
    examples: [
      'One of the main benefits of regular walking is reduced stress.',
      'The company offers great health benefits to all employees.'
    ],
    examplesArabic: [
      'إحدى الفوائد الرئيسية للمشي المنتظم هي تقليل التوتر.',
      'تقدم الشركة مزايا صحية رائعة لجميع الموظفين.'
    ],
    topic: 'Health & Work',
    synonyms: ['advantage', 'perk', 'gain'],
    antonyms: ['drawback', 'disadvantage'],
    collocations: ['reap benefits', 'mutual benefit']
  },
  {
    id: 'a2-challenge',
    word: 'challenge',
    phonetic: '/ˈtʃæl.ɪndʒ/',
    pos: 'noun',
    posArabic: 'اسم',
    cefr: 'A2',
    arabic: 'تحدٍّ / صعوبة محفزة',
    arabicAlts: ['مواجهة'],
    definition: 'Something that needs great mental or physical effort in order to be done successfully.',
    examples: [
      'Learning Arabic is an exciting challenge for foreign students.',
      'We faced many unexpected challenges during the project.'
    ],
    examplesArabic: [
      'تعلم اللغة العربية يمثل تحدياً مثيراً للطلاب الأجانب.',
      'واجهنا العديد من التحديات غير المتوقعة أثناء المشروع.'
    ],
    topic: 'Work & Mindset',
    synonyms: ['obstacle', 'test', 'trial'],
    antonyms: ['ease', 'walkover'],
    collocations: ['face a challenge', 'overcome a challenge']
  },
  {
    id: 'a2-community',
    word: 'community',
    phonetic: '/kəˈmjuː.nə.ti/',
    pos: 'noun',
    posArabic: 'اسم',
    cefr: 'A2',
    arabic: 'مجتمع / جالية / فئة',
    arabicAlts: ['بيئة مجتمعية'],
    definition: 'The people living in one particular area or people who are considered as a unit because of their common interests.',
    examples: [
      'The local community rallied to build a new library.',
      'Our online community includes learners from over fifty countries.'
    ],
    examplesArabic: [
      'تكاتف المجتمع المحلي لبناء مكتبة جديدة.',
      'يشمل مجتمعنا الإلكتروني متعلمين من أكثر من خمسين دولة.'
    ],
    topic: 'Society & Culture',
    synonyms: ['society', 'neighborhood', 'fellowship'],
    collocations: ['local community', 'community center']
  },
  {
    id: 'a2-confident',
    word: 'confident',
    phonetic: '/ˈkɑːn.fə.dənt/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'A2',
    arabic: 'واثق من نفسه / مطمئن',
    arabicAlts: ['موقن'],
    definition: 'Being certain of your abilities or having trust in people, plans, or the future.',
    examples: [
      'She felt confident before delivering her presentation.',
      'I am confident that we will pass the test with high marks.'
    ],
    examplesArabic: [
      'شعرت بالثقة قبل إلقاء عرضها التقديمي.',
      'أنا واثق من أننا سنجتاز الاختبار بدرجات عالية.'
    ],
    topic: 'Emotions & Personality',
    synonyms: ['assured', 'certain', 'positive'],
    antonyms: ['insecure', 'doubtful', 'timid']
  },
  {
    id: 'a2-creative',
    word: 'creative',
    phonetic: '/kriˈeɪ.tɪv/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'A2',
    arabic: 'مبدع / ابتكاري / خلاق',
    arabicAlts: ['مبتكر'],
    definition: 'Producing or using original and unusual ideas, artistic talent.',
    examples: [
      'He came up with a creative solution to the technical problem.',
      'Children need time for free creative play.'
    ],
    examplesArabic: [
      'توصل إلى حل إبداعي للمشكلة التقنية.',
      'يحتاج الأطفال إلى وقت للعب الإبداعي الحر.'
    ],
    topic: 'Arts & Mind',
    synonyms: ['innovative', 'inventive', 'imaginative'],
    antonyms: ['unimaginative', 'derivative']
  },
  {
    id: 'a2-discover',
    word: 'discover',
    phonetic: '/dɪˈskʌv.ɚ/',
    pos: 'verb',
    posArabic: 'فعل',
    cefr: 'A2',
    arabic: 'يكتشف / يجد',
    arabicAlts: ['يعثر على'],
    definition: 'To see, find, or become aware of something for the first time.',
    examples: [
      'Scientists discovered a new species of frog in the rainforest.',
      'I discovered a cozy little café near my office.'
    ],
    examplesArabic: [
      'اكتشف العلماء نوعاً جديداً من الضفادع في الغابة المطيرة.',
      'اكتشفت مقهى صغيراً ومريحاً بالقرب من مكتبي.'
    ],
    topic: 'Science & Exploration',
    synonyms: ['find', 'uncover', 'detect'],
    antonyms: ['hide', 'conceal']
  },
  {
    id: 'a2-effective',
    word: 'effective',
    phonetic: '/əˈfek.tɪv/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'A2',
    arabic: 'فعّال / مجدٍ / مؤثر',
    arabicAlts: ['ناجع', 'منتج'],
    definition: 'Successful in producing a desired or intended result.',
    examples: [
      'A good dictionary is an effective tool for mastering English.',
      'The new medicine proved to be highly effective against the fever.'
    ],
    examplesArabic: [
      'يعد القاموس الجيد أداة فعالة لإتقان اللغة الإنجليزية.',
      'أثبت الدواء الجديد أنه فعال للغاية ضد الحمى.'
    ],
    topic: 'Productivity',
    synonyms: ['successful', 'efficient', 'productive'],
    antonyms: ['ineffective', 'useless']
  },
  {
    id: 'a2-environment',
    word: 'environment',
    phonetic: '/ɪnˈvaɪ.rən.mənt/',
    pos: 'noun',
    posArabic: 'اسم',
    cefr: 'A2',
    arabic: 'بيئة / محيط',
    arabicAlts: ['الوسط البيئي'],
    definition: 'The air, water, and land in or on which people, animals, and plants live.',
    examples: [
      'We must take action to protect our natural environment.',
      'A quiet study environment helps improve focus and memory.'
    ],
    examplesArabic: [
      'يجب علينا اتخاذ إجراءات لحماية بيئتنا الطبيعية.',
      'تساعد بيئة الدراسة الهادئة على تحسين التركيز والذاكرة.'
    ],
    topic: 'Nature & Society',
    synonyms: ['surroundings', 'ecosystem', 'setting'],
    collocations: ['protect the environment', 'work environment']
  },

  // ===================== B1 (Intermediate) =====================
  {
    id: 'b1-accurate',
    word: 'accurate',
    phonetic: '/ˈæk.jɚ.ət/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'B1',
    arabic: 'دقيق / مضبوط / صحيح',
    arabicAlts: ['محكم', 'صائب'],
    definition: 'Correct, exact, and without any mistakes.',
    examples: [
      'The police need accurate information to solve the case.',
      'Make sure your Arabic translation is accurate and natural.'
    ],
    examplesArabic: [
      'تحتاج الشرطة إلى معلومات دقيقة لحل القضية.',
      'تأكد من أن ترجمتك العربية دقيقة وطبيعية.'
    ],
    topic: 'Language & Precision',
    synonyms: ['precise', 'exact', 'flawless'],
    antonyms: ['inaccurate', 'erroneous', 'faulty']
  },
  {
    id: 'b1-collaborate',
    word: 'collaborate',
    phonetic: '/kəˈlæb.ə.reɪt/',
    pos: 'verb',
    posArabic: 'فعل',
    cefr: 'B1',
    arabic: 'يتعاون / يشترك في عمل',
    arabicAlts: ['يتضافر'],
    definition: 'To work jointly with others or together especially in an intellectual endeavor.',
    examples: [
      'The two universities collaborate on cancer research.',
      'We collaborated with international designers on the new product.'
    ],
    examplesArabic: [
      'تتعاون الجامعتان في أبحاث السرطان.',
      'تعاونا مع مصممين دوليين في المنتج الجديد.'
    ],
    topic: 'Work & Teamwork',
    synonyms: ['cooperate', 'team up', 'partner'],
    collocations: ['collaborate on a project', 'collaborate with peers']
  },
  {
    id: 'b1-crucial',
    word: 'crucial',
    phonetic: '/ˈkruː.ʃəl/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'B1',
    arabic: 'حاسم / مصيري / بالغ الأهمية',
    arabicAlts: ['جوهري', 'فاصل'],
    definition: 'Extremely important or necessary; decisive.',
    examples: [
      'Regular revision is crucial for retaining new vocabulary.',
      'His testimony played a crucial role in winning the trial.'
    ],
    examplesArabic: [
      'المراجعة المنتظمة أمر حاسم للاحتفاظ بالمفردات الجديدة.',
      'لعبت شهادته دوراً حاسماً في كسب المحاكمة.'
    ],
    topic: 'Importance & Priority',
    synonyms: ['vital', 'essential', 'pivotal'],
    antonyms: ['trivial', 'minor', 'unimportant']
  },
  {
    id: 'b1-demonstrate',
    word: 'demonstrate',
    phonetic: '/ˈdem.ən.streɪt/',
    pos: 'verb',
    posArabic: 'فعل',
    cefr: 'B1',
    arabic: 'يوضح / يبرهن / يبيّن',
    arabicAlts: ['يظهر عملياً'],
    definition: 'To show or prove something clearly through evidence or practical example.',
    examples: [
      'The experiment demonstrated how sound travels through water.',
      'He demonstrated strong leadership during the company transition.'
    ],
    examplesArabic: [
      'أثبتت التجربة كيف ينتقل الصوت عبر الماء.',
      'أظهر قيادة قوية أثناء مرحلة الانتقال في الشركة.'
    ],
    topic: 'Academic & Science',
    synonyms: ['show', 'prove', 'illustrate'],
    collocations: ['demonstrate ability', 'demonstrate results']
  },
  {
    id: 'b1-efficient',
    word: 'efficient',
    phonetic: '/ɪˈfɪʃ.ənt/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'B1',
    arabic: 'كفء / فعّال باقتصاد',
    arabicAlts: ['متقن', 'سريع ومجيد'],
    definition: 'Working or operating quickly and effectively in an organized way without wasting time or energy.',
    examples: [
      'Using digital flashcards is an efficient way to expand vocabulary.',
      'The modern train network is both fast and energy-efficient.'
    ],
    examplesArabic: [
      'استخدام البطاقات التعليمية الرقمية طريقة كفؤة لتوسيع المفردات.',
      'شبكة القطارات الحديثة سريعة وموفرة للطاقة في آن واحد.'
    ],
    topic: 'Productivity & Tech',
    synonyms: ['competent', 'productive', 'streamlined'],
    antonyms: ['inefficient', 'wasteful']
  },
  {
    id: 'b1-flexible',
    word: 'flexible',
    phonetic: '/ˈflek.sə.bəl/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'B1',
    arabic: 'مرن / قابل للتكيف',
    arabicAlts: ['سلس', 'مطواع'],
    definition: 'Able to change or be changed easily according to the situation; able to bend without breaking.',
    examples: [
      'My job offers flexible working hours, allowing me to study in the morning.',
      'A successful negotiator must remain flexible.'
    ],
    examplesArabic: [
      'توفر وظيفتي ساعات عمل مرنة، مما يتيح لي الدراسة في الصباح.',
      'يجب على المفاوض الناجح أن يظل مرناً.'
    ],
    topic: 'Work & Mindset',
    synonyms: ['adaptable', 'pliant', 'versatile'],
    antonyms: ['rigid', 'inflexible', 'stubborn']
  },
  {
    id: 'b1-guarantee',
    word: 'guarantee',
    phonetic: '/ˌɡær.ənˈtiː/',
    pos: 'verb',
    posArabic: 'فعل',
    cefr: 'B1',
    arabic: 'يضمن / يكفل',
    arabicAlts: ['يتعهد'],
    definition: 'To promise that something will be done or will happen, or that a product will be repaired if broken.',
    examples: [
      'Consistent daily practice guarantees noticeable language improvement.',
      'The manufacturer guarantees the engine for five years.'
    ],
    examplesArabic: [
      'الممارسة اليومية المستمرة تضمن تحسناً ملحوظاً في اللغة.',
      'تضمن الشركة المصنعة المحرك لمدة خمس سنوات.'
    ],
    topic: 'Commerce & Assurances',
    synonyms: ['assure', 'warrant', 'ensure'],
    collocations: ['guarantee success', 'money-back guarantee']
  },

  // ===================== B2 (Upper-Intermediate) =====================
  {
    id: 'b2-advocate',
    word: 'advocate',
    phonetic: '/ˈæd.və.keɪt/',
    pos: 'verb',
    posArabic: 'فعل',
    cefr: 'B2',
    arabic: 'يؤيد / يدافع عن / يناصر',
    arabicAlts: ['يحث على'],
    definition: 'To publicly support or recommend a particular cause or policy.',
    examples: [
      'Many educators advocate for bilingual immersion programs.',
      'She has long advocated for equal opportunities in higher education.'
    ],
    examplesArabic: [
      'يؤيد العديد من التربويين برامج الانغماس اللغوي ثنائي اللغة.',
      'لطالما ناصرت تكافؤ الفرص في التعليم العالي.'
    ],
    topic: 'Society & Debate',
    synonyms: ['champion', 'endorse', 'promote'],
    antonyms: ['oppose', 'condemn']
  },
  {
    id: 'b2-ambiguous',
    word: 'ambiguous',
    phonetic: '/æmˈbɪɡ.ju.əs/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'B2',
    arabic: 'غامض / حمّال أوجه / ملتبس',
    arabicAlts: ['مبهم'],
    definition: 'Having or expressing more than one possible meaning, sometimes intentionally.',
    examples: [
      'The wording of the law was ambiguous and led to multiple legal disputes.',
      'His reply was polite but deliberately ambiguous.'
    ],
    examplesArabic: [
      'كانت صياغة القانون غامضة وأدت إلى نزاعات قانونية متعددة.',
      'كان رده مهذباً ولكنه كان مبهماً عن قصد.'
    ],
    topic: 'Language & Law',
    synonyms: ['equivocal', 'vague', 'obscure'],
    antonyms: ['unambiguous', 'clear', 'explicit']
  },
  {
    id: 'b2-comprehensive',
    word: 'comprehensive',
    phonetic: '/ˌkɑːm.prəˈhen.sɪv/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'B2',
    arabic: 'شامل / وافٍ / مستوعب',
    arabicAlts: ['مستفيض'],
    definition: 'Complete and including everything that is necessary; dealing with all or nearly all elements.',
    examples: [
      'This app provides a comprehensive dictionary from A1 to C1.',
      'The university offers a comprehensive guide for international students.'
    ],
    examplesArabic: [
      'يوفر هذا التطبيق قاموساً شاملاً من مستوى A1 إلى C1.',
      'تقدم الجامعة دليلاً شاملاً للطلاب الدوليين.'
    ],
    topic: 'Education & Scope',
    synonyms: ['all-inclusive', 'exhaustive', 'thorough'],
    antonyms: ['partial', 'incomplete', 'limited']
  },
  {
    id: 'b2-divergent',
    word: 'divergent',
    phonetic: '/daɪˈvɝː.dʒənt/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'B2',
    arabic: 'متباعد / متباين / مختلف',
    arabicAlts: ['متشعب'],
    definition: 'Different or becoming different from something else, moving away in various directions.',
    examples: [
      'The committee members held divergent opinions on how to allocate the budget.',
      'Divergent thinking encourages creative brainstorming.'
    ],
    examplesArabic: [
      'كان لأعضاء اللجنة آراء متباينة حول كيفية توزيع الميزانية.',
      'يشجع التفكير التباعدي على العصف الذهني الإبداعي.'
    ],
    topic: 'Ideas & Perspectives',
    synonyms: ['differing', 'disparate', 'deviating'],
    antonyms: ['convergent', 'similar', 'uniform']
  },
  {
    id: 'b2-feasible',
    word: 'feasible',
    phonetic: '/ˈfiː.zə.bəl/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'B2',
    arabic: 'قابل للتطبيق / مجدٍ / ممكن التحقيق',
    arabicAlts: ['عملي'],
    definition: 'Able to be made, done, or achieved successfully and reasonably.',
    examples: [
      'It is entirely feasible to learn 20 new vocabulary words every day.',
      'The engineering team proved that the solar project was financially feasible.'
    ],
    examplesArabic: [
      'من الممكن تماماً وقابل للتطبيق تعلم 20 كلمة مفردات جديدة كل يوم.',
      'أثبت الفريق الهندسي أن مشروع الطاقة الشمسية مجدٍ مالياً.'
    ],
    topic: 'Planning & Business',
    synonyms: ['viable', 'practicable', 'workable'],
    antonyms: ['unfeasible', 'impossible', 'impracticable']
  },
  {
    id: 'b2-implement',
    word: 'implement',
    phonetic: '/ˈɪm.plə.ment/',
    pos: 'verb',
    posArabic: 'فعل',
    cefr: 'B2',
    arabic: 'يطبق / ينفذ / يضع موضع التنفيذ',
    arabicAlts: ['يشرع في'],
    definition: 'To start using a plan, system, or law in an official way.',
    examples: [
      'The school will implement new language teaching methods next semester.',
      'We implemented automated audio pronunciation in our vocabulary software.'
    ],
    examplesArabic: [
      'ستطبق المدرسة أساليب جديدة لتعليم اللغة في الفصل الدراسي القادم.',
      'نفذنا النطق الصوتي الآلي في برنامج المفردات الخاص بنا.'
    ],
    topic: 'Technology & Policy',
    synonyms: ['execute', 'enact', 'apply'],
    collocations: ['implement a policy', 'implement a strategy']
  },
  {
    id: 'b2-resilience',
    word: 'resilience',
    phonetic: '/rɪˈzɪl.jəns/',
    pos: 'noun',
    posArabic: 'اسم',
    cefr: 'B2',
    arabic: 'مرونة / قدرة على التعافي والتأقلم',
    arabicAlts: ['صمود'],
    definition: 'The ability to be happy, successful, or healthy again after something difficult happens.',
    examples: [
      'Language learning requires emotional resilience and patience.',
      'The local economy showed remarkable resilience following the crisis.'
    ],
    examplesArabic: [
      'يتطلب تعلم اللغة مرونة نفسية وصبراً.',
      'أظهر الاقتصاد المحلي صموداً ومرونة ملحوظة بعد الأزمة.'
    ],
    topic: 'Psychology & Character',
    synonyms: ['tenacity', 'durability', 'grit'],
    antonyms: ['fragility', 'vulnerability']
  },

  // ===================== C1 (Advanced) =====================
  {
    id: 'c1-aberration',
    word: 'aberration',
    phonetic: '/ˌæb.əˈreɪ.ʃən/',
    pos: 'noun',
    posArabic: 'اسم',
    cefr: 'C1',
    arabic: 'شذوذ / انحراف عن المألوف',
    arabicAlts: ['زيغ', 'حالة استثنائية'],
    definition: 'A temporary change from what is typical, acceptable, or expected.',
    examples: [
      'His sudden angry outburst was an aberration from his usually calm demeanor.',
      'In a statistical model, outliers might simply be measurement aberrations.'
    ],
    examplesArabic: [
      'كانت فورة غضبه المفاجئة انحرافاً عن سلوكه الهادئ المعتاد.',
      'في النموذج الإحصائي، قد تكون القيم المتطرفة مجرد شذوذ في القياس.'
    ],
    topic: 'Academic & Analysis',
    synonyms: ['anomaly', 'deviation', 'eccentricity'],
    antonyms: ['normality', 'conformity', 'regularity']
  },
  {
    id: 'c1-articulate',
    word: 'articulate',
    phonetic: '/ɑːrˈtɪk.jə.lət/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'C1',
    arabic: 'بليغ / فصيح / مفوه',
    arabicAlts: ['معبر بوضوح'],
    definition: 'Able to express thoughts and arguments clearly, effectively, and fluently in words.',
    examples: [
      'She gave an articulate and persuasive speech at the United Nations.',
      'He is remarkably articulate for such a young scholar.'
    ],
    examplesArabic: [
      'ألقت خطاباً فصيحاً ومقنعاً في الأمم المتحدة.',
      'إنه فصيح وبليغ بشكل لافت بالنسبة لباحث شاب كهذا.'
    ],
    topic: 'Communication & Eloquence',
    synonyms: ['eloquent', 'coherent', 'lucid'],
    antonyms: ['inarticulate', 'hesitant', 'unclear']
  },
  {
    id: 'c1-cognitive',
    word: 'cognitive',
    phonetic: '/ˈkɑːɡ.nə.tɪv/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'C1',
    arabic: 'معرفي / إدراكي',
    arabicAlts: ['عقلي'],
    definition: 'Connected with the mental processes of understanding, knowing, learning, and thinking.',
    examples: [
      'Bilingualism has been shown to enhance cognitive flexibility and memory.',
      'Spaced repetition strengthens long-term cognitive retention.'
    ],
    examplesArabic: [
      'ثبت أن ثنائية اللغة تعزز المرونة المعرفية والذاكرة.',
      'التكرار المتباعد يقوي الاحتفاظ المعرفي طويل الأمد.'
    ],
    topic: 'Psychology & Neuroscience',
    synonyms: ['intellectual', 'cerebral', 'mental'],
    collocations: ['cognitive development', 'cognitive overload']
  },
  {
    id: 'c1-disseminate',
    word: 'disseminate',
    phonetic: '/dɪˈsem.ə.neɪt/',
    pos: 'verb',
    posArabic: 'فعل',
    cefr: 'C1',
    arabic: 'ينشر / يبث / يعمم',
    arabicAlts: ['يشيع'],
    definition: 'To spread or give out information, news, ideas, or knowledge to a wide audience.',
    examples: [
      'The research team aims to disseminate their findings across scientific journals.',
      'Social media makes it easy to disseminate educational resources globally.'
    ],
    examplesArabic: [
      'يهدف فريق البحث إلى نشر نتائجه عبر المجلات العلمية.',
      'تسهل وسائل التواصل الاجتماعي نشر الموارد التعليمية عالمياً.'
    ],
    topic: 'Information & Media',
    synonyms: ['broadcast', 'distribute', 'circulate'],
    antonyms: ['withhold', 'suppress']
  },
  {
    id: 'c1-eloquent',
    word: 'eloquent',
    phonetic: '/ˈel.ə.kwənt/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'C1',
    arabic: 'فصيح / بليغ / معبر بقوة',
    arabicAlts: ['مؤثر القول'],
    definition: 'Giving a clear, strong message; expressing feelings or opinions in a graceful and persuasive way.',
    examples: [
      'The author’s eloquent prose captures the intricate beauty of the desert.',
      'Her tears were an eloquent testimony to her sorrow.'
    ],
    examplesArabic: [
      'نثر الكاتبة البليغ يجسد الجمال المعقد للصحراء.',
      'كانت دموعها شهادة بليغة على حزنها.'
    ],
    topic: 'Literature & Rhetoric',
    synonyms: ['expressive', 'persuasive', 'fluent'],
    antonyms: ['inarticulate', 'clumsy']
  },
  {
    id: 'c1-ephemeral',
    word: 'ephemeral',
    phonetic: '/ɪˈfem.ər.əl/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'C1',
    arabic: 'زائل / سريع الزوال / مؤقت',
    arabicAlts: ['عابر', 'قصير الأجل'],
    definition: 'Lasting for only a very short time; transient.',
    examples: [
      'Fame on the internet is often ephemeral, fading in just a few days.',
      'The ephemeral blooms of desert flowers appear only after heavy rain.'
    ],
    examplesArabic: [
      'غالباً ما تكون الشهرة على الإنترنت سريعة الزوال، وتتلاشى في غضون أيام قليلة.',
      'تظهر أزهار الصحراء سريعة الزوال فقط بعد هطول أمطار غزيرة.'
    ],
    topic: 'Philosophy & Time',
    synonyms: ['transient', 'fleeting', 'evanescent'],
    antonyms: ['enduring', 'permanent', 'perpetual']
  },
  {
    id: 'c1-juxtaposition',
    word: 'juxtaposition',
    phonetic: '/ˌdʒʌk.stə.pəˈzɪʃ.ən/',
    pos: 'noun',
    posArabic: 'اسم',
    cefr: 'C1',
    arabic: 'مقاربة / مجاورة متناقضة / وضع جنباً إلى جنب للمقارنة',
    arabicAlts: ['تناظر تقابلي'],
    definition: 'The fact of putting two things about people or things close together, especially in order to show a contrast.',
    examples: [
      'The juxtaposition of ancient ruins with gleaming skyscrapers creates a striking cityscape.',
      'Her painting achieves emotional tension through the juxtaposition of light and shadow.'
    ],
    examplesArabic: [
      'تخلق المجاورة بين الآثار القديمة وناطحات السحاب اللامعة مشهداً حضرياً مذهلاً.',
      'تحقق لوحتها توتراً عاطفياً من خلال التقابل بين الضوء والظل.'
    ],
    topic: 'Arts & Criticism',
    synonyms: ['contrast', 'comparison', 'proximity']
  },
  {
    id: 'c1-paradigm',
    word: 'paradigm',
    phonetic: '/ˈpær.ə.daɪm/',
    pos: 'noun',
    posArabic: 'اسم',
    cefr: 'C1',
    arabic: 'نموذج فكري / نموذج أصلي / إطار مفاهيمي',
    arabicAlts: ['منظومة فكرية'],
    definition: 'A model or example that shows how something works or is produced; a set of theories or standards that forms a worldview.',
    examples: [
      'The discovery of quantum mechanics caused a profound paradigm shift in modern physics.',
      'This technology introduces a completely new educational paradigm.'
    ],
    examplesArabic: [
      'أحدث اكتشاف ميكانيكا الكم تحولاً جذرياً في النموذج الفكري للفيزياء الحديثة.',
      'تقدم هذه التقنية نموذجاً تعليمياً جديداً تماماً.'
    ],
    topic: 'Philosophy & Science',
    synonyms: ['framework', 'archetype', 'prototype'],
    collocations: ['paradigm shift', 'dominant paradigm']
  },
  {
    id: 'c1-pragmatic',
    word: 'pragmatic',
    phonetic: '/præɡˈmætɪk/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'C1',
    arabic: 'عملي / واقعي / نفعي',
    arabicAlts: ['براغماتي'],
    definition: 'Solving problems in a sensible way that suits the conditions that really exist now, rather than following fixed theories, ideas, or rules.',
    examples: [
      'We need a pragmatic approach to language learning that focuses on real conversation.',
      'He made a pragmatic decision to compromise on minor issues.'
    ],
    examplesArabic: [
      'نحن بحاجة إلى نهج عملي لتعلم اللغة يركز على المحادثة الحقيقية.',
      'اتخذ قراراً واقعياً بالمساومة على القضايا البسيطة.'
    ],
    topic: 'Philosophy & Decision Making',
    synonyms: ['practical', 'realistic', 'utilitarian'],
    antonyms: ['idealistic', 'impractical', 'dogmatic']
  },
  {
    id: 'c1-ubiquitous',
    word: 'ubiquitous',
    phonetic: '/juːˈbɪk.wə.t̬əs/',
    pos: 'adjective',
    posArabic: 'صفة',
    cefr: 'C1',
    arabic: 'شائع في كل مكان / واسع الانتشار / كلي الوجود',
    arabicAlts: ['موجود أينما كان'],
    definition: 'Present, appearing, or found everywhere at the same time.',
    examples: [
      'Smartphones have become ubiquitous in modern daily life.',
      'English has attained a ubiquitous status in international business and technology.'
    ],
    examplesArabic: [
      'أصبحت الهواتف الذكية منتشرة في كل مكان في الحياة اليومية الحديثة.',
      'اكتسبت اللغة الإنجليزية مكانة واسعة الانتشار في الأعمال التجارية والتكنولوجيا الدولية.'
    ],
    topic: 'Modern Life & Tech',
    synonyms: ['omnipresent', 'pervasive', 'widespread'],
    antonyms: ['rare', 'scarce', 'isolated']
  }
];
