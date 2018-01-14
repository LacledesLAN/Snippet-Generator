var Docker = Docker || {};



Docker.NetString = function (ip, portsTCP, portsUDP) {
    "use strict";

    ip = ip.toString().trim().toLowerCase();

    // using localhost network stack
    if (ip === '0.0.0.0') {
        return '--net=host';
    }

    // Determine if ip address is part of a Docker-defined network
    let usingDockerNetwork = null;
    Object.keys(LLNetwork.DockerNetworks).forEach(function (networkName) {
        if (_.indexOf(LLNetwork.DockerNetworks[networkName], ip) > -1) {
            usingDockerNetwork = networkName;
        }
    });

    if (usingDockerNetwork !== null) {
        return '--network=' + usingDockerNetwork + ' --ip ' + ip;
    }

    ip = (ip && ip !== "localhost")
        ? ip + ':'
        : '';

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

    return Docker.NetString(ip, ["27015", "27020"], ["27015", "27020"]);
};

Docker.NetString_7DaysToDie = function (ip) {
    "use strict";

    return Docker.NetString(ip, ["8080", "26900"], ["26900"]);
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
