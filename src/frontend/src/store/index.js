﻿import { uniqueId } from "lodash";

import Vue from 'vue';
import Vuex from 'vuex';
import VuexPlugins from "../plugins/vuexPlugins";

import Builder from "@/store/modules/builder";
import Cart from "@/store/modules/cart";
import Orders from "@/store/modules/orders";
import Auth from "@/store/modules/auth";
import Addresses from "@/store/modules/addresses";

import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutation-types";
import { MESSAGE_LIVE_TIME } from "@/common/constants.js";

Vue.use(Vuex);

const state = () => ({
  notifications: [],
  user: null,
});

const actions = {
  async init({ dispatch }) {
    dispatch("builder/getIngredientsData");
    dispatch("builder/getDoughData");
    dispatch("builder/getSizesData");
    dispatch("builder/getSaucesData");
  },

  async createNotification({ commit }, { ...notification }) {
    const uniqueNotification = {
      ...notification,
      id: uniqueId(),
    };
    commit(ADD_NOTIFICATION, uniqueNotification);
    setTimeout(
      () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
  },
};

const mutations = {
  [ADD_NOTIFICATION](state, notification) {
    state.notifications = [...state.notifications, notification];
  },

  [DELETE_NOTIFICATION](state, id) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== id
    );
  },

  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },

  [ADD_ENTITY](state, { module, entity, value }) {
    if (module) {
      state[module][entity] = [...state[module][entity], value];
    } else {
      state[entity] = [...state[entity], value];
    }
  },

  [UPDATE_ENTITY](state, { module, entity, value }) {
    if (module) {
      const index = state[module][entity].findIndex(
        ({ id }) => id === value.id
      );

      if (~index) {
        state[module][entity].splice(index, 1, value);
      }
    } else {
      const index = state[entity].findIndex(({ id }) => id === value.id);

      if (~index) {
        state[entity].splice(index, 1, value);
      }
    }
  },

  [DELETE_ENTITY](state, { module, entity, id }) {
    if (module) {
      state[module][entity] = state[module][entity].filter(
        (e) => +e.id !== +id
      );
    } else {
      state[entity] = state[entity].filter((e) => +e.id !== +id);
    }
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [VuexPlugins],
  modules: {
    builder: Builder,
    cart: Cart,
    orders: Orders,
    auth: Auth,
    addresses: Addresses,
  },
});
