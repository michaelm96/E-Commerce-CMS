import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    access_token: null,
    isLoggedIn: false,
    currentProduct: {},
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
  },
  actions: {
    getProduct(context) {
      fetch('http://localhost:3000/product', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
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
      console.log(payload);
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('getAccessToken', data.access_token);
          console.log(this.state.access_token);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toRegister(context, payload) {
      console.log(payload);
      fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('toRegister', data.access_token);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toAddProduct(context, payload) {
      console.log(payload);
      fetch('http://localhost:3000/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProduct(context, payload) {
      console.log(payload);
      fetch(`http://localhost:3000/product/${payload.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          context.commit('deleteProduct', payload);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataById(context, payload) {
      fetch(`http://localhost:3000/product/${payload.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          context.commit('getDataById', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateProduct(context, payload) {
      console.log(payload);
      fetch(`http://localhost:3000/product/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {

  },
});
