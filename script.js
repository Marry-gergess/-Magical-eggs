// تعريف بيانات الحيوانات لكل نوع بيضة (كما هي لم تتغير)
const animals = {
    common: [
        { name: "فأر اللهب", power: 100, rarity: "common" },
        { name: "ثعلب الحمم", power: 500, rarity: "uncommon" },
        { name: "أسد بركاني", power: 2500, rarity: "rare" },
        { name: "تنين شمسي", power: 10000, rarity: "legendary" }
    ],
    Rare: [
        { name: "سلحفاة النهر", power: 120, rarity: "common" },
        { name: "حصان البحر", power: 600, rarity: "uncommon" },
        { name: "قرش المحيط", power: 3000, rarity: "rare" },
        { name: "كراكن الأعماق", power: 12000, rarity: "legendary" }
    ],
    Legandary: [
        { name: "سنجاب الغابة", power: 90, rarity: "common" },
        { name: "ذئب الأوراق", power: 450, rarity: "uncommon" },
        { name: "غولم حجري", power: 2800, rarity: "rare" },
        { name: "عنقاء الشجرة", power: 11000, rarity: "legendary" }
    ]
};

// تعريف نسب ظهور كل فئة ندرة (كما هي لم تتغير)
const rarityChances = {
    common: 70,
    uncommon: 20,
    rare: 9,
    legendary: 1
};

// --- بداية الكود الجديد والمعدل ---
function openEgg(eggType) {
    // قاموس لأسماء البيض
    const eggNames = {
        fire: "بيضة النار",
        water: "بيضة الماء",
        nature: "بيضة الطبيعة"
    };
    const selectedEggName = eggNames[eggType];

    // 1. اختيار حيوان عشوائي بنفس الطريقة القديمة
    const chosenRarity = getWeightedRandomRarity();
    const possibleAnimals = animals[eggType].filter(animal => animal.rarity === chosenRarity);
    let chosenAnimal;
    if (possibleAnimals.length > 0) {
        chosenAnimal = possibleAnimals[Math.floor(Math.random() * possibleAnimals.length)];
    } else {
        const commonAnimals = animals[eggType].filter(animal => animal.rarity === "common");
        chosenAnimal = commonAnimals[Math.floor(Math.random() * commonAnimals.length)];
    }

    // 2. تجهيز المعلومات لإرسالها في الرابط
    const queryString = `?egg=${encodeURIComponent(selectedEggName)}` +
                          `&name=${encodeURIComponent(chosenAnimal.name)}` +
                          `&power=${chosenAnimal.power}` +
                          `&rarity=${chosenAnimal.rarity}`;

    // 3. توجيه المستخدم إلى صفحة النتيجة مع إرسال المعلومات في الرابط
    window.location.href = 'result.html' + queryString;
}

function getWeightedRandomRarity() {
    const rand = Math.random() * 100;
    let cumulativeChance = 0;
    for (const rarity in rarityChances) {
        cumulativeChance += rarityChances[rarity];
        if (rand < cumulativeChance) {
            return rarity;
        }
    }
}
// --- نهاية الكود الجديد والمعدل ---        nature: "بيضة الطبيعة"
    };
    const selectedEggName = eggNames[eggType];

    // 1. اختيار حيوان عشوائي بنفس الطريقة القديمة
    const chosenRarity = getWeightedRandomRarity();
    const possibleAnimals = animals[eggType].filter(animal => animal.rarity === chosenRarity);
    let chosenAnimal;
    if (possibleAnimals.length > 0) {
        chosenAnimal = possibleAnimals[Math.floor(Math.random() * possibleAnimals.length)];
    } else {
        const commonAnimals = animals[eggType].filter(animal => animal.rarity === "common");
        chosenAnimal = commonAnimals[Math.floor(Math.random() * commonAnimals.length)];
    }

    // 2. تجهيز المعلومات لإرسالها في الرابط
    const queryString = `?egg=${encodeURIComponent(selectedEggName)}` +
                          `&name=${encodeURIComponent(chosenAnimal.name)}` +
                          `&power=${chosenAnimal.power}` +
                          `&rarity=${chosenAnimal.rarity}`;

    // 3. توجيه المستخدم إلى صفحة النتيجة مع إرسال المعلومات في الرابط
    window.location.href = 'result.html' + queryString;
}

function getWeightedRandomRarity() {
    const rand = Math.random() * 100;
    let cumulativeChance = 0;
    for (const rarity in rarityChances) {
        cumulativeChance += rarityChances[rarity];
        if (rand < cumulativeChance) {
            return rarity;
        }
    }
}
// --- نهاية الكود الجديد والمعدل ---        nature: "بيضة الطبيعة"
    };

    const selectedEggName = eggNames[eggType]; // الحصول على اسم البيضة

    const chosenRarity = getWeightedRandomRarity();
    const possibleAnimals = animals[eggType].filter(animal => animal.rarity === chosenRarity);

    let chosenAnimal;
    if (possibleAnimals.length > 0) {
        chosenAnimal = possibleAnimals[Math.floor(Math.random() * possibleAnimals.length)];
    } else {
        const commonAnimals = animals[eggType].filter(animal => animal.rarity === "common");
        chosenAnimal = commonAnimals[Math.floor(Math.random() * commonAnimals.length)];
    }

    const resultDisplay = document.getElementById('result-display');

    // تم تعديل هذا الجزء لعرض اسم البيضة
    resultDisplay.innerHTML = `
        <p>لقد اخترت: <strong>${selectedEggName}</strong></p>
        <hr style="margin: 10px 0;">
        <p>وظهر لك:</p>
        <h3>${chosenAnimal.name}</h3>
        <p>القوة: ${chosenAnimal.power}</p>
        <p style="text-transform: capitalize;">الندرة: ${chosenAnimal.rarity}</p>
    `;
}
// --- نهاية الكود الجديد ---

function getWeightedRandomRarity() {
    const rand = Math.random() * 100;
    let cumulativeChance = 0;

    for (const rarity in rarityChances) {
        cumulativeChance += rarityChances[rarity];
        if (rand < cumulativeChance) {
            return rarity;
        }
    }
}    const chosenRarity = getWeightedRandomRarity();

    // 2. فلترة الحيوانات التي تنتمي لهذه الندرة في نوع البيضة المختار
    const possibleAnimals = animals[eggType].filter(animal => animal.rarity === chosenRarity);
    
    // 3. اختيار حيوان عشوائي من القائمة المفلترة
    let chosenAnimal;
    if (possibleAnimals.length > 0) {
        chosenAnimal = possibleAnimals[Math.floor(Math.random() * possibleAnimals.length)];
    } else {
        // في حالة عدم وجود حيوان بهذه الندرة، نختار أي حيوان شائع كخيار احتياطي
        const commonAnimals = animals[eggType].filter(animal => animal.rarity === "common");
        chosenAnimal = commonAnimals[Math.floor(Math.random() * commonAnimals.length)];
    }

    // 4. عرض النتيجة في الصفحة
    const resultDisplay = document.getElementById('result-display');
    resultDisplay.innerHTML = `
        <p>لقد حصلت على:</p>
        <h3>${chosenAnimal.name}</h3>
        <p>القوة: ${chosenAnimal.power}</p>
        <p>الندرة: ${chosenAnimal.rarity}</p>
    `;
}

// دالة لتحديد الندرة بشكل عشوائي موزون
function getWeightedRandomRarity() {
    const rand = Math.random() * 100; // رقم عشوائي بين 0 و 99.99
    let cumulativeChance = 0;

    for (const rarity in rarityChances) {
        cumulativeChance += rarityChances[rarity];
        if (rand < cumulativeChance) {
            return rarity; // يرجع اسم الندرة (common, rare, etc.)
        }
    }
}
