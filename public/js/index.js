"use strict";
var bAdd = document.querySelector('#bAdd');
var inputTitle = document.querySelector('#title');
var inputCost = document.querySelector('#cost');
var inputCurrency = document.querySelector('#currency');
/*Arriba de paso tenemos formas distintas de castear*/
var expenses = new Expenses('USD');
bAdd.addEventListener('click', function (e) {
    if (inputTitle.value != '' && inputCost.value != '' && !isNaN(parseFloat(inputCost.value))) {
        var title = inputTitle.value;
        var cost = inputCost.value;
        var currency = inputCurrency.value;
        expenses.add({ title: title, cost: { number: parseFloat(cost), currency: currency } });
        render();
    }
    else {
        alert('Completa los datos correctamente');
    }
});
function render() {
    var html = '';
    expenses.getItems().forEach(function (item) {
        var id = item.id, title = item.title, cost = item.cost;
        html += "\n        <div class=\"item\">\n            <div><span class=\"currency\">".concat(cost.currency, "</span>").concat(cost.number, "</div>\n            <div>").concat(title, "</div>\n            <div><button class=\"bEliminar\" data-id=\"").concat(id, "\">Eliminar</button></div>\n        </div>\n        ");
    });
    $('#items').innerHTML = html;
    $('#display').textContent = expenses.getTotal();
    $$('.bEliminar').forEach(function (bEliminar) {
        bEliminar.addEventListener('click', function (e) {
            var id = e.target.getAttribute('data-id');
            expenses.remove(parseInt(id));
            render();
        });
    });
}
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
