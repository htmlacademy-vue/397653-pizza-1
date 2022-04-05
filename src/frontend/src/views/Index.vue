<template>
  <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector
          :dough="this.dough"
          @changePizza="setDought"
        />
        <BuilderSizeSelector
          :sizes="this.sizes"
          @changePizza="setSize"
        />
        <BuilderIngredientsSelector 
          :sauces="this.sauces"
          :ingredients="this.ingredients"
          @changePizza="setSauce"
          @changeIngredient="changeIngredient"
        />
        <BuilderPizzaView 
          :pizzaDoughClass="pizzaDoughClass"
          :pizzaSauceClass="pizzaSauceClass"
          :ingredients="ingredientsList"
          :totalPrice="totalPrice"
          @drop="changeIngredient"
        />
      </div>
  </form>
</template>

<script>
import pizza from '@/static/pizza.json'
import { DOUGH_PRICE, SAUCE_PRICE } from '@/common/constants'
import { mapDough } from '@/common/helpers';
import { normalizeIngredients } from '@/common/helpers'
import BuilderDoughSelector from '@/modules/builder/components/BuilderDoughSelector'
import BuilderSizeSelector from '@/modules/builder/components/BuilderSizeSelector'
import BuilderIngredientsSelector from '@/modules/builder/components/BuilderIngredientsSelector'
import BuilderPizzaView from '@/modules/builder/components/BuilderPizzaView'

export default {
  name: 'IndexHome',
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
      multiplier: 2
    }
  },
  methods: {
    setDought(value) {
      this.pizzaDoughClass = mapDough[value]
    },
    setSauce(value) {
      this.pizzaSauceClass = value
    },
    setSize(value) {
      this.multiplier = value
    },
    changeIngredient(event) {
      let index = this.ingredients.findIndex( item => item.name === event.ingredient.name );
      this.ingredients[index].count = event.count
    },
  },
  computed: {
    totalPrice() {
      let ingredientPrice = this.ingredientsList.reduce((sum, ingredient) => {return sum + ingredient.price * ingredient.count}, 0);
      return this.multiplier * (DOUGH_PRICE + SAUCE_PRICE + ingredientPrice)
    },
    ingredientsList() {
      return this.ingredients.filter(item => item.count > 0);
    }
  }
}
</script>

<style>

</style>
