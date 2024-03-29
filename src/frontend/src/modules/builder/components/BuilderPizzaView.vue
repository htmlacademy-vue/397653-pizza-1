﻿<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="namePizza"
        required
        @input='setCurrentPizzaName($event.target.value)'
      />
    </label>
    <div class="content__constructor">
      <AppDrop
        @drop="$emit('drop', $event)">
        <div :class="[
            'pizza',
            'pizza--foundation--' + doughClass + '-' + pizzaSauceClass,
          ]"
        >
          <div class="pizza__wrapper">
            <transition-group name="ingredients">
              <template v-for="ingredient in ingredientsItems">
                <div
                  v-for="count in ingredient.count"
                  :key="`${ingredient.name}-${count}`"
                  :class="`pizza__filling pizza__filling--${
                    ingredient.label
                  } ${getIngredientClasses(count)}`"
                />
              </template>
            </transition-group>
          </div>
        </div>
      </AppDrop>
    </div>
    <div class="content__result">
      <BuilderPriceCounter />
      <button
        type="button"
        class="button"
        :disabled="isDisabled"
        data-test="add-to-cart-btn"
        @click="addPizza()"
      >Готовьте!</button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'
import { mapIngredientName } from '@/common/enums/pizzaIngredientName'
import BuilderPriceCounter from '@/modules/builder/components/BuilderPriceCounter';
import AppDrop from '@/common/components/AppDrop'

export default {
  name: 'BuilderPizzaView',

  components: {
    BuilderPriceCounter,
    AppDrop
  },

  computed: {
    ...mapState("builder", ["currentDough", "currentSauce", "namePizza", "ingredientsItems"]),
    ...mapState("cart", ["misc"]),

    doughClass() {
      return this.currentDough.label
    },
    pizzaSauceClass() {
      return this.currentSauce.label
    },
    isSomeChecked() {
      const isSomeChecked = (el) => el.count !== 0;
      return isSomeChecked
    },
    isCheckedIngredients() {
      const isCheckedIngredients = this.ingredientsItems.some(this.isSomeChecked);
      return isCheckedIngredients
    },
    isDisabled() {
      if (this.isCheckedIngredients && this.namePizza) {
        return false;
      } else return true;
    }
  },
  methods: {
    ...mapMutations("builder", ["setCurrentPizzaName"]),
    ...mapMutations("cart", ["setTotalPrice"]),
    ...mapGetters("builder", ["getPrice"]),
    ...mapActions("builder", ["resetBuilderState", "getDoughData", "getSaucesData", "getSizesData", "getIngredientsData"]),
    ...mapActions("cart", ["setPizzaSettingsForCart", "changeMiscItemQuantity"]),

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

    addPizza() {
      let totalPrice = this.getPrice()
      this.setTotalPrice(totalPrice)

      let pizzaState = this.$store.state.builder;
      let currentPizzaIngredientsNames = [];
      let currentPizzaIngredients = [];
      for (let i = 0; i < pizzaState.ingredientsItems.length; i++) {
        if (pizzaState.ingredientsItems[i].count > 0) {
          currentPizzaIngredients.push(pizzaState.ingredientsItems[i]);
          currentPizzaIngredientsNames.push(
            " " + pizzaState.ingredientsItems[i].name.toLowerCase()
          );
        }
      }

      let objectPizza = {
        ingredients: currentPizzaIngredients,
        label: pizzaState.namePizza,
        dough: pizzaState.currentDough,
        sauce: pizzaState.currentSauce,
        size: pizzaState.currentSize,
        description: [`${pizzaState.currentSize.name.toLowerCase()}, на ${pizzaState.currentDough.name.toLowerCase().slice(0, -1)}м тесте`, `Соус: ${pizzaState.currentSauce.name.toLowerCase()}`, `Начинка:${currentPizzaIngredientsNames}`],
        price: this.getPrice(),
        count: 1,
        id: pizzaState.id,
      };

      this.setPizzaSettingsForCart(objectPizza);

      this.resetBuilderState();

      this.getDoughData();
      this.getSaucesData();
      this.getSizesData();
      this.getIngredientsData();

      this.misc.forEach((misc) => {
        this.changeMiscItemQuantity({ ...misc, quantity: 0 });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ingredients-enter-active,
.ingredients-leave-active {
  transition: all .5s ease;
}

.ingredients-enter,
.ingredients-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
