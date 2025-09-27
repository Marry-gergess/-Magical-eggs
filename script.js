// --- 1. تعريف أسماء الفئات للعرض ---
const rarityNames = {
    common: "X",
    rare: "XX",
    epic: "XXX",
    legendary: "XXXX",
    mythic: "XXXXX"
};

// --- 2. قائمة الحيوانات الرئيسية (مع سعر وفئة لكل حيوان) ---
const masterAnimalList = [
    // حيوانات Common
    { name: "فأر", price: 50, rarity: "common" },
    { name: "قطة", price: 90, rarity: "common" },
    { name: "كلب", price: 120, rarity: "common" },
    
    // حيوانات Rare
    { name: "حصان البحر الملكي", price: 1500, rarity: "rare" },
    { name: "ضفدع", price: 2500, rarity: "rare" },

    // حيوانات Epic
    { name: "ببغاء", price: 15000, rarity: "epic" },

    // حيوانات Legendary
    { name: "كراكن الأعماق", price: 30000, rarity: "legendary" },
    { name: "سحلية", price: 45000, rarity: "legendary" },

    // حيوانات Mythic
    { name: "جريفين سماوي", price: 60000, rarity: "mythic" }
];

// --- 3. تعريف حظوظ كل بيضة (نسب ظهور الفئات) ---
const eggProbabilities = {
    common:    { common: 80, rare: 18, epic: 2, legendary: 0, mythic: 0 },
    rare:      { common: 25, rare: 55, epic: 15, legendary: 4, mythic: 1 },
    legendary: { common: 0,  rare: 20, epic: 45, legendary: 25, mythic: 10 }
};

// --- 4. الدالة الرئيسية لفتح البيضة ---
function openEgg(eggType) {
    const eggNames = {
        common: "بيضة عادية (Common)",
        rare: "بيضة نادرة (Rare)",
        legendary: "بيضة أسطورية (Legendary)"
    };
    const selectedEggName = eggNames[eggType];

    // الخطوة أ: اختيار فئة عشوائيًا (مثل 'rare') بناءً على حظوظ البيضة
    const chosenTierKey = getWeightedRandomTier(eggProbabilities[eggType]);

    // الخطوة ب: فلترة قائمة الحيوانات التي تطابق هذه الفئة
    const possibleAnimals = masterAnimalList.filter(animal => animal.rarity === chosenTierKey);

    let chosenAnimal;
    if (possibleAnimals.length > 0) {
        // الخطوة ج: اختيار حيوان عشوائي من القائمة المفلترة
        chosenAnimal = possibleAnimals[Math.floor(Math.random() * possibleAnimals.length)];
    } else {
        // خيار احتياطي: إذا لم نجد حيوانًا، ابحث في الفئة الأقل
        const fallbackTierKey = getFallbackTierKey(chosenTierKey);
        const fallbackAnimals = masterAnimalList.filter(animal => animal.rarity === fallbackTierKey);
        if (fallbackAnimals.length > 0) {
            chosenAnimal = fallbackAnimals[Math.floor(Math.random() * fallbackAnimals.length)];
        } else {
            // إذا لم نجد أي حيوان حتى في الفئة الاحتياطية
            chosenAnimal = { name: "بيضة فارغة", price: 0, rarity: "common" };
        }
    }

    // الحصول على اسم الندرة للعرض (مثل "XX")
    const finalRarityName = rarityNames[chosenAnimal.rarity] || "غير محدد";

    // تجهيز الرابط لإرسال البيانات إلى صفحة result.html
    const queryString = `?egg=${encodeURIComponent(selectedEggName)}` +
                          `&name=${encodeURIComponent(chosenAnimal.name)}` +
                          `&price=${chosenAnimal.price}` +
                          `&rarity=${encodeURIComponent(finalRarityName)}`;

    // الانتقال إلى صفحة النتائج
    window.location.href = 'result.html' + queryString;
}

// --- 5. الدوال المساعدة ---
function getWeightedRandomTier(chances) {
    const rand = Math.random() * 100;
    let cumulativeChance = 0;
    for (const tier in chances) {
        cumulativeChance += chances[tier];
        if (rand < cumulativeChance) {
            return tier;
        }
    }
    return 'common'; // العودة للفئة الأساسية كخيار احتياطي
}

// دالة احتياطية لاختيار فئة أقل في حال كانت الفئة المختارة فارغة
function getFallbackTierKey(failedTierKey) {
    const tierKeys = ['common', 'rare', 'epic', 'legendary', 'mythic'];
    const failedIndex = tierKeys.indexOf(failedTierKey);
    if (failedIndex > 0) {
        // إرجاع الفئة الأقل مباشرة
        return tierKeys[failedIndex - 1];
    }
    return 'common'; // إذا فشلت الفئة common، حاول مرة أخرى معها
}
