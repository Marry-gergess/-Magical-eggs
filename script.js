// --- 1. تعريف فئات القوة ---
const animalTiers = {
    common: { name: "X", minPower: 1, maxPower: 999 },
    rare: { name: "XX", minPower: 1000, maxPower: 9999 },
    epic: { name: "XXX", minPower: 10000, maxPower: 24999 },
    legendary: { name: "XXXX", minPower: 25000, maxPower: 50000 }
    
};

// --- 2. قائمة الحيوانات الرئيسية ---
const masterAnimalList = [
    { name: "فأر الحقول", power: 50 },
    { name: "سنجاب رشيق", power: 120 },
    { name: "ذئب الغابة", power: 1100 },
    { name: "الدب الأشيب", power: 2500 },
    { name: "عنقاء اللهب", power: 15000 },
    { name: "التنين القديم", power: 45000 },
    { name: "سلحفاة النهر", power: 90 },
    { name: "حصان البحر الملكي", power: 1500 },
    { name: "كراكن الأعماق", power: 30000 }
];

// --- 3. تعريف حظوظ كل بيضة ---
const eggProbabilities = {
    common: { common: 80, rare: 18, epic: 2, legendary: 0 },
    rare: { common: 25, rare: 60, epic: 13, legendary: 2 },
    legendary: { common: 0, rare: 20, epic: 55, legendary: 25 }
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
    const chosenTierInfo = animalTiers[chosenTierKey];

    const possibleAnimals = masterAnimalList.filter(animal => 
        animal.power >= chosenTierInfo.minPower && animal.power <= chosenTierInfo.maxPower
    );

    let chosenAnimal;
    if (possibleAnimals.length > 0) {
        chosenAnimal = possibleAnimals[Math.floor(Math.random() * possibleAnimals.length)];
    } else {
        const fallbackTier = getFallbackTier(chosenTierKey);
        const fallbackAnimals = masterAnimalList.filter(animal => 
            animal.power >= fallbackTier.minPower && animal.power <= fallbackTier.maxPower
        );
        if(fallbackAnimals.length > 0) {
            chosenAnimal = fallbackAnimals[Math.floor(Math.random() * fallbackAnimals.length)];
        } else {
            chosenAnimal = { name: "بيضة فارغة", power: 0 };
        }
    }

    const finalRarityName = getTierByPower(chosenAnimal.power).name;

    const queryString = `?egg=${encodeURIComponent(selectedEggName)}` +
                          `&name=${encodeURIComponent(chosenAnimal.name)}` +
                          `&power=${chosenAnimal.power}` +
                          `&rarity=${encodeURIComponent(finalRarityName)}`;

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
    return 'common'; // احتياطي
}

function getTierByPower(power) {
    for (const tierKey in animalTiers) {
        const tier = animalTiers[tierKey];
        if (power >= tier.minPower && power <= tier.maxPower) {
            return tier;
        }
    }
    return { name: "غير محدد" };
}

// هذه هي الدالة التي كانت مفقودة
function getFallbackTier(failedTierKey) {
    const tierKeys = Object.keys(animalTiers);
    const failedIndex = tierKeys.indexOf(failedTierKey);
    if (failedIndex > 0) {
        const fallbackKey = tierKeys[failedIndex - 1];
        return animalTiers[fallbackKey];
    }
    return animalTiers.common; // العودة للفئة الأساسية
}
