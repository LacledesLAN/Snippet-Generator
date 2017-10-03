var SRCDS = SRCDS || {};
SRCDS.SVENCOOP = SRCDS.SVENCOOP || {};

SRCDS.SVENCOOP.Maps = ['hl_c01_a1'];

SRCDS.SVENCOOP.LaunchFreeplay = function (hostname, map, ip) {
    "use strict";

    let dockerArgs = '',
        srcdsArgs = '';

    hostname = (hostname) ? String(hostname) : 'LL Sven Co-Op Server';
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
    dockerArgs += '--name ' + Docker.GenerateContainerName("SvenCoOp") + ' ';
    dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
    dockerArgs += 'lacledeslan/gamesvr-svencoop-freeplay ';

    // CSGO Arms Race Server Specific
    srcdsArgs = '-game svencoop ';
    srcdsArgs += '-console ';
    srcdsArgs += '-usercon ';
    srcdsArgs += '+map ' + map + ' ';
    srcdsArgs += '+log on ';
    srcdsArgs += '-maxplayers 22 ';
    srcdsArgs += '+hostname "' + hostname + '" ';
    srcdsArgs += '+sv_lan 1 ';
    srcdsArgs += '+rcon_password "' + RCON_PASS.join('') + '" ';

    UI.displayModal(
        "Sven Co-Op Freeplay",
        {
            "Launch String": UI.formatCommands('docker run -d ', dockerArgs, ['./srcds_run ', srcdsArgs]),
            "Client Connect": 'connect ' + ip + ':27015'
        }
    );
};

/// Add Maps to all appropriate HTML SELECT controls
document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    UI.populateSelectFromCollection(".selectSvenCoOpMaps", SRCDS.SVENCOOP.Maps);
});