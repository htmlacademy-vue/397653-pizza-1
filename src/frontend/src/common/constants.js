export const MIN_INGREDIENT_VALUE = 0;
export const MAX_INGREDIENT_VALUE = 3;

export const DOUGH_PRICE = 300;
export const SAUCE_PRICE = 50;

export const MOVE = 'move';
export const DATA_TRANSFER_PAYLOAD = 'payload';

export const SEC = 1000;
export const MESSAGE_LIVE_TIME = 3 * SEC;

/* eslint-disable */
export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
/* eslint-enable */

export const DOUGH = [
  {
    name: "Тонкое",
    value: "light",
  },
  {
    name: "Толстое",
    value: "large",
  },
];

export const INGREDIENTS = [
  {
    name: "Грибы",
    value: "mushrooms",
  },
  {
    name: "Чеддер",
    value: "cheddar",
  },
  {
    name: "Салями",
    value: "salami",
  },
  {
    name: "Ветчина",
    value: "ham",
  },
  {
    name: "Ананас",
    value: "ananas",
  },
  {
    name: "Бекон",
    value: "bacon",
  },
  {
    name: "Лук",
    value: "onion",
  },
  {
    name: "Чили",
    value: "chile",
  },
  {
    name: "Халапеньо",
    value: "jalapeno",
  },
  {
    name: "Маслины",
    value: "olives",
  },
  {
    name: "Томаты",
    value: "tomatoes",
  },
  {
    name: "Лосось",
    value: "salmon",
  },
  {
    name: "Моцарелла",
    value: "mozzarella",
  },
  {
    name: "Пармезан",
    value: "parmesan",
  },
  {
    name: "Блю чиз",
    value: "blue_cheese",
  },
];

export const SAUCE = [
  {
    name: "Томатный",
    value: "tomato",
  },
  {
    name: "Сливочный",
    value: "creamy",
  },
];

export const SIZE = [
  {
    name: "23 см",
    value: "small",
  },
  {
    name: "32 см",
    value: "normal",
  },
  {
    name: "45 см",
    value: "big",
  },
];
