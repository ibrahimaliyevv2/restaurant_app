import { currentPath } from '../utils/utils.js';
import { orders, updateOrders } from '../entity/order.js';
import { currentUser, updateUser, users } from '../auth/user.js';


function acceptOrder(e) {
    let id = e.target.id;
    let order_id = id.split("-")[0];
    let order = orders.find(o => o.id == order_id);
    order['status'] = 4;
    order['courier_id'] = currentUser.id;
    updateOrders(order);
    currentUser.budget = Number(currentUser.budget) + Number(order.courier_price);
    updateUser(currentUser)
    renderOrder();
    renderDeliveredOrder();
}



function renderDeliveredOrder() {
    const tableOrder = document.getElementById("table_body_courierdelivered");
    tableOrder.innerHTML = '';
    orders.filter(o => o.status == 4 && o.courier_id == currentUser.id).forEach((order) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${users.find(user => user.id == order.user_id).username}</td>
          <td>${order.all_price}</td>
          <td>${order.courier_price}</td>
        `;
        tableOrder.append(tr);
    });
}
function renderOrder() {
    const tableOrder = document.getElementById("table_body_courierorders");
    tableOrder.innerHTML = '';
    orders.filter(o => o.status == 1).forEach((order) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${users.find(user => user.id == order.user_id).username}</td>
          <td>${order.all_price}</td>
          <td>${order.courier_price}</td>
          <td><button id = "${order.id + "-accept"}">Accept</button></td>
        `;
        tableOrder.append(tr);
        document.getElementById(order.id + "-accept").addEventListener("click", acceptOrder);
    });
}

if (currentPath == "/courier.html") {

    const nameTag = document.getElementById("courer_username");
    nameTag.innerHTML = nameTag.innerHTML + " " + currentUser.username;

    const budgetTag = document.getElementById("courer_balance");
    budgetTag.innerHTML = budgetTag.innerHTML + " " + currentUser.budget;

    renderOrder();
    renderDeliveredOrder();
}