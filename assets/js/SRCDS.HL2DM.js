var SRCDS = SRCDS || {};
SRCDS.HL2DM = SRCDS.HL2DM || {};

SRCDS.HL2DM.MapsStock = ["dm_lockdown", "dm_overwatch", "dm_powerhouse", "dm_resistance", "dm_runoff", "dm_steamlab", "dm_underpass", "halls3"];

SRCDS.HL2DM.MapsLL = ["dm_backwash2", "dm_bk_lambda_box_rc1", "dm_bwo_parking_np", "dm_crossfire_final", "dm_datacore", "dm_fool_day", "DM_Gothic_UTclassic_v7b",
        "dm_greenhouse", "dm_mine_enhanced", "dm_octagon", "dm_quake_b1", "dm_tech"];

SRCDS.HL2DM.Maps = SRCDS.HL2DM.MapsStock.concat(SRCDS.HL2DM.MapsLL).sort(function (a, b) {
    "use strict";
    return a.toLowerCase().localeCompare(b.toLowerCase());
});

SRCDS.HL2DM.Launch_HL2DM_Freeplay = function (hostname, map, ip) {
    "use strict";

    let dockerArgs = '',
        serverLaunchString = '';

    hostname = (hostname) ? String(hostname) : 'LL HL2DM Freeplay';
    hostname = hostname.split(' ').join('_');

    if (!map) {
        alert('ERROR - NO MAP WAS SPECIFIED!');
        return;
    }

    if (!ip) {
        alert('ERROR - NO SERVER WAS SELECTED');
        return;
    }

    // Docker Args
    dockerArgs += '--name ' + Docker.GenerateContainerName("HL2DMFreeplay") + ' ';
    dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
    dockerArgs += 'lacledeslan/gamesvr-hl2dm-freeplay ';

    // HL2DM Freeplay Server Specific
    let srcdsArgs = '-game hl2mp ';
    srcdsArgs += '-port 27015 ';
    srcdsArgs += '+sv_pure 1 ';
    srcdsArgs += '+maxplayers 24 ';
    srcdsArgs += '+map ' + map + ' ';
    srcdsArgs += '+hostname "' + hostname + '" ';
    srcdsArgs += '+rcon_password "' + RCON_PASS.join('') + '" ';

    UI.displayModal(
        "HL2DM Freeplay",
        {
            "Launch String": UI.formatCommands('docker run -d ', dockerArgs, ['./srcds_run ', srcdsArgs]),
            "Client Connect": 'connect ' + ip + ':27015'
        }
    );
};

/// Add Maps to all appropriate HTML SELECT controls
document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    UI.populateSelectFromCollection(".selectHL2DMMaps", SRCDS.HL2DM.Maps, true);
});
