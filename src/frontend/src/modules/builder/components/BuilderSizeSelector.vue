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
          :is-checked="size.id === currentSize.id"
          @changePizza="changeSize(size)"
        >
          <span>{{ size.name }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { mapSizes } from '@/common/enums/pizzaSizes'
import RadioButton from '@/common/components/RadioButton'

export default {
  name: 'BuilderSizeSelector',

  components: {
    RadioButton
  },

  computed: {
    ...mapState("builder", ["sizes", "currentSize"]),
  },

  methods: {
    ...mapMutations("builder", ["setCurrentSize"]),

    getSizesClass(name) {
      return 'diameter__input--' + mapSizes[name]
    },
    getSizesValue(name) {
      return mapSizes[name]
    },
    changeSize(size) {
      this.setCurrentSize(size);
    },
  }
};
</script>

<style>
</style>
