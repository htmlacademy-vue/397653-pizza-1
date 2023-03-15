import {
  SET_ENTITY,
} from "../mutation-types";

export default {
  namespaced: true,
  state: {
    addresses: [],
  },

  getters: {},

  actions: {
    async getAddresses({ commit }) {
      const data = await this.$api.addresses.query();
      commit(
        SET_ENTITY,
        { module: "addresses", entity: "addresses", value: data },
        { root: true }
      );
    },
    async deleteAddress({ dispatch }, id) {
      await this.$api.addresses.delete(id);
      dispatch('getAddresses');
    },

    async editAddress({ dispatch }, address) {
      await this.$api.addresses.put(address);
      dispatch('getAddresses');
    },

    async addAddress({ dispatch }, address) {
      await this.$api.addresses.post(address);
      dispatch('getAddresses');
    },
  },
};
