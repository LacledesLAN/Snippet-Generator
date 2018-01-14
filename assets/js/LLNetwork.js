var LLNetwork = LLNetwork || {};

LLNetwork.Servers = {};

LLNetwork.Servers.Production = {
    "Bruce":        ["172.30.12.10", "172.30.12.11", "172.30.12.12", "172.30.12.13", "172.30.12.14"],
    "Gibson":       ["172.30.12.15", "172.30.12.16", "172.30.12.17", "172.30.12.18", "172.30.12.19"],
    "Hull":         ["172.30.12.20", "172.30.12.21", "172.30.12.22", "172.30.12.23", "172.30.12.24"],
    "Kelly":        ["172.30.12.25", "172.30.12.26", "172.30.12.27", "172.30.12.28", "172.30.12.29"],
    "McGee":        ["172.30.12.30", "172.30.12.31", "172.30.12.32", "172.30.12.33", "172.30.12.34"],
    "Musial":       ["172.30.12.35", "172.30.12.36", "172.30.12.37", "172.30.12.38", "172.30.12.39"],
    "Reeves":       ["172.30.12.40", "172.30.12.41", "172.30.12.42", "172.30.12.43", "172.30.12.44"],
    "Rosenbloom":   ["172.30.12.45", "172.30.12.46", "172.30.12.47", "172.30.12.48", "172.30.12.49"],
    "Youngblood":   ["172.30.12.50", "172.30.12.51", "172.30.12.52", "172.30.12.53", "172.30.12.54"]
};

LLNetwork.Servers.Test = {
    "--net=host":           ["0.0.0.0"],
    "localhost":            ["localhost"],
    "BEAN TEST Fuhr":       ["172.30.10.30", "172.30.10.31", "172.30.10.32", "172.30.10.33", "172.30.10.34"],
    "DUDLEY TEST Ozzie":    ["172.30.10.12", "172.30.10.13", "172.30.10.14"]
};

// static stop-gap until angular rewrite
LLNetwork.DockerNetworks = {
    "llnet": [
        "172.30.14.10", "172.30.14.20", "172.30.14.30", "172.30.14.40", "172.30.14.50",
        "172.30.14.60", "172.30.14.70", "172.30.14.80", "172.30.14.90", "172.30.14.100",
        "172.30.14.110", "172.30.14.120", "172.30.14.130", "172.30.14.140", "172.30.14.150",
        "172.30.14.160", "172.30.14.170", "172.30.14.180", "172.30.14.190", "172.30.14.200",
        "172.30.14.210", "172.30.14.220", "172.30.14.230", "172.30.14.240", "172.30.14.250"
    ]
};

var llnetworkInitialized = false;
document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    if (llnetworkInitialized) {
        return;
    }
    llnetworkInitialized = true;

    console.log("[Adding server bindings to appropriate select controls]");

    Array.prototype.forEach.call(document.querySelectorAll(".selectServerBinding"), function (selectControl) {
        let option;

        // Add blank option at top of select control
        option = document.createElement("option");
        option.disabled = "disabled";
        option.selected = "selected";
        option.text = "pick server binding...";
        option.value = "";
        selectControl.add(option);

        // Add all docker defined networks to appropriate html select controls
        Object.keys(LLNetwork.DockerNetworks).forEach(function (networkName, index) {
            // Add Header
            option = document.createElement("option");
            option.disabled = "disabled";
            option.text = '[Docker Network]';
            selectControl.add(option);

            // Add IPs
            Object.keys(LLNetwork.DockerNetworks[networkName]).forEach(function (index) {
                let ip = LLNetwork.DockerNetworks[networkName][index];
                option = document.createElement("option");
                option.text = '(' + networkName + ') ' + ip;
                option.value = ip;
                selectControl.add(option);
            });
        });

        // Add all servers to appropriate html select controls
        Object.keys(LLNetwork.Servers).forEach(function (environment, index) {
            // Add header
            option = document.createElement("option");
            option.disabled = "disabled";
            option.text = '[' + environment + ' Servers]';
            selectControl.add(option);

            // Add IPs
            Object.keys(LLNetwork.Servers[environment]).forEach(function (serverName) {
                LLNetwork.Servers[environment][serverName].forEach(function (ip) {
                    option = document.createElement("option");
                    option.text = serverName;
                    if (ip === 'localhost') {
                        option.text += ' (no IP specified)';
                    } else if (ip === '0.0.0.0') {
                        option.text += ' (all ports accessible)';
                    } else {
                        option.text += ' (' + ip + ')';
                    }
                    option.value = ip;
                    selectControl.add(option);
                });
            });
        });
    });
});
