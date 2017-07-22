
var SRCDS = SRCDS || {};
SRCDS.TF2 = SRCDS.TF2 || {};

SRCDS.TF2.MapCyclesStock = ["mapcycle.txt", "mapcycle_beta_asteroid.txt", "mapcycle_beta_cactus_canyon.txt", "mapcycle_beta_mannpower.txt", "mapcycle_default.txt", 
                            "mapcycle_doomsday_event_247.txt", "mapcycle_featured_maps.txt", "mapcycle_halloween.txt", "mapcycle_halloween_event_247.txt",
                            "mapcycle_hightower_event_247.txt", "mapcycle_invasion_maps.txt", "mapcycle_ladder.txt", "mapcycle_lakeside_event_247.txt",
                            "mapcycle_mannpower.txt", "mapcycle_quickplay_arena.txt", "mapcycle_quickplay_attackdefense.txt", "mapcycle_quickplay_cp.txt",
                            "mapcycle_quickplay_ctf_sd.txt", "mapcycle_quickplay_koth.txt", "mapcycle_quickplay_passtime.txt", "mapcycle_quickplay_payload.txt",
                            "mapcycle_quickplay_payloadrace.txt"];

SRCDS.TF2.MapCyclesLL = ["mapcycle_LL_all.txt", "mapcycle_LL_arena.txt", "mapcycle_LL_cp.txt", "mapcycle_LL_ctf.txt", "mapcycle_LL_koth.txt",
                            "mapcycle_LL_ph.txt", "mapcycle_LL_pl.txt", "mapcycle_LL_plr.txt"];

SRCDS.TF2.MapCycles = SRCDS.TF2.MapCyclesStock.concat(SRCDS.TF2.MapCyclesLL).sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
});

SRCDS.TF2.LaunchBlindFrag = function(hostname, map, ip) {
    let clientConnectString = 'N/A',
        currentDate = new Date(),
        dockerCommand = '',
        dockerArgs = '',
        password = generatePasswordArray(),
        serverLaunchString = '',
        srcdsCommand = '',
        srcdsArgs = '';

    do {
        hostname = (hostname)
            ? String(hostname)
            : 'LL TF2 Blind Frag';
        hostname = hostname.split(' ').join('_');

        if (!map) {
            alert('ERROR - NO MAP WAS SPECIFIED!');
            break;
        }

        if (!ip) {
            alert('ERROR - NO SERVER WAS SELECTED');
            break;
        }

        // Generate Docker Container Name
        dockerContainerName = 'TF2BlindFrag_';
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

        // Build Docker Command & Args
        let dockerCommand = 'docker run -d ';
        if (cpuFlag.trim().length > 0) {
            dockerArgs += cpuFlag + ' ';    
        }
        dockerArgs += '--name ' + dockerContainerName + ' ';
        dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
        dockerArgs += 'lacledeslan/gamesvr-tf2-blindfrag:linux ';

        // Build SRCDS Command & Args
        srcdsCommand = './srcds_run ';
        srcdsArgs += '-port 27015 ';
        srcdsArgs += '-game tf ';
        srcdsArgs += '+maxplayers 24 ';
        srcdsArgs += '-console ';
        srcdsArgs += '-usercon ';
        srcdsArgs += '+hostname "' + hostname + '" ';
        srcdsArgs += '+sv_password "' + password.join('') + '" ';
        srcdsArgs += '+map ' + map + ' ';
        srcdsArgs += '+maplist mapcycle_quickplay_koth ';
        srcdsArgs += '-insecure ';
        srcdsArgs += '+ip 0.0.0.0 ';
        srcdsArgs += '-port 27015 ';
        srcdsArgs += '+rcon_password "' + RCON_PASS + '" ';

        serverLaunchString = modalFormatCommands(dockerCommand, dockerArgs, [srcdsCommand, srcdsArgs]);

        clientConnectString = 'connect ';
        clientConnectString += ip + ':27015 password; ' + prettyPrintArray(password);

        $('#modalString .modal-title').html(hostname);
        $('#modalString .modal-body #serverPassword').html(prettyPrintArray(password));
        $('#modalString .modal-body #serverLaunchString').html(serverLaunchString);
        $('#modalString .modal-body #clientConnectString').html(clientConnectString);
        $('#modalString').modal('show');
        
        addLogMessage('TF2 BlindFrag', serverLaunchString);
        
    } while (false);
}

SRCDS.TF2.LaunchFreeplay = function(hostname, mapcycle, ip) {
    let clientConnectString = 'N/A',
        cpuFlag = '',
        currentDate = new Date(),
        dockerCommand = '',
        dockerArgs = '',
        serverLaunchString = '',
        srcdsCommand = '',
        srcdsArgs = '';

    do {
        hostname = (hostname)
            ? String(hostname)
            : 'LL Team Fortress 2';
        hostname = hostname.split(' ').join('_');

        if (!mapcycle) {
            alert('ERROR - NO MAPCYCLE WAS SPECIFIED!');
            break;
        }

        if (!ip) {
            alert('ERROR - NO SERVER WAS SELECTED');
            break;
        }

        // Generate Docker Container Name
        dockerContainerName = 'TF2Freeplay_';
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
        dockerCommand = 'docker run -d ';
        if (cpuFlag.trim().length > 0) {
            dockerArgs += cpuFlag + ' ';    
        }
        dockerArgs += '--name ' + dockerContainerName + ' ';
        dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
        dockerArgs += 'lacledeslan/gamesvr-tf2-freeplay:linux ';

        // Build SRCDS Command & Args
        srcdsCommand = './srcds_run -game tf ';
        srcdsArgs += '-port 27015 ';
        srcdsArgs += '+sv_pure 0 ';
        srcdsArgs += '+maxplayers 24 ';
        srcdsArgs += '-console ';
        srcdsArgs += '-usercon ';
        srcdsArgs += '-replay ';
        srcdsArgs += '+mapcyclefile ' + mapcycle + ' ';
        srcdsArgs += '+randommap '
        srcdsArgs += '+hostname "' + hostname + '" ';
        srcdsArgs += '+rcon_password "' + RCON_PASS + '" ';

        serverLaunchString = modalFormatCommands(dockerCommand, dockerArgs, [srcdsCommand, srcdsArgs]);

        clientConnectString = 'connect ' + ip + ':27015';

        $('#modalString .modal-title').html(hostname);
        $('#modalString .modal-body #serverPassword').html('N/A');
        $('#modalString .modal-body #serverLaunchString').html(serverLaunchString);
        $('#modalString .modal-body #clientConnectString').html(clientConnectString);
        $('#modalString').modal('show');
        
        addLogMessage('TF2 Freeplay', serverLaunchString);
    } while (false);
}

/// Add Map Cycles to all appropriate HTML SELECT controls
$( document ).ready(function() {
    $(".selectTF2MapCycles").each(
        function() {
            let selectControl = this;

            for (let index in SRCDS.TF2.MapCycles) {
                    $(selectControl).append(
                        $("<option>", {
                            text: SRCDS.TF2.MapCycles[index],
                            value: SRCDS.TF2.MapCycles[index]
                        })
                    );
            }
        }
    );
});
