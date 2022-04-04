<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <RadioButton
          v-for="dough in dough"
          :key="dough.name"
          :item="dough"
          :value="getDoughValue(dough.name)"
          :classNames="['dough__input', getDoughClass(dough.name)]"
          :name="'dough'"
          :isChecked="dough.id === 1"
          @getValue="getValue"
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
    getValue(value, name) {
      value = mapDough[value]
      this.$emit('getValue', value, name)
    }
  }
};
</script>

<style>
</style>