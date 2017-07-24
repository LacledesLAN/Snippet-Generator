
var BareMetal = BareMetal || {};

BareMetal.ServerPool = {
    "prod": {
        "Bruce":        ["172.30.12.11", "172.30.12.12", "172.30.12.13", "172.30.12.14", "172.30.12.15", "172.30.12.16", "172.30.12.17", "172.30.12.18"],
        "Gibson":       ["172.30.12.21", "172.30.12.22", "172.30.12.23", "172.30.12.24", "172.30.12.25", "172.30.12.26", "172.30.12.27", "172.30.12.28"],
        "Hull":         ["172.30.12.31", "172.30.12.32", "172.30.12.33", "172.30.12.34", "172.30.12.35", "172.30.12.36", "172.30.12.37", "172.30.12.38"],
        "Kelly":        ["172.30.12.41", "172.30.12.42", "172.30.12.43", "172.30.12.44", "172.30.12.45", "172.30.12.46", "172.30.12.47", "172.30.12.48"],
        "McGee":        ["172.30.12.51", "172.30.12.52", "172.30.12.53", "172.30.12.54", "172.30.12.55", "172.30.12.56", "172.30.12.57", "172.30.12.58"],
        "Musial":       ["172.30.12.61", "172.30.12.62", "172.30.12.63", "172.30.12.64", "172.30.12.65", "172.30.12.66", "172.30.12.67", "172.30.12.68"],
        "Reeves":       ["172.30.12.71", "172.30.12.72", "172.30.12.73", "172.30.12.74", "172.30.12.75", "172.30.12.76", "172.30.12.77", "172.30.12.78"],
        "Rosenbloom":   ["172.30.12.81", "172.30.12.82", "172.30.12.83", "172.30.12.84", "172.30.12.85", "172.30.12.86", "172.30.12.87", "172.30.12.88"],
        "Youngblood":   ["172.30.12.91", "172.30.12.92", "172.30.12.93", "172.30.12.94", "172.30.12.95", "172.30.12.96", "172.30.12.97", "172.30.12.98"]
    },
    "test": {
        "localhost":            ["0.0.0.0"],
        "BEAN TEST Fuhr":       ["172.30.10.31", "172.30.10.32", "172.30.10.33", "172.30.10.34", "172.30.10.35", "172.30.10.36", "172.30.10.37", "172.30.10.38"],
        "DUDLEY TEST Ozzie":    ["172.30.10.12", "172.30.10.13"]
    }
}

BareMetal.GetCPUFromIPAddress = function (ipAddress)
{
    switch (ipAddress.substr(ipAddress.length - 1, 1)) {
        case '1':   return 4;
        case '2':   return 3;
        case '3':   return 5;
        case '4':   return 2;
        case '5':   return 6;
        case '6':   return 1;
        case '7':   return 7;
        case '8':   return 0;
        default:    return;
    }
}


$( document ).ready(function() {
    $(".selectBareMetalServer").each(
        function() {
            let selectControl = this;

            $(selectControl).append(
                $("<option>", {
                    text: "",
                }),
                $("<option>", {
                    disabled: "disabled",
                    text: "[Production Servers]",
                })
            );

            for (let server in BareMetal.ServerPool.prod) {
                for (let element in BareMetal.ServerPool.prod[server]) {

                    let ipAddress = BareMetal.ServerPool.prod[server][element];

                    $(selectControl).append(
                        $("<option>", {
                            text: server + " (" + ipAddress + " on cpu " + BareMetal.GetCPUFromIPAddress(ipAddress) + ")",
                            value: ipAddress
                        })
                    );
                }
            }

            $(selectControl).append(
                $("<option>", {
                    disabled: "disabled",
                    text: "========================"               
                }),
                $("<option>", {
                    disabled: "disabled",
                    text: "     [Test Servers]"
                }),
                $("<option>", {
                    disabled: "disabled",
                    text: "========================"
                })
            );

            for (let server in BareMetal.ServerPool.test) {
                for (let element in BareMetal.ServerPool.test[server]) {

                    let cpu = '',
                        description = '',
                        ipAddress = BareMetal.ServerPool.test[server][element].trim();
                    
                    if (ipAddress != 'localhost' && ipAddress != '0.0.0.0') {
                        description = " (" + ipAddress + " on cpu " + BareMetal.GetCPUFromIPAddress(ipAddress) + ")";
                    }

                    $(selectControl).append(
                        $("<option>", {
                            text: server + description,
                            value: ipAddress
                        })
                    );
                }
            }

        }
    );
});
