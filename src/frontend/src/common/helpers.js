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

export const addIngredient = (ingredient, ingredientsArray) => {
  let sameIngredientsArray = ingredientsArray.filter( item => item.ingredient === ingredient)
  let lastArrayElement = ingredientsArray.length - 1
  ingredientsArray.push({id: Date.now(), ingredient: ingredient})
  if(sameIngredientsArray.length === 1) {
    ingredientsArray[lastArrayElement].second = true
  } else if(sameIngredientsArray.length === 2) {
    ingredientsArray[lastArrayElement].third = true
  } 
  return ingredientsArray
}

export const deleteIngredient = (ingredient, ingredientsArray) => {
  let ingredientIndex = ingredientsArray.findIndex( item => item.ingredient === ingredient)
  ingredientsArray.splice(ingredientIndex, 1)
  return ingredientsArray
}