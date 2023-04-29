var SRCDS = SRCDS || {};
SRCDS.CSGO = SRCDS.CSGO || {};

SRCDS.CSGO.MapsArmsRace = ["de_lake", "de_stmarc", "de_safehouse", "ar_shoots", "ar_baggage", "ar_monastery"];

SRCDS.CSGO.MapsClassic = ["de_aztec", "de_blackgold", "de_castle", "de_cbble", "de_dust", "de_dust2", "de_inferno", "de_mist", "de_nuke",
"de_overgrown", "de_overpass", "de_train", "de_vertigo", "cs_agency", "cs_downtown", "cs_museum", "cs_siege",
"de_prodigy", "de_ruins", "de_season", "de_tulip", "de_vegas_csgo_v7"];

SRCDS.CSGO.MapsDeathmatch = [ "de_dust2", "de_inferno", "de_mirage", "de_cbble", "de_overpass", "de_dust", "de_aztec", "de_nuke", "cs_militia",
"cs_assault", "cs_office", "cs_italy", "de_lake", "de_stmarc", "de_surgarcane", "de_bank", "de_safehouse", "de_shortdust", "ar_shoots",
"ar_baggage", "ar_monastery"];

SRCDS.CSGO.MapsTest = ["clienttest-pillar", "poolday"];

SRCDS.CSGO.MapsGet5 = ["de_dust2", "de_inferno", "de_nuke", "de_mirage", "de_overpass", "de_train", "de_vertigo"];


"de_inferno", "de_nuke", "de_vertigo", "de_mirage", "de_overpass", "de_ancient", "de_anubis"








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
    srcdsArgs += '+mapgroup mg_armsrace ';
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
    srcdsArgs += '+mapgroup ll_bomb ';
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

SRCDS.CSGO.LaunchCSGOGet5 = function (bracketID, team1, team2, ip, minPlayersToReady, numberOfMaps, playersPerTeam, maplist) {
    "use strict";

    if (stringIsNullOrEmpty(bracketID)) {
        alert('Bracket ID was left empty!');
        return;
    }
    bracketID = _.padStart(bracketID, 2, '0');

    let dockerContainerName = Docker.GenerateContainerName("CSGOTourn" + bracketID),
        pass = password.generateArray(),
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

    if (!ip) {
        alert('ERROR - NO SERVER WAS SPECIFIED!');
        return;
    }
    ip = ip.trim();

    // Docker Command
    var dockerCmd = 'docker ' +
        'run' +
        ' -d' +
        ' --name ' + dockerContainerName +
        ' ' +  Docker.NetString_SRCDS(ip) +
        ' ' + 'lacledeslan/gamesvr-csgo-tourney:get5 ' +
        ' /bin/bash -c';

    // Get5-CLI Command
    var get5CliCmd = './get5-cli' +
        ' -1 ' + team1 +
        ' -2 ' + team2 +
        ' -v hostname:' + [bracketID, team1, "v", team2].join("_");

    if (minPlayersToReady) {
        get5CliCmd = get5CliCmd.concat(' --min-ready ' + minPlayersToReady )
    }

    if (numberOfMaps) {
        get5CliCmd = get5CliCmd.concat(' --map-count ' + numberOfMaps )
    }

    if (playersPerTeam) {
        get5CliCmd = get5CliCmd.concat(' --team-size ' + playersPerTeam )
    }

    if (!maplist) {
        alert("ERROR - NO MAPS PROVIDED");
        return;
    } else if (maplist) {
        var maps = maplist.trim().split(",");

        if (maps.length == 0) {
            alert("ERROR - NO MAPS PROVIDED");
            return;
        }

        if (numberOfMaps && maps.length < numberOfMaps) {
            alert("ERROR - THE MAPLIST MUST CONTAIN AT LEAST " + numberOfMaps + " MAPS");
            return;
        }

        maps.forEach(map => get5CliCmd = get5CliCmd.concat(" -m " + map));
    }

    // SRCDS Command
    var srcdsCmd = './srcds_run' +
        ' -game csgo' +
        ' +game_type 0' +
        ' +game_mode 1' +
        ' -tickrate 128' +
        ' -console' +
        ' +map de_orange' +
        ' +sv_password "' + pass.join('') +'"' +
        ' +sv_lan 1' +
        ' +rcon_password "' +  RCON_PASS.join('') + '"' +
        ' +tv_name zLLTV_CSGO_BRACKET_"' + bracketID + '"' +
        ' +tv_password "' + TV_PASS.join('') + '"' +
        ' +tv_relaypassword "' + TV_PASS.join('') + '"' +
        ' -usercon'

    UI.displayModal(
        "CSGO Get5",
        {
            "Launch String": dockerCmd.concat(" '", get5CliCmd, " && ", srcdsCmd, "'"),
            "Client Connect": 'connect ' + ip + ':27015; ' + 'password ' + pass.html(),
            "TV Connect": 'connect ' + ip + ':27020; password ' + TV_PASS.html()
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
    dockerArgs += 'lacledeslan/gamesvr-csgo-warmod ';

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
        "CSGO WarMod",
        {
            "Launch String": UI.formatCommands('docker run -d ', dockerArgs, ['./srcds_run ', srcdsArgs]),
            "Client Connect": 'connect ' + ip + ':27015; ' + 'password ' + pass.html(),
            "TV Connect": tvConnectString
        }
    );
};


SRCDS.CSGO.Get5RoundRestore = function (roundNumber) {
    "use strict";

    let filename = 'LL_round' + _.padStart(roundNumber - 1, 2, '0'),
        restoreCommand = '';

    restoreCommand += 'mp_backup_restore_load_file ' + filename + '; ';
    restoreCommand += 'mp_backup_restore_load_file ' + filename + '; ';
    restoreCommand += 'wm_block_warm_up_grenades 0;';

    UI.displayModal(
        "CSGO Get5 Restore Round #" + roundNumber,
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
    UI.populateSelectFromCollection(".selectCSGOGet5Maps", SRCDS.CSGO.MapsGet5);

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
