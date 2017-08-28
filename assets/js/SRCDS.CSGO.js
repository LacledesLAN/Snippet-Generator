
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

SRCDS.CSGO.MapsTest = shuffleArray(["de_orange", "fy_pool_day", "gg_ctm_csgo", "orangebox_warmup_day"]);

SRCDS.CSGO.MapsTourney = ["de_cache", "de_cbble", "de_inferno", "de_nuke", "de_mirage", "de_overpass", "de_train"];

SRCDS.CSGO.LaunchArmsRace = function(hostname, map, ip) {
    let clientConnectString = 'N/A',
        cpuFlag = '',
        currentDate = new Date(),
        dockerCommand = '',
        dockerContainerName = '',
        dockerArgs = '',
        serverLaunchString = '',
        srcdsCommand = '',
        srcdsArgs = '';

    do {
        hostname = (hostname)
            ? String(hostname)
            : 'LL Arms Race Server';
        hostname = hostname.split(' ').join('_');

        if (!map) {
            alert('ERROR - NO MAP WAS SPECIFIED!');
            break;
        }

        if (!ip) {
            alert('ERROR - NO SERVER WAS SPECIFIED!');
            break;
        }

        // Generate Docker Container Name
        dockerContainerName = 'CSGOArms_';
        dockerContainerName += ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][currentDate.getDay()];
        dockerContainerName += zeroPad(currentDate.getHours(), 2) + 'h';
        dockerContainerName += zeroPad(currentDate.getMinutes(), 2) + 'm';
        dockerContainerName += zeroPad(currentDate.getSeconds(), 2) + 's';

        if (ip) {
            let cpuId = BareMetal.GetCPUFromIPAddress(ip);

            if (cpuId) {
                cpuFlag = '--cpuset-cpus="' + cpuId + '"';
            } else {
                cpuFlag = "";
            }
        }

        // Docker Command
        let dockerCommand = 'docker run -d ';

        if (cpuFlag.trim().length > 0) {
            dockerArgs += cpuFlag + ' ';    
        }
        dockerArgs += '--name ' + dockerContainerName + ' ';
        dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
        dockerArgs += 'lacledeslan/gamesvr-csgo-freeplay ';

        // CSGO Arms Race Server Specific
        srcdsCommand = './srcds_run ';
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
        srcdsArgs += '+rcon_password "' + RCON_PASS + '" ';

        serverLaunchString = modalFormatCommands(dockerCommand, dockerArgs, [srcdsCommand, srcdsArgs]);

        clientConnectString = 'connect ' + ip + ':27015';

        $('#modalString .modal-title').html(hostname);
        $('#modalString .modal-body #serverPassword').html('N/A');
        $('#modalString .modal-body #serverLaunchString').html(serverLaunchString);
        $('#modalString .modal-body #clientConnectString').html(clientConnectString);
        $('#modalString').modal('show');
        
        addLogMessage('CSGO Arms Race', serverLaunchString);
        
    } while (false);
}

SRCDS.CSGO.LaunchClassic = function(hostname, map, ip) {
    let clientConnectString = 'N/A',
        cpuFlag = '',
        currentDate = new Date(),
        dockerCommand = '',
        dockerArgs = '',
        dockerContainerName = '',
        serverLaunchString = ''
        srcdsCommand = '',
        srcdsArgs = '';

    do {
        hostname = (hostname)
            ? String(hostname)
            : 'LL Classic Server';
        hostname = hostname.split(' ').join('_');

        if (!map) {
            alert('ERROR - NO MAP WAS SPECIFIED!');
            break;
        }

        if (!ip) {
            alert('ERROR - NO SERVER WAS SPECIFIED!');
            break;
        }

        // Generate Docker Container Name
        dockerContainerName = 'CSGOClassic_';
        dockerContainerName += ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][currentDate.getDay()];
        dockerContainerName += zeroPad(currentDate.getHours(), 2) + 'h';
        dockerContainerName += zeroPad(currentDate.getMinutes(), 2) + 'm';
        dockerContainerName += zeroPad(currentDate.getSeconds(), 2) + 's';

        if (ip) {
            let cpuId = BareMetal.GetCPUFromIPAddress(ip);

            if (cpuId) {
                cpuFlag = '--cpuset-cpus="' + cpuId + '"';
            } else {
                cpuFlag = "";
            }
        }

        // Docker Command
        let dockerCommand = 'docker run -d ';

        if (cpuFlag.trim().length > 0) {
            dockerArgs += cpuFlag + ' ';    
        }
        dockerArgs += '--name ' + dockerContainerName + ' ';
        dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
        dockerArgs += 'lacledeslan/gamesvr-csgo-freeplay ';

        // CSGO Classic Server Specific
        srcdsCommand = './srcds_run ';
        srcdsArgs += '-game csgo ';
        srcdsArgs += '-console ';
        srcdsArgs += '+game_type 0 ';
        srcdsArgs += '+game_mode 0 ';
        srcdsArgs += '-usercon ';
        srcdsArgs += '-tickrate 128 ';
        srcdsArgs += '+mapgroup mg_active ';
        srcdsArgs += '+map ' + map + ' ';
        srcdsArgs += '-maxplayers_override 16 ';
        srcdsArgs += '+hostname "' + hostname + '" ';
        srcdsArgs += '+sv_lan 1 ';
        srcdsArgs += '+rcon_password "' + RCON_PASS + '" ';

        serverLaunchString = modalFormatCommands(dockerCommand, dockerArgs, [srcdsCommand, srcdsArgs]);

        clientConnectString = 'connect ' + ip + ':27015';

        $('#modalString .modal-title').html(hostname);
        $('#modalString .modal-body #serverPassword').html('N/A');
        $('#modalString .modal-body #serverLaunchString').html(serverLaunchString);
        $('#modalString .modal-body #clientConnectString').html(clientConnectString);
        $('#modalString').modal('show');
        
        addLogMessage('CSGO Classic', serverLaunchString);
    } while (false);
}


SRCDS.CSGO.LaunchDeathmatch = function(hostname, map, ip) {
    let clientConnectString = 'N/A',
        cpuFlag = '',
        currentDate = new Date(),
        dockerCommand = '',
        dockerArgs = '',
        dockerContainerName = '',
        serverLaunchString = ''
        srcdsCommand = '',
        srcdsArgs = '';

    do {
        hostname = (hostname)
            ? String(hostname)
            : 'LL Team Deathmatch Server';
        hostname = hostname.split(' ').join('_');

        if (!map) {
            alert('ERROR - NO MAP WAS SPECIFIED!');
            break;
        }

        if (!ip) {
            alert('ERROR - NO SERVER WAS SPECIFIED!');
            break;
        }

        // Generate Docker Container Name
        dockerContainerName = 'CSGODeathmatch_';
        dockerContainerName += ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][currentDate.getDay()];
        dockerContainerName += zeroPad(currentDate.getHours(), 2) + 'h';
        dockerContainerName += zeroPad(currentDate.getMinutes(), 2) + 'm';
        dockerContainerName += zeroPad(currentDate.getSeconds(), 2) + 's';

        if (ip) {
            let cpuId = BareMetal.GetCPUFromIPAddress(ip);

            if (cpuId) {
                cpuFlag = '--cpuset-cpus="' + cpuId + '"';
            } else {
                cpuFlag = "";
            }
        }

        // Docker Command
        let dockerCommand = 'docker run -d ';

        if (cpuFlag.trim().length > 0) {
            dockerArgs += cpuFlag + ' ';    
        }
        dockerArgs += '--name ' + dockerContainerName + ' ';
        dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
        dockerArgs += 'lacledeslan/gamesvr-csgo-freeplay ';

        // CSGO Classic Server Specific
        srcdsCommand = './srcds_run ';
        srcdsArgs += './srcds_run ';
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
        srcdsArgs += '+rcon_password "' + RCON_PASS + '" ';

        serverLaunchString = modalFormatCommands(dockerCommand, dockerArgs, [srcdsCommand, srcdsArgs]);

        clientConnectString = 'connect ' + ip + ':27015';

        $('#modalString .modal-title').html(hostname);
        $('#modalString .modal-body #serverPassword').html('N/A');
        $('#modalString .modal-body #serverLaunchString').html(serverLaunchString);
        $('#modalString .modal-body #clientConnectString').html(clientConnectString);
        $('#modalString').modal('show');
        
        addLogMessage('CSGO Classic', serverLaunchString);
    } while (false);
}

SRCDS.CSGO.LaunchClientTest = function(map, ip) {
    let clientConnectString = '',
        currentDate = new Date(),
        cpuFlag = '',
        dockerContainerName = '',
        hostname = "CSGO Client Test Server",
        password = generatePasswordArray(),
        serverLaunchString = '',
        team1 = "Isotopes".trim(),
        team2 = "Gotham Rogues".trim();

    do {
        if (!map) {
            alert('ERROR - NO MAP WAS SPECIFIED!');
            break;
        }

        if (!ip) {
            alert('ERROR - NO SERVER WAS SELECTED');
            break;
        }

        ip = ip.toString().trim();

        hostname = hostname.split(' ').join('_');

        // Generate Docker Container Name
        dockerContainerName = 'CSGOTest_';
        dockerContainerName += ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][currentDate.getDay()];
        dockerContainerName += zeroPad(currentDate.getHours(), 2) + 'h';
        dockerContainerName += zeroPad(currentDate.getMinutes(), 2) + 'm';
        dockerContainerName += zeroPad(currentDate.getSeconds(), 2) + 's';
        
        if (ip) {
            let cpuId = BareMetal.GetCPUFromIPAddress(ip);

            if (cpuId) {
                cpuFlag = '--cpuset-cpus="' + cpuId + '"';
            } else {
                cpuFlag = "";
            }
        }
        
        // Docker Command
        let dockerCommand = 'docker run -d ';
        let dockerArgs = '';

        if (cpuFlag.trim().length > 0) {
            dockerArgs += cpuFlag + ' ';    
        }
        dockerArgs += '--name ' + dockerContainerName + ' ';
        dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
        dockerArgs += 'lacledeslan/gamesvr-csgo-test ';

        // SRCDS Command
        let srcdsCommand = './srcds_run ';
        let srcdsArgs = '-port 27015 ';
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
        srcdsArgs += '+rcon_password "' + RCON_PASS + '" ';
        srcdsArgs += '-maxplayers_override 16 ';

        let serverLaunchString = modalFormatCommands(dockerCommand, dockerArgs, [srcdsCommand, srcdsArgs])

        clientConnectString = 'connect ';
        clientConnectString += ip + ':27015';

        $('#modalString .modal-title').html(hostname);
        $('#modalString .modal-body #serverPassword').html("N/A");
        $('#modalString .modal-body #serverLaunchString').html(serverLaunchString);
        $('#modalString .modal-body #clientConnectString').html(clientConnectString);
        $('#modalString').modal('show');
        
        addLogMessage('CSGO Tourney', serverLaunchString);
    } while (false);
}


SRCDS.CSGO.LaunchTourney = function(bracketID, team1, team2, map, ip) {
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

        if (!isWholeNumber(bracketID)) {
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

        // Generate hostname
        if (team1 !== undefined || team2 !== undefined) {
            team1 = String(team1 || 'Unknown');
            team2 = String(team2 || 'Unknown');
            hostname = 'CSGO Match ' + bracketID + ' ' + team1 + ' v ' + team2;
        }

        hostname = hostname.split(' ').join('_');

        // Generate Docker Container Name
        dockerContainerName = 'CSGOTourn_' + bracketID + '_';
        dockerContainerName += ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][currentDate.getDay()];
        dockerContainerName += zeroPad(currentDate.getHours(), 2) + 'h';
        dockerContainerName += zeroPad(currentDate.getMinutes(), 2) + 'm';
        dockerContainerName += zeroPad(currentDate.getSeconds(), 2) + 's';
        
        if (ip) {
            let cpuId = BareMetal.GetCPUFromIPAddress(ip);

            if (cpuId) {
                cpuFlag = '--cpuset-cpus="' + cpuId + '"';
            } else {
                cpuFlag = "";
            }
        }

        // Docker Launch String
        var dockerComand = 'docker run -d ';
        var dockerArgs = '';

        if (cpuFlag.trim().length > 0) {
            dockerArgs += cpuFlag + ' ';
        }
        dockerArgs += '--name ' + dockerContainerName + ' ';
        dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
        dockerArgs += '-v /home/sysoper/logs/' + dockerContainerName + ':/app/bin/csgo/logs ';
        dockerArgs += '-v /home/sysoper/logs/' + dockerContainerName + '/warmod:/app/bin/csgo/addons/sourcemod/logs ';
        dockerArgs += 'lacledeslan/gamesvr-csgo-tourney ';

        // CS:GO Tournament Server Specific
        var srcdsCommand = './srcds_run ';
        var srcdsArgs = '-game csgo ';

        srcdsArgs += '+game_type 0 ';
        srcdsArgs += '+game_mode 1 ';
        srcdsArgs += '-tickrate 128 ';
        srcdsArgs += '-console ';
        srcdsArgs += '-usercon ';
        srcdsArgs += '+map ' + map + ' ';
        srcdsArgs += '+hostname "' + hostname + '" ';
        srcdsArgs += '+sv_password "' + password.join('') + '" ';
        srcdsArgs += '+sv_lan 1 ';
        srcdsArgs += '+mp_teamname_1 "' + team1 + '" ';
        srcdsArgs += '+mp_teamname_2 "' + team2 + '" ';
        srcdsArgs += '+rcon_password "' + RCON_PASS + '" ';
        srcdsArgs += '+tv_name "zLLTV_CSGO_BRACKET_' + bracketID + '" ';
        srcdsArgs += '+tv_password "brianprefersmustard567" ';
        srcdsArgs += '+tv_relaypassword "brianprefersmustard567" ';

        serverLaunchString = modalFormatCommands(dockerComand, dockerArgs, [srcdsCommand, srcdsArgs]);

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


/// Add Maps to all appropriate HTML SELECT controls
$( document ).ready(function() {
    $(".selectCSGOArmsRaceMaps").each(
        function() {
            let selectControl = this;

            for (let index in SRCDS.CSGO.MapsArmsRace) {
                    $(selectControl).append(
                        $("<option>", {
                            text: SRCDS.CSGO.MapsArmsRace[index],
                            value: SRCDS.CSGO.MapsArmsRace[index]
                        })
                    );
            }
        }
    );

    $(".selectCSGOClassicMaps").each(
        function() {
            let selectControl = this;

            for (let index in SRCDS.CSGO.MapsClassic) {
                    $(selectControl).append(
                        $("<option>", {
                            text: SRCDS.CSGO.MapsClassic[index],
                            value: SRCDS.CSGO.MapsClassic[index]
                        })
                    );
            }
        }
    );

    $(".selectCSGODeathmatchMaps").each(
        function() {
            let selectControl = this;

            for (let index in SRCDS.CSGO.MapsDeathmatch) {
                    $(selectControl).append(
                        $("<option>", {
                            text: SRCDS.CSGO.MapsDeathmatch[index],
                            value: SRCDS.CSGO.MapsDeathmatch[index]
                        })
                    );
            }
        }
    );

    $(".selectCSGOTestMaps").each(
        function() {
            let selectControl = this;

            for (let index in SRCDS.CSGO.MapsTest) {
                    $(selectControl).append(
                        $("<option>", {
                            text: SRCDS.CSGO.MapsTest[index],
                            value: SRCDS.CSGO.MapsTest[index]
                        })
                    );
            }
        }
    );

    $(".selectCSGOTourneyMaps").each(
        function() {
            let selectControl = this;

            for (let index in SRCDS.CSGO.MapsTourney) {
                    $(selectControl).append(
                        $("<option>", {
                            text: SRCDS.CSGO.MapsTourney[index],
                            value: SRCDS.CSGO.MapsTourney[index]
                        })
                    );
            }
        }
    );
});