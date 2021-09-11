function testbuttonOnClick(button) {
    window.alert(button.id + " was Clicked");
}

var counter = 0;
var current_container;
var container_hostid;

function addToModelIn(container_host_id) {
    container_hostid = container_host_id;
    current_container = document.getElementById(container_hostid);
    // window.alert(container_host_id + " was selected as host");
    counter += 1;
    let dv = createElement(counter);
    current_container.appendChild(dv);
}

function createElement(_id) {
    let lbl = document.createElement("LABEL");
    lbl.setAttribute("for", "input_" + _id);
    lbl.innerHTML = "input_" + _id;

    var inpt = document.createElement("INPUT");
    inpt.setAttribute("type", "text");
    inpt.setAttribute("id", "input_" + _id);

    var btn = document.createElement("BUTTON");
    btn.setAttribute("onclick", "removeElement('" + "inputhost_" + _id + "')");
    btn.innerHTML = "Remove";

    var dv = document.createElement("DIV");
    dv.setAttribute("id", "inputhost_" + _id);
    dv.appendChild(btn);
    dv.appendChild(lbl);
    dv.appendChild(inpt);
    return dv;
}

function removeElement(element_id) {
    var dv = document.getElementById(element_id);
    if (dv) {
        dv.parentNode.removeChild(dv);
    }
}

function buildModelFrom(_container_hostid) {
    current_container = document.getElementById(_container_hostid);
    var children = current_container.children;
    var elements = []
    var x = 0;
    // Loop in container elements (are DIVs)
    for (var i = 0; i < children.length; i++) {
        var dv = children[i]; // Get the DIV
        var elementChildren = dv.children;
        // Loop in DIV's children (a button, a lable, an input text)
        for (var j = 0; j < elementChildren.length; j++) {
            var inpt = elementChildren[j]; // Get the sub element
            // Finde the input text
            if (inpt && inpt.type == "text") {
                // Get Input Text ID and value => put in JSON data structure
                var jsonElement = {};
                jsonElement["id"] = inpt.getAttribute("id");
                jsonElement["value"] = inpt.value;
                elements[x] = jsonElement;
                x++;
            }
        }
    }
    var json = JSON.stringify(elements);
    return json;
}

function navigateToProxy(jsonData) {
    window.location.replace('https://internal.meshui.api/?json=' + jsonData);
}

// Function interacting with host environment (Android, iOS, Browser)
function API_SaveModelFrom(_container_hostid) {
    var json = buildModelFrom(_container_hostid);
    navigateToProxy(json);
}