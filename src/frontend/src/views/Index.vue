<template>
  <main class="content">
    <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <BuilderDoughSelector
            :dough="dough"
            @changePizza="setDough"
          />
          <BuilderSizeSelector
            :sizes="sizes"
            @changePizza="setSize"
          />
          <BuilderIngredientsSelector
            :sauces="sauces"
            :ingredients="ingredients"
            @changePizza="setSauce"
            @changeIngredient="changeIngredient"
          />
          <BuilderPizzaView
            :pizzaDoughClass="pizzaDoughValue"
            :pizzaSauceClass="pizzaSauceValue"
            :ingredients="ingredientsList"
            :totalPrice="totalPrice"
            @drop="changeIngredient"
          />
        </div>
    </form>
  </main>
</template>

<script>
import pizza from '@/static/pizza.json'
import { DOUGH_PRICE, SAUCE_PRICE } from '@/common/constants'
import { mapDough, mapMultiplier } from '@/common/helpers'
import { normalizeIngredients } from '@/common/helpers'
import BuilderDoughSelector from '@/modules/builder/components/BuilderDoughSelector'
import BuilderSizeSelector from '@/modules/builder/components/BuilderSizeSelector'
import BuilderIngredientsSelector from '@/modules/builder/components/BuilderIngredientsSelector'
import BuilderPizzaView from '@/modules/builder/components/BuilderPizzaView'

export default {
  name: 'Index',
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
      pizzaDoughValue: 'small',
      pizzaSauceValue: 'tomato',
      currentSize: '32 см'
    }
  },
  methods: {
    setDough(value) {
      this.pizzaDoughValue = mapDough[value]
    },
    setSauce(value) {
      this.pizzaSauceValue = value
    },
    setSize(size) {
      this.currentSize = size
    },
    changeIngredient(event) {
      let index = this.ingredients.findIndex( item => item.name === event.ingredient.name );
      this.ingredients[index].count = event.count
    },
  },
  computed: {
    totalPrice() {
      let ingredientPrice = this.ingredientsList.reduce((sum, ingredient) => {return sum + ingredient.price * ingredient.count}, 0);
      return mapMultiplier[this.currentSize] * (DOUGH_PRICE + SAUCE_PRICE + ingredientPrice)
    },
    ingredientsList() {
      return this.ingredients.filter(item => item.count > 0);
    }
  }
}
</script>

<style>

</style>
