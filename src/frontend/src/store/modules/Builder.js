import { uniqueId, cloneDeep } from "lodash";
import pizza from "@/static/pizza.json";
import {
  SET_PIZZA_DATA,
  SET_PIZZA,
  SET_DOUGH,
  SET_SAUCE,
  SET_SIZE,
  SET_PIZZA_NAME,
  CHANGE_PIZZA,
  UPDATE_PIZZA_INGREDIENT,
  ADD_ENTITY,
  UPDATE_ENTITY,
} from "@/store/mutation-types";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers";

export default {
  namespaced: true,
  state: () => ({
    pizza: {},
    pizzaConstructor: {
      name: "",
      ingredients: [],
      dough: null,
      sauce: null,
      size: null,
    },
  }),
  actions: {
    setPizza({ commit }) {
      pizza.ingredients = pizza.ingredients.map((item) =>
        normalizeIngredients(item)
      );
      pizza.dough = pizza.dough.map((item) => normalizeDough(item));
      pizza.sauces = pizza.sauces.map((item) => normalizeSauce(item));
      pizza.sizes = pizza.sizes.map((item) => normalizeSize(item));

      commit("SET_PIZZA_DATA", pizza);
      commit("SET_PIZZA");
    },
    post({ state, getters, commit, rootState }) {
      let pizza = cloneDeep(state.pizzaConstructor);

      let pizzaUpdate = rootState.Cart.pizzas.find(
        (item) => item.id === pizza.id
      );

      if (pizzaUpdate) {
        commit(
          UPDATE_ENTITY,
          {
            module: "Cart",
            entity: "pizzas",
            value: { ...pizza, price: getters["pizzaPrice"] },
          },
          { root: true }
        );
      } else {
        commit(
          ADD_ENTITY,
          {
            module: "Cart",
            entity: "pizzas",
            value: {
              ...pizza,
              price: getters["pizzaPrice"],
              count: 1,
              id: uniqueId(),
            },
          },
          { root: true }
        );
      }
    },
  },
  getters: {
    pizzaPrice(state) {
      let ingredientPrice = state.pizzaConstructor.ingredients.reduce(
        (accumulator, ingredient) => {
          return accumulator + ingredient.price * ingredient.count;
        },
        0
      );
      return (
        state.pizzaConstructor.size.multiplier *
        (state.pizzaConstructor.dough.price +
          state.pizzaConstructor.sauce.price +
          ingredientPrice)
      );
    },
    ingredientsList(state) {
      return state.pizzaConstructor.ingredients.filter(
        (item) => item.count > 0
      );
    },
    isDisablePriceCounter(state, getters) {
      return Boolean(
        state.pizzaConstructor.name.length && getters.ingredientsList.length
      );
    },
  },

  mutations: {
    [SET_PIZZA_DATA](state, pizza) {
      state.pizza = pizza;
    },
    [SET_PIZZA](state) {
      state.pizzaConstructor.id = uniqueId();
      state.pizzaConstructor.name = "";
      state.pizzaConstructor.dough = state.pizza.dough[0];
      state.pizzaConstructor.size = state.pizza.sizes[1];
      state.pizzaConstructor.sauce = state.pizza.sauces[0];
      state.pizzaConstructor.ingredients = state.pizza.ingredients.map(
        (item) => {
          item.count = 0;
          return item;
        }
      );
    },
    [CHANGE_PIZZA](state, pizza) {
      state.pizzaConstructor = cloneDeep(pizza);
    },
    [SET_DOUGH](state, dough) {
      state.pizzaConstructor.dough = dough;
    },
    [SET_SAUCE](state, sauce) {
      state.pizzaConstructor.sauce = sauce;
    },
    [SET_SIZE](state, size) {
      state.pizzaConstructor.size = size;
    },
    [SET_PIZZA_NAME](state, pizzaName) {
      state.pizzaConstructor.name = pizzaName;
    },
    [UPDATE_PIZZA_INGREDIENT](state, ingredientData) {
      let ingredient = state.pizzaConstructor.ingredients.find(
        (item) => item.value === ingredientData.value
      );

      ingredient.count = ingredientData.count;
    },
  },
};
