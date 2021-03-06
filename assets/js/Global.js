var password = password || {};

password.fromArray = function (arr) {
    "use strict";

    if (!Array.isArray(arr)) {
        alert('password.fromArray received a non-array: ' + arr);
        return;
    }

    let result = arr.slice(0);

    result.toString = function () {
        return arr.join('');
    };

    result.html = function () {
        let html = '<strong>';

        arr.forEach(function (str, i) {
            if (i % 2 === 0) {
                html += '<span style="color: red;">';
            } else {
                html += '<span style="color: blue;">';
            }

            html += arr[i] + '</span>';
        });

        return html + '</strong>';
    };

    return result;
};


// I'm sorry :'(
password.generatePredictable = function (seed) {
    "use strict";

    let subjects = ["aliens", "allies", "anteaters", "antelope", "badgers", "bats", "bears", "beasts", "birds", "bison", "blacksmiths", "boars", "bobcats", "buffalo", "bugs", "bulldogs", "bullies", "butterflies", "camels", "cats", "cattle", "chickens", "cobras", "cows", "coyotes", "crabs", "crickets", "criminals", "cyclops", "deer", "demons", "dogs", "donkeys", "doves", "dragonflies", "dragons", "ducks", "eagles", "eels", "elephants", "elk", "elves", "falcons", "ferrets", "fish", "foxes", "frogs", "geckos", "geese", "gerbils", "ghosts", "giants", "goats", "goblins", "goldfish", "gophers", "gorillas", "governments", "grasshoppers", "gremlins", "hamsters", "hawks", "hedgehogs", "horses", "hunters", "insects", "jackals", "jellyfish", "kangaroos", "kittens", "lemurs", "leopards", "lions", "lizards", "lobsters", "locusts", "lumberjacks", "martians", "mice", "minions", "monkeys", "monsters", "moose", "moths", "mules", "mustangs", "mutants", "ninjas", "orcs", "otters", "owls", "oxen", "pandas", "parrots", "pelicans", "penguins", "phantoms", "pigs", "pirates", "pokemon", "ponies", "puppies", "pythons", "rabbits", "rams", "rascals", "rats", "ravens", "reptiles", "robins", "robots", "scarecrows", "scientists", "seals", "sharks", "sheep", "shrimp", "skeletons", "skunks", "sloths", "snails", "snakes", "spiders", "spies", "squid", "squirrels", "starfish", "stingrays", "swans", "tigers", "toads", "trolls", "turkeys", "turtles", "undead", "unicorns", "vampires", "villians", "vultures", "warriors", "werewolves", "whales", "wildcats", "wolves", "woodpeckers", "worms", "yeti", "zebras", "zombies"];
    let verbs = ["admire", "adore", "dig", "fancy", "choose", "take", "desire", "like", "love", "want", "prefer"];
    let objects = ["adventure", "advice", "afternoons", "aircraft", "airplanes", "airports", "alarms", "almonds", "apples", "archery", "art", "august", "autumn", "bagels", "balloons", "bamboo", "bananas", "banks", "barns", "baseball", "basketball", "baskets", "batteries", "battleships", "bbq", "beads", "beans", "beards", "beds", "bedtime", "benches", "bicycles", "bikes", "biology", "birthdays", "blankets", "blenders", "blizzards", "blogs", "boats", "books", "boots", "bottles", "bowling", "bowls", "boxes", "brazil", "bread", "breakfast", "bricks", "bridges", "broccoli", "brownies", "bubbles", "buffets", "buildings", "butter", "butterscotch", "buttons", "cabbages", "cabinets", "cabins", "cables", "cake", "calendars", "cameras", "camping", "candles", "candy", "cannons", "cans", "canyons", "cards", "carpet", "carrots", "cars", "caves", "ceilings", "celery", "cereal", "chairs", "checkers", "cheddar", "cheese", "cherries", "chess", "chestnuts", "chicago", "chili", "chips", "chocolate", "chores", "chrome", "circles", "cities", "clocks", "clones", "clothes", "clothing", "clouds", "coaches", "coaching", "coal", "coats", "coconuts", "coffee", "coins", "cola", "cold", "college", "colorado", "colors", "combat", "comics", "computers", "concrete", "confetti", "conflict", "cookies", "cooking", "corn", "couches", "coupons", "creeks", "cuba", "cupcakes", "cups", "curtains", "cushions", "dallas", "dancing", "danger", "dark", "daytime", "december", "democracy", "denver", "desks", "detroit", "diamonds", "diary", "dirt", "dishes", "dodgeball", "donuts", "doom", "doorbells", "doors", "doorways", "dreams", "driveways", "driving", "drones", "drums", "drumsticks", "dust", "earrings", "earthquakes", "eating", "eggs", "egypt", "electricity", "electronics", "elevators", "email", "emergencies", "everything", "fall", "falling", "fallout", "fame", "fans", "farms", "feet", "fences", "fields", "fighting", "films", "finland", "fire", "firewalls", "fireworks", "flags", "floors", "flowers", "flutes", "flying", "foam", "folders", "food", "football", "forests", "forks", "forts", "friday", "frosting", "fruit", "fudge", "games", "gaming", "garages", "gardens", "garlic", "germany", "glass", "glasses", "gloves", "glue", "gold", "golf", "gps", "grain", "grapefruit", "grapes", "gravity", "greed", "green", "guitars", "gum", "hair", "haircuts", "halloween", "halo", "hamburgers", "hammers", "hats", "headaches", "heat", "hiking", "hills", "hiphop", "history", "hobbies", "hockey", "holidays", "honey", "hospitals", "hotsauce", "houses", "houston", "hunting", "ice", "icecream", "indoors", "industry", "iron", "islands", "jackets", "japan", "jars", "jazz", "jeans", "jello", "jokes", "journals", "juggling", "jukeboxes", "july", "jumping", "june", "jungles", "kansas", "karate", "ketchup", "keyboards", "keys", "kickboxing", "kindness", "kitchens", "kites", "knives", "ladders", "lakes", "lamps", "laptops", "lasers", "laughter", "lava", "lawns", "lawschool", "lemons", "letters", "lettuce", "libaries", "libraries", "light", "lightbulbs", "lipstick", "locks", "london", "lotteries", "lumber", "lunch", "machines", "magazines", "mail", "makeup", "mario", "markets", "marshes", "math", "meat", "medicine", "melons", "memphis", "metal", "miami", "milk", "minecraft", "mirrors", "mistakes", "monday", "money", "mountains", "movies", "mud", "museums", "mushrooms", "music", "musicals", "mustard", "myths", "nachos", "napkins", "networks", "newspapers", "night", "nintendo", "noises", "noodles", "notebooks", "november", "numbers", "nutmeg", "oatmeal", "oceans", "october", "offices", "ohio", "oil", "olives", "onions", "opera", "oranges", "orlando", "outdoors", "ovens", "packages", "paint", "paintball", "paintings", "pancakes", "paper", "parking", "parks", "passports", "passwords", "pasta", "pastries", "pavement", "peanuts", "pearls", "pears", "pencils", "pens", "pepper", "phones", "photos", "physics", "pianos", "pickles", "pie", "pillows", "pinball", "pineapples", "pizza", "plants", "plastic", "plates", "playstation", "playtime", "plums", "poker", "politics", "ponds", "popcorn", "portal", "portland", "postcards", "posters", "potatoes", "pretzels", "printers", "promises", "propane", "pudding", "pumpkins", "punkrock", "purple", "purses", "puzzles", "pyramids", "quake", "quicksand", "quilts", "racing", "radios", "railroad", "rain", "ramps", "reading", "reality", "rectangles", "recycling", "red", "revenge", "rice", "rings", "rivers", "roads", "roadtrips", "rocks", "rollercoasters", "rope", "rowboats", "rubber", "rugby", "running", "runways", "russia", "safety", "salad", "salsa", "salt", "sand", "sandals", "Saturday", "schedules", "school", "science", "scissors", "seafood", "seattle", "shampoo", "shelves", "shirts", "shoes", "shopping", "shows", "sidewalks", "silver", "singing", "sinks", "skating", "sleeping", "sneakers", "snow", "soap", "soccer", "socks", "soda", "sofas", "softball", "software", "sonic", "soup", "soybeans", "spaghetti", "spatulas", "speakers", "speaking", "spheres", "spices", "spinach", "sponges", "spoons", "sports", "spring", "sprinkles", "squares", "stairs", "starcraft", "steaks", "steam", "steel", "stereos", "stickers", "stones", "stores", "storms", "stoves", "strangers", "studying", "submarines", "subways", "sugar", "suitcases", "sunday", "sunflowers", "sunlight", "sunshine", "supermarkets", "surfing", "surprises", "swamps", "sweaters", "swimming", "tables", "tablets", "tacos", "talking", "taxes", "teaching", "tech", "television", "tennis", "tents", "tetris", "texas", "thursday", "tickets", "time", "tires", "toast", "today", "togas", "tomatoes", "toothpaste", "tornados", "towels", "towers", "towns", "toys", "traffic", "trails", "trains", "trash", "trees", "triangles", "trivia", "trophies", "trucks", "trumpets", "tuesday", "tunnels", "uniforms", "unrest", "utah", "vacations", "vacuums", "valve", "vanilla", "vegetables", "villages", "vinegar", "voicemail", "volleyball", "waffles", "wagons", "walking", "wallets", "walls", "war", "warcraft", "waste", "watches", "water", "waterfalls", "wax", "weather", "websites", "wednesday", "wheat", "wheels", "wind", "windows", "winter", "wires", "wood", "work", "working", "wrestling", "xbox", "yearbooks", "yellow", "yesterday", "yoga", "yogurt", "zippers"];

    let numericSeed = 0;
    for (let i = 0; i < seed.length; i++) {
        numericSeed += seed.charCodeAt(i) * ((i * 2) + 1);
    }

    // make sure number is at least 6 digits long
    let i = 2.7;
    while (numericSeed <= 99999) {
        numericSeed = Math.round(numericSeed * i);
        i *= 1.35;
    }

    function pullWord(i, wordArray) {
        // make sure we don't overflow
        while (i >= wordArray.length) {
            i = wordArray.length % i;
        }

        let word = wordArray[i];

        // capitalize first letter
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    let wordArray = [];
    seed = String(numericSeed).trim();

    let word0 = pullWord(+seed.substr(0, 2), subjects);
    let word1 = pullWord(+seed.substr(Math.round(seed.length / 2), 1), verbs);
    let word2 = pullWord(+seed.substr(-3), objects);

    return password.fromArray([word0, word1, word2]);
};


password.generateArray = function (strength) {
    "use strict";

    strength = Number(strength);
    if (isNaN(strength) || !isWholeNumber(strength)) {
        strength = 1;
    }

    let blackListedNumbers = [0, 69, 666, 667],
        ranNum;

    function _genPass(strength) {
        let word1 = ["aliens", "allies", "anteaters", "antelope", "badgers", "bats", "bears", "beasts", "birds", "bison", "blacksmiths", "boars", "bobcats", "buffalo", "bugs", "bulldogs", "bullies", "butterflies", "camels", "cats", "cattle", "chickens", "cobras", "cows", "coyotes", "crabs", "crickets", "criminals", "cyclops", "deer", "demons", "dogs", "donkeys", "doves", "dragonflies", "dragons", "ducks", "eagles", "eels", "elephants", "elk", "elves", "falcons", "ferrets", "fish", "foxes", "frogs", "geckos", "geese", "gerbils", "ghosts", "giants", "goats", "goblins", "goldfish", "gophers", "gorillas", "governments", "grasshoppers", "gremlins", "hamsters", "hawks", "hedgehogs", "horses", "hunters", "insects", "jackals", "jellyfish", "kangaroos", "kittens", "lemurs", "leopards", "lions", "lizards", "lobsters", "locusts", "lumberjacks", "martians", "mice", "minions", "monkeys", "monsters", "moose", "moths", "mules", "mustangs", "mutants", "ninjas", "orcs", "otters", "owls", "oxen", "pandas", "parrots", "pelicans", "penguins", "phantoms", "pigs", "pirates", "pokemon", "ponies", "puppies", "pythons", "rabbits", "rams", "rascals", "rats", "ravens", "reptiles", "robins", "robots", "scarecrows", "scientists", "seals", "sharks", "sheep", "shrimp", "skeletons", "skunks", "sloths", "snails", "snakes", "spiders", "spies", "squid", "squirrels", "starfish", "stingrays", "swans", "tigers", "toads", "trolls", "turkeys", "turtles", "undead", "unicorns", "vampires", "villians", "vultures", "warriors", "werewolves", "whales", "wildcats", "wolves", "woodpeckers", "worms", "yeti", "zebras", "zombies"],
            glue = ["admire", "adore", "dig", "fancy", "choose", "take", "desire", "like", "love", "want", "prefer"],
            word2 = ["afternoons", "aircraft", "airplanes", "airports", "alarms", "almonds", "apples", "archery", "art", "august", "autumn", "bagels", "balloons", "bamboo", "bananas", "banks", "barns", "baseball", "basketball", "baskets", "batteries", "battleships", "bbq", "beads", "beans", "beards", "beds", "bedtime", "benches", "bicycles", "bikes", "biology", "birthdays", "blankets", "blenders", "blizzards", "blogs", "boats", "books", "boots", "bottles", "bowling", "bowls", "boxes", "brazil", "bread", "breakfast", "bricks", "bridges", "broccoli", "brownies", "bubbles", "buffets", "buildings", "butter", "butterscotch", "buttons", "cabbages", "cabinets", "cabins", "cables", "cake", "calendars", "cameras", "camping", "candles", "candy", "cannons", "cans", "canyons", "cars", "cards", "carpet", "carrots", "cars", "caves", "ceilings", "celery", "cereal", "chairs", "checkers", "cheddar", "cheese", "cherries", "chess", "chestnuts", "chicago", "chili", "chips", "chocolate", "chores", "chrome", "circles", "cities", "clocks", "clones", "clothes", "clothing", "clouds", "coaches", "coaching", "coal", "coats", "coconuts", "coffee", "coins", "cola", "cold", "college", "colorado", "colors", "combat", "comics", "computers", "concrete", "confetti", "conflict", "cookies", "cooking", "corn", "couches", "coupons", "creeks", "cuba", "cupcakes", "cups", "curtains", "cushions", "dallas", "dancing", "danger", "dark", "daytime", "december", "democracy", "denver", "desks", "detroit", "diamonds", "diary", "dirt", "dishes", "dodgeball", "donuts", "doom", "doorbells", "doors", "doorways", "dreams", "driveways", "driving", "drones", "drums", "drumsticks", "dust", "earrings", "earthquakes", "eating", "eggs", "egypt", "electricity", "electronics", "elevators", "email", "emergencies", "everything", "fall", "falling", "fallout", "fame", "fans", "farms", "feet", "fences", "fields", "fighting", "films", "finland", "fire", "firewalls", "fireworks", "flags", "floors", "flowers", "flutes", "flying", "foam", "folders", "food", "football", "forests", "forks", "forts", "friday", "frosting", "fruit", "fudge", "games", "gaming", "garages", "gardens", "garlic", "germany", "glass", "glasses", "gloves", "glue", "gold", "golf", "gps", "grain", "grapefruit", "grapes", "gravity", "greed", "green", "guitars", "gum", "hair", "haircuts", "halloween", "halo", "hamburgers", "hammers", "hats", "headaches", "heat", "hiking", "hills", "hiphop", "history", "hobbies", "hockey", "holidays", "honey", "hospitals", "hotsauce", "houses", "houston", "hunting", "ice", "icecream", "indoors", "industry", "iron", "islands", "jackets", "japan", "jars", "jazz", "jeans", "jello", "jokes", "journals", "juggling", "jukeboxes", "july", "jumping", "june", "jungles", "kansas", "karate", "ketchup", "keyboards", "keys", "kickboxing", "kindness", "kitchens", "kites", "knives", "ladders", "lakes", "lamps", "laptops", "lasers", "laughter", "lava", "lawns", "lawschool", "lemons", "letters", "lettuce", "libaries", "libraries", "light", "lightbulbs", "lipstick", "locks", "london", "lotteries", "lumber", "lunch", "machines", "magazines", "mail", "makeup", "mario", "markets", "marshes", "math", "meat", "medicine", "melons", "memphis", "metal", "miami", "milk", "minecraft", "mirrors", "mistakes", "monday", "money", "mountains", "movies", "mud", "museums", "mushrooms", "music", "musicals", "mustard", "myths", "nachos", "napkins", "networks", "newspapers", "night", "nintendo", "noises", "noodles", "notebooks", "november", "numbers", "nutmeg", "oatmeal", "oceans", "october", "offices", "ohio", "oil", "olives", "onions", "opera", "oranges", "orlando", "outdoors", "ovens", "packages", "paint", "paintball", "paintings", "pancakes", "paper", "parking", "parks", "passports", "passwords", "pasta", "pastries", "pavement", "peanuts", "pearls", "pears", "pencils", "pens", "pepper", "phones", "photos", "physics", "pianos", "pickles", "pie", "pillows", "pinball", "pineapples", "pizza", "plants", "plastic", "plates", "playstation", "playtime", "plums", "poker", "politics", "ponds", "popcorn", "portal", "portland", "postcards", "posters", "potatoes", "pretzels", "printers", "promises", "propane", "pudding", "pumpkins", "punkrock", "purple", "purses", "puzzles", "pyramids", "quake", "quicksand", "quilts", "racing", "radios", "railroad", "rain", "ramps", "reading", "reality", "rectangles", "recycling", "red", "revenge", "rice", "rings", "rivers", "roads", "roadtrips", "rocks", "rollercoasters", "rope", "rowboats", "rubber", "rugby", "running", "runways", "russia", "safety", "salad", "salsa", "salt", "sand", "sandals", "Saturday", "schedules", "school", "science", "scissors", "seafood", "seattle", "shampoo", "shelves", "shirts", "shoes", "shopping", "shows", "sidewalks", "silver", "singing", "sinks", "skating", "sleeping", "sneakers", "snow", "soap", "soccer", "socks", "soda", "sofas", "softball", "software", "sonic", "soup", "soybeans", "spaghetti", "spatulas", "speakers", "speaking", "spheres", "spices", "spinach", "sponges", "spoons", "sports", "spring", "sprinkles", "squares", "stairs", "starcraft", "steaks", "steam", "steel", "stereos", "stickers", "stones", "stores", "storms", "stoves", "strangers", "studying", "submarines", "subways", "sugar", "suitcases", "sunday", "sunflowers", "sunlight", "sunshine", "supermarkets", "surfing", "surprises", "swamps", "sweaters", "swimming", "tables", "tablets", "tacos", "talking", "taxes", "teaching", "tech", "television", "tennis", "tents", "tetris", "texas", "thursday", "tickets", "time", "tires", "toast", "today", "togas", "tomatoes", "toothpaste", "tornados", "towels", "towers", "towns", "toys", "traffic", "trails", "trains", "trash", "trees", "triangles", "trivia", "trophies", "trucks", "trumpets", "tuesday", "tunnels", "uniforms", "unrest", "utah", "vacations", "vacuums", "valve", "vanilla", "vegtables", "villages", "vinegar", "voicemail", "volleyball", "waffles", "wagons", "walking", "wallets", "walls", "war", "warcraft", "waste", "watches", "water", "waterfalls", "wax", "weather", "websites", "wednesday", "wheat", "wheels", "wind", "windows", "winter", "wires", "wood", "work", "working", "wrestling", "xbox", "yearbooks", "yellow", "yesterday", "yoga", "yogurt", "zelda", "zippers"];

        if (strength <= 1) {
            // Word and a random 2-digit number
            do {
                ranNum = _.random(3, 99);
            } while (blackListedNumbers.indexOf(ranNum) > -1);

            return _.shuffle([ranNum, _.sample(word1.concat(word2))]);
        } else if (strength === 2) {
            // Two words "glued" together
            return [_.sample(word1).toLowerCase(), _.sample(glue).toLowerCase(), _.sample(word2).toLowerCase()];
        } else if (strength === 3) {
            // Two words "glued" together with random 3-digit number appended to the end
            do {
                ranNum = _.random(11, 997);
            } while (blackListedNumbers.indexOf(ranNum) > -1);
            ranNum = _.padStart(ranNum, 3, "0");

            return _genPass(2).concat([ranNum]);
        } else {
            // Complete random
            let result = [];

            _.times(4, function () {
                result.push(_.truncate(Math.random().toString(36).substring(7), {'length': 4, 'omission': ''}));
            });

            return result;
        }
    }

    return password.fromArray(_genPass(strength));
};


function isWholeNumber(n) {
    "use strict";
    return !isNaN(parseFloat(n)) && isFinite(n) && Math.round(n) === Number(n) && n >= 0;
}


function stringIsNullOrEmpty(str) {
    "use strict";

    return str === undefined || str === null || str.toString().trim().length < 1;
}
