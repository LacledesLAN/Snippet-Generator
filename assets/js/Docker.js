var Docker = Docker || {};

Docker.NeString = function (ip, portsTCP, portsUDP) {
    "use strict";

    ip = ip.toString().trim().toLowerCase();

    if (ip === '0.0.0.0') {
        return '--net=host';
    }

    ip = (ip && ip !== "localhost") ? ip + ':' : '';

    let netString = '';

    portsTCP.forEach(function (portSet) {
        netString += "-p=" + ip + portSet + ":" + portSet + "/tcp ";
    });

    portsUDP.forEach(function (portSet) {
        netString += "-p=" + ip + portSet + ":" + portSet + "/udp ";
    });

    return netString.trim();
};

Docker.NetString_SRCDS = function (ip) {
    "use strict";

    return Docker.NeString(ip, ["27015", "27020"], ["27015", "27020"]);
};

Docker.GenerateContainerName = function (prefix) {
    "use strict";

    let containerName = "",
        currentDate = new Date();

    if (prefix.toString().trim().length > 0) {
        containerName = prefix + '_';
    }

    containerName += ["Su", "Mo", "Tu", "Wd", "Th", "Fr", "Sa"][currentDate.getDay()];
    containerName += _.padStart(currentDate.getHours(), 2, "0") + "h";
    containerName += _.padStart(currentDate.getMinutes(), 2, "0") + "m";
    containerName += _.padStart(currentDate.getSeconds(), 2, "0") + "s";

    return containerName;
};
