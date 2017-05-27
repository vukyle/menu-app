var menu = {
    menuItems: [],
    orderList: [],
    addItem: function(name, price) {
        this.menuItems.push({
            name: name,
            price: price
        });
    },

    addToOrderList: function(name, price) {
        this.orderList.push({
            name: name,
            price: price,
            quantity: 1,
            totalPrice: null
        });
    },
    deleteItem: function(position) {
        this.orderList.splice(position, 1);
    },

    changeQuantityPlus: function(i) {
        this.orderList[i].quantity++;
    },

    changeQuantityMinus: function(i) {
        if (this.orderList[i].quantity > 1) {
            this.orderList[i].quantity--;
        }
    },
    calcObjectTotalPrice: function(position) {
    //menu.orderList[position].totalPrice = menu.orderList[position].price * menu.orderList[position].quantity;
    for(var i = 0; i < menu.orderList.length; i++) {
        menu.orderList[i].totalPrice = menu.orderList[i].price * menu.orderList[i].quantity;
    }

    },
    sumOfPrice: function() {
        var total = 0;
        menu.orderList.forEach(function(item) {
            total += item.totalPrice;
        });
        return total;
    },
    sumOfQuantity: function() {
        var total = 0;
        menu.orderList.forEach(function(item) {
            total += item.quantity;
        });
        return total;
    },
    assignPosition: function(node) {
        //debugger;
        var i = 0;
        while(node.previousSibling) {
            node = node.previousSibling;
            if(node.nodeType === 1 && node.className === 'menu__item' || node.nodeType === 1 && node.className === 'order__item') {
                i++;
            }
        }
        return i;
    }
};

var handlers = {
    addItem: function(id) {
        //debugger;
        //it should create and push menu.menuItems[i].name and price h4 and p respectively
        // var menuArray = document.querySelectorAll('.menu__item');
        // var menuName = menuArray[id].getElementsByTagName('h4')[0].innerHTML;
        // var menuPrice = menuArray[id].getElementsByTagName('p')[0].innerHTML;
        // menuPrice = parseInt(menuPrice.replace('$', ''));
        // var doesItemExist = null;

        var menuArray = document.querySelectorAll('.menu__item');
        var menuName = menuArray[id].querySelector('.menu__name').innerHTML;
        var menuPrice = menuArray[id].querySelector('.menu__price').innerHTML;
        menuPrice = parseInt(menuPrice.replace('$', ''));
        var doesItemExist = null;

        if ( menu.orderList.length === 0) {
            menu.addToOrderList(menuName, menuPrice);
            menu.calcObjectTotalPrice();
        } else {
            //it should check to see item is already in array. If item exist, the quantity updates. Othewise doesItemExist returns false and item gets pushed into array.
            for (var i = 0; i < menu.orderList.length; i++) {
                if (menuName === menu.orderList[i].name) {
                    menu.orderList[i].quantity++;
                    menu.orderList[i].totalPrice = menu.orderList[i].price * menu.orderList[i].quantity;
                    doesItemExist = true;
                    break;
                } else {
                    doesItemExist = false;
                }
            }
        }
        if (doesItemExist === false) {
            //it should push into array
            menu.addToOrderList(menuName, menuPrice);
            menu.calcObjectTotalPrice();
        }
        menu.sumOfQuantity();
        view.displayOrderList();
    },
    deleteItem: function(position) {
        menu.deleteItem(position);
        view.displayOrderList();
    },
    changeQuantityPlus: function(position) {
        menu.changeQuantityPlus(position);
        menu.calcObjectTotalPrice();
        view.displayOrderList();
    },
    changeQuantityMinus: function(position) {
        menu.changeQuantityMinus(position);
        menu.calcObjectTotalPrice();
        view.displayOrderList();
    },
    openOrderList: function() {
        //debugger;
        var orderContainer = document.querySelector('.order__container');
        if (menu.orderList.length > 0) {
            if (orderContainer.style.display === 'block') {
                orderContainer.style.display = 'none';
            } else {
                orderContainer.style.display = 'block';
            }
        }
    },
};

var view = {
    displayOrderList: function() {

        var takeOutOrderDiv = document.querySelector('.order__list');
        var orderContainer = document.querySelector('.order__container');

        takeOutOrderDiv.innerHTML = '';
        //Display close button for order list
        if (menu.orderList.length > 0) {
            takeOutOrderDiv.appendChild(this.createCloseButton());
            takeOutOrderDiv.appendChild(this.createOrderListHeader());
        } else { //closes modal when there are no items in the order list
            orderContainer.style.display = 'none';
        }

        for (var i = 0; i < menu.orderList.length; i++) {
            var menuName = menu.orderList[i].name;
            var menuPrice = menu.orderList[i].price;
            var quantity = menu.orderList[i].quantity;
            var newMenuAddition = this.createMenu(menuName, menuPrice);
            newMenuAddition.appendChild(this.createCounter(quantity));
            newMenuAddition.appendChild(this.createRemoveButton());
            takeOutOrderDiv.appendChild(newMenuAddition);
        }
        if (menu.orderList.length > 0) {
            takeOutOrderDiv.appendChild(this.createPriceTotal());
        }
    },
    createOrderListHeader: function() {
        var orderHeader = document.createElement('h1');

        orderHeader.className = 'order__header';
        orderHeader.textContent = 'Order List';
        return orderHeader;
    },
    createMenu: function(name, price) {
        var menuContainer = document.createElement('div');
        var menuNameElement = document.createElement('h4');
        var menuPriceElement = document.createElement('p');

        menuNameElement.textContent = name;
        menuPriceElement.textContent = '$' + price + '/ea';
        menuContainer.className = 'order__item';
        menuNameElement.className = 'order__name';
        menuPriceElement.className = 'order__price';
        menuContainer.appendChild(menuNameElement);
        menuContainer.appendChild(menuPriceElement);
        return menuContainer;
    },
    createRemoveButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = '✖';
        deleteButton.className = 'order__delete-button';
        return deleteButton;
    },

    createCounter: function(value) {
        var countContainer = document.createElement('div');
        var count = document.createElement('div');
        var minusButton = document.createElement('button');
        var plusButton = document.createElement('button');

        countContainer.className = 'order__count-container';
        count.setAttribute('class', 'order__count');
        count.textContent = value;

        countContainer.appendChild(this.createMinusButton());
        countContainer.appendChild(count);
        countContainer.appendChild(this.createPlusButton());
        return countContainer;
    },

    createPlusButton: function() {
        var plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.className = 'order__plus-button';
        return plusButton;
    },
    createMinusButton: function() {
        var minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.className = 'order__minus-button';
        return minusButton;
    },
    createPriceTotal: function() {
        var totalContainer = document.createElement('div');
        var priceTotal = document.createElement('div');
        var text = document.createElement('p');

        priceTotal.className = 'price-total';
        priceTotal.textContent = 'Total: $' + menu.sumOfPrice() + '.00';
        totalContainer.className = 'order__total';
        text.className = 'order__total-text';
        text.textContent = 'Call (626) 345-5128 to place your order';

        totalContainer.appendChild(priceTotal);
        totalContainer.appendChild(view.createQuantityTotal());
        totalContainer.appendChild(text);
        return totalContainer;
    },
    createQuantityTotal: function() {
        var quantityTotal = document.createElement('div');
        quantityTotal.textContent = 'Items ordered: ' + menu.sumOfQuantity();
        return quantityTotal;
    },
    createCloseButton: function() {
        var closeButton = document.createElement('span');
        var closeIcon = document.createElement('i');

        closeButton.setAttribute('onclick', 'handlers.openOrderList()');
        closeButton.className = 'order__close-button';
        closeIcon.textContent = 'clear';
        closeIcon.className = 'material-icons';

        closeButton.appendChild(closeIcon);
        return closeButton;
    },

    setupEventListeners: function() {
        var menuItemArray = document.querySelectorAll('.menu__item');
        var menuContainer = document.querySelector('.menu');
        var orderList = document.querySelector('.order__list');
        var orderContainer = document.querySelector('.order__container');

        menuContainer.addEventListener('click', function(event) {
            var popup = document.querySelector('.item-added-popup');
            var displayButton = document.querySelector('.order-list-display-button');
            var elementClicked = event.target;
            if (elementClicked.nodeName === 'BUTTON') {
                handlers.addItem(parseInt(menu.assignPosition(elementClicked.parentNode)));
                //displays popup message that item was added
                popup.style.display = 'inline-block';
                setTimeout(function(){
                    popup.style.display = 'none';
                }, 1500);

                //display button to view order list
                displayButton.style.visibility = 'visible';
                displayButton.className += ' order-list-display-button--animated';
                setTimeout(function() {
                    displayButton.className = 'order-list-display-button';
                }, 1500);
            }
        });

        orderList.addEventListener('click', function(event) {
            var elementClicked = event.target;
            if (elementClicked.className === 'order__delete-button') {
                handlers.deleteItem(parseInt(menu.assignPosition(elementClicked.parentNode)));
            } else if (elementClicked.className === 'order__plus-button') {
                handlers.changeQuantityPlus(parseInt(menu.assignPosition(elementClicked.parentNode.parentNode)));

            } else if (elementClicked.className === 'order__minus-button') {
                handlers.changeQuantityMinus(parseInt(menu.assignPosition(elementClicked.parentNode.parentNode)));
            }
        });

        orderContainer.addEventListener('click', function(event) {
            var elementClicked = event.target;
            if (elementClicked.className === 'order__container') {
                elementClicked.style.display = 'none';
            }
        });
    }
};

view.setupEventListeners();
