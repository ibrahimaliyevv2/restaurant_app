import { ORDERS } from "../constants.js";
import { getItem, setItem, uidGenerate } from "../utils/utils.js";
import { currentUser } from "../auth/user.js";
export let orders = getItem(ORDERS) || [];

export function setOrders(order) {
    orders.push(order)
    setItem(ORDERS, orders);
}

export function updateOrders(order) {
    let i = orders.indexOf(orders.find(o => o.id == order.id));
    orders[i] = order;
    setItem(ORDERS, orders);
}
export class Order {
    id = uidGenerate();
    name;
    amount;
    restaurant_id;
    user_id = currentUser.id;
    status = 0;
    courier_price = 0;
    all_price = 0;
    courier_id;
    constructor(name, amount, restaurant_id, courier_price, all_price) {
        this.name = name;
        this.amount = amount;
        this.restaurant_id = restaurant_id;
        this.courier_price = courier_price;
        this.all_price = all_price;
    }

    static create = ({ name, amount, restaurant_id, courier_price, all_price }) => {
        const order = new Order(name, amount, restaurant_id, courier_price, all_price);
        return order;
    }

    save = () => {
        setOrders(this);
        return this;
    }
    get() {
        return this;
    }
}