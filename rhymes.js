// Database of rhymes for common objects
const rhymes = {
    // Fruits
    "apple": {
        rhyme: "Round and red, so sweet to eat,\nAn apple is a tasty treat!\nOne a day keeps doctors away,\nCrunchy and healthy, hip hooray!",
        audio: "apple.mp3"
    },
    "banana": {
        rhyme: "Yellow and curved, a fruit so sweet,\nPeel it open for a tasty treat!\nMonkeys love them, and so do we,\nBananas grow on a tall, tall tree!",
        audio: "banana.mp3"
    },
    "orange": {
        rhyme: "Orange and round with a peel so bright,\nJuicy and sweet, what a delight!\nFull of vitamin C to help you grow,\nOranges make your energy flow!",
        audio: "orange.mp3"
    },

    // Animals
    "cat": {
        rhyme: "Soft and furry with whiskers so neat,\nA cat says 'meow' and lands on its feet!\nIt purrs when happy and likes to play,\nWith a ball of yarn throughout the day!",
        audio: "cat.mp3"
    },
    "dog": {
        rhyme: "Loyal and friendly, a dog says 'woof',\nWith a wagging tail and sometimes a goof!\nYour best friend forever, through thick and thin,\nA dog's love is pure from deep within!",
        audio: "dog.mp3"
    },
    "bird": {
        rhyme: "With feathers so colorful and wings to fly,\nA bird soars freely across the sky!\nIt sings sweet songs from dawn till dusk,\nWatching birds fly is a must!",
        audio: "bird.mp3"
    },
    "fish": {
        rhyme: "Swimming in water, with fins and scales,\nA fish has no legs, but it has a tail!\nIt breathes through gills and not with lungs,\nIn schools they swim, like songs being sung!",
        audio: "fish.mp3"
    },

    // Toys
    "ball": {
        rhyme: "Round and bouncy, big or small,\nRolling, throwing, that's a ball!\nKick it, catch it, have some fun,\nPlaying with balls makes us run!",
        audio: "ball.mp3"
    },
    "teddy bear": {
        rhyme: "Soft and cuddly, a friend so dear,\nHug your teddy bear, have no fear!\nIt keeps you company day and night,\nA teddy bear hugs you tight!",
        audio: "teddy_bear.mp3"
    },
    "doll": {
        rhyme: "With pretty clothes and a smiling face,\nA doll brings joy to any place!\nDress it up or brush its hair,\nA doll is a friend who's always there!",
        audio: "doll.mp3"
    },

    // Household items
    "chair": {
        rhyme: "Four legs standing, a place to sit,\nOn a chair you can rest a bit!\nAt the table or by the door,\nChairs help us not sit on the floor!",
        audio: "chair.mp3"
    },
    "table": {
        rhyme: "Flat on top with legs below,\nA table's where good things go!\nFor eating meals or doing art,\nTables are useful and smart!",
        audio: "table.mp3"
    },
    "cup": {
        rhyme: "Hold it steady, don't let it spill,\nA cup holds drinks for you to fill!\nSip your water, juice, or tea,\nCups help us drink easily!",
        audio: "cup.mp3"
    },
    "book": {
        rhyme: "Pages to turn, stories to tell,\nBooks are magical, can't you tell?\nAdventures await between the covers,\nBooks make us thinkers and lovers!",
        audio: "book.mp3"
    },
    "clock": {
        rhyme: "Tick tock, tick tock, telling the time,\nWith numbers in a circle, isn't that fine?\nHours and minutes all day long,\nClocks help us know where time has gone!",
        audio: "clock.mp3"
    },

    // Clothing
    "shoe": {
        rhyme: "On your feet they go with ease,\nShoes protect your toes, if you please!\nTie the laces, buckle them tight,\nShoes help you walk from morning till night!",
        audio: "shoe.mp3"
    },
    "hat": {
        rhyme: "On your head it sits just right,\nA hat keeps you warm or blocks the light!\nBig or small, with a brim so wide,\nWearing a hat fills you with pride!",
        audio: "hat.mp3"
    },

    // Transportation
    "car": {
        rhyme: "Vroom vroom, honk honk, down the street,\nA car takes you places, isn't that neat?\nWith wheels that spin and an engine too,\nCars help people get where they're due!",
        audio: "car.mp3"
    },
    "bicycle": {
        rhyme: "Two wheels spinning round and round,\nOn a bicycle, fun is found!\nPedal your feet to make it go,\nRiding a bike is fun, you know!",
        audio: "bicycle.mp3"
    },

    // Nature
    "tree": {
        rhyme: "Tall and strong with leaves so green,\nA tree is the prettiest thing you've seen!\nGiving shade and clean fresh air,\nTrees are treasures beyond compare!",
        audio: "tree.mp3"
    },
    "flower": {
        rhyme: "Colorful petals, a sweet perfume,\nFlowers make gardens beautifully bloom!\nBees love them for their nectar so sweet,\nFlowers make our world complete!",
        audio: "flower.mp3"
    },

    // Default for unknown objects
    "unknown": {
        rhyme: "What could this be? Let's take a look!\nSomething new to add to our book!\nLearning is fun when we explore,\nLet's find out what this is for!",
        audio: "unknown.mp3"
    }
};

// Function to get a rhyme for an object with context
function getRhyme(objectName, context = {}) {
    // Convert to lowercase for case-insensitive matching
    const name = objectName.toLowerCase();
    
    // Check if we have a rhyme for this object
    if (rhymes[name]) {
        // Get the base rhyme
        const baseRhyme = rhymes[name];
        
        // Generate a contextual rhyme based on available context
        return generateContextualRhyme(name, baseRhyme, context);
    }
    
    // If no exact match, try to find a partial match
    for (const key in rhymes) {
        if (name.includes(key) || key.includes(name)) {
            // Get the base rhyme from the partial match
            const baseRhyme = rhymes[key];
            
            // Generate a contextual rhyme based on available context
            return generateContextualRhyme(name, baseRhyme, context);
        }
    }
    
    // If no match found, generate a custom rhyme for this object
    return generateCustomRhyme(name, context);
}

// Function to generate a custom rhyme for an object not in our database
function generateCustomRhyme(objectName, context = {}) {
    // Create a basic rhyme structure for the unknown object
    let customRhyme = {
        rhyme: "",
        audio: "unknown.mp3" // Default audio file
    };
    
    // Educational facts about common objects
    const objectFacts = {
        "person": {
            facts: [
                "People have a brain that helps them think and learn,\nWith five senses to help them at every turn!",
                "People come in different shapes, sizes, and hues,\nEach one special with their own unique views!",
                "People have a heart that pumps blood all day long,\nAnd lungs that breathe air to keep them strong!",
                "People need food, water, and rest to grow,\nAnd friends and family to help them know!"
            ]
        },
        "fridge": {
            facts: [
                "A fridge keeps food cold to stop germs from growing,\nWith shelves and drawers for organized stowing!",
                "Inside a fridge, the temperature's low,\nBetween 35 and 38 degrees to keep food fresh, you know!",
                "Fridges have motors and special gas inside,\nThat cool the air where our food does reside!",
                "Before fridges were invented, people used ice and snow,\nTo keep their food fresh long ago!"
            ]
        },
        "tv": {
            facts: [
                "TVs show pictures using tiny colored lights,\nMillions of pixels creating amazing sights!",
                "Television was invented about a hundred years ago,\nNow they're flat and smart, how they've grown!",
                "TVs receive signals through cables or the air,\nTurning them into shows and movies to share!",
                "Inside a TV are circuits and computer chips,\nThat process signals and data in tiny blips!"
            ]
        },
        "computer": {
            facts: [
                "Computers have processors that work like a brain,\nSolving problems again and again!",
                "Computers store data in memory chips,\nLike books on shelves in electronic strips!",
                "Computers use binary - just ones and zeros,\nTo create all the programs that make them our heroes!",
                "The first computers were as big as a room,\nNow they fit in our pockets and help learning bloom!"
            ]
        },
        "phone": {
            facts: [
                "Phones send our voices through invisible waves,\nConnecting people across oceans and caves!",
                "Modern phones are really small computers too,\nWith cameras, maps, and games for me and you!",
                "Phones were invented by Alexander Graham Bell,\nNow they're smart devices with stories to tell!",
                "Phones use satellites high up in the sky,\nTo help us talk to friends both far and nigh!"
            ]
        },
        "couch": {
            facts: [
                "Couches have frames made of wood or metal strong,\nWith springs and padding to last years long!",
                "Couches come in many shapes like L or U,\nSectionals, loveseats, and sofas too!",
                "The word 'couch' comes from French long ago,\nMeaning 'to lie down' as many people know!",
                "Couches have been around for thousands of years,\nFrom ancient Egypt to modern-day peers!"
            ]
        },
        "bed": {
            facts: [
                "Beds help us sleep for about eight hours each night,\nResting our bodies until morning light!",
                "Beds have mattresses filled with springs or foam,\nSupporting our bodies in our cozy home!",
                "People spend about one-third of their life in bed,\nDreaming and resting their body and head!",
                "Beds come in sizes like twin, queen, and king,\nEach with a purpose for the comfort they bring!"
            ]
        },
        "bottle": {
            facts: [
                "Bottles can be made of glass or plastic clear,\nHolding liquids safely, have no fear!",
                "Bottles have caps or corks to keep things inside,\nSo drinks and liquids safely abide!",
                "Some bottles are recycled and used again,\nHelping our planet again and again!",
                "Bottles come in shapes both short and tall,\nDesigned for different liquids, big and small!"
            ]
        },
        "cup": {
            facts: [
                "Cups have handles to hold them with ease,\nSo hot drinks don't burn you when you squeeze!",
                "Cups can be made of ceramic, glass, or plastic too,\nEach material has a different job to do!",
                "The first cups were made from shells and animal horns,\nNow we have many types since those early morns!",
                "Cups have rims that are smooth for your lips,\nSo you can drink without any drips!"
            ]
        },
        "keyboard": {
            facts: [
                "Keyboards have letters arranged in a special way,\nQWERTY is the pattern most common today!",
                "Keyboards send signals when keys are pressed down,\nTelling computers which letters to put down!",
                "Keyboards have special keys like Shift and Space,\nHelping us type at a faster pace!",
                "The first keyboards were on typewriters long ago,\nNow they're electronic with lights that glow!"
            ]
        },
        "mouse": {
            facts: [
                "Computer mice help move the cursor on screen,\nWith buttons to click on things you've seen!",
                "Inside a mouse is a sensor that tracks,\nThe movement across surfaces like tables and racks!",
                "Mice can be wireless or connected by wire,\nDepending on what features you desire!",
                "The first computer mouse was made of wood,\nNow they're sleek and plastic as they should!"
            ]
        },
        "remote": {
            facts: [
                "Remotes send signals using infrared light,\nInvisible to eyes but devices see it right!",
                "Remotes have buttons for channels and volume control,\nSo you can change shows without taking a stroll!",
                "Inside a remote are circuits and batteries too,\nPowering signals sent straight to you!",
                "One person might use a remote 4,000 times a year,\nChanging channels and volume crystal clear!"
            ]
        },
        "microwave": {
            facts: [
                "Microwaves heat food using invisible waves,\nMaking molecules move in speedy ways!",
                "A microwave oven has a special metal box inside,\nThat keeps the waves safely inside!",
                "Microwaves can heat food in just a minute or two,\nMuch faster than ovens traditionally do!",
                "The first microwave was accidentally invented,\nWhen a candy bar in a pocket melted!"
            ]
        },
        "refrigerator": {
            facts: [
                "Refrigerators keep food cold and fresh for days,\nUsing special coolants in amazing ways!",
                "Inside a refrigerator, the temperature stays low,\nBetween 35 and 38 degrees to keep food fresh, you know!",
                "Refrigerators have motors that hum all day and night,\nKeeping your food fresh until the time is right!",
                "The first refrigerators used blocks of ice,\nNow they're electric and automatically nice!"
            ]
        }
    };
    
    // Generate an informational rhyme based on the object name
    if (objectFacts[objectName]) {
        // Get a random fact about this object
        const facts = objectFacts[objectName].facts;
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        
        // Create an informational rhyme
        customRhyme.rhyme = `This is a ${objectName}, let me tell you why it's cool,\n${randomFact}`;
    } else {
        // For objects without specific facts, create a generic informational rhyme
        customRhyme.rhyme = `This is a ${objectName}, something to explore and see,\n` +
                           `It has a special purpose, as important as can be!\n` +
                           `Let's learn about this ${objectName} and what it can do,\n` +
                           `Understanding our world is important for me and you!`;
    }
    
    // Add time of day context if available
    if (context.timeOfDay) {
        const timeLines = {
            morning: `In the morning light, it's a beautiful sight!`,
            afternoon: `In the afternoon sun, it brings so much fun!`,
            evening: `In the evening glow, it's a wonderful show!`,
            night: `In the night so deep, while others are asleep!`
        };
        
        if (timeLines[context.timeOfDay]) {
            const rhymeLines = customRhyme.rhyme.split('\n');
            // Insert the time line after the second line
            if (rhymeLines.length >= 2) {
                rhymeLines.splice(2, 0, timeLines[context.timeOfDay]);
                customRhyme.rhyme = rhymeLines.join('\n');
            }
        }
    }
    
    // Add position context if available
    if (context.position) {
        const positionPhrase = getPositionPhrase(context.position);
        if (positionPhrase) {
            // Find a line that mentions the object
            const lines = customRhyme.rhyme.split('\n');
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].toLowerCase().includes(objectName)) {
                    // Add position context
                    lines[i] = lines[i].replace(
                        new RegExp(`(${objectName})`, 'i'),
                        `$1 ${positionPhrase}`
                    );
                    break;
                }
            }
            customRhyme.rhyme = lines.join('\n');
        }
    }
    
    return customRhyme;
}

// Function to generate a contextual rhyme based on the object and available context
function generateContextualRhyme(objectName, baseRhyme, context) {
    // Start with the base rhyme
    let rhymeData = { ...baseRhyme };
    
    // Extract context information if available
    const { 
        bbox, // Bounding box [x, y, width, height]
        score, // Confidence score
        otherObjects, // Other objects in the frame
        timeOfDay, // Time of day (morning, afternoon, evening, night)
        position // Position in frame (top, bottom, left, right, center)
    } = context;
    
    // Create a contextual rhyme based on the object and context
    let contextualRhyme = baseRhyme.rhyme;
    
    // Size context - if bounding box is available
    if (bbox && bbox.length === 4) {
        const [x, y, width, height] = bbox;
        const area = width * height;
        const screenArea = context.screenWidth * context.screenHeight || 1000000; // Default if not provided
        const relativeSize = area / screenArea;
        
        // Determine size description
        let sizeDesc = "medium-sized";
        if (relativeSize > 0.3) sizeDesc = "large";
        else if (relativeSize < 0.05) sizeDesc = "small";
        
        // Add size context to certain objects where it makes sense
        if (["ball", "apple", "orange", "teddy bear", "book", "clock", "hat"].includes(objectName)) {
            contextualRhyme = contextualRhyme.replace(
                new RegExp(`(${objectName})`, 'i'),
                `${sizeDesc} $1`
            );
        }
    }
    
    // Position context - if position is available
    if (position) {
        // Add position context for certain objects
        if (["chair", "table", "clock", "book", "flower", "tree"].includes(objectName)) {
            // Find a line that mentions the object
            const lines = contextualRhyme.split('\n');
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].toLowerCase().includes(objectName)) {
                    // Add position context
                    lines[i] = lines[i].replace(
                        new RegExp(`(${objectName})`, 'i'),
                        `$1 ${getPositionPhrase(position)}`
                    );
                    break;
                }
            }
            contextualRhyme = lines.join('\n');
        }
    }
    
    // Time of day context - if time of day is available
    if (timeOfDay) {
        // Add time context for certain objects
        if (["bird", "cat", "dog", "car", "bicycle", "tree", "flower"].includes(objectName)) {
            // Add a line about the time of day
            const timeLines = {
                morning: `In the morning light, it's a beautiful sight!`,
                afternoon: `In the afternoon sun, it brings so much fun!`,
                evening: `In the evening glow, it's a wonderful show!`,
                night: `In the night so deep, while others are asleep!`
            };
            
            if (timeLines[timeOfDay]) {
                const rhymeLines = contextualRhyme.split('\n');
                // Insert the time line after the second line
                if (rhymeLines.length >= 2) {
                    rhymeLines.splice(2, 0, timeLines[timeOfDay]);
                    contextualRhyme = rhymeLines.join('\n');
                }
            }
        }
    }
    
    // Other objects context - if other objects are available
    if (otherObjects && otherObjects.length > 0) {
        // Find a relevant object to mention
        const relevantPairs = {
            "cat": ["dog", "fish", "bird"],
            "dog": ["cat", "ball", "teddy bear"],
            "ball": ["dog", "teddy bear"],
            "cup": ["table", "book"],
            "book": ["table", "chair"],
            "chair": ["table", "book"],
            "table": ["chair", "cup", "book"],
            "car": ["bicycle"],
            "bicycle": ["car"],
            "apple": ["orange", "banana"],
            "orange": ["apple", "banana"],
            "banana": ["apple", "orange"]
        };
        
        // Check if we have a relevant pair for this object
        if (relevantPairs[objectName]) {
            const possiblePairs = relevantPairs[objectName];
            // Find if any of the other objects are in our relevant pairs
            const matchedObject = otherObjects.find(obj => 
                possiblePairs.includes(obj.toLowerCase())
            );
            
            if (matchedObject) {
                // Add a line mentioning the relationship
                const relationshipLines = {
                    "cat-dog": `With a dog nearby, they chase and they fly!`,
                    "dog-cat": `With a cat around, they play on the ground!`,
                    "cat-fish": `Looking at the fish, what a tasty dish!`,
                    "cat-bird": `Watching birds with care, jumping in the air!`,
                    "dog-ball": `Chasing after balls, running through the halls!`,
                    "dog-teddy bear": `Not like teddy bears, real dogs have no cares!`,
                    "ball-dog": `Dogs love to chase, at a very fast pace!`,
                    "cup-table": `Sitting on the table, steady if you're able!`,
                    "book-table": `Open on the table, read when you are able!`,
                    "chair-table": `Next to the table, a perfect pair they make!`,
                    "table-chair": `With chairs all around, where people can sit down!`,
                    "table-cup": `Holding cups with care, spills are quite rare!`,
                    "table-book": `Books rest on top, a perfect reading spot!`,
                    "car-bicycle": `Faster than a bike, that's what cars are like!`,
                    "bicycle-car": `Not as fast as cars, but bikes will take you far!`,
                    "apple-orange": `Unlike oranges round, no peeling is found!`,
                    "orange-apple": `Unlike apples red, oranges must be peeled instead!`,
                    "apple-banana": `Not long like bananas, but round and full of manners!`,
                    "orange-banana": `Not long like bananas, but round with tangy manners!`,
                    "banana-apple": `Not round like apples, but curved in yellow dapples!`,
                    "banana-orange": `Not round like oranges, but curved in yellow porridges!`
                };
                
                const key = `${objectName}-${matchedObject.toLowerCase()}`;
                if (relationshipLines[key]) {
                    const rhymeLines = contextualRhyme.split('\n');
                    // Insert the relationship line after the third line or at the end
                    const insertPos = Math.min(3, rhymeLines.length);
                    rhymeLines.splice(insertPos, 0, relationshipLines[key]);
                    contextualRhyme = rhymeLines.join('\n');
                }
            }
        }
    }
    
    // Update the rhyme in the rhyme data
    rhymeData.rhyme = contextualRhyme;
    
    return rhymeData;
}

// Helper function to get a phrase based on position
function getPositionPhrase(position) {
    switch (position) {
        case 'top':
            return 'up high';
        case 'bottom':
            return 'down low';
        case 'left':
            return 'to the left';
        case 'right':
            return 'to the right';
        case 'center':
            return 'in the middle';
        default:
            return '';
    }
}
