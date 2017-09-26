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
    "use strict";
    return a.toLowerCase().localeCompare(b.toLowerCase());
});

SRCDS.TF2.LaunchBlindFrag = function(hostname, map, ip) {
    "use strict";

    let clientConnectString = "N/A",
        dockerCommand = "docker run -d ",
        dockerContainerName = Docker.GenerateContainerName("TF2BlindFrag"),
        dockerArgs = "",
        pass = password.generateArray(),
        serverLaunchString = "",
        srcdsCommand = "./srcds_run ",
        srcdsArgs = "";

    do {
        hostname = (hostname) ? String(hostname) : "LL TF2 Blind Frag";
        hostname = hostname.split(" ").join("_");

        if (!map) {
            alert("ERROR - NO MAP WAS SPECIFIED!");
            break;
        }

        if (!ip) {
            alert("ERROR - NO SERVER WAS SELECTED");
            break;
        }

        // Build Docker Command & Args
        dockerArgs += '--name ' + dockerContainerName + " ";
        dockerArgs += Docker.NetString_SRCDS(ip) + " ";
        dockerArgs += 'lacledeslan/gamesvr-tf2-blindfrag ';

        // Build SRCDS Command & Args
        srcdsArgs += '-game tf ';
        srcdsArgs += '+maxplayers 24 ';
        srcdsArgs += '-console ';
        srcdsArgs += '-usercon ';
        srcdsArgs += '+hostname "' + hostname + '" ';
        srcdsArgs += '+sv_password "' + pass.join('') + '" ';
        srcdsArgs += '+map ' + map + ' ';
        srcdsArgs += '+maplist mapcycle_quickplay_koth ';
        srcdsArgs += '+rcon_password "' + RCON_PASS.join('') + '" ';

        serverLaunchString = modalFormatCommands(dockerCommand, dockerArgs, [srcdsCommand, srcdsArgs]);

        clientConnectString = 'connect ' + ip + ':27015 password; ' + pass.html();

        UI.displayModal(
            "TF2 BlindFrag",
            {
                "Launch String": serverLaunchString,
                "Client Connect": clientConnectString,
                "Password": pass.html()
            }
        );

        addLogMessage('TF2 BlindFrag', serverLaunchString);

    } while (false);
};

SRCDS.TF2.LaunchFreeplay = function (hostname, mapcycle, ip) {
    "use strict";

    let clientConnectString = 'N/A',
        dockerCommand = 'docker run -d ',
        dockerContainerName = Docker.GenerateContainerName('TF2Freeplay'),
        dockerArgs = '',
        serverLaunchString = '',
        srcdsCommand = './srcds_run ',
        srcdsArgs = '';

    do {
        hostname = (hostname) ? String(hostname) : 'LL Team Fortress 2';
        hostname = hostname.split(' ').join('_');

        if (!mapcycle) {
            alert('ERROR - NO MAPCYCLE WAS SPECIFIED!');
            break;
        }

        if (!ip) {
            alert('ERROR - NO SERVER WAS SELECTED');
            break;
        }

        // Docker Command
        dockerArgs += '--name ' + dockerContainerName + ' ';
        dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
        dockerArgs += 'lacledeslan/gamesvr-tf2-freeplay ';

        // Build SRCDS Command & Args
        srcdsArgs += '-game tf ';
        srcdsArgs += '-port 27015 ';
        srcdsArgs += '+sv_pure 0 ';
        srcdsArgs += '+maxplayers 24 ';
        srcdsArgs += '-console ';
        srcdsArgs += '-usercon ';
        srcdsArgs += '-replay ';
        srcdsArgs += '+mapcyclefile ' + mapcycle + ' ';
        srcdsArgs += '+randommap ';
        srcdsArgs += '+hostname "' + hostname + '" ';
        srcdsArgs += '+rcon_password "' + RCON_PASS.join('') + '" ';

        serverLaunchString = modalFormatCommands(dockerCommand, dockerArgs, [srcdsCommand, srcdsArgs]);

        clientConnectString = 'connect ' + ip + ':27015';

        UI.displayModal(
            "TF2 Freeplay",
            {
                "Launch String": serverLaunchString,
                "Client Connect": clientConnectString
            }
        );

        addLogMessage('TF2 Freeplay', serverLaunchString);
    } while (false);
};


SRCDS.TF2.LaunchWare = function (hostname, mapcycle, ip) {
    "use strict";

    let clientConnectString = 'N/A',
        dockerCommand = 'docker run -d ',
        dockerContainerName = Docker.GenerateContainerName('TF2Ware'),
        dockerArgs = '',
        serverLaunchString = '',
        srcdsCommand = './srcds_run ',
        srcdsArgs = '';

    do {
        hostname = (hostname) ? String(hostname) : 'LL TF2Ware';
        hostname = hostname.split(' ').join('_');

        if (!mapcycle) {
            alert('ERROR - NO MAPCYCLE WAS SPECIFIED!');
            break;
        }

        if (!ip) {
            alert('ERROR - NO SERVER WAS SELECTED');
            break;
        }

        // Docker args
        dockerArgs += '--name ' + dockerContainerName + ' ';
        dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
        dockerArgs += 'lacledeslan/gamesvr-tf2-ware ';

        // Build SRCDS Command & Args
        srcdsArgs += '-game tf ';
        srcdsArgs += '-port 27015 ';
        srcdsArgs += '+sv_pure 0 ';
        srcdsArgs += '+maxplayers 24 ';
        srcdsArgs += '+sv_lan 1 ';
        srcdsArgs += '-console ';
        srcdsArgs += '-usercon ';
        srcdsArgs += '-insecure ';
        srcdsArgs += '-replay ';
        srcdsArgs += '+mapcyclefile ' + mapcycle + ' ';
        srcdsArgs += '+map tf2ware2_a4 ';
        srcdsArgs += '+hostname "' + hostname + '" ';
        srcdsArgs += '+rcon_password "' + RCON_PASS.join('') + '" ';

        serverLaunchString = modalFormatCommands(dockerCommand, dockerArgs, [srcdsCommand, srcdsArgs]);

        clientConnectString = 'connect ' + ip + ':27015';

        UI.displayModal(
            "TF2Ware",
            {
                "Launch String": serverLaunchString,
                "Client Connect": clientConnectString
            }
        );

        addLogMessage('TF2Ware', serverLaunchString);
    } while (false);
};


/// Add Map Cycles to all appropriate HTML SELECT controls
document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    document.querySelectorAll(".selectTF2MapCycles").forEach(function (selectControl) {
        SRCDS.TF2.MapCycles.forEach(function (mapCycleName) {
            let option = document.createElement("option");
            option.text = mapCycleName;
            selectControl.add(option);
        });
    });
});
