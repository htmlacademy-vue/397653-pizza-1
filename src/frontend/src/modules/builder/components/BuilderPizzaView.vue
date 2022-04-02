<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model="pizzaName"
        required
      />
    </label>
    <div class="content__constructor">
      <AppDrop @drop="$emit('drop', $event)">
        <div
          :class="[
            'pizza',
            'pizza--foundation--' + pizzaDoughClass + '-' + pizzaSauceClass,
          ]"
        >
          <div class="pizza__wrapper">
            <div 
              v-for="pizzaIngredient in this.pizzaIngredients" 
              :key="pizzaIngredient.id"
              :class="[
                'pizza__filling', 
                'pizza__filling--' + pizzaIngredient.ingredient,
                pizzaIngredient.second ? 'pizza__filling--second' : '',
                pizzaIngredient.third ? 'pizza__filling--third' : ''
              ]"
              ></div>
          </div>
        </div>
      </AppDrop>
    </div>
    <div class="content__result">
      <BuilderPriceCounter 
        :multiplier="multiplier"
        :ingredientPrice="ingredientPrice"
      />
      <button 
        type="button" 
        class="button" 
        :disabled="ingredientPrice === 0 || pizzaName === ''"
      >Готовьте!</button>
    </div>
  </div>
</template>

<script>
import BuilderPriceCounter from '@/modules/builder/components/BuilderPriceCounter';
import AppDrop from '@/common/components/AppDrop'

export default {
  components: {
    BuilderPriceCounter,
    AppDrop
  },
  props: {
    pizzaDoughClass: {
      type: String,
      required: true
    },

    pizzaSauceClass: {
      type: String,
      required: true
    },

    multiplier: {
      type: Number,
      required: true
    },

    pizzaIngredients: {
      type: Array
    },

    ingredientPrice: {
      type: Number
    },
  },
  data() {
    return {
      pizzaName: ''
    }
  }
};
</script>

<style>
</style>