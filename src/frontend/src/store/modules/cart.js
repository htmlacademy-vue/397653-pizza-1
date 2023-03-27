import { ADD_ENTITY, SET_ENTITY, UPDATE_ENTITY } from "../mutation-types";
import { RESET_CART_STATE } from "../mutation-types";
import { uniqueId } from "lodash";

import { normalizeAdditionalItems } from "@/common/helpers.js";

const initialState = () => ({
  misc: [],
  pizza: [],
  totalPrice: 0,
});

export default {
  namespaced: true,

  state: initialState(),
  getters: {
    getTotalPrice(state) {
      return state.totalPrice;
    },
    labeledMisc(state) {
      let labeledMisc = state.misc
      labeledMisc.map((el) => {
        el.label = el.image.replace(".svg", "").replace("/public/img/", "");
      });
      return labeledMisc;
    },
    getPricePizzas(state) {
      let sumPricePizzas = 0;
      if(state.pizza.length > 0) {
        for (let i = 0; i < state.pizza.length; i++) {
          sumPricePizzas = sumPricePizzas + state.pizza[i].count * state.pizza[i].price;
        }
      }
      return sumPricePizzas;
    },
    getPriceMisc(state) {
      let sumPriceMisc = 0;
      for (let i = 0; i < state.misc.length; i++) {
        sumPriceMisc = sumPriceMisc + state.misc[i].count * state.misc[i].price;
      }
      return sumPriceMisc;
    },
  },
  mutations: {
    setCountMisc(state, item) {
      state.misc.forEach((el) => {
        if (item.label.label === el.label) {
          el.count = item.count;
        }
      });
    },
    setCountPizza(state, item) {
      state.pizza.forEach((el) => {
        if (item.label.label === el.label) {
          el.count = item.count;
          if(item.count == 0) {
            let index = state.pizza.indexOf(el)
            state.pizza.splice(index, 1)
          }
        }
      });
    },

    setTotalPrice(state, value) {
      state.totalPrice = value;
    },
    [RESET_CART_STATE](state) {
      Object.assign(state, initialState());
    },
  },
  actions: {
    resetCartState({ commit }) {
      commit(RESET_CART_STATE);
    },

    async getMiscData({ commit }) {
      const data = await this.$api.misc.query();
      const items = data.map((item) => normalizeAdditionalItems(item));
      commit(
        SET_ENTITY,
        { module: "cart", entity: "misc", value: items },
        { root: true }
      );
    },

    setPizzaSettingsForCart({ commit }, pizza) {
      const mutation = pizza.id ? UPDATE_ENTITY : ADD_ENTITY;

      commit(
        mutation,
        {
          module: "cart",
          entity: "pizza",
          value: pizza.id ? pizza : { ...pizza, id: uniqueId() },
        },
        { root: true }
      );
    },
    changeMiscItemQuantity({ commit }, item) {
      commit(
        UPDATE_ENTITY,
        {
          module: "cart",
          entity: "misc",
          value: item,
        },
        { root: true }
      );
    },
  },
};
