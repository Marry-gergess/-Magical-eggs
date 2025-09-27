// --- 1. تعريف فئات القوة (تم تحديثها إلى 5 فئات) ---
        const animalTiers = {
            common:    { name: "X",     minPower: 1,      maxPower: 999 },
            rare:      { name: "XX",    minPower: 1000,   maxPower: 4999 },
            epic:      { name: "XXX",   minPower: 5000,   maxPower: 19999 },
            legendary: { name: "XXXX",  minPower: 20000,  maxPower: 49999 },
            mythic:    { name: "XXXXX", minPower: 50000,  maxPower: 100000 } // الفئة الجديدة
        };

        const masterAnimalList = [
            // فئة Common (X)
            { name: "فأر", power: 1 },
            { name: "قطة", power: 33 },
            { name: "كلب", power: 44 },
            { name: "سلحفاة النهر", power: 90 },
            
            // فئة Rare (XX)
            { name: "حصان البحر الملكي", power: 1500 },
            { name: "ضفدع", power: 2500 },

            // فئة Epic (XXX)
            { name: "ببغاء", power: 15000 },

            // فئة Legendary (XXXX)
            { name: "كراكن الأعماق", power: 30000 },
            { name: "سحلية", power: 45000 },

            // فئة Mythic (XXXXX) - أضيفي حيوانات هنا
            { name: "جريفين سماوي", power: 60000 }
        ];

        // --- 3. تعريف حظوظ كل بيضة (تم تحديثها لتشمل 5 فئات) ---
        const eggProbabilities = {
            common: { 
                common: 80, rare: 18, epic: 2, legendary: 0, mythic: 0 
            },
            rare: { 
                common: 25, rare: 55, epic: 15, legendary: 4, mythic: 1 
            },
            legendary: { 
                common: 0, rare: 20, epic: 45, legendary: 25, mythic: 10 
            }
        };

        // --- 4. الدالة الرئيسية لفتح البيضة (لا تحتاج لتعديل) ---
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
                if (fallbackAnimals.length > 0) {
                    chosenAnimal = fallbackAnimals[Math.floor(Math.random() * fallbackAnimals.length)];
                } else {
                    chosenAnimal = { name: "بيضة فارغة", power: 0 };
                }
            }

            const finalRarityName = getTierByPower(chosenAnimal.power).name;
            const resultDisplay = document.getElementById('result-display');
            
            resultDisplay.innerHTML = `
                <p>لقد اخترت: <strong>${selectedEggName}</strong></p>
                <hr style="margin: 10px 0;">
                <p>وظهر لك:</p>
                <h3 style="font-size: 28px; margin: 10px;">${chosenAnimal.name}</h3>
                <p>القوة: ${chosenAnimal.power}</p>
                <p>الندرة: ${finalRarityName}</p>
            `;

            const resultContainer = document.getElementById('result-container');
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        }

        // --- 5. الدوال المساعدة (لا تحتاج لتعديل) ---
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

        function getTierByPower(power) {
            for (const tierKey in animalTiers) {
                const tier = animalTiers[tierKey];
                if (power >= tier.minPower && power <= tier.maxPower) {
                    return tier;
                }
            }
            return { name: "غير محدد" };
        }

        function getFallbackTier(failedTierKey) {
            const tierKeys = Object.keys(animalTiers);
            const failedIndex = tierKeys.indexOf(failedTierKey);
            if (failedIndex > 0) {
                const fallbackKey = tierKeys[failedIndex - 1];
                return animalTiers[fallbackKey];
            }
            return animalTiers.common;
        }
