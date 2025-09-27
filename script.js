// --- 1. تعريف أسماء الفئات للعرض ---
const rarityNames = {
    common: "X",
    rare: "XX",
    epic: "XXX",
    legendary: "XXXX",
    mythic: "XXXXX"
};

// --- 2. قائمة الحيوانات الرئيسية (تمت إضافة العملة) ---
const masterAnimalList = [
    // حيوانات Common
    { name: "فأر", price: 50, rarity: "common", currency: "قطعة جبن" },
    { name: "قطة", price: 90, rarity: "common", currency: "S" },
    { name: "كلب", price: 120, rarity: "common", currency: "S" },
    
    // حيوانات Rare
    { name: "حصان البحر الملكي", price: 1500, rarity: "rare", currency: "لؤلؤة" },
    { name: "ضفدع", price: 2500, rarity: "rare", currency: "S" },

    // حيوانات Epic
    { name: "ببغاء", price: 15000, rarity: "epic", currency: "ريشة نادرة" },

    // حيوانات Legendary
    { name: "كراكن الأعماق", price: 30000, rarity: "legendary", currency: "جوهرة" },
    { name: "سحلية", price: 45000, rarity: "legendary", currency: "جوهرة" },

    // حيوانات Mythic
    { name: "جريفين سماوي", price: 60000, rarity: "mythic", currency: "كريستالة" }
];

// --- 3. تعريف حظوظ كل بيضة ---
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

    const chosenTierKey = getWeightedRandomTier(eggProbabilities[eggType]);
    const possibleAnimals = masterAnimalList.filter(animal => animal.rarity === chosenTierKey);

    let chosenAnimal;
    if (possibleAnimals.length > 0) {
        chosenAnimal = possibleAnimals[Math.floor(Math.random() * possibleAnimals.length)];
    } else {
        const fallbackTierKey = getFallbackTierKey(chosenTierKey);
        const fallbackAnimals = masterAnimalList.filter(animal => animal.rarity === fallbackTierKey);
        if (fallbackAnimals.length > 0) {
            chosenAnimal = fallbackAnimals[Math.floor(Math.random() * fallbackAnimals.length)];
        } else {
            chosenAnimal = { name: "بيضة فارغة", price: 0, rarity: "common", currency: "" };
        }
    }

    const finalRarityName = rarityNames[chosenAnimal.rarity] || "غير محدد";

    // تجهيز الرابط (تمت إضافة العملة هنا)
    const queryString = `?egg=${encodeURIComponent(selectedEggName)}` +
                          `&name=${encodeURIComponent(chosenAnimal.name)}` +
                          `&price=${chosenAnimal.price}` +
                          `&rarity=${encodeURIComponent(finalRarityName)}` +
                          `&currency=${encodeURIComponent(chosenAnimal.currency)}`; // <-- تمت إضافة العملة

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
    return 'common';
}

function getFallbackTierKey(failedTierKey) {
    const tierKeys = ['common', 'rare', 'epic', 'legendary', 'mythic'];
    const failedIndex = tierKeys.indexOf(failedTierKey);
    if (failedIndex > 0) {
        return tierKeys[failedIndex - 1];
    }
    return 'common';
}
