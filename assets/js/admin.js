import { WAIT_LIST } from "./constants.js";
import { getItem, scheduleTask, setItem } from "./utils.js";

export const waitList = getItem(WAIT_LIST) || [];

export function addWaitList(user) {
  waitList.push(user);
  setItem(WAIT_LIST, waitList);
}

function acceptRestaurant(e) {
  console.log(e);
}

const table = document.getElementById("table_body_adminrest");

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
