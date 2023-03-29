import { SET_ENTITY } from '@/store/mutation-types.js';

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: null
  },

  getters: {
    getUserAttribute: state => attr => state.user ? state.user[attr] : ''
  },

  mutations: {
    setAuthentification(state, value) {
      state.isAuthenticated = value
    }
  },

  actions: {
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch('getMe');
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit('setAuthentification', false)
      commit(
        SET_ENTITY,
        { module: 'auth', entity: 'user', value: null },
        { root: true }
      );
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(
          SET_ENTITY,
          { module: 'auth', entity: 'isAuthenticated', value: true },
          { root: true }
        );
        commit(
          SET_ENTITY,
          { module: 'auth', entity: 'user', value: data },
          { root: true }
        );
      } catch {
        // Note: in case of not proper login, i.e. token is expired
        dispatch('logout', false);
      }
    }
  }
};
