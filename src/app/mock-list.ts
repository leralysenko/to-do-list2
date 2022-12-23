import { Item } from "./model/Item";

export const list: Item[] = [
    new Item('plan1', false),
    new Item('plan2', true),
    new Item('plan3', false, new Date(2022, 11, 25)),
    new Item('plan4', true, new Date(2022, 11, 11), new Date(2022, 11, 30)),
    new Item('text1', false, new Date(2023, 0, 4), new Date(2023, 11, 30)),
    new Item('text2', true, new Date(2023, 1, 10), new Date(2023, 2, 22)),
    new Item('text3', false, new Date(2023, 5, 5), new Date(2023, 7, 7)),
];

export const secondList: Item[] = [
    new Item('text6', false, new Date(2024, 1, 4), new Date(2024, 3, 30)),
    new Item('text7', true, new Date(2024, 3, 10), new Date(2024, 5, 22)),
    new Item('text8', false, new Date(2024, 7, 5), new Date(2024, 7, 7)),
]