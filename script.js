// --- 1. تعريف أسماء الفئات للعرض ---
const rarityNames = {
    common: "X",
    rare: "XX",
    epic: "XXX",
    legendary: "XXXX",
    mythic: "XXXXX"
};

// --- 2. قائمة الحيوانات السحرية المحدثة ---
const masterAnimalList = [
    // حيوانات X
    { name: "Rat | فأر", price: 6, rarity: "common", currency: "S" },
    { name: "Frog | ضفدع", price: 6, rarity: "common", currency: "S" },
    { name: "Cat | قطة", price: 10, rarity: "common", currency: "S" },
    { name: "Dog | كلب", price: 10, rarity: "common", currency: "S" },
    { name: "Parrot | ببغاء", price: 10, rarity: "common", currency: "S" },
    { name: "سحلية الموك | Moke Lizard", price: 10, rarity: "common", currency: "S" },

    // حيوانات XX
    { name: "Puffskein | بفسكين", price: 1, rarity: "rare", currency: "G" },
    { name: "Jobberknoll | جوبيرنول", price: 2, rarity: "rare", currency: "G" },
    { name: "Bowtruckle | بوتروكل", price: 7, rarity: "rare", currency: "G" },
    { name: "Diricawl | ديريكول", price: 5, rarity: "rare", currency: "G" },
    { name: "Porlock | بورلوك", price: 6, rarity: "rare", currency: "G" },
    { name: "Augurey | أجوري", price: 30, rarity: "rare", currency: "G" },
    { name: "Fairy | جنية", price: 40, rarity: "rare", currency: "G" },
    { name: "Mooncalf | مونكالف", price: 10, rarity: "rare", currency: "G" },

    // حيوانات XXX
    { name: "Fwooper | فووبر", price: 11, rarity: "epic", currency: "G" },
    { name: "Jarvey | جارف", price: 15, rarity: "epic", currency: "G" },
    { name: "Fire Dwelling Salamander | سلمندر الناري", price: 27, rarity: "epic", currency: "G" },
    { name: "Frost Salamander | سلمندر الجليد", price: 26, rarity: "epic", currency: "G" },
    { name: "Peruvian Salamander | سلمندر البيروفي", price: 25, rarity: "epic", currency: "G" },
    { name: "Ashwinder | أشفيندر", price: 13, rarity: "epic", currency: "G" },
    { name: "Crup | كروب", price: 16, rarity: "epic", currency: "G" },
    { name: "Matagot | ماتاجوت", price: 100, rarity: "epic", currency: "G" },
    { name: "Hippogriff | هيبوغريف", price: 70, rarity: "epic", currency: "G" },
    { name: "Niffler | نيفلر", price: 30, rarity: "epic", currency: "G" },
    { name: "Hippocampus | حصان البحر", price: 22, rarity: "epic", currency: "G" },
    { name: "Kneazle | كنزل", price: 17, rarity: "epic", currency: "G" },
    { name: "Pixie | بيكسي", price: 15, rarity: "epic", currency: "G" },
    { name: "Murtlap | مرتلاب", price: 11, rarity: "epic", currency: "G" },
    { name: "Doxy | دوكسي", price: 11, rarity: "epic", currency: "G" },
    
    // حيوانات legendary (XXXX)
    { name: "jj", price: 1, rarity: "legendary", currency: "G" },
    { name: "سحلية", price: 45000, rarity: "legendary", currency: "جوهرة" },

    // حيوانات mythic (XXXXX)
    { name: "جريفين سماوي", price: 60000, rarity: "mythic", currency: "كريستالة" }
];

// --- 3. تعريف حظوظ كل بيضة ---
const eggProbabilities = {
    common:    { common: 50, rare: 45, epic: 5, legendary: 0, mythic: 0 },
    rare:      { common: 10, rare: 50, epic: 40, legendary: 0, mythic: 0 },
    legendary: { common: 5,  rare: 30, epic: 60, legendary: 0, mythic: 0 }
};

// --- 4. الدالة الرئيسية لفتح البيضة (معدلة لتطلب الاسم إجباري أولاً) ---
function openEgg(eggType) {
    // طلب الاسم بشكل إجباري قبل فتح البيضة
    let playerName = prompt("من فضلك أدخل اسمك أولاً لفتح البيضة السحرية وتسجيل التيكت (ضروري):");
    
    // إذا ضغط إلغاء أو ساب الخانة فاضية، العملية بتقف تماماً والبيضة مش بتفتح
    if (playerName === null || playerName.trim() === "") {
        alert("عذراً، يجب إدخال اسمك لتتمكن من فتح البيضة وحفظ جائزتك في المتجر!");
        return; 
    }

    const eggNames = {
        common: "بيضة عادية (Common)",
        rare: "بيضة نادرة (Rare)",
        legendary: "بيضة أسطورية (Legendary)"
    };
    const selectedEggName = eggNames[eggType];

    // اختيار الفئة والحيوان عشوائياً بناءً على النسب
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

    // تمرير البيانات مع اسم الشخص الجاهز لصفحة result.html
    const queryString = `?egg=${encodeURIComponent(selectedEggName)}` +
                          `&name=${encodeURIComponent(chosenAnimal.name)}` +
                          `&price=${chosenAnimal.price}` +
                          `&rarity=${encodeURIComponent(finalRarityName)}` +
                          `&currency=${encodeURIComponent(chosenAnimal.currency)}` +
                          `&player=${encodeURIComponent(playerName.trim())}`; // تمرير اسم اللاعب

    window.location.href = 'result.html' + queryString;
}

// --- 5. الدوال المساعدة للحسابات ---
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
