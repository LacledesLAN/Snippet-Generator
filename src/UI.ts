
function AddSelectControl(domElement: Element, id: string) : HTMLSelectElement {
    let selectControl = document.createElement("select");
    selectControl.classList.add("custom-select");
    selectControl.classList.add("col-sm-4");
    selectControl.id = id.trim();

    domElement.appendChild(selectControl);

    return selectControl;
}

function AddToSelectControl(category: string, items: string[], selectControl: Element, placeholderText? : string) {
    if (items.length < 1) {
        return;
    }

    if (selectControl.childElementCount < 1) {
        let option = document.createElement("option");
        option.text = placeholderText == null ? "": placeholderText;
        option.value = "";
        option.disabled = true;
        option.selected = true;
        selectControl.appendChild(option);
    }

    let header = document.createElement('optgroup');
    header.label = category;

    for (let item of items) {
        let option = document.createElement("option");
        option.text = item
        option.value = item;
        header.appendChild(option)
    }
    selectControl.appendChild(header);
};

function AddHostsToSelectControl(hosts: Map<string, Host>, selectControl: Element, placeholderText? : string) {
    let productionHosts : string[] = [];
    let testHosts: string[] = [];

    hosts.forEach((value: Host, key: string) => {
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
};

function AddIPsToSelectControl(hostName: string, selectControl: Element) {
    let host : Host;
    Hosts.forEach((value: Host, key: string) => {
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
};

function buildHostSelectControl(divsToAugment: HTMLCollectionOf<Element>) {
    if (divsToAugment.length < 1) {
        return;
    }

    for (let i = 0; i < divsToAugment.length; i++)
    {
        let parentElement : Element = divsToAugment[i];
        parentElement.innerHTML = "";
        parentElement.id = (Math.random()*1e32).toString(36).toUpperCase();

        let HostSelectControl = AddSelectControl(parentElement, parentElement.id + "-HostSelect");

        AddHostsToSelectControl(Hosts, HostSelectControl, "Pick Host");

        let bindingParent = document.createElement("span");
        bindingParent.id = parentElement.id + "-BindingParent";

        HostSelectControl.onchange = function() {
            bindingParent.innerHTML = "";
            let BindingSelectControl = AddSelectControl(bindingParent, parentElement.id + "-BindingSelect")
            BindingSelectControl.classList.add("SelectedBinding");
            AddIPsToSelectControl(HostSelectControl.value, BindingSelectControl);
        };

        parentElement.appendChild(HostSelectControl);
        parentElement.appendChild(bindingParent);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    //let elements: HTMLCollectionOf<Element> = document.getElementsByClassName("selectServerBinding");
    //addHostsToSelects(Hosts, elements, "Pick Host");

    let elemens: HTMLCollectionOf<Element> = document.getElementsByClassName("SelectHost");
    buildHostSelectControl(elemens);


});
