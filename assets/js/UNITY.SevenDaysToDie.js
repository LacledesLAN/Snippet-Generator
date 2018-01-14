var UNITY = UNITY || {};
UNITY.SevenDaysToDie = UNITY.SevenDaysToDie || {};

UNITY.SevenDaysToDie.LaunchFreeplay = function (ip) {
    "use strict";

    let dockerArgs = '';

    if (!ip) {
        alert("ERROR - NO SERVER WAS SELECTED");
        return;
    }

    // Docker Arguments
    dockerArgs += '--name ' + Docker.GenerateContainerName('7DaysToDie') + ' ';
    dockerArgs += Docker.NetString_7DaysToDie(ip) + ' ';
    dockerArgs += 'lacledeslan/gamesvr-7daystodie ';

    UI.displayModal(
        "7 Days to Die Freeplay",
        {
            "Launch String": UI.formatCommands('docker run -d ', dockerArgs, ['./startserver.sh ', '-configfile=serverconfig.xml'])
        }
    );
};
