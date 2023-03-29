<template>
  <label>
    <input
      type="radio"
      class="visually-hidden"
      :name="name"
      :value="value"
      :checked="isChecked"
      @change="$emit('changePizza', $event.target)"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: 'RadioButton',
  props: {
    value: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    isChecked: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style>
</style>
