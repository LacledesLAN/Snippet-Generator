var SRCDS = SRCDS || {};
SRCDS.CSGO = SRCDS.CSGO || {};

SRCDS.CSGO.MapsArmsRace = ["ar_baggage", "ar_monastery", "ar_shoots", "de_lake", "de_stmarc"];

SRCDS.CSGO.MapsClassic = ["cs_agency", "cs_assault", "cs_backalley", "cs_cruise", "cs_downtown", "cs_insertion", "cs_italy", "cs_militia", "cs_motel",
        "cs_office", "cs_rush", "cs_thunder", "cs_workout", "de_ali", "de_austria", "de_aztec", "de_bank", "de_bazaar", "de_blackgold",
        "de_cache", "de_canals", "de_castle", "de_cbble", "de_coast", "de_dust", "de_dust2", "de_empire", "de_facade", "de_favela",
        "de_inferno", "de_lake", "de_lite", "de_log", "de_marquis", "de_mikla", "de_mirage", "de_mist", "de_nuke", "de_nuke_se",
        "de_overgrown", "de_overpass", "de_rails", "de_resort", "de_royal", "de_safehouse", "de_santorini", "de_seaside", "de_season",
        "de_shortdust", "de_shorttrain", "de_stmarc", "de_sugarcane", "de_thrill", "de_train", "de_tulip", "de_vertigo", "de_zoo"];

SRCDS.CSGO.MapsDeathmatch = ["ar_baggage", "ar_monastery", "ar_shoots", "cs_agency", "cs_assault", "cs_backalley", "cs_cruise", "cs_downtown", "cs_insertion",
        "cs_italy", "cs_militia", "cs_motel", "cs_office", "cs_rush", "cs_thunder", "cs_workout", "de_austria", "de_aztec", "de_bank",
        "de_canals", "de_cbble", "de_dust", "de_dust2", "de_inferno", "de_lake", "de_lite", "de_mirage", "de_nuke", "de_nuke_se",
        "de_overpass", "de_safehouse", "de_shortdust", "de_shorttrain", "de_stmarc", "de_thrill", "de_sugarcane", "de_vertigo"];

SRCDS.CSGO.MapsTest = ["de_orange", "fy_pool_day", "gg_ctm_csgo", "orangebox_warmup_day"];

SRCDS.CSGO.MapsTourney = ["de_cache", "de_cbble", "de_inferno", "de_nuke", "de_mirage", "de_overpass", "de_train"];

SRCDS.CSGO.LaunchArmsRace = function (hostname, map, ip) {
    "use strict";

    let dockerArgs = '',
        srcdsArgs = '';

    hostname = (hostname) ? String(hostname) : 'LL Arms Race Server';
    hostname = hostname.split(' ').join('_');

    if (!map) {
        alert('ERROR - NO MAP WAS SPECIFIED!');
        return;
    }

    if (!ip) {
        alert('ERROR - NO SERVER WAS SPECIFIED!');
        return;
    }

    // Docker Command
    dockerArgs += '--name ' + Docker.GenerateContainerName("CSGOArms") + ' ';
    dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
    dockerArgs += 'lacledeslan/gamesvr-csgo-freeplay ';

    // CSGO Arms Race Server Specific
    srcdsArgs = '-game csgo ';
    srcdsArgs += '-console ';
    srcdsArgs += '+game_type 1 ';
    srcdsArgs += '+game_mode 0 ';
    srcdsArgs += '-usercon ';
    srcdsArgs += '-tickrate 128 ';
    srcdsArgs += '+mapgroup ll_arms ';
    srcdsArgs += '+map ' + map + ' ';
    srcdsArgs += '-maxplayers_override 16 ';
    srcdsArgs += '+hostname "' + hostname + '" ';
    srcdsArgs += '+sv_lan 1 ';
    srcdsArgs += '+rcon_password "' + RCON_PASS.join('') + '" ';

    UI.displayModal(
        "CSGO Arms Race",
        {
            "Launch String": UI.formatCommands('docker run -d ', dockerArgs, ['./srcds_run ', srcdsArgs]),
            "Client Connect": 'connect ' + ip + ':27015'
        }
    );
};


SRCDS.CSGO.LaunchClassic = function (hostname, map, ip) {
    "use strict";

    let dockerArgs = '',
        srcdsArgs = '';

    hostname = (hostname) ? String(hostname) : 'LL Classic Server';
    hostname = hostname.split(' ').join('_');

    if (!map) {
        alert('ERROR - NO MAP WAS SPECIFIED!');
        return;
    }

    if (!ip) {
        alert('ERROR - NO SERVER WAS SPECIFIED!');
        return;
    }

    // Docker Args
    dockerArgs += '--name ' + Docker.GenerateContainerName("CSGOClassic") + ' ';
    dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
    dockerArgs += 'lacledeslan/gamesvr-csgo-freeplay ';

    // CSGO Classic Server Specific
    srcdsArgs += '-game csgo ';
    srcdsArgs += '-console ';
    srcdsArgs += '+game_type 0 ';
    srcdsArgs += '+game_mode 0 ';
    srcdsArgs += '-usercon ';
    srcdsArgs += '-tickrate 128 ';
    srcdsArgs += '+mapgroup ll_bombhostage ';
    srcdsArgs += '+map ' + map + ' ';
    srcdsArgs += '-maxplayers_override 16 ';
    srcdsArgs += '+hostname "' + hostname + '" ';
    srcdsArgs += '+sv_lan 1 ';
    srcdsArgs += '+rcon_password "' + RCON_PASS.join('') + '" ';

    UI.displayModal(
        "CSGO Classic",
        {
            "Launch String": UI.formatCommands('docker run -d ', dockerArgs, ['./srcds_run ', srcdsArgs]),
            "Client Connect": 'connect ' + ip + ':27015'
        }
    );
};


SRCDS.CSGO.LaunchDeathmatch = function (hostname, map, ip) {
    "use strict";

    let dockerArgs = '',
        srcdsArgs = '';

    hostname = (hostname) ? String(hostname) : 'LL Team Deathmatch Server';
    hostname = hostname.split(' ').join('_');

    if (!map) {
        alert('ERROR - NO MAP WAS SPECIFIED!');
        return;
    }

    if (!ip) {
        alert('ERROR - NO SERVER WAS SPECIFIED!');
        return;
    }

    // Docker Args
    dockerArgs += '--name ' + Docker.GenerateContainerName("CSGODeathmatch") + ' ';
    dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
    dockerArgs += 'lacledeslan/gamesvr-csgo-freeplay ';

    // CSGO Classic Server Specific
    srcdsArgs += '-port 27015 ';
    srcdsArgs += '-game csgo ';
    srcdsArgs += '-console ';
    srcdsArgs += '+game_type 1 ';
    srcdsArgs += '+game_mode 2 ';
    srcdsArgs += '-usercon ';
    srcdsArgs += '-tickrate 128 ';
    srcdsArgs += '+mapgroup mg_deathmatch ';
    srcdsArgs += '+map ' + map + ' ';
    srcdsArgs += '-maxplayers_override 16 ';
    srcdsArgs += '+hostname "' + hostname + '" ';
    srcdsArgs += '+sv_lan 1 ';
    srcdsArgs += '+rcon_password "' + RCON_PASS.join('') + '" ';

    UI.displayModal(
        "CSGO Deathmatch",
        {
            "Launch String": UI.formatCommands('docker run -d ', dockerArgs, ['./srcds_run ', srcdsArgs]),
            "Client Connect": 'connect ' + ip + ':27015'
        }
    );
};


SRCDS.CSGO.LaunchClientTest = function (map, ip) {
    "use strict";

    let dockerArgs = '',
        hostname = "CSGO Client Test Server",
        srcdsArgs = '',
        team1 = "Isotopes",
        team2 = "Gotham Rogues";

    if (!map) {
        alert('ERROR - NO MAP WAS SPECIFIED!');
        return;
    }

    if (!ip) {
        alert('ERROR - NO SERVER WAS SELECTED');
        return;
    }

    ip = ip.toString().trim();

    hostname = hostname.split(' ').join('_');

    // Docker Command
    dockerArgs += '--name ' + Docker.GenerateContainerName("CSGOTest") + ' ';
    dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
    dockerArgs += 'lacledeslan/gamesvr-csgo-test ';

    // SRCDS Command
    srcdsArgs = '-port 27015 ';
    srcdsArgs += '-game csgo ';
    srcdsArgs += '+game_type 0 ';
    srcdsArgs += '+game_mode 1 ';
    srcdsArgs += '-tickrate 128 ';
    srcdsArgs += '-console ';
    srcdsArgs += '-usercon ';
    srcdsArgs += '+mapgroup ll_orange ';
    srcdsArgs += '+map ' + map + ' ';
    srcdsArgs += '+hostname "' + hostname + '" ';
    srcdsArgs += '+sv_lan 1 ';
    srcdsArgs += '+mp_teamname_1 "' + team1 + '" ';
    srcdsArgs += '+mp_teamname_2 "' + team2 + '" ';
    srcdsArgs += '+rcon_password "' + RCON_PASS.join('') + '" ';
    srcdsArgs += '-maxplayers_override 16 ';

    UI.displayModal(
        "CSGO Client Test",
        {
            "Launch String": UI.formatCommands('docker run -d ', dockerArgs, ['./srcds_run ', srcdsArgs]),
            "Client Connect": 'connect ' + ip + ':27015'
        }
    );
};

SRCDS.CSGO.LaunchWarMod = function (bracketID, bracketLetter, team1, team2, map, ip) {
    "use strict";

    if (stringIsNullOrEmpty(bracketID)) {
        alert('Bracket ID was left empty!');
        return;
    }
    bracketID = _.padStart(bracketID, 2, '0');

    if (stringIsNullOrEmpty(bracketLetter)) {
        alert('Bracket Letter was left empty!');
        return;
    }
    bracketLetter = bracketLetter.toString().trim();

    if (!isWholeNumber(bracketID)) {
        alert('Bracket ID must be a positive whole number!');
        return;
    }

    let dockerArgs = '',
    dockerContainerName = Docker.GenerateContainerName("CSGOTourn" + bracketID + bracketLetter),
        hostname = "",
        pass = password.generateArray(),
        srcdsArgs = '',
        tvConnectString = '';

    bracketID = _.padStart(bracketID.toString().trim(), 2, "0");

    team1 = team1.trim();
    if (String(team1).length < 1) {
        alert('Team 1 was left empty!');
        return;
    }

    team2 = team2.trim();
    if (String(team2).length < 1) {
        alert('Team 2 was left empty!');
        return;
    }

    if (!map) {
        alert('ERROR - NO MAP WAS SPECIFIED!');
        return;
    }

    if (!ip) {
        alert('ERROR - NO SERVER WAS SPECIFIED!');
        return;
    }
    ip = ip.trim();

    // Generate hostname
    if (team1 !== undefined || team2 !== undefined) {
        team1 = String(team1 || 'Unknown');
        team2 = String(team2 || 'Unknown');
        hostname = 'CSGO Match ' + bracketID + bracketLetter + ' ' + team1 + ' v ' + team2;
    }

    hostname = hostname.split(' ').join('_');

    // Docker Args
    dockerArgs += '--name ' + dockerContainerName + ' ';
    dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
    dockerArgs += 'lacledeslan/gamesvr-csgo-tourney ';

    // CS:GO Tournament Server Specific
    srcdsArgs = '-game csgo ';
    srcdsArgs += '+game_type 0 ';
    srcdsArgs += '+game_mode 1 ';
    srcdsArgs += '-tickrate 128 ';
    srcdsArgs += '-console ';
    srcdsArgs += '-usercon ';
    srcdsArgs += '+map ' + map + ' ';
    srcdsArgs += '+hostname "' + hostname + '" ';
    srcdsArgs += '+sv_password "' + pass.join('') + '" ';
    srcdsArgs += '+sv_lan 1 ';
    srcdsArgs += '+mp_teamname_1 "' + team1 + '" ';
    srcdsArgs += '+mp_teamname_2 "' + team2 + '" ';
    srcdsArgs += '+rcon_password "' + RCON_PASS.join('') + '" ';
    srcdsArgs += '+tv_name "zLLTV_CSGO_BRACKET_' + bracketID + '" ';
    srcdsArgs += '+tv_password "' + TV_PASS.join('') + '" ';
    srcdsArgs += '+tv_relaypassword "' + TV_PASS.join('') + '" ';

    tvConnectString = 'connect ' + ip + ':27020; password ' + TV_PASS.html();

    UI.displayModal(
        "CSGO Tourney",
        {
            "Launch String": UI.formatCommands('docker run -d ', dockerArgs, ['./srcds_run ', srcdsArgs]),
            "Client Connect": 'connect ' + ip + ':27015; ' + 'password ' + pass.html(),
            "TV Connect": tvConnectString
        }
    );
};


SRCDS.CSGO.TourneyRoundRestore = function (roundNumber) {
    "use strict";

    let filename = 'LL_round' + _.padStart(roundNumber - 1, 2, '0'),
        restoreCommand = '';

    restoreCommand += 'mp_backup_restore_load_file ' + filename + '; ';
    restoreCommand += 'mp_backup_restore_load_file ' + filename + '; ';
    restoreCommand += 'wm_block_warm_up_grenades 0;';

    UI.displayModal(
        "CSGO Tourney Restore Round #" + roundNumber,
        {
            "Round Restore": restoreCommand,
            "Unpause After Round Restore (all players ready)": "mp_unpause_match"
        }
    );
};


/// Add Maps to all appropriate HTML SELECT controls
document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    UI.populateSelectFromCollection(".selectCSGOArmsRaceMaps", SRCDS.CSGO.MapsArmsRace);
    UI.populateSelectFromCollection(".selectCSGOClassicMaps", SRCDS.CSGO.MapsClassic);
    UI.populateSelectFromCollection(".selectCSGODeathmatchMaps", SRCDS.CSGO.MapsDeathmatch);
    UI.populateSelectFromCollection(".selectCSGOTestMaps", SRCDS.CSGO.MapsTest, true);
    UI.populateSelectFromCollection(".selectCSGOTourneyMaps", SRCDS.CSGO.MapsTourney);

    Array.prototype.forEach.call(document.querySelectorAll(".selectCSGORoundRestore"), function (selectControl) {
        let option;

        for (let i = 0; i < 30; i++) {
            option = document.createElement("option");
            option.text = _.padStart(i + 1, 2, '0');
            option.value = i + 1;
            selectControl.add(option);
        }
    });
});
