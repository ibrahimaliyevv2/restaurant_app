import { WAIT_LIST } from "../constants.js";
import { getItem, pathname, scheduleTask, setItem } from "../utils/utils.js";
import { users, setUsers } from '../auth/user.js';
export let waitList = getItem(WAIT_LIST) || [];

export function addWaitList(user) {
    waitList.push(user);
    setItem(WAIT_LIST, waitList);
}

export function deleteWaitList(id) {
    waitList = waitList.filter(item => item.id !== id);
    setItem(WAIT_LIST, waitList);
    scheduleTask(() => reload(), 500);
    renderWaitList();
}

function acceptRestaurant(e) {
    let id = e.target.id;
    let user = users.find(e => e.id == id);
    users[users.indexOf(user)].status = 1;
    setUsers(users);
    deleteWaitList(id)
}
function renderWaitList() {
    const table = document.getElementById("table_body_adminrest");
    table.innerHTML = '';
    waitList.forEach((waitlist_item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${waitlist_item.username}</td>
          <td><button id="${waitlist_item.id}" class="btn">Accept</button></td>
        `;
        table.append(tr);
        document
            .getElementById(waitlist_item.id)
            .addEventListener("click", acceptRestaurant);
    });
}

if (pathname == "/admin.html") {

    renderWaitList();
}