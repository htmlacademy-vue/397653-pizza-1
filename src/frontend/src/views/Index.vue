<template>
  <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector
          :dough="this.dough"
          @getValue="getValue"
        />
        <BuilderSizeSelector
          :sizes="this.sizes"
          @getValue="getValue"
        />
        <BuilderIngredientsSelector 
          :sauces="this.sauces"
          :ingredients="this.ingredients"
          @getValue="getValue"
          @addIngredient="addIngredient"
          @deleteIngredient="deleteIngredient"
        />
        <BuilderPizzaView 
          :pizzaDoughClass="pizzaDoughClass"
          :pizzaSauceClass="pizzaSauceClass"
          :multiplier="multiplier"
          :pizzaIngredients="pizzaIngredients"
          :ingredientPrice="ingredientPrice"
          @drop="moveIngredient($event)"
        />
      </div>
  </form>
</template>

<script>
import pizza from '@/static/pizza.json'
import { addIngredient, deleteIngredient } from '@/common/helpers'
import { mapIngredientName } from '@/common/helpers'
import BuilderDoughSelector from '@/modules/builder/components/BuilderDoughSelector'
import BuilderSizeSelector from '@/modules/builder/components/BuilderSizeSelector'
import BuilderIngredientsSelector from '@/modules/builder/components/BuilderIngredientsSelector'
import BuilderPizzaView from '@/modules/builder/components/BuilderPizzaView'

export default {
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView
  },
  data() {
    return {
      ingredients: pizza.ingredients,
      sauces: pizza.sauces,
      dough: pizza.dough,
      sizes: pizza.sizes,
      pizzaDoughClass: 'small',
      pizzaSauceClass: 'tomato',
      pizzaIngredients: [],
      ingredientPrice: 0,
      multiplier: 2
    }
  },
  methods: {
    getValue(value, name, multiplier) {
      if (multiplier) {
        this.multiplier = multiplier
      }
      if (name === 'dough') {
        this.pizzaDoughClass = value
      } else if (name === 'sauce') {
        this.pizzaSauceClass = value
      }
    },
    addIngredient(ingredient, price) {
      addIngredient(ingredient, this.pizzaIngredients)
      this.ingredientPrice += price
    },
    deleteIngredient(ingredient, price) {
      deleteIngredient(ingredient, this.pizzaIngredients)
      this.ingredientPrice -= price
    },
    moveIngredient(active) {
      addIngredient(mapIngredientName[active.name], this.pizzaIngredients)
      this.ingredientPrice += active.price
    }
  },
}
</script>

<style>

</style>
