import { checkUserAuth } from "./user.js";
import {
  authUrl,
  nonAuthUrl,
  pathname,
  redirect,
  scheduleInterval,
} from "./utils.js";

function check() {
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
document.addEventListener("DOMContentLoaded", () => {
  check();
  scheduleInterval(check, 5000);
});
