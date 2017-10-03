var SRCDS = SRCDS || {};
SRCDS.SVENCOOP = SRCDS.SVENCOOP || {};

SRCDS.SVENCOOP.Maps = ['abandoned', 'BlackMesaEPF', 'bm_sts', 'crystal', 'crystal2', 'ctf_warforts', 'deadsimpleneo2', 'desertcircle', 'fortified1', 'hl_c00', 'hl_c01_a1', 'hplanet', 'incoming', 'infested', 'intruder', 'judgement', 'last', 'mommamesa', 'osprey', 'polar_rescue', 'quarter', 'sandstone', 'sc_another', 'sc_doc', 'sc_mazing', 'sc_persia', 'sc_psyko', 'sc_robination_revised', 'sc_tetris1', '-sp_campaign_portal', 'stadium4', 'svencoop1', 'svencoop2', 'svencoop2', 'th_ep1_00', 'toadsnatch', 'toonrun1', 'turretfortress', 'uplink', 'yabma'];

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

    UI.populateSelectFromCollection(".selectSvenCoOpMaps", SRCDS.SVENCOOP.Maps, 'hl_c01_a1');
});