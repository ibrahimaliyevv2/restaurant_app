import { FOODS } from "../constants.js";
import { getItem, setItem, uidGenerate } from "../utils/utils.js";
import { currentUser } from '../auth/user.js';

export let foods = getItem(FOODS) || [];

export function setFoods(foods) {
    foods = foods;
    setItem(FOODS, foods);
}

export class Food {
    id = uidGenerate();
    name;
    price;
    restaurant_id;

    constructor(name, price) {
        this.name = name;
        this.price = price;
        this.restaurant_id = currentUser.id;
    }

    static create = ({ name, price }) => {
        const food = new Food(name, price);
        return food;
    }

    save = () => {
        foods.push(this);
        setFoods(foods);
        return this;
    }

    get() {
        return this;
    }
}
