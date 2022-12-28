<template>
  <main class="content">
    <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <BuilderDoughSelector
            :dough="pizza.dough"
            @changePizza="setDough"
          />
          <BuilderSizeSelector
            :sizes="pizza.sizes"
            @changePizza="setSize"
          />
          <BuilderIngredientsSelector
            :sauces="pizza.sauces"
            :ingredients="pizza.ingredients"
            @changePizza="setSauce"
            @changeIngredient="changeIngredient"
          />
          <BuilderPizzaView
            :pizzaDoughClass="pizzaConstructor.dough.value"
            :pizzaSauceClass="pizzaConstructor.sauce.value"
            :ingredients="ingredientsList"
            :totalPrice="pizzaPrice"
            :isDisabled="isDisablePriceCounter"
            @drop="changeIngredient"
          />
        </div>
    </form>
  </main>
</template>

<script>
import BuilderDoughSelector from '@/modules/builder/components/BuilderDoughSelector'
import BuilderSizeSelector from '@/modules/builder/components/BuilderSizeSelector'
import BuilderIngredientsSelector from '@/modules/builder/components/BuilderIngredientsSelector'
import BuilderPizzaView from '@/modules/builder/components/BuilderPizzaView'
import { mapGetters, mapState, mapMutations } from 'vuex'
import {
  SET_DOUGH,
  SET_SAUCE,
  SET_SIZE,
  UPDATE_PIZZA_INGREDIENT,
} from "@/store/mutation-types";

export default {
  name: 'Index',
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView
  },
  methods: {
    ...mapMutations("Builder", {
      setDough: SET_DOUGH,
      setSize: SET_SIZE,
      setSauce: SET_SAUCE,
      changeIngredient: UPDATE_PIZZA_INGREDIENT,
    }),
  },
  computed: {
    ...mapState('Builder', ['pizza','pizzaConstructor']),
    ...mapGetters('Builder', ['pizzaPrice','ingredientsList','isDisablePriceCounter'])
  }
}
</script>

<style>

</style>
