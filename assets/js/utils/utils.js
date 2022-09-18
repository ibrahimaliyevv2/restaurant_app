import { PATH } from "../constants.js";

export function uidGenerate() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export const authUrl = [
    "/admin.html",
    "/customer.html",
    "/restaurant.html",
    "/courier.html",
];
export const nonAuthUrl = ["/login.html", "/register.html"];

export const currentPath = location.pathname;

export function reload() {
    location.reload();
}

export function redirect(path) {
    location.href = path || "/";
}
export const pathname = getItem(PATH);

export const scheduleTask = (func, timeout) => {
    setTimeout(func, timeout);
};

export const scheduleInterval = (func, timeout) => {
    const interval = setInterval(func, timeout);
    return interval;
};

export function getItem(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : "";
}

export function setItem(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
}

export function removeItem(key) {
    localStorage.removeItem(key);
}

export function clear() {
    localStorage.clear();
}
