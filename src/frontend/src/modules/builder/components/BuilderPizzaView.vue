<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="namePizza"
        required
        @input='setPizzaName($event.target.value)'
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
            <template v-for="ingredient in ingredientsItems">
              <div
                v-for="count in ingredient.count"
                :key="`${ingredient.name}-${count}`"
                :class="`pizza__filling pizza__filling--${
                  ingredient.label
                } ${getIngredientClasses(count)}`"
              ></div>
            </template>
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
        @click="addPizza()"
      >Готовьте!</button>
    </div>
  </div>
</template>

<script>
import { mapIngredientName } from '@/common/enums/pizzaIngredientName'
import BuilderPriceCounter from '@/modules/builder/components/BuilderPriceCounter';
import AppDrop from '@/common/components/AppDrop'
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

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
    isDisabled() {
      const isSomeChecked = (el) => el.count !== 0;
      const isCheckedIngredients = this.ingredientsItems.some(isSomeChecked);
      if (isCheckedIngredients && this.namePizza) {
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
    setPizzaName(val) {
      this.setCurrentPizzaName(val);
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

<style>
</style>
