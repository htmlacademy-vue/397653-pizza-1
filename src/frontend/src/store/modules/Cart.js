import {
  SET_ADDITIONAL,
  UPDATE_COUNT_ADDITIONAL,
  UPDATE_COUNT_PIZZA,
  SET_DELIVERY_DATA,
  CLEAR_CART,
} from "@/store/mutation-types";
import misc from "@/static/misc.json";
import { normilizeAdditional } from "@/common/helpers";

export default {
  namespaced: true,
  state: () => ({
    pizzas: [],
    additionals: [],
    delivery: {
      type: 1,
      phone: "",
      street: "",
      house: "",
      apartament: "",
    },
  }),
  actions: {
    setAdditional({ commit }) {
      let additional = normilizeAdditional(misc);
      commit("SET_ADDITIONAL", additional);
    },
    initDelivery({ commit }) {
      let delivery = {
        type: 3,
        phone: "+7777777772",
        street: "Фёдора Котанова",
        house: "1/4 литера Б",
        apartament: "500",
      };
      commit("SET_DELIVERY_DATA", delivery);
    },
  },
  getters: {
    getPizzas(state) {
      return state.pizzas.filter((item) => item.count > 0);
    },
    getTotalPrice(state) {
      let pizzasPrice = state.pizzas.reduce((sum, { price, count }) => {
        return sum + price * count;
      }, 0);

      let additionalPrice = state.additionals.reduce(
        (sum, { price, count }) => {
          return sum + price * count;
        },
        0
      );

      return pizzasPrice + additionalPrice;
    },
  },
  mutations: {
    [SET_ADDITIONAL](state, additionals) {
      state.additionals = additionals;
    },
    [UPDATE_COUNT_ADDITIONAL](state, additionalData) {
      let additional = state.additionals.find(
        (item) => item.name === additionalData.item.name
      );

      additional.count = additionalData.count;
    },
    [UPDATE_COUNT_PIZZA](state, pizzaData) {
      let pizza = state.pizzas.find((item) => item.id === pizzaData.pizza.id);

      pizza.count = pizzaData.count;
    },
    [SET_DELIVERY_DATA](state, delivery) {
      state.delivery.type = delivery.type;
      state.delivery.phone = delivery.phone;
      state.delivery.street = delivery.street;
      state.delivery.house = delivery.house;
      state.delivery.apartament = delivery.apartament;
    },
    [CLEAR_CART](state) {
      state.pizzas = [];
      state.additionals.forEach((item) => (item.count = 0));
    },
  },
};
