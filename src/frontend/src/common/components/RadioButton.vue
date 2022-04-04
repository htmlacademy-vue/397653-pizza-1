<template>
  <label :class="classNames">
    <input
      type="radio"
      class="visually-hidden" 
      :name="name"
      :value="value"
      :checked="isChecked"
      @change="$emit('getValue', value, name, item.multiplier)"
    />
    <slot />
  </label>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },

    classNames: {
      type: Array,
      required: true
    },

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