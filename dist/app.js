"use strict";
function AddSelectControl(domElement, id) {
    let selectControl = document.createElement("select");
    selectControl.classList.add("custom-select");
    selectControl.classList.add("col-sm-4");
    selectControl.id = id.trim();
    domElement.appendChild(selectControl);
    return selectControl;
}
function AddToSelectControl(category, items, selectControl, placeholderText) {
    if (items.length < 1) {
        return;
    }
    if (selectControl.childElementCount < 1) {
        let option = document.createElement("option");
        option.text = placeholderText == null ? "" : placeholderText;
        option.value = "";
        option.disabled = true;
        option.selected = true;
        selectControl.appendChild(option);
    }
    let header = document.createElement('optgroup');
    header.label = category;
    for (let item of items) {
        let option = document.createElement("option");
        option.text = item;
        option.value = item;
        header.appendChild(option);
    }
    selectControl.appendChild(header);
}
;
function AddHostsToSelectControl(hosts, selectControl, placeholderText) {
    let productionHosts = [];
    let testHosts = [];
    hosts.forEach((value, key) => {
        if (value.type == NodeType.Production) {
            productionHosts.push(key);
        }
        else {
            testHosts.push(key);
        }
    });
    productionHosts.sort();
    testHosts.sort();
    AddToSelectControl("Production Nodes", productionHosts, selectControl, placeholderText);
    AddToSelectControl("Test Nodes", testHosts, selectControl, placeholderText);
}
;
function AddIPsToSelectControl(hostName, selectControl) {
    let host;
    Hosts.forEach((value, key) => {
        if (key == hostName) {
            host = value;
            return;
        }
    });
    if (hostName.trim().toLowerCase() == 'localhost') {
        let option = document.createElement("option");
        option.text = "--net=host";
        option.value = "localhost";
        option.selected = true;
        selectControl.appendChild(option);
        return;
    }
    if (!selectControl.classList.contains("noDiscoverable")) {
        AddToSelectControl("Discoverable", host.publicIps, selectControl, 'Select Binding');
    }
    AddToSelectControl("Hidden", host.privateIps, selectControl, 'Select Binding');
}
;
function buildHostSelectControl(divsToAugment) {
    if (divsToAugment.length < 1) {
        return;
    }
    for (let i = 0; i < divsToAugment.length; i++) {
        let parentElement = divsToAugment[i];
        parentElement.innerHTML = "";
        parentElement.id = (Math.random() * 1e32).toString(36).toUpperCase();
        let HostSelectControl = AddSelectControl(parentElement, parentElement.id + "-HostSelect");
        AddHostsToSelectControl(Hosts, HostSelectControl, "Pick Host");
        let bindingParent = document.createElement("span");
        bindingParent.id = parentElement.id + "-BindingParent";
        HostSelectControl.onchange = function () {
            bindingParent.innerHTML = "";
            let BindingSelectControl = AddSelectControl(bindingParent, parentElement.id + "-BindingSelect");
            BindingSelectControl.classList.add("SelectedBinding");
            AddIPsToSelectControl(HostSelectControl.value, BindingSelectControl);
        };
        parentElement.appendChild(HostSelectControl);
        parentElement.appendChild(bindingParent);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    let elemens = document.getElementsByClassName("SelectHost");
    buildHostSelectControl(elemens);
});
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Production"] = 1] = "Production";
    NodeType[NodeType["Test"] = 2] = "Test";
})(NodeType || (NodeType = {}));
class Host {
    constructor(type = NodeType.Production) {
        this.privateIps = [];
        this.publicIps = [];
        this.type = type;
    }
    AddVlanIPs(...ips) {
        for (let ip of ips) {
            this.publicIps.push(ip);
        }
        return this;
    }
    AddHostIPs(...ips) {
        for (let ip of ips) {
            this.privateIps.push(ip);
        }
        return this;
    }
}
;
let Hosts = new Map();
Hosts.set("Bruce", new Host()
    .AddHostIPs("172.30.12.10", "172.30.12.11", "172.30.12.12", "172.30.12.13", "172.30.12.14")
    .AddVlanIPs("172.30.14.10", "172.30.14.11", "172.30.14.12", "172.30.14.13", "172.30.14.14"));
Hosts.set("Gibson", new Host()
    .AddHostIPs("172.30.12.15", "172.30.12.16", "172.30.12.17", "172.30.12.18", "172.30.12.19")
    .AddVlanIPs("172.30.14.15", "172.30.14.16", "172.30.14.17", "172.30.14.18", "172.30.14.19"));
Hosts.set("Harvey", new Host()
    .AddHostIPs("172.30.12.55", "172.30.12.56", "172.30.12.57", "172.30.12.58", "172.30.12.59", "172.30.12.60", "172.30.12.61", "172.30.12.62", "172.30.12.63", "172.30.12.64")
    .AddVlanIPs("172.30.14.55", "172.30.14.56", "172.30.14.57", "172.30.14.58", "172.30.14.59", "172.30.14.60", "172.30.14.61", "172.30.14.62", "172.30.14.63", "172.30.14.64"));
Hosts.set("Hull", new Host()
    .AddHostIPs("172.30.12.20", "172.30.12.21", "172.30.12.22", "172.30.12.23", "172.30.12.24")
    .AddVlanIPs("172.30.14.20", "172.30.14.21", "172.30.14.22", "172.30.14.23", "172.30.14.24"));
Hosts.set("Kelly", new Host()
    .AddHostIPs("172.30.12.25", "172.30.12.26", "172.30.12.27", "172.30.12.28", "172.30.12.29")
    .AddVlanIPs("172.30.14.25", "172.30.14.26", "172.30.14.27", "172.30.14.28", "172.30.14.29"));
Hosts.set("McGee", new Host()
    .AddHostIPs("172.30.12.30", "172.30.12.31", "172.30.12.32", "172.30.12.33", "172.30.12.34")
    .AddVlanIPs("172.30.14.30", "172.30.14.31", "172.30.14.32", "172.30.14.33", "172.30.14.34"));
Hosts.set("Musial", new Host()
    .AddHostIPs("172.30.12.35", "172.30.12.36", "172.30.12.37", "172.30.12.38", "172.30.12.39")
    .AddVlanIPs("172.30.14.35", "172.30.14.36", "172.30.14.37", "172.30.14.38", "172.30.14.39"));
Hosts.set("Reeves", new Host()
    .AddHostIPs("172.30.12.40", "172.30.12.41", "172.30.12.42", "172.30.12.43", "172.30.12.44")
    .AddVlanIPs("172.30.14.40", "172.30.14.41", "172.30.14.42", "172.30.14.43", "172.30.14.44"));
Hosts.set("Rosenbloom", new Host()
    .AddHostIPs("172.30.12.45", "172.30.12.46", "172.30.12.47", "172.30.12.48", "172.30.12.49")
    .AddVlanIPs("172.30.14.45", "172.30.14.46", "172.30.14.47", "172.30.14.48", "172.30.14.49"));
Hosts.set("Youngblood", new Host()
    .AddHostIPs("172.30.12.50", "172.30.12.51", "172.30.12.52", "172.30.12.53", "172.30.12.54")
    .AddVlanIPs("172.30.14.50", "172.30.14.51", "172.30.14.52", "172.30.14.53", "172.30.14.54"));
Hosts.set("Localhost", new Host(NodeType.Test));
Hosts.set("Ozzie (Dudley VM)", new Host(NodeType.Test)
    .AddHostIPs("172.30.10.50", "172.30.10.51", "172.30.10.52", "172.30.10.53", "172.30.10.54")
    .AddVlanIPs("172.30.14.220", "172.30.14.221", "172.30.14.222", "172.30.14.223", "172.30.14.224"));
//# sourceMappingURL=app.js.map