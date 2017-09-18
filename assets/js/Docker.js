var Docker = Docker || {};

Docker.NetString_SRCDS = function (ip) {
    "use strict";

    let netString = "",
        portsUDP = ["27015", "27020"],
        portsTCP = ["27015", "27020"];

    ip = ip.toString().trim().toLowerCase();

    if (ip && ip !== "0.0.0.0" && ip !== "localhost") {
        ip += ":";
    } else {
        ip = "";
    }

    portsUDP.forEach(function (portSet) {
        netString += "-p=" + ip + portSet + ":" + portSet + "/udp ";
    });

    portsTCP.forEach(function (portSet) {
        netString += "-p=" + ip + portSet + ":" + portSet + "/tcp ";
    });

    return netString.trim();
};

Docker.GenerateContainerName = function (prefix) {
    "use strict";

    let containerName = "",
        currentDate = new Date();

    if (prefix.toString().trim().length > 0) {
        containerName = prefix + '_';
    }

    containerName += ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][currentDate.getDay()];
    containerName += _.padStart(currentDate.getHours(), 2, "0") + "h";
    containerName += _.padStart(currentDate.getMinutes(), 2, "0") + "m";
    containerName += _.padStart(currentDate.getSeconds(), 2, "0") + "s";

    return containerName;
};
