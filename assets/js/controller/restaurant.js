import { Food, foods } from '../entity/food.js';
import { currentPath, getItem } from '../utils/utils.js';
import { orders, updateOrders } from '../entity/order.js';
import { currentUser, updateUser, users } from '../auth/user.js';
import { USERS } from '../constants.js';

const addForm = document.getElementById("restaurant_form");

addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const foodName = document.forms["restaurant_form"]["foodName"].value;
    const foodPrice = document.forms["restaurant_form"]["foodPrice"].value;

    addFood(foodName, foodPrice);
    alert("Food added");
})
function addFood(name, price) {
    const food = Food.create({ name, price });
    food.save();
    renderFoods();
}

function acceptOrder(e) {
    let id = e.target.id;
    let order_id = id.split("-")[0];
    let order = orders.find(order => order.id == order_id);
    let customer = getItem(USERS).find(u => u.id == order.user_id);
    let _currentUser = currentUser;
    orders[orders.indexOf(order)].status = 1;
    customer.budget = Number(customer.budget) - Number(order.all_price);
    _currentUser['budget'] = Number(_currentUser.budget) + Number(order.amount);

    updateUser(customer);
    updateOrders(orders[orders.indexOf(order)]);
    updateUser(_currentUser);
    renderOrders();
}

function rejectOrder(e) {
    let id = e.target.id;
    let order_id = id.split("-")[0];
    let order = orders.find(order => order.id == order_id);
    // status 2
    order['status'] = 2;
    updateOrders(orders[orders.indexOf(order)]);
    renderOrders();
}

function renderFoods() {
    const tableFood = document.getElementById("table_body_restfoods");
    tableFood.innerHTML = '';
    foods.filter(e => e.restaurant_id == currentUser.id).forEach((food) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${food.name}</td>
          <td>${food.price}</td>
        `;
        tableFood.append(tr);
    });

}

function renderOrders() {
    const tableOrder = document.getElementById("table_body_restorders");
    tableOrder.innerHTML = '';
    orders.filter(e => e.restaurant_id == currentUser.id).forEach((order) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${order.name}</td>
          ${order.status == 0 ? `<td><button id="${order.id}-accept">Accept</button></td>` : `<td><button disabled >Accept</button></td>`}
          ${order.status == 0 ? `<td><button id="${order.id}-reject" >Reject</button></td>` : `<td><button disabled >Reject</button></td>`}

        `;
        tableOrder.append(tr);
        if (order.status == 0) {
            document
                .getElementById(order.id + "-accept")
                .addEventListener("click", acceptOrder);
            document
                .getElementById(order.id + "-reject")
                .addEventListener("click", rejectOrder);
        }

    });
}
if (currentPath == "/restaurant.html") {

    const nameTag = document.getElementById("resturant_name");
    nameTag.innerHTML = nameTag.innerHTML + " " + currentUser.username;

    const budgetTag = document.getElementById("resturant_budget");
    budgetTag.innerHTML = budgetTag.innerHTML + " " + currentUser.budget;

    renderFoods();
    renderOrders();
}