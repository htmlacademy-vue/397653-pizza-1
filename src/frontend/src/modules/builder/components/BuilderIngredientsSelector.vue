<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="sauce in sauces"
            :key="sauce.name"
            :value="sauce.value"
            class="radio ingredients__input"
            :name="'sauce'"
            :isChecked="sauce.id === 1"
            @changePizza="$emit('changePizza', sauce)"
          >
            <span>{{ sauce.name }}</span>
          </RadioButton>
        </div>
        <div class="ingredients__filling">
          <p>Начинка:</p>
          <ul class="ingredients__list">
            <li
              class="ingredients__item"
              v-for="ingredient in ingredients"
              :key="ingredient.id"
            >
              <AppDrag
                :transfer-data="ingredient"
                :draggable="ingredient.count !== max"
              >
                <span :class="['filling', getIngredientClass(ingredient.name)]">
                  {{ ingredient.name }}
                </span>
              </AppDrag>
                <ItemCounter
                  @change="changeIngredient($event, ingredient)"
                  :count="ingredient.count"
                />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapIngredientName, mapSauceName } from '@/common/helpers'
import { MAX_INGREDIENT_VALUE } from '@/common/constants'
import AppDrag from '@/common/components/AppDrag';
import RadioButton from '@/common/components/RadioButton'
import ItemCounter from '@/common/components/ItemCounter'

export default {
  name: 'BuilderIngredientsSelector',
  components: {
    AppDrag,
    RadioButton,
    ItemCounter
  },
  props: {
    sauces: {
      type: Array,
      required: true
    },

    ingredients: {
      type: Array,
      required: true
    }
  },
  methods: {
    getIngredientClass(name) {
      return 'filling--' + mapIngredientName[name]
    },
    getSauceValue(name) {
      return mapSauceName[name]
    },
    changeIngredient(count, ingredient) {
      this.$emit('changeIngredient', { count, ingredient })
    }
  },
  computed: {
    max() {
      return MAX_INGREDIENT_VALUE
    }
  }
};
</script>

<style>
</style>
