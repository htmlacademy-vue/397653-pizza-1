<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="decrement()"
      :disabled="inputValue === minValue"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="inputValue"
      readonly
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="increment()"
      :disabled="inputValue === maxValue"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { MIN_INGREDIENT_VALUE, MAX_INGREDIENT_VALUE } from '@/common/constants'

export default {
  props: {
    ingredient: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      inputValue: MIN_INGREDIENT_VALUE,
      minValue: MIN_INGREDIENT_VALUE,
      maxValue: MAX_INGREDIENT_VALUE
    };
  },
  methods: {
    increment() {
      if (this.inputValue < MAX_INGREDIENT_VALUE) {
        this.inputValue++;
        this.$emit('addIngredient', this.ingredient.name, this.ingredient.price)
      } 
    },
    decrement() {
      if (this.inputValue > MIN_INGREDIENT_VALUE) {
        this.inputValue--;
        this.$emit('deleteIngredient', this.ingredient.name, this.ingredient.price)
      }
    }
  },
};
</script>

<style>
</style>