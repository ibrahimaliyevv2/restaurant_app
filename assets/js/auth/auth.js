import { USER } from "../constants.js";
import { checkUserAuth } from "./user.js";
import {
    authUrl,
    nonAuthUrl,
    pathname,
    redirect,
    scheduleInterval,
    removeItem,
    currentPath
} from "../utils/utils.js";

export function check() {
    const currentPath = location.pathname;
    if (checkUserAuth()) {
        if (authUrl.indexOf(currentPath) == -1) {
            redirect(pathname, 500);
        }
    } else {
        if (nonAuthUrl.indexOf(currentPath) == -1) {
            redirect("/login.html", 500);
        }
    }
}

export function logOut() {
    removeItem(USER);
    check();
}

document.addEventListener("DOMContentLoaded", () => {
    if (authUrl.indexOf(currentPath) != -1)
        document.getElementById("logout_btn").addEventListener("click", logOut);

    check();
    scheduleInterval(check, 3000);
});
