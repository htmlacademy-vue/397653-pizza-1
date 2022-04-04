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

export const normalizeIngredients = ingredient => {
  return {
    ...ingredient,
    count: 0,
  };
}

export const getIndex = (ingredient, ingredients) => {
  let index = ingredients.findIndex( item => item.name === ingredient.name );
  return index
}

export const addIngredient = (ingredient, pizzaIngredients, ingredients) => {
  let index = getIndex(ingredient, ingredients)
  ingredients[index].count = ingredient.count + 1;
  let sameIngredients = pizzaIngredients.filter( item => item.ingredient === mapIngredientName[ingredient.name])
  let lastElement = pizzaIngredients.length - 1
  pizzaIngredients.push({id: Date.now(), ingredient: mapIngredientName[ingredient.name]})
  if(sameIngredients.length === 1) {
    pizzaIngredients[lastElement].second = true
  } else if(sameIngredients.length === 2) {
    pizzaIngredients[lastElement].third = true
  } 
  return pizzaIngredients
}

export const deleteIngredient = (ingredient, pizzaIngredients, ingredients) => {
  let index = getIndex(ingredient, ingredients)
  ingredients[index].count = ingredient.count - 1;
  let ingredientIndex = pizzaIngredients.findIndex( item => item.ingredient === mapIngredientName[ingredient.name])
  pizzaIngredients.splice(ingredientIndex, 1)
  return pizzaIngredients
}