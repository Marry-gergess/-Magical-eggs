// --- 1. تعريف فئات القوة (لم تتغير) ---
const animalTiers = {
    common: { name: "عادي", minPower: 1, maxPower: 999 },
    rare: { name: "نادر", minPower: 1000, maxPower: 9999 },
    epic: { name: "ملحمي", minPower: 10000, maxPower: 24999 },
    legendary: { name: "أسطوري", minPower: 25000, maxPower: 50000 }
};

// --- 2. قائمة الحيوانات الرئيسية (لم تتغير) ---
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
    // ... يمكنك إضافة المزيد من الحيوانات هنا
];

// --- 3. تعريف حظوظ كل بيضة (تم التحديث) ---
// هذه هي النسب المنطقية الجديدة لأنواع البيض
const eggProbabilities = {
    common: { // البيضة العادية
        common: 80, // 80% فرصة لحيوان عادي
        rare: 18,   // 18% فرصة لحيوان نادر
        epic: 2,    // 2% فرصة لحيوان ملحمي
        legendary: 0  // 0% فرصة لحيوان أسطوري
    },
    rare: { // البيضة النادرة
        common: 25,
        rare: 60,
        epic: 13,
        legendary: 2
    },
    legendary: { // البيضة الأسطورية
        common: 0,
        rare: 20,
        epic: 55,
        legendary: 25
    }
};

// --- 4. الدالة الرئيسية (تم تحديث أسماء البيض) ---
function openEgg(eggType) {
    // قاموس لأسماء البيض (تم التحديث)
    const eggNames = {
        common: "بيضة عادية (Common)",
        rare: "بيضة نادرة (Rare)",
        legendary: "بيضة أسطورية (Legendary)"
    };
    const selectedEggName = eggNames[eggType];

    // باقي الكود يعمل كما هو بدون تغيير
    const chosenTierKey = getWeightedRandomTier(eggProbabilities[eggType]);
    const chosenTierInfo = animalTiers[chosenTierKey];

    const possibleAnimals = masterAnimalList.filter(animal => {
        return animal.power >= chosenTierInfo.minPower && animal.power <= chosenTierInfo.maxPower;
    });

    let chosenAnimal;
    if (possibleAnimals.length > 0) {
        chosenAnimal = possibleAnimals[Math.floor(Math.random() * possibleAnimals.length)];
    } else {
        // خيار احتياطي في حال عدم وجود حيوانات بهذه الفئة
        // سنجرب البحث في الفئة الأقل مباشرة
        const fallbackTier = getFallbackTier(chosenTierKey);
        const fallbackAnimals = masterAnimalList.filter(animal => {
            return animal.power >= fallbackTier.minPower && animal.power <= fallbackTier.maxPower;
        });
        if(fallbackAnimals.length > 0){
             chosenAnimal = fallbackAnimals[Math.floor(Math.random() * fallbackAnimals.length)];
        } else {
             chosenAnimal = { name: "حيوان غامض", power: 0 };
        }
    }

    const queryString = `?egg=${encodeURIComponent(selectedEggName)}` +
                          `&name=${encodeURIComponent(chosenAnimal.name)}` +
                          `&power=${chosenAnimal.power}` +
                          `&rarity=${encodeURIComponent(getTierByPower(chosenAnimal.power).name)}`;

    window.location.href = 'result.html' + queryString;
}

// دالة مساعدة لاختيار الفئة
function getWeightedRandomTier(chances) {
    const rand = Math.random() * 100;
    let cumulativeChance = 0;
    for (const tier in chances) {
        cumulativeChance += chances[tier];
        if (rand < cumulativeChance) {
            return tier;
        }
    }
}

// دالتان مساعدتان جديدتان لتحسين التجربة
function getTierByPower(power) {
    for (const tierKey in animalTiers) {
        const tier = animalTiers[tierKey];
        if (power >= tier.minPower && power <= tier.maxPower) {
            return tier;
        }
    }
    return { name: "غير معروف" };
}

function getFallbackTier(failedTierKey) {
    const tierKeys = Object.keys(animalTiers);
    const failedIndex = tierKeys.indexOf(failedTierKey);
    if (failedIndex > 0) {
        const fallbackKey = tierKeys[failedIndex - 1];
        return animalTiers[fallbackKey];
    }
    return animalTiers.common; // العودة للفئة الأساسية
}        Legandary: "بيضة الطبيعة"
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
