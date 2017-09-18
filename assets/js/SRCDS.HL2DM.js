var SRCDS = SRCDS || {};
SRCDS.HL2DM = SRCDS.HL2DM || {};

SRCDS.HL2DM.MapsStock = ["dm_lockdown", "dm_overwatch", "dm_powerhouse", "dm_resistance", "dm_runoff", "dm_steamlab", "dm_underpass", "halls3"];

SRCDS.HL2DM.MapsLL = ["dm_backwash2", "dm_bk_lambda_box_rc1", "dm_bwo_parking_np", "dm_crossfire_final", "dm_datacore", "dm_fool_day", "DM_Gothic_UTclassic_v7b",
                         "dm_greenhouse", "dm_mine_enhanced", "dm_octagon", "dm_quake_b1", "dm_tech"];

SRCDS.HL2DM.Maps = SRCDS.HL2DM.MapsStock.concat(SRCDS.HL2DM.MapsLL).sort(function (a, b) {
    "use strict";
    return a.toLowerCase().localeCompare(b.toLowerCase());
});

SRCDS.HL2DM.Launch_HL2DM_Freeplay = function(hostname, map, ip) {
    "use strict";

    let clientConnectString = 'N/A',
        cpuFlag = '',
        currentDate = new Date(),
        dockerArgs = '',
        dockerContainerName = '',
        serverLaunchString = '';

    do {
        hostname = (hostname)
            ? String(hostname)
            : 'LL HL2DM Freeplay';
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
        dockerContainerName = Docker.GenerateContainerName("HL2DMFreeplay");

        // Docker Command
        let dockerCommand = 'docker run -d ';

        dockerArgs += '--name ' + dockerContainerName + ' ';
        dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
        dockerArgs += 'lacledeslan/gamesvr-hl2dm-freeplay ';

        // HL2DM Freeplay Server Specific
        let srcdsCommand = './srcds_run ';
        let srcdsArgs = '-game hl2mp ';
        srcdsArgs += '-port 27015 ';
        srcdsArgs += '+sv_pure 1 ';
        srcdsArgs += '+maxplayers 24 ';
        srcdsArgs += '+map ' + map + ' ';
        srcdsArgs += '+hostname "' + hostname + '" ';
        srcdsArgs += '+rcon_password "' + RCON_PASS + '" ';

        serverLaunchString = modalFormatCommands(dockerCommand, dockerArgs, [srcdsCommand, srcdsArgs]);

        clientConnectString = 'connect ';
        clientConnectString += ip + ':27015';

        $('#modalString .modal-title').html(hostname);
        $('#modalString .modal-body #serverPassword').html('N/A');
        $('#modalString .modal-body #serverLaunchString').html(serverLaunchString);
        $('#modalString .modal-body #clientConnectString').html(clientConnectString);
        $('#modalString').modal('show');

        addLogMessage('HL2DM Freeplay', serverLaunchString);
    } while (false);
};

/// Add Maps to all appropriate HTML SELECT controls
$( document ).ready(function() {
    "use strict";

    $(".selectHL2DMMaps").each(
        function() {
            let selectControl = this;

            for (let index in SRCDS.HL2DM.Maps) {
                    $(selectControl).append(
                        $("<option>", {
                            text: SRCDS.HL2DM.Maps[index],
                            value: SRCDS.HL2DM.Maps[index]
                        })
                    );
            }
        }
    );
});
