<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="$emit('change', count - 1)"
      :disabled="disabledMin"
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
      :disabled="disabledMax"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ItemCounter',
  props: {
    count: {
      type: Number,
      required: true
    },
    disabledMin: {
      type: Boolean,
      required: false
    },
    disabledMax: {
      type: Boolean,
      required: false
    }
  },
};
</script>

<style>
</style>
