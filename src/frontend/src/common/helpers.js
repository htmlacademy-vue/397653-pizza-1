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

export const mapMultiplier = {
  "23 см": 1,
  "32 см": 2,
  "45 см": 3
}

export const normalizeIngredients = ingredient => {
  return {
    ...ingredient,
    count: 0,
  };
}