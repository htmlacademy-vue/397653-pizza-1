<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <RadioButton
          v-for="size in sizes"
          :key="size.name"
          :item="size"
          :value="getSizesValue(size.name)"
          :classNames="['diameter__input', getSizesClass(size.name)]"
          :name="'diameter'"
          :isChecked="size.id === 2"
          @getValue="getValue"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapSizes } from '@/common/helpers';
import RadioButton from '@/common/components/RadioButton'
export default {
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
    },
    getValue(value, name, multiplier) {
      this.$emit('getValue', value, name, multiplier)
    }
  }
};
</script>

<style>
</style>