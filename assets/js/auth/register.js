import { addWaitList } from "../admin.js";
import { User } from "./user.js";
import { redirect, scheduleTask } from "../utils/utils.js";

document.getElementById("role").addEventListener("change", (e) => {
    if (Number(e.target.value) == "2") {
        document.getElementById("budget_div").style.display = "block";
    } else {
        document.getElementById("budget_div").style.display = "none";
    }
});

const registerForm = document.getElementById("register_form");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const role_id = document.forms["register_form"]["role"].value;
    const username = document.forms["register_form"]["username"].value;
    const password = document.forms["register_form"]["password"].value;
    const budget = document.forms["register_form"]["budget"].value;

    if (role_id == 3) {
        const user = User.create({
            username,
            password,
            role_id,
            budget: budget ? Number(budget) : null,
            status: 0,
        });
        user.save();
        addWaitList(user);
    } else {
        const user = User.create({
            username,
            password,
            role_id,
            budget: budget ? Number(budget) : null,
            status: 1,
        });
        user.save();
    }

    scheduleTask(() => {
        redirect("/login.html", 500);
    });
});
