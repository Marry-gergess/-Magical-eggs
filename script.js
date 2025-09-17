// تعريف بيانات الحيوانات لكل نوع بيضة
// يمكنك تعديل هذه القوائم كما تشائين
// Rarity: common (شائع), uncommon (غير شائع), rare (نادر), legendary (أسطوري)
const animals = {
    fire: [
        { name: "فأر اللهب", power: 100, rarity: "common" },
        { name: "ثعلب الحمم", power: 500, rarity: "uncommon" },
        { name: "أسد بركاني", power: 2500, rarity: "rare" },
        { name: "تنين شمسي", power: 10000, rarity: "legendary" }
    ],
    water: [
        { name: "سلحفاة النهر", power: 120, rarity: "common" },
        { name: "حصان البحر", power: 600, rarity: "uncommon" },
        { name: "قرش المحيط", power: 3000, rarity: "rare" },
        { name: "كراكن الأعماق", power: 12000, rarity: "legendary" }
    ],
    nature: [
        { name: "سنجاب الغابة", power: 90, rarity: "common" },
        { name: "ذئب الأوراق", power: 450, rarity: "uncommon" },
        { name: "غولم حجري", power: 2800, rarity: "rare" },
        { name: "عنقاء الشجرة", power: 11000, rarity: "legendary" }
    ]
};

// تعريف نسب ظهور كل فئة ندرة
// مجموع النسب يجب أن يكون 100
const rarityChances = {
    common: 70,     // 70% فرصة لظهور حيوان شائع
    uncommon: 20,   // 20% فرصة لظهور حيوان غير شائع
    rare: 9,        // 9% فرصة لظهور حيوان نادر
    legendary: 1    // 1% فرصة لظهور حيوان أسطوري
};

// الدالة الرئيسية لفتح البيضة
function openEgg(eggType) {
    // 1. اختيار فئة الندرة أولاً بناءً على النسب
    const chosenRarity = getWeightedRandomRarity();

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
