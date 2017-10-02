var SRCDS = SRCDS || {};
SRCDS.DODS = SRCDS.DODS || {};

SRCDS.DODS.Maps = ["dod_anzio", "dod_argentan", "dod_avalanche", "dod_colmar", "dod_donner", "dod_flash", "dod_jagd", "dod_kalt", "dod_palermo"];

SRCDS.DODS.Launch_Freeplay = function (hostname, map, ip) {
    "use strict";

    let clientConnectString = 'N/A',
        dockerCommand = 'docker run -d ',
        dockerContainerName = Docker.GenerateContainerName("DODSFreeplay"),
        dockerArgs = '',
        serverLaunchString = '',
        srcdsCommand = './srcds_run ',
        srcdsArgs = '';

    do {
        hostname = (hostname)
            ? String(hostname)
            : 'LL Arms Race Server';
        hostname = hostname.split(' ').join('_');

        if (!map) {
            alert('ERROR - NO MAP WAS SPECIFIED!');
            break;
        }

        if (!ip) {
            alert('ERROR - NO SERVER WAS SPECIFIED!');
            break;
        }

        // Docker Command
        dockerArgs += '--name ' + dockerContainerName + ' ';
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

        serverLaunchString = modalFormatCommands(dockerCommand, dockerArgs, [srcdsCommand, srcdsArgs]);

        clientConnectString = 'connect ' + ip + ':27015';

        UI.displayModal(
            "DODS Freeplay",
            {
                "Launch String": serverLaunchString,
                "Client Connect": clientConnectString
            }
        );

        addLogMessage('DODS Freeplay', serverLaunchString);

    } while (false);
};


/// Add Maps to all appropriate HTML SELECT controls
document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    Array.prototype.forEach.call(document.querySelectorAll(".selectDodsMap"), function (selectControl) {
        let option,
            selectedMap = _.sample(SRCDS.DODS.Maps);        

        SRCDS.DODS.Maps.forEach(function (mapName) {
            option = document.createElement("option");
            if (mapName === selectedMap) {
                option.selected = "selected";
            }
            option.text = mapName;
            selectControl.add(option);
        });
    });
});
