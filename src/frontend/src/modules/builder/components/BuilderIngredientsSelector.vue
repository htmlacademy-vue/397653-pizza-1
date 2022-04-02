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
            :item="sauce"
            :value="getSauceValue(sauce.name)"
            :classNames="['radio ingredients__input']"
            :name="'sauce'"
            :isChecked="sauce.id === 1"
            @getValue="getValue"
          />
        </div>
        <div class="ingredients__filling">
          <p>Начинка:</p>
          <ul class="ingredients__list">

            <li
              class="ingredients__item"
              v-for="ingredient in ingredients"
              :key="ingredient.id"
            >
              <AppDrag :transfer-data="ingredient">
                <span :class="['filling', getIngredientClass(ingredient.name)]">
                  {{ ingredient.name }}
                </span>
              </AppDrag>
                <ItemCounter 
                  @addIngredient="addIngredient"
                  @deleteIngredient="deleteIngredient"
                  :ingredient="ingredient"
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
import AppDrag from '@/common/components/AppDrag';
import RadioButton from '@/common/components/RadioButton'
import ItemCounter from '@/common/components/ItemCounter'

export default {
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
    getValue(value, name) {
      this.$emit('getValue', value, name)
    },
    addIngredient(ingredient, price, conterValue) {
      this.$emit('addIngredient', mapIngredientName[ingredient], price, conterValue)
    },
    deleteIngredient(ingredient, price, conterValue) {
      this.$emit('deleteIngredient', mapIngredientName[ingredient], price, conterValue)
    },
  }
};
</script>

<style>
</style>