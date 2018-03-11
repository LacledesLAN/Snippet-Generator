var RCON_PASS = password.generateArray(3),
    TV_PASS = password.fromArray(['brian', 'prefers', 'mustard', '567']),
    UI = UI || {};

UI.addLogMessage = function(what, details, icon) {
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

    let table = document.getElementById("snippetGeneratorLogTable");
    let row = table.insertRow(1);

    let rowWhen = row.insertCell();
    rowWhen.innerHTML = timestamp;

    let rowIcon = row.insertCell();
    let iconHtml = document.createElement("i");
    iconHtml.className += icon;
    rowIcon.appendChild(iconHtml);

    let rowWhat = row.insertCell();
    rowWhat.innerHTML = what;

    let rowDetails = row.insertCell();
    rowDetails.innerHTML = details.trim();
};


UI.displayModal = function (title, tuples) {
    "use strict";

    title = title.toString().trim();
    tuples = tuples === undefined ? {} : tuples;

    let modalContents = '';

    Object.keys(tuples).forEach(function (key) {
        if (modalContents === '') {
            UI.addLogMessage(title, tuples[key]);
        }

        modalContents += '<div class="card">';
        modalContents += '<div class="card-body">';
        modalContents += '<h5 class="card-title">' + key + '</h5>';
        modalContents += tuples[key];
        modalContents += '</div>';
        modalContents += '</div>';
        modalContents += '';
    });

    document.getElementById('displayModalTitle').innerHTML = title;
    document.getElementById('displayModalBody').innerHTML = modalContents;
    $('#displayModal').modal('show');
};


UI.getRandomTeamName = function () {
    let teams = ['Bad News Bears', 'Bedrock Boulders', 'Capital Congressmen', 'The Electabuzz', 'Hackensack Bulls', 'Hadley Saints', 'The Magikarp', 'Miami Gators', 'O-Town Zeros',
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

    return _.sample(teams);
};


UI.formatCommands = function (command, args, nestedCommand) {
    function nest(command, args, nestedCommand) {
        let rString = '<span>';
        rString += '<command>' + command + '</command>';
        rString += '<arguments>' + args + '</arguments>';

        if (nestedCommand === undefined || nestedCommand === null) {
            nestedCommand = [];
        }

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
};

/**
 * Add the contents of a collection to a HTML select control
 * @param {Object} selectControl Select control to populate
 * @param {Iterable} collection Collection of elements to add to control
 * @param {string|boolean} selectedValue String of default selection; true if select random
 * @return {void}
 */
UI.populateSelectFromCollection = function (selectControl, collection, selectedValue = false) {
    Array.prototype.forEach.call(document.querySelectorAll(selectControl), function (selectControl) {
        let option, selected;

        if (typeof selectedValue === 'string' || selectedValue instanceof String) {
            selected = selectedValue.trim();
        } else if (selectedValue === true) {
            selected = _.sample(collection);
        }

        collection.forEach(function (entity) {
            option = document.createElement("option");
            if (selectedValue !== false && entity === selected) {
                option.selected = "selected";
            }
            option.text = entity;
            selectControl.add(option);
        });
    });
};


document.addEventListener('DOMContentLoaded', function () {
    try {
        let tmp1, tmp2;

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
            }
        } while (tmp1.length < 1);

        RCON_PASS = password.fromArray([tmp1]);
        UI.addLogMessage('RCon Password', 'The user has provided a RCon password that will be used whenever generating a server launch string.', 'fa fa-key');
    } catch (err) {
        UI.addLogMessage('RCon Password', 'Generated password is: ' + RCON_PASS.html(), 'fa fa-key');
    }

    UI.addLogMessage('TV Password', 'Password is: ' + TV_PASS.html(), 'fa fa-television');
});
