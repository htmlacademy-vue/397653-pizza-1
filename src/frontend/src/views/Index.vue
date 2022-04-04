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
          :pizzaIngredients="pizzaIngredients"
          :ingredientPrice="ingredientPrice"
          :totalPrice="totalPrice"
          @drop="addIngredient($event)"
        />
      </div>
  </form>
</template>

<script>
import pizza from '@/static/pizza.json'
import { DOUGH_PRICE, SAUCE_PRICE } from '@/common/constants'
import { addIngredient, deleteIngredient, normalizeIngredients } from '@/common/helpers'
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
      ingredients: pizza.ingredients.map(ingredient => normalizeIngredients(ingredient)),
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
    addIngredient(ingredient) {
      addIngredient(ingredient, this.pizzaIngredients, this.ingredients)
      this.ingredientPrice += ingredient.price
    },
    deleteIngredient(ingredient) {
      deleteIngredient(ingredient, this.pizzaIngredients, this.ingredients)
      this.ingredientPrice -= ingredient.price
    },
    
  },
  computed: {
    totalPrice() {
      return this.multiplier * (DOUGH_PRICE + SAUCE_PRICE + this.ingredientPrice)
    }
  }
}
</script>

<style>

</style>
