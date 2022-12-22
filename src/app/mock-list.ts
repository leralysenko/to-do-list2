import { Item } from "./model/Item";

export const list: Item[] = [
    new Item('plan1', false),
    new Item('plan2', true),
    new Item('plan3', false, new Date(2022, 11, 25))
]