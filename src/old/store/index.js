import { createStore } from 'vuex'
import axios from "axios";
export default createStore({
  state() {
    return {
      info: null,
      key: 'c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd',
      min: null,
      estimated: null
    }
  },
  actions: {
    async loadInfo(ctx) {
      const res = await axios
        .get("https://api.changenow.io/v1/currencies?active=true")
        .then((response) => {
          return response.data;
        })
        .catch((e) => console.error(e));


      ctx.commit('getData', res)
    },
    async loadMinimalAmount(ctx, tickers) {
      const res = await axios.get(`https://api.changenow.io/v1/min-amount/${tickers}?api_key=${this.state.key}`).then((response) => {
        return response.data;
      });

      ctx.commit('setMinimal', res)
    },

    async estimatedAmount(ctx, { amount, tickers }) {
      const res = await axios.get(`https://api.changenow.io/v1/exchange-amount/${amount}/${tickers}?api_key=${this.state.key}`).then(response => {
        return response.data
      })
      ctx.commit('setEstimatedAmount', res)
    }
  },
  mutations: {
    getData(state, res) {
      state.info = res
    },
    setMinimal(state, res) {
      state.min = res.minAmount
      console.log(state.min);
    },
    setEstimatedAmount(state, res) {
      state.estimated = res.estimatedAmount
    }
  },
  getters: {},
  modules: {}
})