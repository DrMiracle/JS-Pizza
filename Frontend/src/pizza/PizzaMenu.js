/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML елемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Оновлення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
    $(".pizza-count").text(list.length.toString());
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        if(filter(pizza)) pizza_shown.push(pizza);
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
    $("#all-filter").click(function () {
        showPizzaList(Pizza_List);
        $("#meat-filter").removeClass("btn-selected");
        $("#pineapple-filter").removeClass("btn-selected");
        $("#mushroom-filter").removeClass("btn-selected");
        $("#seafood-filter").removeClass("btn-selected");
        $("#vegetarian-filter").removeClass("btn-selected");
        $("#all-filter").addClass("btn-selected");
    });
    $("#meat-filter").click(function () {
        filterPizza(function (pizza) {
            return !pizza.type.localeCompare('М’ясна піца');
        });
        $("#all-filter").removeClass("btn-selected");
        $("#pineapple-filter").removeClass("btn-selected");
        $("#mushroom-filter").removeClass("btn-selected");
        $("#seafood-filter").removeClass("btn-selected");
        $("#vegetarian-filter").removeClass("btn-selected");
        $("#meat-filter").addClass("btn-selected");
    });
    $("#pineapple-filter").click(function () {
        filterPizza(function (pizza) {
            return (typeof pizza.content.pineapple !== 'undefined');
        });
        $("#all-filter").removeClass("btn-selected");
        $("#meat-filter").removeClass("btn-selected");
        $("#mushroom-filter").removeClass("btn-selected");
        $("#seafood-filter").removeClass("btn-selected");
        $("#vegetarian-filter").removeClass("btn-selected");
        $("#pineapple-filter").addClass("btn-selected");
    });
    $("#mushroom-filter").click(function () {
        filterPizza(function (pizza) {
            return (typeof pizza.content.mushroom !== 'undefined');
        });
        $("#all-filter").removeClass("btn-selected");
        $("#meat-filter").removeClass("btn-selected");
        $("#pineapple-filter").removeClass("btn-selected");
        $("#seafood-filter").removeClass("btn-selected");
        $("#vegetarian-filter").removeClass("btn-selected");
        $("#mushroom-filter").addClass("btn-selected");
    });
    $("#seafood-filter").click(function () {
        filterPizza(function (pizza) {
            return (typeof pizza.content.ocean !== 'undefined');
        });
        $("#all-filter").removeClass("btn-selected");
        $("#meat-filter").removeClass("btn-selected");
        $("#pineapple-filter").removeClass("btn-selected");
        $("#mushroom-filter").removeClass("btn-selected");
        $("#vegetarian-filter").removeClass("btn-selected");
        $("#seafood-filter").addClass("btn-selected");
    });
    $("#vegetarian-filter").click(function () {
        filterPizza(function (pizza) {
            return !pizza.type.localeCompare('Вега піца');
        });
        $("#all-filter").removeClass("btn-selected");
        $("#meat-filter").removeClass("btn-selected");
        $("#pineapple-filter").removeClass("btn-selected");
        $("#mushroom-filter").removeClass("btn-selected");
        $("#seafood-filter").removeClass("btn-selected");
        $("#vegetarian-filter").addClass("btn-selected");
    });
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;