var SRCDS = SRCDS || {};
SRCDS.GESOURCE = SRCDS.GESOURCE || {};

SRCDS.GESOURCE.Maps = ["ge_archives", "ge_archives_classic", "ge_aztec", "ge_basement", "ge_basement_classic", "ge_bunker", "ge_bunker_classic", "ge_casino", "ge_caverns", "ge_caves", "ge_complex", "ge_complex_classic", "ge_control", "ge_cradle", "ge_dam", "ge_depot", "ge_egyptian", "ge_facility", "ge_facility_backzone", "ge_facility_classic", "ge_library_classic", "ge_runway", "ge_silo", "ge_stack_classic", "ge_temple_classic", "ge_transition"];

SRCDS.GESOURCE.LaunchFreeplay = function (hostname, map, ip) {
    "use strict";

    let dockerArgs = '',
        srcdsArgs = '';

    hostname = (hostname) ? String(hostname) : 'LL Golden Eye Source Server';
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
    dockerArgs += '--name ' + Docker.GenerateContainerName("GESource") + ' ';
    dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
    dockerArgs += 'lacledeslan/gamesvr-gesource-freeplay ';

    // CSGO Arms Race Server Specific
    srcdsArgs = '-game gesource ';
    srcdsArgs += '-console ';
    srcdsArgs += '-usercon ';
    srcdsArgs += '+map ' + map + ' ';
    srcdsArgs += '-maxplayers 16 ';
    srcdsArgs += '+hostname "' + hostname + '" ';
    srcdsArgs += '+sv_lan 1 ';
    srcdsArgs += '+rcon_password "' + RCON_PASS.join('') + '" ';

    UI.displayModal(
        "Golden Eye Source Freeplay",
        {
            "Launch String": UI.formatCommands('docker run -d ', dockerArgs, ['export MALLOC_CHECK_=0 && ./srcds_run ', srcdsArgs]),
            "Client Connect": 'connect ' + ip + ':27015'
        }
    );
};

/// Add Maps to all appropriate HTML SELECT controls
document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    UI.populateSelectFromCollection(".selectGESourceMaps", SRCDS.GESOURCE.Maps, true);
});
