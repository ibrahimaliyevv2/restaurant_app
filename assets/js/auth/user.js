import { USER, USERS } from "../constants.js";
import { getItem, setItem, uidGenerate } from "../utils/utils.js";

export var users = getItem(USERS) || [
    {
        id: 1,
        username: "admin",
        password: "12345",
        role_id: 1,
        budget: 0,
        status: 1,
    },
];
export var currentUser = getItem(USER) || {};

export function setUsers(_users) {

    setItem(USERS, _users);
    setCurrentUser(_users.find(u => u.id == currentUser.id));
}


export const checkUserAuth = () => {
    if (Object.keys(getItem(USER)).length > 0 && currentUser.status == 1) {
        return true;
    } else {
        return false;
    }
};

export const setCurrentUser = (user) => {
    setItem(USER, user);
    currentUser = user;
};

export function updateUser(user) {
    let i = users.indexOf(users.find(u => u.id == user.id));
    let _users = users;

    _users[i] = user;
    setUsers(_users);
}

export class User {
    id = uidGenerate();
    username;
    password;
    role_id;
    budget = 0;
    wallet = 0;
    status;

    constructor({ username, password, role_id, budget, status }) {
        this.username = username;
        this.password = password;
        this.role_id = role_id;
        this.budget = budget;
        this.status = status;
    }

    static create = (credentials) => {
        const user = new User(credentials);
        return user;
    };
    save = () => {
        users.push(this);
        setItem(USERS, users);
        return this;
    };
    get = () => {
        return this;
    };
}
