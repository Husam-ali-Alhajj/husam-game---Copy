import { useState, useEffect, useRef } from "react";

// ============================================================
//  ✏️  EDIT YOUR GAME DATA HERE
// ============================================================
const TEAM_NAMES = ["الفريق الأول", "الفريق الثاني"];

const CATEGORIES = [
  {
    name: "بدون نقاط",
    emoji: " 🎤 ",
    questions: [
      { points: 200, q: "", a: "كأنك يا أبا زيد ما غزيت",    img: "/images/11200.jpeg" },
      { points: 400, q: "", a: "وليس بقولك من هذا بضائره العرب تعرف من أنكرت والعجم \n كلتا يديه غياثٌ عمَّ نفعهما يستوكفان ولا يعورهما عدم\n سهل الخليفة لا تخشى بوادره يزينه اثنان: حسن الخلق والشيم", img: "/images/11400.jpeg" },
      { points: 600, q: "", a: "تناجيك أجداث وهن صموت، وسكانها تحت التراب خفوت أيا جامع الدنيا لغير بلاغة، لمن تجمع الدنيا وأنت تموت؟",   img: "/images/11600.jpeg" },
      { points: 200, q: "", a: "انا رب الابل, اما البيت فله رب يحميها",           img: "/images/12200.jpeg" },
      { points: 400, q: "", a: "بلَغني أنه تفشَّى ببابك حاجب يمنع الضعفاء ويقرب الأغنياء",         img: "/images/12400.jpeg" },
      { points: 600, q: "", a: "خاف وراء القبر إن لم يُعافني أشد من القبر التهابا وأضيقا | إذا جاءني يوم القيامة قائدٌ عنيف وسوَّاق يسوق الفرزدقا | لقد خاب من أولاد آدم من مشى إلى النار مغلولا يده مطوَّقا",           img: "/images/12600.jpeg" },
    ],
  },
  // {
  //   name: "بدون نقاط",
  //   emoji: " 🎤 ",
  //   questions: [
  //     { points: 200, q: "", a: "يا رب إن عظُمت ذنوبي كثرةً، فلقد علمت بأن عفوك أعظم ان كان لا يرجوك إلا مُحسن， فبمن يلوذ ويستجير المجرم ",    img: "/images/21200.jpeg" },
  //     { points: 400, q: "", a: "نأتي إلى الدنيا ونحن سواسية، طفل الملوك هنا كطفل الحاشية \nونغادر الدنيا ونحن كما ترى، متشابهون على قبور حافية \nأعمالنا تُعلي وتَخفض شأننا، وحسابنا بالحق يوم الغاشية \nحور وأنهار، قصور عالية، وجهنم تُصلى ونار حامية \nفاختر لنفسك ما تُحب وتبتغي، ما دام يومك والليالي باقية", img: "/images/21400.jpeg" },
  //     { points: 600, q: "", a: "أتيت القبور فناديتها، فأين المعظَّم والمحتقر؟ وأين المدِلُّ بسلطانه، وأين المزكَّى إذا ما افتخر؟ تفانوا جميعا فما مخبر، وماتوا جميعا ومات الخبر تروح وتغدو بنات الثرى، فتمحو محاسن تلك الصور فيا سائلي عن أناس مضوا، أما لك فيما ترى معتبر؟",   img: "/images/21600.jpeg" },
  //     { points: 200, q: "", a: "إذا ما قال لي ربي أما استحييت تعصيني \  وتخفي الذنب عن خلقي وبالعصيان تأتيني",           img: "/images/22200.jpeg" },
  //     { points: 400, q: "", a: "َيُّها الكاتِبُ ما تَكتُبُ مَكتوبٌ عَلَيك فَاِجعَلِ المَكتوبَ خَيراً فَهوَ مَردودٌ إِلَيك",         img: "/images/22400.jpeg" },
  //     { points: 600, q: "", a: "لا علم لي إن كنت أُمسي بينكم حيا لعلي أو قتيلا ربما | فإذا قُتلت فلست أدري موئلي في جنة أم سعير أُضرما | لكن جلدي مس جلدك لعلي أمضي وجلدي عن جهنم حرما",           img: "/images/22600.jpeg" },
  //   ],
  // },
  // {
  //   name: "بدون نقاط",
  //   emoji: " 🎤 ",
  //   questions: [
  //     { points: 200, q: "", a: "اللهم لولا أنت ما اهتدينا، ولا تصدقنا ولا صلينا إنا إذا صِيح بنا أتينا، وبالصياح عولوا علينا إن الألى هم بغوا علينا، إذا أرادوا فتنة أبينا",    img: "/images/31200.jpeg" },
  //     { points: 400, q: "", a: "يا فاطر الخلق البديع وكافلا رزق الجميع سحاب جودك هاطل يا مُسبغ البر الجزيل ومُسبل الستر الجميل، عميم طولك طائل يا عالم السر الخفي ومُنجز الوعد الوقي، قضاء حكمك عادل", img: "/images/31400.jpeg" },
  //     { points: 600, q: "", a: "النفس تجزع أن تكون فقيرة ... والفقر خير من غنى يطغيها ... وغنى النفوس هو الكفاف فإن أبت ... فجميع ما في الأرض لا يكفيها ... هي القناعة فالزمها تكن ملكاً ... لو لم تكن لك إلا راحة البدن",   img: "/images/31600.jpeg" },
  //     { points: 200, q: "", a: "والضعيف فيكم قوي عندي حتى أُريح عليه حقه، والقوي فيكم ضعيف عندي حتى آخذ الحق منه",           img: "/images/32200.jpeg" },
  //     { points: 400, q: "", a: "لا تأسفن على الدنيا وما فيها \  فالموت لا شك يفنينا ويفنيها \  واعمل لدار غد رضوان خازنها \ والجار أحمد والرحمن ناشيها",         img: "/images/32400.jpeg" },
  //     { points: 600, q: "", a: "قل للمليحة في الخمار الأسود ماذا فعلت بزاهدٍ مُتعبد | قد كان شمَّر للصلاة ثيابه حتى قعدت له بباب المسجد | ردي له صلاته وصيامه لا تقتليه بحق محمد",           img: "/images/32600.jpeg" },
  //   ],
  // },
  // {
  //   name: "بدون نقاط",
  //   emoji: " 🎤 ",
  //   questions: [
  //     { points: 200, q: "", a: "لا تنه عن خُلق وتأتي مثله، عار عليك إذا فعلت عظيم",    img: "/images41200.jpeg" },
  //     { points: 400, q: "", a: " قَد رَأَيتَ القُرونَ قَبلُ تَفانَت \  دَرَسَت وَاِنقَضَت سَريعاً وَبانَت \  كَم أُناسٍ رَأَيتَ أَكرَمَتِ الدُنــيا \ بِبَعضِ العُروضِ ثُمَّ أَهانَت", img: "/images/41400.jpeg" },
  //     { points: 600, q: "", a: "واندب زمانا سلفا سوَّدت فيه الصحفا، ولم تزل معتكفا على القبيح الشنع كم ليلة أودعتها مآثما أبدعتها، لشهوة أطعتها في مرقد ومضجع",   img: "/images/41600.jpeg" },
  //     { points: 200, q: "", a: "لكل داء دواء يُستطب به، إلا الحماقة أعيت من يداويها",           img: "/images/42200.jpeg" },
  //     { points: 400, q: "", a: "لَعَمرُكَ ما الإِنسانُ إِلّا بِدينِهِ \  فَلا تَترُكِ التَقوى اِتِّكالاً عَلى النَسَب \  فَقَد رَفَعَ الإِسلامُ سَلمانَ فارِسٍ \  وَقَد وَضَعَ الشِركُ الشَريفَ أَبا لَهَب",         img: "/images/42400.jpeg" },
  //     { points: 600, q: "", a: "لَعَمرُكَ ما الإِنسانُ إِلّا بِدينِهِ \  فَلا تَترُكِ التَقوى اِتِّكالاً عَلى النَسَب \  فَقَد رَفَعَ الإِسلامُ سَلمانَ فارِسٍ \  وَقَد وَضَعَ الشِركُ الشَريفَ أَبا لَهَب",           img: "/images/42600.jpeg" },
  //   ],
  // },
  // {
  //   name: "بدون نقاط",
  //   emoji: " 🎤 ",
  //   questions: [
  //     { points: 200, q: "", a: "واخضع خضوع المعترف، ولذ ملاذ المقترف واعص هواك وانحرف، عنه انحراف المُقلع",    img: "/images/51200.jpeg" },
  //     { points: 400, q: "", a: "فَما كُلُّ مَن تَهواهُ يَهواكَ قَلبُهُ \ وَلا كُلُّ مَن صافَيتَهُ لَكَ قَد صَفا \ إِذا لَم يَكُن صَفوُ الوِدادِ طَبيعَةً \ فَلا خَيرَ في وِدٍّ يَجيءُ تَكَلُّفا", img: "/images/51400.jpeg" },
  //     { points: 600, q: "", a: "إلامَ تسهو وتَني، ومُعظم العمر فَني في ما يضر المقتني، ولست بالمرتدع ويحك يا نفس احرصي， على ارتياد المخلص وطاوعي وأخلصي， واستمعي النصح وعي",   img: "/images/51600.jpeg" },
  //     { points: 200, q: "", a: "لا ترتجي من عباد الله مسالة \ فالعبد عبدٌ ورب العبد يهب",           img: "/images/52200.jpeg" },
  //     { points: 400, q: "", a: "ولدتك أمُّك يا ابن آدم باكياً والناس حولك يضحكون سرورا فاعمل لنفسك أن تكون إذا بكوا في يوم موتك ضاحكاً مسرورا",         img: "/images/52400.jpeg" },
  //     { points: 600, q: "", a: "وكم غمصت بره، وكم أمنت مكره، وكم نبذت أمره نبذ الحذا المرقع وكم ركضت في اللعب، وفُهت عمدا بالكذب، ولم تراع ما يحب من عهده المتبع فالبس شعار الندم، واسكب شآبيب الندم، قبل زوال القدم وقبل سوء المصرع",           img: "/images/52600.jpeg" },
  //   ],
  // },

  // Group 1
{
    name: "من أنا؟",
    emoji: "🎭",
    questions: [
      { points: 200, q: "شيدتني أيدٍ لا تُحصى فوق الجبال والوديان، بُنيت لأمنع الغزاة لكنهم اخترقوني، وأمتد لآلاف الأميال. من أنا؟", a: "سور الصين العظيم" },
      { points: 400, q: "ولدت في ليلة واحدة عام 1961 وقسّمت مدينة بأكملها بين عالمين، وفي ليلة واحدة أيضاً عام 1989 هدمني الناس بأيديهم. من أنا؟", a: "جدار برلين" },
      { points: 600, q: "أقول إن الصواب والخطأ ليسا مطلقين بل يتحددان بالثقافة والزمان، لكنني أنهار حين تُسأل إن كانت الإبادة الجماعية خطأً في كل زمان. من أنا؟", a: "النسبية الأخلاقية" },
      { points: 200, q: "أنهيت حرباً كانت ستأكل ملايين، لكنني فتحت نقاشاً لم يُغلق عن الحد الفاصل بين العلم والأخلاق. من أنا؟", a: "القنبلة النووية" },
      { points: 400, q: "خضت قرابة أربعة عقود بين عملاقين لم تشتبك جيوشهما مباشرة، وانتهيت دون معاهدة رسمية حين انهار أحد طرفيها من الداخل. من أنا؟", a: "الحرب الباردة" },
      { points: 600, q: "لستُ تسجيلاً أميناً للماضي بل إعادة بناء تتغير في كل مرة تستدعيني، وهويتك الشخصية مبنية بالكامل عليّ. من أنا؟", a: "الذاكرة" },
    ],
},
// Group 2
// {
//     name: "من أنا؟",
//     emoji: "🎭",
//     questions: [
//       { points: 200, q: "اخترعني الجيش الأمريكي في الستينيات لغرض عسكري محدود، واليوم لا يعرف كثيرون كيف كانت الحياة قبلي. من أنا؟", a: "الإنترنت" },
//       { points: 400, q: "وُلدت في أمريكا التي لم تعترف بي إنساناً، وجدت نفسي في السجن شاباً فأعدت بناء نفسي من الصفر وخرجت خطيباً حاداً. من أنا؟", a: "مالكوم إكس" },
//       { points: 600, q: "ظللت في ظل شيخي حتى كاد الناس ينسون أنني عالم مستقل، سجنوني معه وحين أُفرج عني أفرج عن قلم لم يتوقف. من أنا؟", a: "ابن القيم" },
//       { points: 200, q: "تشكّلت على مدى ملايين السنين تحت الأرض، حوّلت دولاً صحراوية فقيرة إلى قوى مالية وأشعل حروباً ورسم تحالفات. من أنا؟", a: "البترول" },
//       { points: 400, q: "عاش في زمن تقلّبات سياسية وشهد سقوط دول، حوّل ذلك إلى نظرية عن كيف تقوم الحضارات وكيف تسقط، والتقى بتيمورلنك. من أنا؟", a: "ابن خلدون" },
//       { points: 600, q: "لا اقتصاد يعمل بدوني ولا علاقة تقوم بدوني، أُبنى ببطء شديد وأنهار بسرعة مذهلة. من أنا؟", a: "الثقة" },
//     ],
// },
// // Group 3
// {
//     name: "من أنا؟",
//     emoji: "🎭",
//     questions: [
//       { points: 200, q: "أطلقني البشر إلى السماء وأدور حول الأرض بدقة، بدأت قصتي عام 1957 وأصبحت شيئاً لا يتخيل أحد الحياة بدوني. من أنا؟", a: "القمر الصناعي" },
//       { points: 400, q: "بدأت بجوع الشعب وانتهت بإعدام ملك على الملأ، رفعت شعارات الحرية والمساواة ثم أكلت أبناءها. من أنا؟", a: "الثورة الفرنسية" },
//       { points: 600, q: "وُلد في السهول الأوراسية وبِيع في سوق النخاسة وهو مراهق، قاتل الصليبيين والمغول في جيل واحد وهزم الاثنين. من أنا؟", a: "الظاهر بيبرس" },
//       { points: 200, q: "في القرن الرابع عشر محوت ثلث سكان أوروبا في سنوات قليلة، وصلت عبر الجرذان والبراغيث ويسمونني الموت الأسود. من أنا؟", a: "الطاعون" },
//       { points: 400, q: "سجنته دولة جنوب أفريقيا سبعاً وعشرين عاماً، خرج شيخاً لكن غير مكسور وانتُخب رئيساً للبلد ذاتها التي سجنته. من أنا؟", a: "مانديلا" },
//       { points: 600, q: "عُهد إليّ بجمع كتاب الله بين دفتين مرتين، وكنت مرجعاً في المواريث لمن هم أكبر مني سناً في الإسلام. من أنا؟", a: "زيد بن ثابت" },
//     ],
// },
// // Group 4
// {
//     name: "من أنا؟",
//     emoji: "🎭",
//     questions: [
//       { points: 200, q: "ظهرت في نهاية 2019 وأوقفت العالم بأسره في أشهر، أغلقت الحدود وعطّلت الاقتصادات وحوّلت المصافحة إلى فعل مشبوه. من أنا؟", a: "كوفيد" },
//       { points: 400, q: "قاوم الاحتلال الإيطالي في الصحراء الليبية لأكثر من عشرين عاماً، أسروه وهو في الثمانين وأعدموه علناً. من أنا؟", a: "عمر المختار" },
//       { points: 600, q: "وُلد لأب عربي وأمٍّ حبشية، أثبت نفسه في القتال حتى اضطر أبوه أن يعترف به، وحوّل حرمانه في الحب إلى معلقة تُقرأ حتى اليوم. من أنا؟", a: "عنترة بن شداد" },
//       { points: 200, q: "هي الوحيدة من عجائب الدنيا السبع القديمة التي ما زالت قائمة، وظلت أطول إنشاء بشري لأكثر من ثلاثة آلاف وثمانمئة سنة. من أنا؟", a: "الأهرامات" },
//       { points: 400, q: "عبر مضيقاً يحمل اسمه حتى اليوم بجيش أقل عدداً وهزم من واجهه في أسابيع، وفتح حضارة أضاءت أوروبا قروناً. من أنا؟", a: "طارق بن زياد" },
//       { points: 600, q: "أقيسني البشر بالشمس والقمر لكن ماهيتي الحقيقية لا يزال الفيزيائيون يتجادلون فيها، وأثبت أينشتاين أنني لست مطلقاً. من أنا؟", a: "الزمن" },
//     ],
// },
// // Group 5
// {
//     name: "من أنا؟",
//     emoji: "🎭",
//     questions: [
//       { points: 200, q: "غادر طنجة وهو في الثانية والعشرين قاصداً الحج ولم يعد لثلاثين عاماً، رحلاته تجاوزت ما قطعه ماركو بولو بعدة أضعاف. من أنا؟", a: "ابن بطوطة" },
//       { points: 400, q: "والٍ أموي بنى المدن وشق الطرق لكن يده بالدم كانت أسرع من يده بالعمران، وخطبته يوم دخل الكوفة حُفظت كنموذج في البلاغة. من أنا؟", a: "الحجاج بن يوسف" },
//       { points: 600, q: "طبقة رقيقة تفصل بين الحياة وإشعاع يدمرها، وقصتها النادرة أنها القضية البيئية الكبرى الوحيدة التي تصرف فيها البشر في الوقت المناسب. من أنا؟", a: "الأوزون" },
//       { points: 200, q: "اكتُشفت عام 1953 وأحمل تعليمات بناء كل كائن حي، وأصبحت أداة في أيدي العدالة تُدين المجرمين وتُبرئ المظلومين. من أنا؟", a: "الـ DNA" },
//       { points: 400, q: "استولى على السلطة بانقلاب وهو في السابعة والعشرين وحكم ليبيا أربعة عقود، سقط عام 2011 في الشارع الذي ظن أنه يملكه. من أنا؟", a: "القذافي" },
//       { points: 600, q: "كان من أوائل من أسلموا وهو مراهق، قاد المسلمين في القادسية وفتح بلاد فارس، وقيل إن دعوته كانت مستجابة لا تُرد. من أنا؟", a: "سعد بن أبي وقاص" },
//     ],
// },
  
  {
    name: "بدون كلام",
    emoji: "🤐",
    questions: [
      { points: 200, q: "بيعطيك حسام", a: "ذاك الشبل من ذاك الاسد" },
      { points: 400, q: "بيعطيك حسام", a: "ملك قارون" },
      { points: 600, q: "بيعطيك حسام", a: "سين جيم" },
      { points: 200, q: "بيعطيك حسام", a: "كل يرى الناس بعين طبعه" },
      { points: 400, q: "بيعطيك حسام", a: "ليس كل ما يلمع ذهبا" },
      { points: 600, q: "بيعطيك حسام", a: "ويسترن يونيون" },
    ],
  },
  // {
  //   name: "بدون كلام",
  //   emoji: "🤐",
  //   questions: [
  //     { points: 200, q: "بيعطيك حسام", a: "الحاجة أم الاختراع" },
  //     { points: 400, q: "بيعطيك حسام", a: "درهم وقاية خير من قنطار علاج" },
  //     { points: 600, q: "بيعطيك حسام", a: "راحت السكرة و جت الفكرة" },
  //     { points: 200, q: "بيعطيك حسام", a: "إذا تم العقل نقص الكلام" },
  //     { points: 400, q: "بيعطيك حسام", a: "من أمِن العقوبة أساء الأدب" },
  //     { points: 600, q: "بيعطيك حسام", a: "من استعجل الشيء قبل أوانه عوقب بحرمانه" },
  //   ],
  // },
  // {
  //   name: "بدون كلام",
  //   emoji: "🤐",
  //   questions: [
  //     { points: 200, q: "بيعطيك حسام", a: "مصائب قومٍ عند قومٍ فوائد" },
  //     { points: 400, q: "بيعطيك حسام", a: "إذا عُرف السبب بطل العجب" },
  //     { points: 600, q: "بيعطيك حسام", a: "أول الغضب جنون وآخره ندم" },
  //     { points: 200, q: "بيعطيك حسام", a: "ليس الخبر كالمعاينة" },
  //     { points: 400, q: "بيعطيك حسام", a: "لكل امرئٍ من اسمه نصيب" },
  //     { points: 600, q: "بيعطيك حسام", a: "كيلوباترا" },
  //   ],
  // },
  // {
  //   name: "بدون كلام",
  //   emoji: "🤐",
  //   questions: [
  //     { points: 200, q: "بيعطيك حسام", a: "ما ندم من استشار" },
  //     { points: 400, q: "بيعطيك حسام", a: "ليوناردو دافنشي" },
  //     { points: 600, q: "بيعطيك حسام", a: "الشيخ من رباك" },
  //     { points: 200, q: "بيعطيك حسام", a: "مثلث فيثاغورس" },
  //     { points: 400, q: "بيعطيك حسام", a: "انفجار تشيرنوبل" },
  //     { points: 600, q: "بيعطيك حسام", a: "العنصر الكيميائي اكس" },
  //   ],
  // },
  // {
  //   name: "بدون كلام",
  //   emoji: "🤐",
  //   questions: [
  //     { points: 200, q: "بيعطيك حسام", a: "من عاشر القوم أربعين يومًا صار منهم" },
  //     { points: 400, q: "بيعطيك حسام", a: "قنبلة الفتى الصغير و الرجل السمين" },
  //     { points: 600, q: "بيعطيك حسام", a: "خير الصدقة ما كان عن ظهر غنى" },
  //     { points: 200, q: "بيعطيك حسام", a: "أعطِ الخبز خبازه ولو أكل نصفه" },
  //     { points: 400, q: "بيعطيك حسام", a: "من راقب الناس مات همًّا" },
  //     { points: 600, q: "بيعطيك حسام", a: "من شبَّ على شيء شاب عليه" },
  //   ],
  // },



  //   // Group 1
  // {
  //     name: "بدون كلام",
  //     emoji: "🤐",
  //     questions: [
  //       { points: 200, q: "بيعطيك حسام", a: "برج ايفل" },
  //       { points: 400, q: "بيعطيك حسام", a: "العصفور في اليد خير من عشرة على الشجرة" },
  //       { points: 600, q: "بيعطيك حسام", a: "الحرب الباردة" },
  //       { points: 200, q: "بيعطيك حسام", a: "الحرباء" },
  //       { points: 400, q: "بيعطيك حسام", a: "الجار قبل الدار" },
  //       { points: 600, q: "بيعطيك حسام", a: "معركة بدر" },
  //     ],
  // },
  // // Group 2
  // {
  //     name: "بدون كلام",
  //     emoji: "🤐",
  //     questions: [
  //       { points: 200, q: "بيعطيك حسام", a: "كأس العالم" },
  //       { points: 400, q: "بيعطيك حسام", a: "البحر الأسود" },
  //       { points: 600, q: "بيعطيك حسام", a: "الاتحاد السوفيتي" },
  //       { points: 200, q: "بيعطيك حسام", a: "النعامة" },
  //       { points: 400, q: "بيعطيك حسام", a: "اللي ما يعرف الصقر يشويه" },
  //       { points: 600, q: "بيعطيك حسام", a: "صلح الحديبية" },
  //     ],
  // },
  // // Group 3
  // {
  //     name: "بدون كلام",
  //     emoji: "🤐",
  //     questions: [
  //       { points: 200, q: "بيعطيك حسام", a: "تمثال الحرية" },
  //       { points: 400, q: "بيعطيك حسام", a: "الأسد لا يأكل الذباب" },
  //       { points: 600, q: "بيعطيك حسام", a: "معركة حطين" },
  //       { points: 200, q: "بيعطيك حسام", a: "الفيل" },
  //       { points: 400, q: "بيعطيك حسام", a: "الوقت كالسيف إن لم تقطعه قطعك" },
  //       { points: 600, q: "بيعطيك حسام", a: "غزوة الخندق" },
  //     ],
  // },
  // // Group 4
  // {
  //     name: "بدون كلام",
  //     emoji: "🤐",
  //     questions: [
  //       { points: 200, q: "بيعطيك حسام", a: "الهرم الأكبر" },
  //       { points: 400, q: "بيعطيك حسام", a: "كل فتاة بأبيها معجبة" },
  //       { points: 600, q: "بيعطيك حسام", a: "الـ FBI" },
  //       { points: 200, q: "بيعطيك حسام", a: "الخفاش" },
  //       { points: 400, q: "بيعطيك حسام", a: "جدار برلين" },
  //       { points: 600, q: "بيعطيك حسام", a: "قانون نيوتن الثالث" },
  //     ],
  // },
  // // Group 5
  // {
  //     name: "بدون كلام",
  //     emoji: "🤐",
  //     questions: [
  //       { points: 200, q: "بيعطيك حسام", a: "برج بيزا المائل" },
  //       { points: 400, q: "بيعطيك حسام", a: "القات" },
  //       { points: 600, q: "بيعطيك حسام", a: "معركة اليرموك" },
  //       { points: 200, q: "بيعطيك حسام", a: "الكنغر" },
  //       { points: 400, q: "بيعطيك حسام", a: "إذا كان الكلام من فضة فالسكوت من ذهب" },
  //       { points: 600, q: "بيعطيك حسام", a: "ناسا" },
  //     ],
  // },
];

const MAIN_TIMER = 90;
const STEAL_TIMER = 40;

// ============================================================
//  STYLES
// ============================================================
const S = {
  root: {
    direction: "rtl",
    fontFamily: "'Cairo', 'Tajawal', Arial, sans-serif",
    background: "#1a1a2e",
    minHeight: "100vh",
    color: "#fff",
    userSelect: "none",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#111",
    padding: "0 20px",
    height: 64,
    borderBottom: "2px solid #333",
  },
  logo: { fontSize: 28, fontWeight: 900, color: "#ff6b2b", letterSpacing: 2 },
  teamTurnBadge: {
    background: "#ff6b2b",
    borderRadius: 30,
    padding: "8px 22px",
    fontWeight: 700,
    fontSize: 16,
  },
  topBtn: {
    background: "transparent",
    border: "1px solid #555",
    color: "#ccc",
    borderRadius: 8,
    padding: "6px 16px",
    cursor: "pointer",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  board: { padding: "24px 20px", maxWidth: 1300, margin: "0 auto" },
boardGrid: { display: "grid", gridTemplateColumns: `repeat(${CATEGORIES.length}, 1fr)`, gap: 10 },  catHeader: {
    background: "#ff6b2b",
    borderRadius: 12,
    padding: "12px 8px",
    textAlign: "center",
    fontWeight: 700,
    fontSize: 15,
    marginBottom: 2,
  },
  qCell: (used, points) => ({
    background: used ? "#2a2a2a" : points === 600 ? "#1e3a5f" : points === 400 ? "#1a2e4a" : "#16253b",
    border: used ? "2px solid #333" : "2px solid #2d5986",
    borderRadius: 10,
    padding: "14px 8px",
    textAlign: "center",
    fontWeight: 700,
    fontSize: 18,
    color: used ? "#444" : points === 600 ? "#ffd700" : points === 400 ? "#87ceeb" : "#7ec8e3",
    cursor: used ? "not-allowed" : "pointer",
    transition: "transform 0.1s, background 0.2s",
    minHeight: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  scoresBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    padding: "16px 20px",
    background: "#111",
    borderRadius: 14,
    border: "1px solid #333",
  },
  scoreCard: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 14,
    background: active ? "#ff6b2b22" : "transparent",
    border: active ? "2px solid #ff6b2b" : "2px solid #333",
    borderRadius: 12,
    padding: "10px 22px",
  }),
  scoreTeamName: { fontWeight: 700, fontSize: 18, color: "#ff6b2b" },
  scorePoints: { fontSize: 28, fontWeight: 900, color: "#fff", minWidth: 60, textAlign: "center" },
  scoreAdjustBtn: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "1px solid #555",
    background: "#222",
    color: "#fff",
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    padding: 0,
  },
  questionWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 64px)",
    padding: 32,
  },
  stealBanner: {
    background: "#c0392b",
    borderRadius: 12,
    padding: "8px 28px",
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 14,
  },
  questionCard: {
    background: "#111827",
    border: "3px solid #ff6b2b",
    borderRadius: 20,
    padding: "36px 48px",
    maxWidth: 820,
    width: "100%",
    textAlign: "center",
    marginBottom: 24,
  },
  questionText: { fontSize: 26, fontWeight: 700, lineHeight: 1.7, color: "#fff" },
  answerText: {
    fontSize: 22,
    color: "#ffd700",
    fontWeight: 700,
    marginTop: 20,
    padding: "12px 0",
    borderTop: "1px solid #333",
  },
  pointsBadge: {
    background: "#ff6b2b",
    borderRadius: 30,
    padding: "6px 20px",
    fontWeight: 900,
    fontSize: 18,
    marginBottom: 16,
    display: "inline-block",
  },
  btnRow: { display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 10 },
  btn: (color) => ({
    background: color,
    border: "none",
    borderRadius: 12,
    padding: "14px 32px",
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "opacity 0.2s",
    minWidth: 140,
  }),
  resultWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 64px)",
    padding: 32,
    textAlign: "center",
  },
  resultEmoji: { fontSize: 72, marginBottom: 10 },
  resultTitle: { fontSize: 32, fontWeight: 900, marginBottom: 8 },
  resultSub: { fontSize: 18, color: "#aaa", marginBottom: 30 },
  finalCard: {
    background: "#111827",
    border: "3px solid #ffd700",
    borderRadius: 24,
    padding: "60px 80px",
    textAlign: "center",
  },
  crownText: { fontSize: 80, marginBottom: 10 },
  winnerName: { fontSize: 42, fontWeight: 900, color: "#ffd700" },
  winnerScore: { fontSize: 26, color: "#aaa", marginTop: 6 },
};

// ============================================================
//  FULLSCREEN IMAGE MODAL
// ============================================================
function ImageModal({ src, onClose }) {
  if (!src) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.93)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "zoom-out",
      }}
    >
      <img
        src={src}
        alt="fullscreen"
        style={{
          maxWidth: "92vw",
          maxHeight: "92vh",
          borderRadius: 18,
          border: "3px solid #ff6b2b",
          objectFit: "contain",
          boxShadow: "0 0 60px #ff6b2b55",
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          background: "#ff6b2b",
          border: "none",
          borderRadius: 10,
          color: "#fff",
          fontWeight: 700,
          fontSize: 18,
          padding: "8px 22px",
          cursor: "pointer",
          fontFamily: "'Cairo', sans-serif",
          zIndex: 10000,
        }}
      >
        ✕ إغلاق
      </button>
    </div>
  );
}

// ============================================================
//  TIMER
// ============================================================
function useTimer() {
  const [time, setTime] = useState(0);
  const [active, setActive] = useState(false);
  const intervalRef = useRef(null);
  const onEndRef = useRef(null);

  const stop = () => {
    clearInterval(intervalRef.current);
    setActive(false);
  };

  const startWith = (seconds, onEnd) => {
    clearInterval(intervalRef.current);
    onEndRef.current = onEnd;
    setTime(seconds);
    setActive(true);
    let remaining = seconds;
    intervalRef.current = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        setTime(0);
        setActive(false);
        if (onEndRef.current) onEndRef.current();
      } else {
        setTime(remaining);
      }
    }, 1000);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setActive(false);
  };

  const resume = () => {
    if (active) return;
    setActive(true);
    let remaining = null;
    setTime((t) => { remaining = t; return t; });
    setTimeout(() => {
      setTime((t) => { remaining = t; return t; });
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
          clearInterval(intervalRef.current);
          setTime(0);
          setActive(false);
          if (onEndRef.current) onEndRef.current();
        } else {
          setTime(remaining);
        }
      }, 1000);
    }, 0);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);
  return { time, active, startWith, pause, resume, stop };
}

function fmt(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// ============================================================
//  MAIN COMPONENT
// ============================================================
export default function SeenJeemGame() {
  const [screen, setScreen] = useState("setup");
  const [teams, setTeams] = useState([...TEAM_NAMES]);
  const [scores, setScores] = useState([0, 0]);
  const [currentTeam, setCurrentTeam] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState({});
  const [activeQ, setActiveQ] = useState(null);
  const [phase, setPhase] = useState("main");
  const [stealTeam, setStealTeam] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [resultInfo, setResultInfo] = useState(null);
  const [setupNames, setSetupNames] = useState([...TEAM_NAMES]);
  const [fullscreenImg, setFullscreenImg] = useState(null);
  // score adjust amount per team (dropdown)

  const timer = useTimer();

  const phaseRef = useRef(phase);
  const activeQRef = useRef(activeQ);
  const currentTeamRef = useRef(currentTeam);
  const setPhaseRef = useRef(setPhase);
  const setStealTeamRef = useRef(setStealTeam);
  const setShowAnswerRef = useRef(setShowAnswer);
  const setResultInfoRef = useRef(setResultInfo);
  const timerRef = useRef(timer);

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { activeQRef.current = activeQ; }, [activeQ]);
  useEffect(() => { currentTeamRef.current = currentTeam; }, [currentTeam]);
  timerRef.current = timer;

  const startMainTimer = () => {
    timer.startWith(MAIN_TIMER, () => {
      if (phaseRef.current === "main") {
        const other = 1 - currentTeamRef.current;
        setStealTeamRef.current(other);
        setPhaseRef.current("steal");
        phaseRef.current = "steal";
        timerRef.current.startWith(STEAL_TIMER, () => {
          setPhaseRef.current("done");
          phaseRef.current = "done";
          setShowAnswerRef.current(true);
          setResultInfoRef.current({ type: "noone", points: activeQRef.current.points });
        });
      }
    });
  };

  const adjustScore = (teamIdx, delta) => {
    setScores((prev) => {
      const next = [...prev];
      next[teamIdx] = next[teamIdx] + delta;
      return next;
    });
  };

  const otherTeam = 1 - currentTeam;
  const totalQ = CATEGORIES.reduce((s, c) => s + c.questions.length, 0);
  const usedCount = Object.keys(usedQuestions).length;
  const gameOver = usedCount >= totalQ;

  // ── SETUP ────────────────────────────────────────────────
  if (screen === "setup") {
    return (
      <div style={{ ...S.root, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');`}</style>
        <div style={{ background: "#111827", border: "3px solid #ff6b2b", borderRadius: 24, padding: "52px 60px", minWidth: 380, textAlign: "center" }}>
          <div style={S.logo}>حسام قيمز 🎯</div>
          <div style={{ color: "#aaa", marginBottom: 32, marginTop: 6 }}>أدخل أسماء الفريقين</div>
          {[0, 1].map((i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontWeight: 700, color: "#ff6b2b", marginBottom: 6 }}>
                الفريق {i === 0 ? "الأول" : "الثاني"}
              </label>
              <input
                value={setupNames[i]}
                onChange={(e) => { const n = [...setupNames]; n[i] = e.target.value; setSetupNames(n); }}
                style={{
                  background: "#1a1a2e", border: "2px solid #333", color: "#fff",
                  borderRadius: 10, padding: "10px 16px", fontSize: 18, width: "100%",
                  fontFamily: "inherit", outline: "none", textAlign: "center",
                }}
              />
            </div>
          ))}
          <button
            style={{ ...S.btn("#ff6b2b"), marginTop: 20, width: "100%", fontSize: 20, padding: "16px" }}
            onClick={() => {
              setTeams([...setupNames]);
              setScores([0, 0]);
              setCurrentTeam(0);
              setUsedQuestions({});
              setScreen("board");
            }}
          >
            ابدأ اللعبة 🚀
          </button>
        </div>
      </div>
    );
  }

  // ── FINAL ────────────────────────────────────────────────
  if (screen === "final") {
    const winner = scores[0] > scores[1] ? 0 : scores[1] > scores[0] ? 1 : -1;
    return (
      <div style={{ ...S.root, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');`}</style>
        <div style={S.finalCard}>
          <div style={S.crownText}>{winner === -1 ? "🤝" : "🏆"}</div>
          {winner === -1 ? (
            <div style={S.winnerName}>تعادل!</div>
          ) : (
            <>
              <div style={{ color: "#aaa", fontSize: 20, marginBottom: 8 }}>الفائز</div>
              <div style={S.winnerName}>{teams[winner]}</div>
              <div style={S.winnerScore}>{scores[winner]} نقطة</div>
            </>
          )}
          <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 30 }}>
            {[0, 1].map((i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ color: "#ff6b2b", fontWeight: 700, fontSize: 16 }}>{teams[i]}</div>
                <div style={{ fontSize: 26, fontWeight: 900 }}>{scores[i]}</div>
              </div>
            ))}
          </div>
          <button
            style={{ ...S.btn("#ff6b2b"), marginTop: 36, padding: "14px 48px", fontSize: 18 }}
            onClick={() => {
              setScores([0, 0]); setCurrentTeam(0); setUsedQuestions({});
              setActiveQ(null); setPhase("main"); setScreen("setup");
            }}
          >
            لعبة جديدة
          </button>
        </div>
      </div>
    );
  }

  // ── RESULT ───────────────────────────────────────────────
  if (screen === "result") {
    const { type, points, scoringTeam } = resultInfo || {};
    let emoji = "😐", title = "", sub = "";
    if (type === "correct") { emoji = "✅"; title = `+${points} نقطة!`; sub = `أجاب ${teams[scoringTeam]} بشكل صحيح!`; }
    else if (type === "steal") { emoji = "🔄"; title = `${teams[scoringTeam]} سرق النقاط!`; sub = `+${points} نقطة`; }
    else { emoji = "⏰"; title = "انتهى الوقت!"; sub = "لا أحد أجاب — لا نقاط"; }
    return (
      <div style={{ ...S.root, ...S.resultWrap }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');`}</style>
        <div style={S.resultEmoji}>{emoji}</div>
        <div style={S.resultTitle}>{title}</div>
        <div style={S.resultSub}>{sub}</div>
        <div style={{ display: "flex", gap: 40, marginBottom: 36 }}>
          {[0, 1].map((i) => (
            <div key={i} style={{ ...S.scoreCard(false), flexDirection: "column", gap: 2, minWidth: 140 }}>
              <div style={S.scoreTeamName}>{teams[i]}</div>
              <div style={S.scorePoints}>{scores[i]}</div>
            </div>
          ))}
        </div>
        <button
          style={{ ...S.btn("#ff6b2b"), fontSize: 18, padding: "14px 48px" }}
          onClick={() => {
            setCurrentTeam(otherTeam); setActiveQ(null); setPhase("main");
            setStealTeam(null); setShowAnswer(false); setResultInfo(null);
            setScreen(gameOver ? "final" : "board");
          }}
        >
          {gameOver ? "عرض النتيجة النهائية 🏆" : "العودة للوحة"}
        </button>
      </div>
    );
  }

  // ── QUESTION ─────────────────────────────────────────────
  if (screen === "question" && activeQ) {
    const answeringTeam = phase === "steal" ? stealTeam : currentTeam;
    const isRed = phase === "steal" || timer.time <= 10;
    const timerStyle = {
      background: isRed ? "#c0392b33" : "#16253b",
      border: `3px solid ${isRed ? "#e74c3c" : "#2d5986"}`,
      borderRadius: 50,
      padding: "10px 36px",
      fontSize: 32,
      fontWeight: 900,
      color: isRed ? "#e74c3c" : "#7ec8e3",
      marginBottom: 20,
      letterSpacing: 4,
    };

    return (
      <div style={S.root}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap'); @keyframes pulse{from{opacity:1}to{opacity:0.5}}`}</style>

        {/* Fullscreen image modal */}
        <ImageModal src={fullscreenImg} onClose={() => setFullscreenImg(null)} />

        <div style={S.topBar}>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={S.topBtn} onClick={() => {
              timer.stop(); setScreen("board"); setActiveQ(null);
              setPhase("main"); setShowAnswer(false);
            }}>
              ← العودة للوحة
            </button>
          </div>
          <div style={S.logo}>حسام قيمز 🎯</div>
          <div style={S.teamTurnBadge}>دور فريق: {teams[currentTeam]}</div>
        </div>

        <div style={S.questionWrap}>
          {phase === "steal" && (
            <div style={{ ...S.stealBanner, animation: "pulse 0.6s infinite alternate" }}>
              🔄 فرصة السرقة — {teams[stealTeam]}
            </div>
          )}

          <div style={timerStyle}>{fmt(timer.time)}</div>
          <div style={S.pointsBadge}>{activeQ.points} نقطة</div>

          <div style={S.questionCard}>
            <div style={{ color: "#aaa", fontSize: 14, marginBottom: 12 }}>
              {CATEGORIES[activeQ.catIdx].name}
            </div>

            {/* IMAGE QUESTION */}
            {activeQ.img ? (
              <div>
                <img
                  src={activeQ.img}
                  alt="question"
                  onClick={() => setFullscreenImg(activeQ.img)}
                  style={{
                    width: "100%",
                    maxHeight: 400,
                    objectFit: "contain",
                    borderRadius: 14,
                    cursor: "zoom-in",
                    border: "2px solid #2d5986",
                    display: "block",
                    transition: "box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => e.target.style.boxShadow = "0 0 20px #ff6b2b88"}
                  onMouseLeave={(e) => e.target.style.boxShadow = "none"}
                />
                <div style={{ color: "#666", fontSize: 12, marginTop: 8 }}>
                  🔍 اضغط على الصورة لتكبيرها
                </div>
              </div>
            ) : (
              /* TEXT QUESTION */
              <div style={S.questionText}>{activeQ.q}</div>
            )}

            {showAnswer && <div style={S.answerText}>✅ {activeQ.a}</div>}
          </div>

          <div style={S.btnRow}>
            {phase !== "done" && (
              timer.active
                ? <button style={S.btn("#444")} onClick={timer.pause}>⏸ إيقاف مؤقت</button>
                : <button style={S.btn("#2d5986")} onClick={timer.resume}>▶ استمر</button>
            )}

            {phase === "steal" && !showAnswer && (
              <button style={S.btn("#7b4f00")} onClick={() => { timer.stop(); setShowAnswer(true); }}>
                👁 أظهر الجواب
              </button>
            )}

            {phase !== "done" && (
              <button
                style={S.btn("#1a7a4a")}
                onClick={() => {
                  timer.stop();
                  const s = [...scores]; s[answeringTeam] += activeQ.points; setScores(s);
                  setShowAnswer(true);
                  const t = phase === "steal" ? "steal" : "correct";
                  setPhase("done"); phaseRef.current = "done";
                  setResultInfo({ type: t, points: activeQ.points, scoringTeam: answeringTeam });
                }}
              >
                ✅ صح
              </button>
            )}

            {phase !== "done" && (
              <button
                style={S.btn("#7a1a1a")}
                onClick={() => {
                  timer.stop();
                  if (phase === "main") {
                    const other = 1 - currentTeam;
                    setStealTeam(other); setPhase("steal"); phaseRef.current = "steal";
                    timerRef.current.startWith(STEAL_TIMER, () => {
                      setPhaseRef.current("done"); phaseRef.current = "done";
                      setShowAnswerRef.current(true);
                      setResultInfoRef.current({ type: "noone", points: activeQRef.current.points });
                    });
                  } else {
                    setPhase("done"); phaseRef.current = "done";
                    setShowAnswer(true);
                    setResultInfo({ type: "noone", points: activeQ.points });
                  }
                }}
              >
                ❌ خطأ
              </button>
            )}

            {phase === "done" && (
              <button style={S.btn("#ff6b2b")} onClick={() => setScreen("result")}>
                التالي →
              </button>
            )}
          </div>

          <div style={{ display: "flex", gap: 30, marginTop: 28 }}>
            {[0, 1].map((i) => (
              <div key={i} style={S.scoreCard(i === answeringTeam)}>
                <div style={S.scoreTeamName}>{teams[i]}</div>
                <div style={S.scorePoints}>{scores[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── BOARD ────────────────────────────────────────────────
  const POINT_LEVELS = [200, 400, 600];

  const openQuestion = (cat, ci, qIdx) => {
    const key = `${ci}-${qIdx}`;
    const q = cat.questions[qIdx];
    setUsedQuestions((prev) => ({ ...prev, [key]: true }));
    const qData = { catIdx: ci, qIdx, points: q.points, q: q.q, a: q.a, img: q.img || null };
    setActiveQ(qData);
    activeQRef.current = qData;
    setShowAnswer(false); setPhase("main"); phaseRef.current = "main";
    setStealTeam(null); setResultInfo(null);
    setScreen("question");
    setTimeout(() => startMainTimer(), 50);
  };

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
        @keyframes pulse{from{opacity:1}to{opacity:0.5}}
        .qcell:hover { filter: brightness(1.3); }
        .scoreAdjustBtn:hover { background: #333; }
      `}</style>

      <div style={S.topBar}>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={S.topBtn} onClick={() => setScreen("setup")}>↩ إعادة التهيئة</button>
          {gameOver && (
            <button style={{ ...S.topBtn, color: "#ffd700", borderColor: "#ffd700" }} onClick={() => setScreen("final")}>
              🏆 النتيجة النهائية
            </button>
          )}
        </div>
        <div style={S.logo}>حسام قيمز 🎯</div>
        <div style={S.teamTurnBadge}>دور فريق: {teams[currentTeam]}</div>
      </div>

      <div style={S.board}>
        <div style={S.boardGrid}>
          {CATEGORIES.map((cat, ci) => (
            <div key={ci} style={S.catHeader}>
              <div style={{ fontSize: 22 }}>{cat.emoji}</div>
              <div style={{ fontSize: 13 }}>{cat.name}</div>
            </div>
          ))}
        </div>

        {/* Side A */}
        <div style={{ marginTop: 8, marginBottom: 4 }}>
          <div style={{ textAlign: "center", color: "#ff6b2b", fontWeight: 700, marginBottom: 6, fontSize: 13 }}>— الفريق الأول —</div>
          {POINT_LEVELS.map((pts, li) => (
            <div key={li} style={{ ...S.boardGrid, marginBottom: 8 }}>
              {CATEGORIES.map((cat, ci) => {
                const qIdx = li;
                const key = `${ci}-${qIdx}`;
                const used = !!usedQuestions[key];
                return (
                  <div
                    key={ci}
                    className="qcell"
                    style={S.qCell(used, pts)}
                    onClick={() => { if (!used) openQuestion(cat, ci, qIdx); }}
                  >
                    {used ? "✓" : pts}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Side B */}
        <div style={{ marginTop: 12 }}>
          <div style={{ textAlign: "center", color: "#7ec8e3", fontWeight: 700, marginBottom: 6, fontSize: 13 }}>— الفريق الثاني —</div>
          {POINT_LEVELS.map((pts, li) => (
            <div key={li} style={{ ...S.boardGrid, marginBottom: 8 }}>
              {CATEGORIES.map((cat, ci) => {
                const qIdx = li + 3;
                const key = `${ci}-${qIdx}`;
                const used = !!usedQuestions[key];
                return (
                  <div
                    key={ci}
                    className="qcell"
                    style={S.qCell(used, pts)}
                    onClick={() => { if (!used) openQuestion(cat, ci, qIdx); }}
                  >
                    {used ? "✓" : pts}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div style={S.scoresBar}>
          <div style={S.scoreCard(currentTeam === 0)}>
            <div>
              <div style={S.scoreTeamName}>{teams[0]}</div>
              {currentTeam === 0 && <div style={{ fontSize: 11, color: "#ff6b2b" }}>▶ دوره الآن</div>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                className="scoreAdjustBtn"
                style={S.scoreAdjustBtn}
                onClick={() => adjustScore(0, -100)}
                title="خصم 100 نقطة"
              >
                −
              </button>
              <div style={S.scorePoints}>{scores[0]}</div>
              <button
                className="scoreAdjustBtn"
                style={S.scoreAdjustBtn}
                onClick={() => adjustScore(0, 100)}
                title="إضافة 100 نقطة"
              >
                +
              </button>
            </div>
          </div>
          <div style={{ textAlign: "center", color: "#555" }}>
            <div style={{ fontSize: 13 }}>الأسئلة</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#aaa" }}>{usedCount} / {totalQ}</div>
          </div>
          <div style={S.scoreCard(currentTeam === 1)}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                className="scoreAdjustBtn"
                style={S.scoreAdjustBtn}
                onClick={() => adjustScore(1, -100)}
                title="خصم 100 نقطة"
              >
                −
              </button>
              <div style={S.scorePoints}>{scores[1]}</div>
              <button
                className="scoreAdjustBtn"
                style={S.scoreAdjustBtn}
                onClick={() => adjustScore(1, 100)}
                title="إضافة 100 نقطة"
              >
                +
              </button>
            </div>
            <div>
              <div style={{ ...S.scoreTeamName, textAlign: "left" }}>{teams[1]}</div>
              {currentTeam === 1 && <div style={{ fontSize: 11, color: "#ff6b2b", textAlign: "left" }}>▶ دوره الآن</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}