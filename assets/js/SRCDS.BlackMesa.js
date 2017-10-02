var SRCDS = SRCDS || {};
SRCDS.BlackMesa = SRCDS.BlackMesa || {};

SRCDS.BlackMesa.Maps = ['bounce', 'chopper', 'crossfire', 'gasworks', 'lambdabunker', 'power', 'rail', 'stack', 'stalkyard', 'subtransit', 'undertow'];

SRCDS.BlackMesa.Launch_BlackMesa_Freeplay = function (hostname, map, ip) {
    "use strict";

    let dockerArgs = '',
        srcdsArgs = '';

    hostname = (hostname) ? String(hostname) : 'LL Black Mesa Freeplay';
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
    dockerArgs += '--name ' + Docker.GenerateContainerName("BlackMesaFreeplay") + ' ';
    dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
    dockerArgs += 'lacledeslan/gamesvr-blackmesa-freeplay ';

    // Black Mesa Freeplay Server Specific
    srcdsArgs = '-game bms ';
    srcdsArgs += '+sv_pure 0 ';
    srcdsArgs += '+map ' + map + ' ';
    srcdsArgs += '+maxplayers 24 ';
    srcdsArgs += '+sv_lan 1 ';
    srcdsArgs += '-console ';
    srcdsArgs += '-usercon ';
    srcdsArgs += '+hostname "' + hostname + '" ';
    srcdsArgs += '+ip 0.0.0.0 ';
    srcdsArgs += '-port 27015 ';
    srcdsArgs += '+rcon_password "' + RCON_PASS.join('') + '" ';

    UI.displayModal(
        "Black Mesa Freeplay",
        {
            "Launch String": UI.formatCommands('docker run -d ', dockerArgs, ['./srcds_run ', srcdsArgs]),
            "Client Connect": 'connect ' + ip + ':27015'
        }
    );
};

/// Add Maps to all appropriate HTML SELECT controls
document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    UI.populateSelectFromCollection(".selectBlackMesaMaps", SRCDS.BlackMesa.Maps, true);
});
