<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="$emit('change', count - 1)"
      :disabled="count === minValue"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="count"
      readonly
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="$emit('change', count + 1)"
      :disabled="count === maxValue"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { MIN_INGREDIENT_VALUE } from '@/common/constants'

export default {
  name: 'ItemCounter',
  props: {
    count: {
      type: Number,
      required: true
    },
    minValue: {
      type: Number,
      required: false,
      default: MIN_INGREDIENT_VALUE
    },
    maxValue: {
      type: Number,
      required: false,
      default: Infinity
    }
  },
};
</script>

<style>
</style>
