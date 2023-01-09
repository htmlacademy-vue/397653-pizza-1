import { DOUGH, INGREDIENTS, SAUCE, SIZE } from "./constants";
import colaImage from "@/assets/img/cola.svg";
import sauceImage from "@/assets/img/sauce.svg";
import potatoImage from "@/assets/img/potato.svg";

export const mapIngredientName = {
  "Грибы": "mushrooms",
  "Чеддер": "cheddar",
  "Салями": "salami",
  "Ветчина": "ham",
  "Ананас": "ananas",
  "Бекон": "bacon",
  "Лук": "onion",
  "Чили": "chile",
  "Халапеньо": "jalapeno",
  "Маслины": "olives",
  "Томаты": "tomatoes",
  "Лосось": "salmon",
  "Моцарелла": "mozzarella",
  "Пармезан": "parmesan",
  "Блю чиз": "blue_cheese"
}

export const mapSauceName = {
  "Томатный": "tomato",
  "Сливочный": "creamy"
}

export const mapDough = {
  "Тонкое": "light",
  "Толстое": "large",
  "light": "small",
  "large": "big"
}

export const mapSizes = {
  "23 см": "small",
  "32 см": "normal",
  "45 см": "big"
}

export const normalizeDough = (dough) => {
  return {
    ...dough,
    ...DOUGH.find(({ name }) => dough.name === name),
  };
};

export const normalizeIngredients = (ingredient) => {
  return {
    ...ingredient,
    ...INGREDIENTS.find(({ name }) => ingredient.name === name),
    count: 0,
  };
};

export const normalizeSauce = (souce) => {
  return {
    ...souce,
    ...SAUCE.find(({ name }) => souce.name === name),
  };
};

export const normalizeSize = (size) => {
  return {
    ...size,
    ...SIZE.find(({ name }) => size.name === name),
  };
};

let additionalImages = [colaImage, sauceImage, potatoImage];

export const normilizeAdditional = (additionals) => {
  return additionals.map((item, index) => {
    return {
      ...item,
      image: additionalImages[index],
      count: 0,
    };
  });
};
