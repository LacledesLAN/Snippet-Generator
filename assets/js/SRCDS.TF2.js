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

    let dockerArgs = "",
        pass = password.generateArray(),
        srcdsArgs = "";

    hostname = (hostname) ? String(hostname) : "LL TF2 Blind Frag";
    hostname = hostname.split(" ").join("_");

    if (!map) {
        alert("ERROR - NO MAP WAS SPECIFIED!");
        return;
    }

    if (!ip) {
        alert("ERROR - NO SERVER WAS SELECTED");
        return;
    }

    // Build Docker Command & Args
    dockerArgs += '--name ' + Docker.GenerateContainerName("TF2BlindFrag") + " ";
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

    UI.displayModal(
        "TF2 BlindFrag",
        {
            "Launch String": UI.formatCommands('docker run -d ', dockerArgs, ['./srcds_run ', srcdsArgs]),
            "Client Connect": 'connect ' + ip + ':27015 password; ' + pass.html(),
            "Password": pass.html()
        }
    );
};

SRCDS.TF2.LaunchFreeplay = function (hostname, mapcycle, ip) {
    "use strict";

    let dockerArgs = '',
        srcdsArgs = '';

    hostname = (hostname) ? String(hostname) : 'LL Team Fortress 2';
    hostname = hostname.split(' ').join('_');

    if (!mapcycle) {
        alert('ERROR - NO MAPCYCLE WAS SPECIFIED!');
        return;
    }

    if (!ip) {
        alert('ERROR - NO SERVER WAS SELECTED');
        return;
    }

    // Docker Command
    dockerArgs += '--name ' + Docker.GenerateContainerName('TF2Freeplay') + ' ';
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

    UI.displayModal(
        "TF2 Freeplay",
        {
            "Launch String": UI.formatCommands('docker run -d ', dockerArgs, ['./srcds_run ', srcdsArgs]),
            "Client Connect": 'connect ' + ip + ':27015'
        }
    );
};


SRCDS.TF2.LaunchWare = function (hostname, mapcycle, ip) {
    "use strict";

    let dockerArgs = '',
        srcdsArgs = '';

    hostname = (hostname) ? String(hostname) : 'LL TF2Ware';
    hostname = hostname.split(' ').join('_');

    if (!mapcycle) {
        alert('ERROR - NO MAPCYCLE WAS SPECIFIED!');
        return;
    }

    if (!ip) {
        alert('ERROR - NO SERVER WAS SELECTED');
        return;
    }

    // Docker args
    dockerArgs += '--name ' + Docker.GenerateContainerName('TF2Ware') + ' ';
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

    UI.displayModal(
        "TF2Ware",
        {
            "Launch String": UI.formatCommands('docker run -d ', dockerArgs, ['./srcds_run ', srcdsArgs]),
            "Client Connect": 'connect ' + ip + ':27015'
        }
    );
};


/// Add Map Cycles to all appropriate HTML SELECT controls
document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    UI.populateSelectFromCollection(".selectTF2MapCycles", SRCDS.TF2.MapCycles);
});
