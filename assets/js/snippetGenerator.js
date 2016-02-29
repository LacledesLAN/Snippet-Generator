/*jslint indent: 4, maxerr: 50, plusplus: true */
/*global $, alert, console, prompt */

"use strict";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var RCON_PASS;

function addLogMessage(what, details, icon) {
    what = what.toString().trim();
    details = details.toString().trim();
    icon = (icon || 'fa fa-desktop').trim();
    
    var curDate = new Date(),
        timestamp = zeroPad(curDate.getHours()) + ':' + zeroPad(curDate.getMinutes()) + ':' + zeroPad(curDate.getSeconds()) + '.' + zeroPad(curDate.getMilliseconds(), 4);

    $('#snippetGeneratorLogTable').append('<tr><td>' + timestamp + '</td><td><i class="' + icon + '"></i></td><td>' + what + '</td><td>' + details + '</td></tr>');
}

function generatePasswordArray(strength) {
    var settingMaxPasswordLength = 24;

    if (isWholeNumber(strength)) {
        if (strength < 1) {
            strength = 1;
        } else if (strength > 4) {
            strength = 4;
        }
    } else {
        strength = 3;
    }

    function _genPass(strength) {

        var word1 = ["aliens", "allies", "anteaters", "antelope", "badgers", "bats", "bears", "beasts", "birds", "bison", "blacksmiths", "boars", "bobcats", "buffalo", "bugs", "bulldogs", "bullies", "butterflies", "camels", "cats", "cattle", "chickens", "cobras", "cows", "coyotes", "crabs", "crickets", "criminals", "cyclops", "deer", "demons", "dogs", "donkeys", "doves", "dragonflies", "dragons", "ducks", "eagles", "eels", "elephants", "elk", "elves", "falcons", "ferrets", "fish", "foxes", "frankenstein", "frogs", "geckos", "geese", "gerbils", "ghosts", "giants", "goats", "goblins", "goldfish", "gopher", "gorillas", "governments", "grasshoppers", "gremlins", "hamsters", "hawks", "hedgehogs", "horses", "hounddogs", "hunters", "insects", "jackals", "jellyfish", "kangaroos", "kittens", "lemurs", "leopards", "lions", "lizards", "llamas", "lobsters", "locust", "lumberjacks", "martians", "mice", "minions", "monkeys", "monsters", "moose", "moths", "mules", "mustangs", "mutants", "ninjas", "orcs", "otters", "owls", "oxen", "pandas", "parrots", "pelican", "penguins", "phatoms", "pigs", "pirates", "pokemon", "ponies", "puppies", "pythons", "rabbits", "rams", "rascals", "rats", "ravens", "reptiles", "robins", "robots", "scarecrows", "scientists", "seals", "sharks", "sheep", "shrimp", "skeletons", "skunks", "sloths", "snails", "snakes", "spiders", "spies", "squid", "squirrels", "starfish", "stingrays", "swans", "tigers", "toads", "trolls", "turkeys", "turtles", "undead", "unicorns", "vampires", "villians", "vultures", "warriors", "werewolves", "whales", "wildcats", "wolves", "woodpeckers", "worms", "yeti", "zebras", "zombies"],
            glue = ["despise", "detest", "dislike", "dismiss", "distrust", "fear", "hate", "like", "love", "oppose", "prefer"],
            word2 = ["adventure", "advice", "afternoons", "aircraft", "airplanes", "airports", "airsoft", "alarms", "almonds", "apples", "archery", "art", "aspirin", "august", "autmn", "bagels", "balloons", "bamboo", "bananas", "banks", "barns", "baseball", "basketball", "baskets", "batteries", "battleships", "bbq", "beads", "beans", "beards", "beds", "bedtime", "benches", "bicycles", "bikes", "biology", "birthdays", "biscuits", "blankets", "blenders", "blizzards", "blogs", "boats", "books", "boots", "bottles", "bowling", "bowls", "boxes", "brazil", "bread", "breakfast", "bricks", "bridges", "broccoli", "brownies", "bubbles", "buffets", "buildings", "butter", "butterscotch", "buttons", "cabbages", "cabinets", "cabins", "cables", "cafes", "cake", "calendars", "cameras", "camping", "candles", "candy", "cannonballs", "cans", "canyons", "cards", "carpet", "carpets", "carrots", "cars", "caves", "ceilings", "celery", "cereal", "chairs", "checkers", "cheddar", "cheese", "cherries", "chess", "chestnuts", "chicago", "chili", "chips", "chocolate", "chores", "chrome", "circles", "cities", "clocks", "clones", "clothes", "clothing", "clouds", "coaches", "coaching", "coal", "coats", "coconuts", "coffee", "coins", "cola", "cold", "college", "colorado", "colors", "combat", "comics", "computers", "concrete", "confetti", "conflict", "cookies", "cooking", "corn", "couches", "coupons", "creeks", "cuba", "cupcakes", "cups", "curtains", "cushions", "dallas", "dancing", "danger", "dark", "daytime", "december", "democracy", "denver", "desks", "detroit", "diamonds", "diary", "dirt", "dishes", "dodgeball", "donuts", "doom", "doorbells", "doors", "doorways", "dreams", "driveways", "driving", "drones", "drums", "drumsticks", "dust", "earrings", "earthquakes", "eating", "eggs", "egypt", "electricity", "electronics", "elevators", "email", "emergencies", "everything", "fall", "falling", "fallout", "fame", "fans", "farms", "feet", "fences", "fields", "fighting", "films", "finland", "fire", "firewalls", "fireworks", "flags", "floors", "flowers", "flutes", "flying", "foam", "folders", "food", "football", "forests", "forks", "forts", "friday", "frosting", "fruit", "fudge", "games", "gaming", "garages", "gardens", "garlic", "germany", "glass", "glasses", "gloves", "glue", "gold", "golf", "gps", "grain", "grapefruit", "grapes", "gravity", "greed", "green", "guitars", "gum", "hair", "haircuts", "halloween", "halo", "hamburgers", "hammers", "hats", "headaches", "heat", "hiking", "hills", "hiphop", "history", "hobbies", "hockey", "holidays", "honey", "hospitals", "hotsauce", "houses", "houston", "hunting", "ice", "icecream", "indoors", "industry", "iron", "islands", "jackets", "japan", "jars", "jazz", "jeans", "jello", "jokes", "journals", "juggling", "jukeboxes", "july", "jumping", "june", "jungles", "kansas", "karate", "ketchup", "keyboards", "keys", "kickboxing", "kindness", "kitchens", "kites", "knives", "ladders", "lakes", "lamps", "laptops", "lasers", "laughter", "lava", "lawns", "lawschool", "lemons", "letters", "lettuce", "libaries", "libraries", "light", "lightbulbs", "lipstick", "locks", "london", "lotteries", "lumber", "lunch", "machines", "magazines", "mail", "makeup", "mario", "markets", "marshes", "math", "meat", "medicine", "melons", "memphis", "metal", "miami", "milk", "minecraft", "mirrors", "mistakes", "monday", "money", "mountains", "movies", "mud", "museums", "mushrooms", "music", "musicals", "mustard", "myths", "nachos", "napkins", "networks", "newspapers", "night", "nintendo", "noises", "noodles", "notebooks", "november", "numbers", "nutmeg", "oatmeal", "oceans", "october", "offices", "ohio", "oil", "olives", "onions", "opera", "oragnes", "oranges", "orlando", "outdoors", "ovens", "packages", "paint", "paintball", "paintings", "pancakes", "paper", "parking", "parks", "passports", "passwords", "pasta", "pastries", "pavement", "peanuts", "pearls", "pears", "pencils", "pens", "pepper", "phones", "photos", "physics", "pianos", "pickles", "pie", "pillows", "pinball", "pineapples", "pizza", "plants", "plastic", "plates", "playstation", "playtime", "plums", "poker", "politics", "ponds", "popcorn", "portal", "portland", "postcards", "posters", "potatoes", "pretzels", "printers", "promises", "propane", "pudding", "pumpkins", "punkrock", "purple", "purses", "puzzles", "pyramids", "quake", "quicksand", "quilts", "racing", "radios", "railroad", "rain", "ramps", "reading", "reality", "rectangles", "recycling", "red", "revenge", "rice", "rings", "rivers", "roads", "roadtrips", "rocks", "rollercoasters", "rope", "rowboats", "rubber", "rugby", "running", "runways", "russia", "safety", "salad", "salsa", "salt", "sand", "sandals", "Saturday", "schedules", "school", "science", "scissors", "seafood", "seattle", "shampoo", "shelves", "shirts", "shoes", "shopping", "shows", "sidewalks", "silver", "singing", "sinks", "skating", "sleeping", "sneakers", "snow", "soap", "soccer", "socks", "soda", "sofas", "softball", "software", "sonic", "soup", "soybeans", "spaghetti", "spatulas", "speakers", "speaking", "spheres", "spices", "spinach", "sponges", "spoons", "sports", "spring", "sprinkles", "squares", "stairs", "starcraft", "steaks", "steam", "steel", "stereos", "stickers", "stones", "stores", "storms", "stoves", "strangers", "studying", "submarines", "subways", "sugar", "suitcases", "Sunday", "sunflowers", "sunlight", "sunshine", "supermarkets", "surfing", "surprises", "swamps", "sweaters", "swimming", "tables", "tablets", "tacos", "talking", "taxes", "teaching", "tech", "television", "tennis", "tents", "tetris", "texas", "thursday", "tickets", "time", "tires", "toast", "today", "togas", "tomatoes", "toothpaste", "tornados", "towels", "towers", "towns", "toys", "traffic", "trails", "trains", "trash", "trees", "triangles", "trivia", "trophies", "trucks", "trumpets", "tuesday", "tunnels", "uniforms", "unrest", "utah", "vacations", "vacuums", "valve", "vanilla", "vegtables", "villages", "vinegar", "voicemail", "volleyball", "waffles", "wagons", "walking", "wallets", "walls", "war", "warcraft", "waste", "watches", "water", "waterfalls", "wax", "weather", "websites", "wednesday", "wheat", "wheels", "wind", "windows", "winter", "wires", "wood", "work", "working", "wrestling", "xbox", "yearbooks", "yellow", "yesterday", "yoga", "yogurt", "zelda", "zippers"];

        if (strength === 1) {
            return [word2[Math.floor(Math.random() * word2.length)]];
        } else if (strength === 2) {
            return [Math.floor(Math.random()*99).toString(), word1[Math.floor(Math.random() * word1.length)]];
        } else if (strength === 3) {
            return [word1[Math.floor(Math.random() * word1.length)], glue[Math.floor(Math.random() * glue.length)], word2[Math.floor(Math.random() * word2.length)]];
        } else if (strength === 4) {
            var tempPass = _genPass(3);
            tempPass.push(Math.floor(Math.random()*9999));

            return tempPass;
        }
    }

    var len,
        valueArray = 0;

    do {
        valueArray = _genPass(strength);
    } while (valueArray.length >= settingMaxPasswordLength);

    return valueArray;
}


function isWholeNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


function prettyPrintArray(valueArray) {
    var color1 = 'red',
        color2 = 'blue',
        html = '<strong>',
        i = 0;

    if (valueArray instanceof Array) {
        for (i = 0; i < valueArray.length; i++) {
            if (i % 2 === 0) {
                html += '<span style="color: ' + color1 + '">';
            } else {
                html += '<span style="color: ' + color2 + '">';
            }

            html += valueArray[i] + '</span>';
        }
    } else {
        alert('prettyPrintArray() - recieved non array!');
    }

    return '</strong>' + html;
}


function zeroPad(number, width) {
    number = number.toString();
    width = width || 2;

    return number.length >= width ? number : new Array(width - number.length + 1).join('0') + number;
}


function Launch_CSGO_ArmsRace(hostname, map) {
    var serverLaunchString = '';

    do {
        hostname = (hostname)
            ? String(hostname)
            : 'LL Arms Race Server';
        hostname = hostname.split(' ').join('_');

        if (!map) {
            alert('ERROR - NO MAP WAS SPECIFIED!');
            break;
        }

        serverLaunchString += './srcds_run ';
        serverLaunchString += '-game csgo ';
        serverLaunchString += '-console ';
        serverLaunchString += '+game_type 1 ';
        serverLaunchString += '+game_mode 0 ';
        serverLaunchString += '-tickrate 128 ';
        serverLaunchString += '+host_workshop_collection 328590824 ';
        serverLaunchString += '+workshop_start_map ' + map + ' ';
        serverLaunchString += '-authkey F6FF6A83A58FEC94D64A759D7489A40E ';
        serverLaunchString += '-maxplayers_override 16 ';
        serverLaunchString += '+hostname "' + hostname + '"';
        serverLaunchString += '+rcon_password "' + RCON_PASS + '" ';
        

        $('#modalString .modal-title').html(hostname);
        $('#modalString .modal-body #serverPassword').html('N/A');
        $('#modalString .modal-body #serverLaunchString').html(serverLaunchString);
        $('#modalString .modal-body #clientConnectString').html('N/A');
        $('#modalString').modal('show');
        
        addLogMessage('CSGO Arms Race', serverLaunchString);
        
    } while (false);
}


function Launch_CSGO_Classic(hostname, map) {
    var serverLaunchString = '';

    do {
        hostname = (hostname)
            ? String(hostname)
            : 'LL Classic Server';
        hostname = hostname.split(' ').join('_');

        if (!map) {
            alert('ERROR - NO MAP WAS SPECIFIED!');
            break;
        }

        serverLaunchString += './srcds_run ';
        serverLaunchString += '-game csgo ';
        serverLaunchString += '-console ';
        serverLaunchString += '+game_type 0 ';
        serverLaunchString += '+game_mode 0 ';
        serverLaunchString += '+host_workshop_collection 340520718 ';
        serverLaunchString += '+workshop_start_map ' + map + ' ';
        serverLaunchString += '-authkey F6FF6A83A58FEC94D64A759D7489A40E ';
        serverLaunchString += '-tickrate 128 ';
        serverLaunchString += '-maxplayers_override 16 ';
        serverLaunchString += '+hostname "' + hostname + '"';
        serverLaunchString += '+rcon_password "' + RCON_PASS + '" ';

        $('#modalString .modal-title').html(hostname);
        $('#modalString .modal-body #serverPassword').html('N/A');
        $('#modalString .modal-body #serverLaunchString').html(serverLaunchString);
        $('#modalString .modal-body #clientConnectString').html('N/A');
        $('#modalString').modal('show');
        
        addLogMessage('CSGO Classic', serverLaunchString);
    } while (false);
}


function Launch_CSGO_Tournament(bracketID, team1, team2, map, ip) {
    var clientConnectString = '',
        currentDate = new Date(),
        cpuFlag = '',
        dockerContainerName = '',
        hostname = "",
        password = generatePasswordArray(),
        serverLaunchString = '';

    do {
        bracketID = bracketID.toString().trim();
        if (String(bracketID).length < 1) {
            alert('Bracket ID was left empty!');
            break;
        }

        if (!(String(~~Number(bracketID)) === bracketID && ~~Number(bracketID) >= 0)) {
            alert('Bracket ID must be a positive whole number!');
            break;
        }

        team1 = team1.trim();
        if (String(team1).length < 1) {
            alert('Team 1 was left empty!');
            break;
        }

        team2 = team2.trim();
        if (String(team2).length < 1) {
            alert('Team 2 was left empty!');
            break;
        }

        if (!map) {
            alert('ERROR - NO MAP WAS SPECIFIED!');
            break;
        }

        ip = ip.trim();
        if (!ip) {
            alert('ERROR - NO IP ADDRESS WAS SPECIFIED!');
            break;
        }

        // Generate hostname
        if (team1 !== undefined || team2 !== undefined) {
            team1 = String(team1 || 'Unknown');
            team2 = String(team2 || 'Unknown');
            hostname = 'CSGO Match ' + bracketID + ' ' + team1 + ' v ' + team2;
        }

        hostname = hostname.split(' ').join('_');

        // Generate Docker Container Name
        dockerContainerName = 'CSGOTourney_' + bracketID + '_';

        dockerContainerName += ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][currentDate.getDay()];
        dockerContainerName += zeroPad(currentDate.getHours(), 2) + 'h';
        dockerContainerName += zeroPad(currentDate.getMinutes(), 2) + 'm';
        dockerContainerName += zeroPad(currentDate.getSeconds(), 2) + 's';

        // Determine Docker CPU Flag
        switch (ip) {
        case '172.30.5.11':
        case '172.30.5.21':
        case '172.30.5.31':
            cpuFlag = '--cpuset-cpus="4"';
            break;
        case '172.30.5.12':
        case '172.30.5.22':
        case '172.30.5.32':
            cpuFlag = '--cpuset-cpus="3"';
            break;
        case '172.30.5.13':
        case '172.30.5.23':
        case '172.30.5.33':
            cpuFlag = '--cpuset-cpus="5"';
            break;
        case '172.30.5.14':
        case '172.30.5.24':
        case '172.30.5.34':
            cpuFlag = '--cpuset-cpus="2"';
            break;
        case '172.30.5.15':
        case '172.30.5.25':
        case '172.30.5.35':
            cpuFlag = '--cpuset-cpus="6"';
            break;
        case '172.30.5.16':
        case '172.30.5.26':
        case '172.30.5.36':
            cpuFlag = '--cpuset-cpus="1"';
            break;
        case '172.30.5.17':
        case '172.30.5.27':
        case '172.30.5.37':
            cpuFlag = '--cpuset-cpus="7"';
            break;
        case '172.30.5.18':
        case '172.30.5.28':
        case '172.30.5.38':
            cpuFlag = '--cpuset-cpus="0"';
            break;
        default:
            cpuFlag = "";
            break;
        }

        // Docker Specific
        serverLaunchString = 'docker run -d ';
        serverLaunchString += cpuFlag + ' ';
        serverLaunchString += '--name ' + dockerContainerName + ' ';
        serverLaunchString += '-p ' + ip + ':1200:1200/udp ';
        serverLaunchString += '-p ' + ip + ':4379-4380:4379-4380/udp ';
        serverLaunchString += '-p ' + ip + ':26900-26915:26900-26915/udp ';
        serverLaunchString += '-p ' + ip + ':27015-27020:27015-27020/udp ';
        serverLaunchString += '-p ' + ip + ':27015-27020:27015-27020/tcp ';
        serverLaunchString += 'll/gamesvr-csgo-tourney ';

        // CS:GO Tournament Server Specific
        serverLaunchString += './srcds_run ';
        serverLaunchString += '-game csgo ';
        serverLaunchString += '+game_type 0 ';
        serverLaunchString += '+game_mode 1 ';
        serverLaunchString += '-console ';
        serverLaunchString += '-usercon ';
        serverLaunchString += '+mapgroup mg_active ';
        serverLaunchString += '+map ' + map + ' ';
        serverLaunchString += '+hostname "' + hostname + '" ';
        serverLaunchString += '+sv_password "' + password.join('') + '" ';
        serverLaunchString += '-tickrate 128 ';
        serverLaunchString += '+sv_lan 1 ';
        serverLaunchString += '+ip 0.0.0.0 ';
        serverLaunchString += '-port 27015 ';
        serverLaunchString += '+mp_teamname_1 "' + team1 + '" ';
        serverLaunchString += '+mp_teamname_2 "' + team2 + '" ';
        serverLaunchString += '+rcon_password "' + RCON_PASS + '" ';
        serverLaunchString += '+tv_name "LL_TV_CSGO_BRACKET_' + bracketID + '" ';
        serverLaunchString += '+tv_relaypassword "brianprefersmustard567" ';

        clientConnectString = 'connect ';
        clientConnectString += ip + ':27015; ';
        clientConnectString += 'password ' + prettyPrintArray(password);

        $('#modalString .modal-title').html(hostname);
        $('#modalString .modal-body #serverPassword').html(prettyPrintArray(password));
        $('#modalString .modal-body #serverLaunchString').html(serverLaunchString);
        $('#modalString .modal-body #clientConnectString').html(clientConnectString);
        $('#modalString').modal('show');
        
        addLogMessage('CSGO Tourney', serverLaunchString);
    } while (false);
}


function Launch_HL2DM_Freeplay(hostname, map) {
    var serverLaunchString = '';

    do {
        hostname = (hostname)
            ? String(hostname)
            : 'LL Half-Life 2: Deathmatch';
        hostname = hostname.split(' ').join('_');

        if (!map) {
            alert('ERROR - NO MAP WAS SPECIFIED!');
            break;
        }

        serverLaunchString += './srcds_run ';
        serverLaunchString += '-game hl2mp ';
        serverLaunchString += '+sv_pure 1 ';
        serverLaunchString += '+maxplayers 24 ';
        serverLaunchString += '+map ' + map + ' ';
        serverLaunchString += '+hostname "' + hostname + '" ';
        serverLaunchString += '+rcon_password "' + RCON_PASS + '" ';

        $('#modalString .modal-title').html(hostname);
        $('#modalString .modal-body #serverPassword').html('N/A');
        $('#modalString .modal-body #serverLaunchString').html(serverLaunchString);
        $('#modalString').modal('show');
        
        addLogMessage('HL2DM Freeplay', serverLaunchString);
    } while (false);
}

function Launch_TF2_BlindFrag(hostname, map) {
    var password = generatePasswordArray(),
        serverLaunchString = '';

    do {
        hostname = (hostname)
            ? String(hostname)
            : 'LL TF2 Blind Frag';
        hostname = hostname.split(' ').join('_');

        if (!map) {
            alert('ERROR - NO MAP WAS SPECIFIED!');
            break;
        }

        serverLaunchString += './srcds_run ';
        serverLaunchString += '-game tf ';
        serverLaunchString += '+maxplayers 24 ';
        serverLaunchString += '-console ';
        serverLaunchString += '-usercon ';
        serverLaunchString += '+hostname "' + hostname + '" ';
        serverLaunchString += '+sv_password "' + password.join('') + '" ';
        serverLaunchString += '+map ' + map + ' ';
        serverLaunchString += '+maplist mapcycle_quickplay_koth ';
        serverLaunchString += '-insecure ';
        serverLaunchString += '+ip 0.0.0.0 ';
        serverLaunchString += '-port 27015 ';
        serverLaunchString += '+rcon_password "' + RCON_PASS + '" ';

        $('#modalString .modal-title').html(hostname);
        $('#modalString .modal-body #serverPassword').html(prettyPrintArray(password));
        $('#modalString .modal-body #serverLaunchString').html(serverLaunchString);
        $('#modalString .modal-body #clientConnectString').html('N/A');
        $('#modalString').modal('show');
        
        addLogMessage('TF2 BlindFrag', serverLaunchString);
        
    } while (false);
}


function Launch_TF2_Freeplay(hostname, mapcycle) {
    var map = '',
        serverLaunchString = '';

    do {
        hostname = (hostname)
            ? String(hostname)
            : 'LL Team Fortress 2';
        hostname = hostname.split(' ').join('_');

        if (!mapcycle) {
            alert('ERROR - NO MAPCYCLE WAS SPECIFIED!');
            break;
        }

        switch (String(mapcycle).toLowerCase().trim()) {
        case 'mapcycle_beta_asteroid.txt':
            map = 'rd_asteroid';
            break;
        case 'mapcycle_beta_cactus_canyon.txt':
            map = 'pl_cactuscanyon';
            break;
        case 'mapcycle_beta_mannpower.txt':
            map = 'ctf_gorge';
            break;
        case 'mapcycle_default.txt':
            map = 'pl_badwater';
            break;
        case 'mapcycle_doomsday_event_247.txt':
            map = 'sd_doomsday_event';
            break;
        case 'mapcycle_halloween.txt':
            map = 'koth_lakeside_event';
            break;
        case 'mapcycle_hightower_event_247.txt':
            map = 'plr_hightower_event';
            break;
        case 'mapcycle_lakeside_event_247.txt':
            map = 'koth_lakeside_event';
            break;
        case 'mapcycle_quickplay_arena.txt':
            map = 'arena_sawmill';
            break;
        case 'mapcycle_quickplay_attackdefense.txt':
            map = 'cp_junction_final';
            break;
        case 'mapcycle_quickplay_cp.txt':
            map = 'cp_coldfront';
            break;
        case 'mapcycle_quickplay_ctf_sd.txt':
            map = 'sd_doomsday';
            break;
        case 'mapcycle_quickplay_koth.txt':
            map = 'koth_viaduct';
            break;
        case 'mapcycle_quickplay_payload.txt':
            map = 'pl_thundermountain';
            break;
        case 'mapcycle_quickplay_payloadrace.txt':
            map = 'plr_pipeline';
            break;
        default:
            map = 'ctf_2fort';
        }

        serverLaunchString += './srcds_run -game tf ';
        serverLaunchString += '+sv_pure 0 ';
        serverLaunchString += '+maxplayers 24 ';
        serverLaunchString += '-console ';
        serverLaunchString += '-usercon ';
        serverLaunchString += '-replay ';
        serverLaunchString += '+map ' + map + ' ';
        serverLaunchString += '+mapcyclefile ' + mapcycle + ' ';
        serverLaunchString += '+hostname "' + hostname + '" ';
        serverLaunchString += '+rcon_password "' + RCON_PASS + '" ';

        $('#modalString .modal-title').html(hostname);
        $('#modalString .modal-body #serverPassword').html('N/A');
        $('#modalString .modal-body #serverLaunchString').html(serverLaunchString);
        $('#modalString .modal-body #clientConnectString').html('N/A');
        $('#modalString').modal('show');
        
        addLogMessage('TF2 Freeplay', serverLaunchString);
    } while (false);
}

function UI_GeneratePassword() {
    $('#tab-tools #generatePassword').html(prettyPrintArray(generatePasswordArray()));
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Prompt user for a rcon password
$(document).ready(function() {
    try {
        var tmp1, tmp2;

        do {
            do {
                tmp1 = prompt("Enter RCon password to be used in launch strings:").toLowerCase().trim();
            } while (tmp1.length < 1);

            do {
                tmp2 = prompt("Confirm RCon password:").toLowerCase().trim();
            } while (tmp2.length < 1);

            if (tmp1 !== tmp2) {
                alert("Passwords must match!");
                tmp1 = '';
                tmp2 = '';
            }
        } while (tmp1.length < 1);

        RCON_PASS = tmp1;
        addLogMessage('RCon Password', 'The user has provided a RCon password that will be used whenever generating a server launch string.', 'fa fa-key');
    } catch (err) {
        
        var tempPass = generatePasswordArray(4);

        RCON_PASS = tempPass.join('');
        
        addLogMessage('RCon Password', 'Generated password is: ' + prettyPrintArray(tempPass), 'fa fa-key');
    }
});