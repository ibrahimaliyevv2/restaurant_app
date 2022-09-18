import { ORDERS } from "../constants";
import { getItem, setItem, uidGenerate } from "../utils/utils";

export let orders = getItem(ORDERS) || [];

export function setOrders(orders) {
    orders = orders;
    setItem(WORDS, orders);
}

export class Order {
    id = uidGenerate();
    name;
    amount;
    restaurant_id;

    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }

    static create = ({ name, amount, restaurant_id }) => {
        const order = new Order(name, amount, restaurant_id);
        order.save();
        return this;
    }

    save = () => {
        orders.push(this);
        setOrders(order);
        return this;
    }
    get() {
        return this;
    }
}