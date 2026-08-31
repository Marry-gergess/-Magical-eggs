
const rarityNames = {
    common: "X",
    rare: "XX",
    epic: "XXX",
    legendary: "XXXX",
    mythic: "XXXXX"
};


const masterAnimalList = [
    
    { name: "Rat | فأر", price: 2, rarity: "common", currency: "G" },
    { name: "Frog | ضفدع", price: 2, rarity: "common", currency: "G" },
    { name: "Cat | قطة", price: 3, rarity: "common", currency: "G" },
    { name: "Dog | كلب", price: 3, rarity: "common", currency: "G" },
    { name: "Parrot | ببغاء", price: 3, rarity: "common", currency: "G" },
    { name: "سحلية الموك | Moke Lizard", price: 3, rarity: "common", currency: "G" },

    
    { name: "Puffskein | بفسكين", price: 5, rarity: "rare", currency: "G" },
    { name: "Jobberknoll | جوبيرنول", price: 10, rarity: "rare", currency: "G" },
    { name: "Bowtruckle | بوتروكل", price: 12, rarity: "rare", currency: "G" },
    { name: "Diricawl | ديريكول", price: 13, rarity: "rare", currency: "G" },
    { name: "Porlock | بورلوك", price: 14, rarity: "rare", currency: "G" },
    { name: "Augurey | أجوري", price: 60, rarity: "rare", currency: "G" },
    { name: "Fairy | جنية", price: 120, rarity: "rare", currency: "G" },
    { name: "Mooncalf | مونكالف", price: 20, rarity: "rare", currency: "G" },

    
    { name: "Fwooper | فووبر", price: 22, rarity: "epic", currency: "G" },
    { name: "Jarvey | جارف", price: 22, rarity: "epic", currency: "G" },
    { name: "Fire Dwelling Salamander | سلمندر الناري", price: 44, rarity: "epic", currency: "G" },
    { name: "Frost Salamander | سلمندر الجليد", price: 54, rarity: "epic", currency: "G" },
    { name: "Peruvian Salamander | سلمندر البيروفي", price: 50, rarity: "epic", currency: "G" },
    { name: "Ashwinder | أشفيندر", price: 26, rarity: "epic", currency: "G" },
    { name: "Crup | كروب", price: 32, rarity: "epic", currency: "G" },
    { name: "Matagot | ماتاجوت", price: 250, rarity: "epic", currency: "G" },
    { name: "Hippogriff | هيبوغريف", price: 500, rarity: "epic", currency: "G" },
    { name: "Niffler | نيفلر", price: 60, rarity: "epic", currency: "G" },
    { name: "Hippocampus | حصان البحر", price: 44, rarity: "epic", currency: "G" },
    { name: "Kneazle | كنزل", price: 34, rarity: "epic", currency: "G" },
    { name: "Pixie | بيكسي", price: 30, rarity: "epic", currency: "G" },
    { name: "Murtlap | مرتلاب", price:22, rarity: "epic", currency: "G" },
    { name: "Doxy | دوكسي", price: 22, rarity: "epic", currency: "G" },
    
    { name: "jj", price: 1, rarity: "legendary", currency: "G" },
    { name: "سحلية", price: 45000, rarity: "legendary", currency: "جوهرة" },

    { name: "جريفين سماوي", price: 60000, rarity: "mythic", currency: "كريستالة" }
];

const eggProbabilities = {
    common:    { common: 60, rare: 30, epic: 10, legendary: 0, mythic: 0 },
    rare:      { common: 20, rare: 50, epic: 30, legendary: 0, mythic: 0 },
    legendary: { common: 5,  rare: 30, epic: 65, legendary: 0, mythic: 0 }
};

// --- 4. الدالة الرئيسية لفتح البيضة ---
function startOpeningCustom(eggType) {
    const playerNameField = document.getElementById('player-name');
    const discordTicketField = document.getElementById('discord-ticket');

    if (!playerNameField || !discordTicketField) {
        alert("خطأ: لم يتم العثور على خانات الإدخال في الصفحة!");
        return;
    }

    const playerName = playerNameField.value.trim();
    const discordTicket = discordTicketField.value.trim();

    if (playerName === "" || discordTicket === "") {
        alert("من فضلك أدخل الاسم ورقم تيكت ديسكورد أولاً قبل فتح البيضة!");
        return;
    }

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

    // تجميع البيانات النظيفة والمصلحة بالكامل للانتقال
    const queryString = `?egg=${encodeURIComponent(selectedEggName)}` +
                        `&name=${encodeURIComponent(chosenAnimal.name)}` +
                        `&price=${chosenAnimal.price}` +
                        `&rarity=${encodeURIComponent(finalRarityName)}` +
                        `&currency=${encodeURIComponent(chosenAnimal.currency)}` +
                        `&player=${encodeURIComponent(playerName)}` +
                        `&discord=${encodeURIComponent(discordTicket)}`;

    window.location.href = 'result.html' + queryString;
}

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
