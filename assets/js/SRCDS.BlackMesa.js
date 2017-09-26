var SRCDS = SRCDS || {};
SRCDS.BlackMesa = SRCDS.BlackMesa || {};

SRCDS.BlackMesa.Maps = ['bounce', 'chopper', 'crossfire', 'gasworks', 'lambdabunker', 'power', 'rail', 'stack', 'stalkyard', 'subtransit', 'undertow'];

SRCDS.BlackMesa.Launch_BlackMesa_Freeplay = function (hostname, map, ip) {
    "use strict";

    let clientConnectString = 'N/A',
        dockerArgs = '',
        dockerCommand = 'docker run -d ',
        dockerContainerName = Docker.GenerateContainerName("BlackMesaFreeplay"),
        serverLaunchString = '';

    do {
        hostname = (hostname) ? String(hostname) : 'LL Black Mesa Freeplay';
        hostname = hostname.split(' ').join('_');

        if (!map) {
            alert('ERROR - NO MAP WAS SPECIFIED!');
            break;
        }

        if (!ip) {
            alert('ERROR - NO SERVER WAS SELECTED');
            break;
        }

        // Docker Args
        dockerArgs += '--name ' + dockerContainerName + ' ';
        dockerArgs += Docker.NetString_SRCDS(ip) + ' ';
        dockerArgs += 'lacledeslan/gamesvr-blackmesa-freeplay ';

        // Black Mesa Freeplay Server Specific
        let srcdsCommand = './srcds_run ';
        let srcdsArgs = '-game bms ';
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

        serverLaunchString = modalFormatCommands(dockerCommand, dockerArgs, [srcdsCommand, srcdsArgs]);

        clientConnectString = 'connect ';
        clientConnectString += ip + ':27015';

        UI.displayModal(
            "Black Mesa Freeplay",
            {
                "Launch String": serverLaunchString,
                "Client Connect": clientConnectString
            }
        );

        addLogMessage('Black Mesa Freeplay', serverLaunchString);
    } while (false);
};

/// Add Maps to all appropriate HTML SELECT controls
document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    document.querySelectorAll(".selectBlackMesaMaps").forEach(function (selectControl) {
        let selectedMap = _.sample(SRCDS.BlackMesa.Maps);

        SRCDS.BlackMesa.Maps.forEach(function (mapName) {
            let option = document.createElement("option");
            if (mapName === selectedMap) {
                option.selected = "selected";
            }
            option.text = mapName;
            selectControl.add(option);
        });
    });
});
