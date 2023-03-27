<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="sauce in labeledSauces"
            :key="sauce.name"
            :value="sauce.label"
            class="radio ingredients__input"
            :name="'sauce'"
            :isChecked="currentSauce.id === sauce.id"
            @changePizza="setCurrentSauce(sauce)"
          >
            <span>{{ sauce.name }}</span>
          </RadioButton>
        </div>
        <div class="ingredients__filling">
          <p>Начинка:</p>
          <ul class="ingredients__list">
            <li
              class="ingredients__item"
              v-for="ingredient in ingredientsItems"
              :key="ingredient.id"
            >
              <AppDrag
                :transferData="ingredient"
                :draggable="ingredient.count !== max"
              >
                <span :class="['filling', getIngredientClass(ingredient.name)]">
                  {{ ingredient.name }}
                </span>
              </AppDrag>
              <ItemCounter
                @change="changeIngredient($event, ingredient)"
                :count="ingredient.count"
                :maxValue="max"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapIngredientName } from '@/common/enums/pizzaIngredientName'
import { mapSauceName } from '@/common/enums/pizzaSauceName'
import {  MAX_INGREDIENT_VALUE } from '@/common/constants'
import AppDrag from '@/common/components/AppDrag';
import RadioButton from '@/common/components/RadioButton'
import ItemCounter from '@/common/components/ItemCounter'
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: 'BuilderIngredientsSelector',
  components: {
    AppDrag,
    RadioButton,
    ItemCounter
  },
  methods: {
    ...mapMutations("builder", ["setCurrentSauce", "setCountIngredients"]),
    getIngredientClass(name) {
      return 'filling--' + mapIngredientName[name]
    },
    getSauceValue(name) {
      return mapSauceName[name]
    },
    changeIngredient(count, ingredient) {
      let item = { label: ingredient, count: count };
      this.setCountIngredients(item);
    },
  },
  computed: {
    ...mapGetters("builder", ["labeledSauces"]),
    ...mapState("builder", ["currentSauce", "ingredientsItems"]),
    max() {
      return MAX_INGREDIENT_VALUE
    },
  }
};
</script>

<style>
</style>
