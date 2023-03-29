<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <RadioButton
          v-for="dough in labeledDough"
          :key="dough.name"
          :value="getDoughValue(dough.name)"
          :class="['dough__input', getDoughClass(dough.name)]"
          :name="'dough'"
          :isChecked="dough.id === currentDough.id"
          @changePizza="changeDough(dough)"
        >
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapDough } from '@/common/enums/pizzaDough'
import RadioButton from '@/common/components/RadioButton'
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: 'BuilderDoughSelector',
  components: {
    RadioButton
  },
  computed: {
    ...mapGetters("builder", ["labeledDough"]),
    ...mapState("builder", ["currentDough"]),
  },
  methods: {
    ...mapMutations("builder", ["setCurrentDough"]),
    getDoughClass(name) {
      return 'dough__input--' + mapDough[name]
    },
    getDoughValue(name) {
      return mapDough[name]
    },
    changeDough(dough) {
      this.setCurrentDough(dough);
    },
  }
};
</script>

<style>
</style>
