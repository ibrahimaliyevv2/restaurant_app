import { PATH } from "../constants.js";
import { setCurrentUser, users } from "./user.js";
import { redirect, scheduleTask, setItem } from "../utils/utils.js";

const loginForm = document.getElementById("login_form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.forms["login_form"]["username"].value;
    const password = document.forms["login_form"]["password"].value;

    let user = users.find(
        (user) => user.username == username && user.password == password
    );
    if (!user) {
        return alert("Check your credentials");
    }
    let role = user.role_id;
    let path =
        role == 1
            ? "/admin.html"
            : role == 2
                ? "/customer.html"
                : role == 3
                    ? "/restaurant.html"
                    : role == 4
                        ? "/courier.html"
                        : null;
    if (user) {
        setCurrentUser(user);
        setItem(PATH, path);
        scheduleTask(() => {
            redirect(path, 500);
        });
    }
});
