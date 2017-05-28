
var menuData;

window.onload = function () {
    // var http = new XMLHttpRequest();
    //
    // http.onreadystatechange = function() {
    //     if (http.readyState === 4 && http.status === 200) {
    //         //console.log(JSON.parse(http.response));
    //     }
    // };
    //
    // http.open('GET', "data/menu.json", true);
    // http.send();

    $.get("data/menu.json", function(data) {
        menuData = data;
    });


};

function createMenu(data) {
    var menuContainer = document.getElementById("menu");
    var newMenu = data;
    function createTitle(input) {
        var title = document.createElement("H3");
        title.className = "menu__title";
        title.textContent = input;
        return title;
    }

    function createMenuItem(name, price, description) {
        menuItem = document.createElement("DIV");
        menuItem.className = "menu__item";

        menuItem.appendChild(name);
        menuItem.appendChild(price);
        menuItem.appendChild(description);
        menuItem.appendChild(createButton());

        return menuItem;
    }

    function createName(input) {
        name = document.createElement("H4");
        name.className = "menu__name";
        name.textContent = input;
        return name;
    }

    function createPrice(input) {
        price = document.createElement("p");
        price.className = "menu__price";
        price.textContent = input;
        return price;
    }

    function createDescription(input) {
        description = document.createElement("p");
        description.className = "menu__description";
        description.textContent = input;
        return description;
    }
    function createButton() {
        button = document.createElement("BUTTON");
        button.className = "menu__add-button";
        button.textContent = "+";
        return button;
    }


    for (var i = 0; i < newMenu.menu.length; i++) {
        for (var j = 0; j < newMenu.menu[i].type.length; j++) {
            if (j === 0) {
                var newTitle = createTitle(newMenu.menu[i].type[0]);
                menuContainer.appendChild(newTitle);
            } else {

                var name = createName(newMenu.menu[i].type[j].name);
                var price = createPrice(newMenu.menu[i].type[j].price);
                var description = createDescription(newMenu.menu[i].type[j].description);

                menuContainer.appendChild(createMenuItem(name, price, description));
            }
        }
    }
}
