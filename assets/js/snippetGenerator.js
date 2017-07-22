/*jslint indent: 4, maxerr: 50, plusplus: true */
/*global $, alert, console, prompt */

"use strict";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var RCON_PASS = generatePasswordArray(4);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function addLogMessage(what, details, icon) {
    what = what.toString().trim();
    details = details.toString().trim();
    icon = (icon || 'fa fa-desktop').trim();
    
    let curDate = new Date(),
        timestamp = zeroPad(curDate.getHours()) + ':' + zeroPad(curDate.getMinutes()) + ':' + zeroPad(curDate.getSeconds()) + '.' + zeroPad(curDate.getMilliseconds(), 4);

    $('#snippetGeneratorLogTable').append('<tr><td>' + timestamp + '</td><td><i class="' + icon + '"></i></td><td>' + what + '</td><td>' + details + '</td></tr>');
}

function generatePasswordArray(strength, maxLength) {
    strength = Number(strength);
    
    var maxPasswordLength = 24; // Default value
    
    if (isWholeNumber(strength) && strength !== NaN) {
        if (strength < 1) {
            strength = 1;
        } else if (strength > 5) {
            strength = 5;
        }
    } else {
        strength = 1;
    }
    
    if (isWholeNumber(maxLength) && maxLength !== NaN) {
        if (maxLength < 6) {
            maxPasswordLength = 6;
        } else {
            maxPasswordLength = maxLength;
        }
    } else {
        maxPasswordLength = 24;
    }

    function _genPass(strength) {

       var word1 = ["aliens", "allies", "anteaters", "antelope", "badgers", "bats", "bears", "beasts", "birds", "bison", "blacksmiths", "boars", "bobcats", "buffalo", "bugs", "bulldogs", "bullies", "butterflies", "camels", "cats", "cattle", "chickens", "cobras", "cows", "coyotes", "crabs", "crickets", "criminals", "cyclops", "deer", "demons", "dogs", "donkeys", "doves", "dragonflies", "dragons", "ducks", "eagles", "eels", "elephants", "elk", "elves", "falcons", "ferrets", "fish", "foxes", "frogs", "geckos", "geese", "gerbils", "ghosts", "giants", "goats", "goblins", "goldfish", "gophers", "gorillas", "governments", "grasshoppers", "gremlins", "hamsters", "hawks", "hedgehogs", "horses", "hunters", "insects", "jackals", "jellyfish", "kangaroos", "kittens", "lemurs", "leopards", "lions", "lizards", "lobsters", "locusts", "lumberjacks", "martians", "mice", "minions", "monkeys", "monsters", "moose", "moths", "mules", "mustangs", "mutants", "ninjas", "orcs", "otters", "owls", "oxen", "pandas", "parrots", "pelicans", "penguins", "phantoms", "pigs", "pirates", "pokemon", "ponies", "puppies", "pythons", "rabbits", "rams", "rascals", "rats", "ravens", "reptiles", "robins", "robots", "scarecrows", "scientists", "seals", "sharks", "sheep", "shrimp", "skeletons", "skunks", "sloths", "snails", "snakes", "spiders", "spies", "squid", "squirrels", "starfish", "stingrays", "swans", "tigers", "toads", "trolls", "turkeys", "turtles", "undead", "unicorns", "vampires", "villians", "vultures", "warriors", "werewolves", "whales", "wildcats", "wolves", "woodpeckers", "worms", "yeti", "zebras", "zombies"],
            glue = ["admire", "adore", "dig", "fancy", "choose", "take", "desire", "like", "love", "want", "prefer"],
            word2 = ["adventure", "advice", "afternoons", "aircraft", "airplanes", "airports", "alarms", "almonds", "apples", "archery", "art", "august", "autumn", "bagels", "balloons", "bamboo", "bananas", "banks", "barns", "baseball", "basketball", "baskets", "batteries", "battleships", "bbq", "beads", "beans", "beards", "beds", "bedtime", "benches", "bicycles", "bikes", "biology", "birthdays", "blankets", "blenders", "blizzards", "blogs", "boats", "books", "boots", "bottles", "bowling", "bowls", "boxes", "brazil", "bread", "breakfast", "bricks", "bridges", "broccoli", "brownies", "bubbles", "buffets", "buildings", "butter", "butterscotch", "buttons", "cabbages", "cabinets", "cabins", "cables", "cake", "calendars", "cameras", "camping", "candles", "candy", "cannons", "cans", "canyons", "cards", "carpet", "carrots", "cars", "caves", "ceilings", "celery", "cereal", "chairs", "checkers", "cheddar", "cheese", "cherries", "chess", "chestnuts", "chicago", "chili", "chips", "chocolate", "chores", "chrome", "circles", "cities", "clocks", "clones", "clothes", "clothing", "clouds", "coaches", "coaching", "coal", "coats", "coconuts", "coffee", "coins", "cola", "cold", "college", "colorado", "colors", "combat", "comics", "computers", "concrete", "confetti", "conflict", "cookies", "cooking", "corn", "couches", "coupons", "creeks", "cuba", "cupcakes", "cups", "curtains", "cushions", "dallas", "dancing", "danger", "dark", "daytime", "december", "democracy", "denver", "desks", "detroit", "diamonds", "diary", "dirt", "dishes", "dodgeball", "donuts", "doom", "doorbells", "doors", "doorways", "dreams", "driveways", "driving", "drones", "drums", "drumsticks", "dust", "earrings", "earthquakes", "eating", "eggs", "egypt", "electricity", "electronics", "elevators", "email", "emergencies", "everything", "fall", "falling", "fallout", "fame", "fans", "farms", "feet", "fences", "fields", "fighting", "films", "finland", "fire", "firewalls", "fireworks", "flags", "floors", "flowers", "flutes", "flying", "foam", "folders", "food", "football", "forests", "forks", "forts", "friday", "frosting", "fruit", "fudge", "games", "gaming", "garages", "gardens", "garlic", "germany", "glass", "glasses", "gloves", "glue", "gold", "golf", "gps", "grain", "grapefruit", "grapes", "gravity", "greed", "green", "guitars", "gum", "hair", "haircuts", "halloween", "halo", "hamburgers", "hammers", "hats", "headaches", "heat", "hiking", "hills", "hiphop", "history", "hobbies", "hockey", "holidays", "honey", "hospitals", "hotsauce", "houses", "houston", "hunting", "ice", "icecream", "indoors", "industry", "iron", "islands", "jackets", "japan", "jars", "jazz", "jeans", "jello", "jokes", "journals", "juggling", "jukeboxes", "july", "jumping", "june", "jungles", "kansas", "karate", "ketchup", "keyboards", "keys", "kickboxing", "kindness", "kitchens", "kites", "knives", "ladders", "lakes", "lamps", "laptops", "lasers", "laughter", "lava", "lawns", "lawschool", "lemons", "letters", "lettuce", "libaries", "libraries", "light", "lightbulbs", "lipstick", "locks", "london", "lotteries", "lumber", "lunch", "machines", "magazines", "mail", "makeup", "mario", "markets", "marshes", "math", "meat", "medicine", "melons", "memphis", "metal", "miami", "milk", "minecraft", "mirrors", "mistakes", "monday", "money", "mountains", "movies", "mud", "museums", "mushrooms", "music", "musicals", "mustard", "myths", "nachos", "napkins", "networks", "newspapers", "night", "nintendo", "noises", "noodles", "notebooks", "november", "numbers", "nutmeg", "oatmeal", "oceans", "october", "offices", "ohio", "oil", "olives", "onions", "opera", "oranges", "orlando", "outdoors", "ovens", "packages", "paint", "paintball", "paintings", "pancakes", "paper", "parking", "parks", "passports", "passwords", "pasta", "pastries", "pavement", "peanuts", "pearls", "pears", "pencils", "pens", "pepper", "phones", "photos", "physics", "pianos", "pickles", "pie", "pillows", "pinball", "pineapples", "pizza", "plants", "plastic", "plates", "playstation", "playtime", "plums", "poker", "politics", "ponds", "popcorn", "portal", "portland", "postcards", "posters", "potatoes", "pretzels", "printers", "promises", "propane", "pudding", "pumpkins", "punkrock", "purple", "purses", "puzzles", "pyramids", "quake", "quicksand", "quilts", "racing", "radios", "railroad", "rain", "ramps", "reading", "reality", "rectangles", "recycling", "red", "revenge", "rice", "rings", "rivers", "roads", "roadtrips", "rocks", "rollercoasters", "rope", "rowboats", "rubber", "rugby", "running", "runways", "russia", "safety", "salad", "salsa", "salt", "sand", "sandals", "Saturday", "schedules", "school", "science", "scissors", "seafood", "seattle", "shampoo", "shelves", "shirts", "shoes", "shopping", "shows", "sidewalks", "silver", "singing", "sinks", "skating", "sleeping", "sneakers", "snow", "soap", "soccer", "socks", "soda", "sofas", "softball", "software", "sonic", "soup", "soybeans", "spaghetti", "spatulas", "speakers", "speaking", "spheres", "spices", "spinach", "sponges", "spoons", "sports", "spring", "sprinkles", "squares", "stairs", "starcraft", "steaks", "steam", "steel", "stereos", "stickers", "stones", "stores", "storms", "stoves", "strangers", "studying", "submarines", "subways", "sugar", "suitcases", "sunday", "sunflowers", "sunlight", "sunshine", "supermarkets", "surfing", "surprises", "swamps", "sweaters", "swimming", "tables", "tablets", "tacos", "talking", "taxes", "teaching", "tech", "television", "tennis", "tents", "tetris", "texas", "thursday", "tickets", "time", "tires", "toast", "today", "togas", "tomatoes", "toothpaste", "tornados", "towels", "towers", "towns", "toys", "traffic", "trails", "trains", "trash", "trees", "triangles", "trivia", "trophies", "trucks", "trumpets", "tuesday", "tunnels", "uniforms", "unrest", "utah", "vacations", "vacuums", "valve", "vanilla", "vegtables", "villages", "vinegar", "voicemail", "volleyball", "waffles", "wagons", "walking", "wallets", "walls", "war", "warcraft", "waste", "watches", "water", "waterfalls", "wax", "weather", "websites", "wednesday", "wheat", "wheels", "wind", "windows", "winter", "wires", "wood", "work", "working", "wrestling", "xbox", "yearbooks", "yellow", "yesterday", "yoga", "yogurt", "zelda", "zippers"];

        if (strength === 1) {
            if (Math.random()<.5) {
                return [Math.floor(Math.random()*99).toString(), word1[Math.floor(Math.random() * word1.length)].toLowerCase()];
            } else {
                return [word2[Math.floor(Math.random() * word2.length)].toLowerCase(), Math.floor(Math.random()*99).toString()];
            }
        } else if (strength === 2) {
            return [word1[Math.floor(Math.random() * word1.length)].toLowerCase(), glue[Math.floor(Math.random() * glue.length)].toLowerCase(), word2[Math.floor(Math.random() * word2.length)].toLowerCase()];
        } else if (strength === 3) {
            var tempPass = _genPass(2);

            for (var i = 0; i < tempPass.length; i++) {
                tempPass[i] = tempPass[i].charAt(0).toUpperCase() + tempPass[i].slice(1);
            }

            tempPass.push(zeroPad(Math.floor(Math.random()*9999), 4));

            return tempPass;
        } else if (strength === 4) {
            var tempPass = _genPass(3);
            
            // Randomly UpperCase / LowerCase letters
            for (var i = 0; i < tempPass.length; i++) {
                tempPass[i] = _randomCasing(tempPass[i]);
            }

            return tempPass;
        } else if (strength === 5) {
            return [_randomString(maxPasswordLength)];
        }
    }

    function _randomCasing(word) {
        var str = '';

        for (var i = 0; i < word.length; i++) {
            if (Math.random() >= 0.5) {
                str += word.charAt(i).toUpperCase();
            } else {
                str += word.charAt(i).toLowerCase();
            }
        }

        return str;
    }

    function _randomString(length) {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=+";
        var value = '';
        
        for (var i = 0; i < length; i++) {
            value += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return _randomCasing(value);
    }

    var loopCount = 0,
        valueArray;

    do {
        loopCount++;
        
        if (loopCount > 15) {
            if (strength > 1) {
                strength--;
            }
            else {
                return [_randomString(maxPasswordLength)];
            }
        } else {
            valueArray = _genPass(strength);
        }

    } while (valueArray.toString().replace(',', '').length >= maxPasswordLength);

    return valueArray;
}


function getRandomTeamName() {

    var teams = [   'Bad News Bears', 'Bedrock Boulders', 'Capital Congressmen', 'The Electabuzz', 'Hackensack Bulls', 'Hadley Saints', 'The Magikarp', 'Miami Gators', 'O-Town Zeros',
                    'Springfield Isotopes', 'Stoolbend Turtleheads', 'Tampico Stogies', 'Warriors', 'Wonderdogs', 'Peekskill Parks', 'Dallas Felons', 'Detroit Lemons', 'Miami Dealers',
                    'Roswell Aliens', 'Gotham Goliaths', 'Gotham Knights', 'Motor City Wheels', 'Gotham Rogues', 'Jersey Boomers', 'Boston Poindexters', 'Mars Greenskins', 'New New York Mets',
                    'Pituitary Giants', 'Swedish Meatballs', 'Atlanta Braves', 'New Jersey Titans', 'Las Venturas Bandits', 'Liberty City Swingers', 'Los Santos Saints', 'San Fierro Packers',
                    'Los Santos Corkers', 'Los Santos Squeezers', 'Los Santos Panic', 'Asylum Keepers', 'Kakoola Reapers', 'California Pioneers', 'Gas House Gorillas', 'Tea Totalers',
                    'Miami SunKings', 'Tucson Sunbelters', 'Burlington Drifters', 'Capital City Capitals', 'Salem Boulevardiers', 'Springfield Floozies', 'Springfield Meltdowns',
                    'London Kings', 'Metropolis Meteors', 'Metropolis Monarchs', 'Beaneaters', 'Bridegrooms', 'Excelsiors', 'Haymakers', 'Keystones', 'Knickerbockers', 'Pastime Club',
                    'Pioneers', 'Atomic Supermen', 'Basin City Blues', 'Cascade Jaguars', 'Charlotte Banshees', 'Deon Demons', 'Dimmsdale Ballhogs', 'Metropolis Generals',
                    'Philadelphia Spartans', 'Roswell Rayguns', 'Gotham Guardsmen', 'Gotham Gators', 'Austin Celtics', 'Springfield Celtics', 'Monstars', 'ToonSquad', 'Flint Tropics',
                    'Bushido Blades', 'Flying Scotsmen', "Gorgon's Gargoyles", 'Montezuma Mashers', 'Siberian Wolves', 'Teutonic Titans', 'Gloucester Meteors', 'Reading Whackers',
                    'Average Joe\'s', 'Charging Donkeys', 'Skillz That Killz', 'Lumberjacks', 'Team Blitzkrieg', 'Osaka Kamikazes', 'New Orleans Clown Punchers', 'Monterrey Mulchers',
                    'Troop 417', 'Yetis', 'Pouncers', 'Spleen Mashers', 'Savage Squad 300', 'Adams College Atoms', 'Ampipe Bulldogs', 'Atlanta Cobras', 'Arizona Sparklies', 'California Atoms',
                    'Denver Monarchs', 'Desert Bluff Vultures', 'Dillon Panthers', 'Duluth Bulldogs', 'East Dillon Lions', 'Faber Mongols', 'London Silly Nannies', 'McKinley Titans',
                    'Mean Machine', 'Miami Bucks', 'Nassau Rebels', 'Park City Pirates', 'Polk School Panthers', 'Raccoon Sharks', 'Roadrunners', 'The Turbos', 'Washington Sentinels',
                    'Vice City Mambas', 'Endsville Fluffycats', 'Cleveland Cats', 'San Francisco Treat', 'Metropolis Sharks', 'Smallville Crows', 'New York Mammoths', 'San Francisco Skyhawks',
                    'South Park Cows'];
}



var Docker = Docker || {};

Docker.NetString_SRCDS = function(ip) {
    var portsUDP = ['1200', '1500', '3005', '3101', '28960', '3478-3479', '4379-4380', '26900-26915', '27000-27030'];
    var portsTCP = ['27000-27050'];

    var netString = '';

    if (ip || !(/^\s*$/.test(ip))) {
        ip += ':';
    } else {
        ip = '';
    }

    for (var i in portsUDP) {
        netString += '-p=' + ip + portsUDP[i] + ':' + portsUDP[i] + '/udp ';
    }

    for (var i in portsTCP) {
        netString += '-p=' + ip + portsTCP[i] + ':' + portsTCP[i] + '/tcp ';
    }

    return netString.trim();
}


function modalFormatCommands(command, args, nestedCommand = []) {

    function nest(command, args, nestedCommand = []) {
        let rString = '<span>';
        rString += '<command>' + command + '</command>';
        rString += '<arguments>' + args + '</arguments>';
        
        if (nestedCommand.length > 0) {
            rString += nest(nestedCommand[0], nestedCommand[1], nestedCommand[2]);
        }

        rString += '<span>';

        return rString;
    }

    var returnStr = '<div class="nestedCommands">';
    returnStr += nest(command, args, nestedCommand);
    returnStr += '</div>';

    return returnStr;
}
