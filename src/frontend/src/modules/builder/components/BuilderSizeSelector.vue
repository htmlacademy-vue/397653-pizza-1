<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <RadioButton
          v-for="size in sizes"
          :key="size.name"
          :value="getSizesValue(size.name)"
          :class="['diameter__input', getSizesClass(size.name)]"
          :name="'diameter'"
          :isChecked="size.id === 2"
          @changePizza="$emit('changePizza', size)"
        >
          <span>{{ size.name }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapSizes } from '@/common/helpers';
import RadioButton from '@/common/components/RadioButton'
export default {
  name: 'BuilderSizeSelector',
  components: {
    RadioButton
  },
  props: {
    sizes: {
      type: Array,
      required: true
    }
  },
  methods: {
    getSizesClass(name) {
      return 'diameter__input--' + mapSizes[name]
    },
    getSizesValue(name) {
      return mapSizes[name]
    }
  }
};
</script>

<style>
</style>
