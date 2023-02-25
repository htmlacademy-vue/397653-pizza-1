<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model="pizzaName"
        required
        @change='setPizzaName(pizzaName)'
      />
    </label>
    <div class="content__constructor">
      <AppDrop @drop="$emit('drop', $event)">
        <div :class="[
            'pizza',
            'pizza--foundation--' + doughClass + '-' + pizzaSauceClass,
          ]"
        >
          <div class="pizza__wrapper">
            <template v-for="ingredient in ingredients">
              <div
                v-for="count in ingredient.count"
                :key="`${ingredient.name}-${count}`"
                :class="`pizza__filling pizza__filling--${
                  ingredient.value
                } ${getIngredientClasses(count)}`"
              ></div>
            </template>
          </div>
        </div>
      </AppDrop>
    </div>
    <div class="content__result">
      <BuilderPriceCounter :totalPrice="totalPrice"/>
      <button
        type="button"
        class="button"
        :disabled="ingredients.length === 0 || pizzaName === ''"
        @click="$emit('addCart')"
      >Готовьте!</button>
    </div>
  </div>
</template>

<script>
import { mapIngredientName } from '@/common/helpers';
import BuilderPriceCounter from '@/modules/builder/components/BuilderPriceCounter';
import AppDrop from '@/common/components/AppDrop'
import { mapMutations } from 'vuex'

export default {
  name: 'BuilderPizzaView',
  components: {
    BuilderPriceCounter,
    AppDrop
  },
  props: {
    pizzaDoughClass: {
      type: String,
      required: true
    },

    pizzaSauceClass: {
      type: String,
      required: true
    },

    ingredients: {
      type: Array,
      required: true,
      default: () => []
    },

    totalPrice: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      pizzaName: ''
    }
  },
  computed: {
    doughClass() {
      return this.pizzaDoughClass === "large" ? "big" : "small";
    },
  },
  methods: {
    ...mapMutations("builder", ["setCurrentPizzaName"]),
    getClass(name) {
      return mapIngredientName[name]
    },
    getIngredientClasses(count) {
      let className = "";
      switch (count) {
        case 2:
          className = "pizza__filling--second";
          break;
        case 3:
          className = "pizza__filling--third";
          break;
      }
      return className;
    },
    setName(val) {
      this.setCurrentPizzaName(val);
    },
  },
};
</script>

<style>
</style>
