<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="$emit('deleteIngredient', ingredient)"
      :disabled="value === minValue"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      readonly
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="$emit('addIngredient', ingredient)"
      :disabled="value === maxValue"
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

    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      minValue: MIN_INGREDIENT_VALUE,
      maxValue: MAX_INGREDIENT_VALUE
    };
  }
};
</script>

<style>
</style>