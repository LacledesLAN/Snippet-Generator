var SRCDS = SRCDS || {};
SRCDS.DODS = SRCDS.DODS || {};

SRCDS.DODS.Maps = ["dod_anzio", "dod_argentan", "dod_avalanche", "dod_colmar", "dod_donner", "dod_flash", "dod_jagd", "dod_kalt", "dod_palermo"];

SRCDS.DODS.Launch_Freeplay = function (hostname, map, ip) {
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
    dockerArgs += '--name ' + Docker.GenerateContainerName("DODSFreeplay") + ' ';
    dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
    dockerArgs += 'lacledeslan/gamesvr-dods-freeplay ';

    // DODS Server Specific
    srcdsArgs = '-game dod ';
    srcdsArgs += '-console ';
    srcdsArgs += '+maxplayers 30 ';
    srcdsArgs += '-usercon ';
    srcdsArgs += '+map ' + map + ' ';
    srcdsArgs += '+hostname "' + hostname + '" ';
    srcdsArgs += '+sv_lan 1 ';
    srcdsArgs += '+rcon_password "' + RCON_PASS.join('') + '" ';

    UI.displayModal(
        "DODS Freeplay",
        {
            "Launch String": UI.formatCommands('docker run -d ', dockerArgs, ['./srcds_run ', srcdsArgs]),
            "Client Connect": 'connect ' + ip + ':27015'
        }
    );
};


/// Add Maps to all appropriate HTML SELECT controls
document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    UI.populateSelectFromCollection(".selectDodsMap", SRCDS.DODS.Maps, true);
});
