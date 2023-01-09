<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <RadioButton
          v-for="dough in dough"
          :key="dough.name"
          :value="getDoughValue(dough.name)"
          :class="['dough__input', getDoughClass(dough.name)]"
          :name="'dough'"
          :isChecked="dough.id === 1"
          @changePizza="$emit('changePizza', dough)"
        >
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapDough } from '@/common/helpers';
import RadioButton from '@/common/components/RadioButton'

export default {
  name: 'BuilderDoughSelector',
  components: {
    RadioButton
  },
  props: {
    dough: {
      type: Array,
      required: true
    }
  },
  methods: {
    getDoughClass(name) {
      return 'dough__input--' + mapDough[name]
    },
    getDoughValue(name) {
      return mapDough[name]
    },
  }
};
</script>

<style>
</style>
