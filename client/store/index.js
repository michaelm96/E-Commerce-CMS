import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    access_token: null,
    isLoggedIn: false,
    currentProduct: {},
    errMsg: '',
  },
  mutations: {
    getProduct(state, payload) {
      state.products = payload;
    },

    loggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
    getAccessToken(state, payload) {
      state.access_token = payload;
      localStorage.setItem('access_token', payload);
      state.isLoggedIn = true;
    },
    toRegister(state, payload) {
      state.access_token = payload;
      localStorage.setItem('access_token', payload);
      state.isLoggedIn = true;
    },
    deleteProduct(state, payload) {
      state.products = state.products.filter((product) => product.id !== payload.id);
    },
    getDataById(state, payload) {
      state.currentProduct = payload;
    },
    error(state, payload) {
      console.log(payload);
      state.errMsg = payload.message;
    },
    cleanErrMsg(state) {
      state.errMsg = '';
    },
  },
  actions: {
    getProduct(context) {
      return fetch('http://localhost:3000/product', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('getProduct', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    loggedIn(context) {
      if (localStorage.getItem('access_token') && localStorage.getItem('access_token') !== undefined) {
        context.commit('loggedIn', true);
      }
    },

    getAccessToken(context, payload) {
      return fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.errorCode) {
            context.commit('getAccessToken', data.access_token);
            context.commit('cleanErrMsg');
          } else {
            context.commit('error', data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toRegister(context, payload) {
      return fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.errorCode) {
            context.commit('toRegister', data.access_token);
            context.commit('cleanErrMsg');
          } else {
            context.commit('error', data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toAddProduct(context, payload) {
      return fetch('http://localhost:3000/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.errorCode) {
            context.commit('cleanErrMsg');
          } else {
            context.commit('error', data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProduct(context, payload) {
      return fetch(`http://localhost:3000/product/${payload.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then((response) => response.json())
        .then(() => {
          context.commit('deleteProduct', payload);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataById(context, payload) {
      return fetch(`http://localhost:3000/product/${payload.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('getDataById', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateProduct(context, payload) {
      return fetch(`http://localhost:3000/product/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.errorCode) {
            context.commit('cleanErrMsg');
          } else {
            context.commit('error', data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {

  },
});
