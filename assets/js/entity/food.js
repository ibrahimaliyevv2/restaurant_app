import { FOODS } from "../constants";
import { getItem, setItem, uidGenerate } from "../utils/utils";

export let foods = getItem(FOODS) || [];

export function setFoods(foods) {
    foods = foods;
    setItem(FOODS, foods);
}

export class Food {
    id = uidGenerate();
    name;
    amount;

    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }

    static create = ({ name, amount }) => {
        const food = new Food(name, amount);
        food.save();
        return this;
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