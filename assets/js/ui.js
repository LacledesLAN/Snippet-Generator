var RCON_PASS = generatePasswordArray(4);

function addLogMessage(what, details, icon) {
    "use strict";

    what = what.toString().trim();
    details = details.toString().trim();
    icon = (icon || "fa fa-desktop").trim();

    let curDate = new Date(),
        timestamp = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"][curDate.getDay()] + " "
            + ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][curDate.getMonth()] + " "
            + _.padStart(curDate.getDay(), 2, "0") + ", "
            + _.padStart(curDate.getHours(), 2, "0")
            + ":" + _.padStart(curDate.getMinutes(), 2, "0")
            + ":" + _.padStart(curDate.getSeconds(), 2, "0");

    $("#snippetGeneratorLogTable").append("<tr><td>" + timestamp + '</td><td><i class="' + icon + '"></i></td><td>' + what + '</td><td>' + details + '</td></tr>');
}

function getRandomTeamName() {
    let teams = [   'Bad News Bears', 'Bedrock Boulders', 'Capital Congressmen', 'The Electabuzz', 'Hackensack Bulls', 'Hadley Saints', 'The Magikarp', 'Miami Gators', 'O-Town Zeros',
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

    let returnStr = '<div class="nestedCommands">';
    returnStr += nest(command, args, nestedCommand);
    returnStr += '</div>';

    return returnStr;
}