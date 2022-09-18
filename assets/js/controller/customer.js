import { foods } from '../entity/food.js';
import { currentPath, getItem, setItem } from '../utils/utils.js';
import { Order, orders } from '../entity/order.js';
import { currentUser, users } from '../auth/user.js';
import { BASKET } from '../constants.js';
var basket = getItem(BASKET) || [];


function buyOrder(e) {
    const allFoodsPrice = document.getElementById("all_foods_price").innerHTML;
    const courierPrice = document.getElementById("courier_price").innerHTML;
    const allPrice = document.getElementById("all_courier_price").innerHTML;


    basket.forEach(food => {
        let order = Order.create({
            name: food.name, amount: allFoodsPrice, restaurant_id: food.restaurant_id, courier_price: courierPrice, all_price: allPrice
        });
        order.save();
        let food_id = food.id;
        let restaurant_id = food.restaurant_id;

        let newBasket = basket.filter(food => food.id != food_id && food.restaurant_id != restaurant_id && food.user_id != currentUser.id);
        if (newBasket) {
            basket = newBasket;
        } else {
            basket = [];
        }
        setItem(BASKET, newBasket);
        basket = newBasket;
    });

    renderBasket();
    renderOrder();
}

function order(e) {
    let id = e.target.id;
    let food_id = id.split("-")[0];
    let restaurant_id = id.split("-")[1];
    let check = basket.filter(food => food.id == food_id && food.restaurant_id == restaurant_id);
    if (!check.length) {
        let food = foods.find(food => food.id == food_id && food.restaurant_id == restaurant_id);
        food['user_id'] = currentUser.id;

        basket.push(food);
        setItem(BASKET, basket);
        renderBasket();
    }

}

function deleteBasket(e) {
    let id = e.target.id;
    let food_id = id.split("-")[0];
    let newBasket = basket.filter(food => food.id != food_id);

    if (newBasket) {
        basket = newBasket;
    } else {
        basket = [];
    }
    setItem(BASKET, newBasket);
    basket = newBasket;
    renderBasket();
}

function renderBasket() {
    const basketTable = document.getElementById("table_body_customerbasket");
    basketTable.innerHTML = '';
    basket.filter(e => e.user_id == currentUser.id).forEach((food) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${food.name}</td>
          <td>${food.price}</td>
          <td><button id="${food.id + '-' + food.restaurant_id + '-bucket'}">delete</button></td>
        `;
        basketTable.append(tr);
        document.getElementById(`${food.id + '-' + food.restaurant_id + '-bucket'}`).addEventListener("click", deleteBasket);
    });

    const allFoodsPrice = document.getElementById("all_foods_price");
    const courierPrice = document.getElementById("courier_price");
    const allCourierPrice = document.getElementById("all_courier_price");

    let priceFood = basket.reduce((a, b) => {
        a += Number(b.price);
        return a;
    }, 0);
    let courier_price = (priceFood * 10) / 100;

    courierPrice.innerHTML = courier_price;
    allFoodsPrice.innerHTML = priceFood;
    allCourierPrice.innerHTML = Number(priceFood) + Number(courier_price);
}

function renderFoods() {
    const tableFood = document.getElementById("table_body_customerfoods");
    tableFood.innerHTML = '';
    foods.forEach((food) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${food.name}</td>
          <td>${food.price}</td>
          <td>${users.find(user => user.id == food.restaurant_id).username}</td>
          <td><button id="${food.id + '-' + food.restaurant_id}">Order</button></td>
        `;
        tableFood.append(tr);
        document.getElementById(`${food.id + '-' + food.restaurant_id}`).addEventListener("click", order);
    });
}

function renderOrder() {
    const tableOrder = document.getElementById("table_body_customerorders");
    tableOrder.innerHTML = '';
    orders.filter(e => e.user_id == currentUser.id).forEach((order) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${order.name}</td>
          <td>${users.find(user => user.id == order.restaurant_id).username}</td>
          <td>${order.status == 0 ? "waiting" : order.status == 1 ? "accepted" : order.status == 2 ? "rejected" : order.status == 4 ? "delivered" : ''}</td>
        `;
        tableOrder.append(tr);
    });
}

if (currentPath == "/customer.html") {

    const nameTag = document.getElementById("customer_name");
    nameTag.innerHTML = nameTag.innerHTML + " " + currentUser.username;

    const budgetTag = document.getElementById("customer_budget");
    budgetTag.innerHTML = budgetTag.innerHTML + " " + currentUser.budget;

    const buyAllButton = document.getElementById("buy_all_button");
    buyAllButton.addEventListener("click", buyOrder);

    renderFoods();
    renderBasket();
    renderOrder();

}