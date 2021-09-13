import { createStore } from 'vuex'
import axios from "axios";
export default createStore({
  state() {
    return {
      info: null,
      key: 'c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd',
      min: null,
      value: null,
      estimated: null,
      leftTicker: 'btc',
      rightTicker: 'eth',
      tickerString: 'btc_eth',
      showError: false
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
    async loadMinimalAmount(ctx, tickerString) {
      const res = await axios.get(`https://api.changenow.io/v1/min-amount/${tickerString}?api_key=${this.state.key}`).then((response) => {
        return response.data;
      }).catch(e => {
        console.log(e);
        ctx.commit('showError')
      });

      ctx.commit('setMinimal', res)
    },

    async estimatedAmount(ctx) {
      const res = await axios.get(`https://api.changenow.io/v1/exchange-amount/${this.state.value}/${this.state.tickerString}?api_key=${this.state.key}`).then(response => {
        return response.data
      }).catch(e => {
        console.log(e);
        ctx.commit('showError')
      })
      ctx.commit('setEstimatedAmount', res)
    },
  },
  mutations: {
    getData(state, res) {
      state.info = res
    },
    setMinimal(state, res) {
      state.min = res.minAmount
    },
    setEstimatedAmount(state, res) {
      state.estimated = res.estimatedAmount
    },
    showError(state) {
      state.showError = true
      state.value = null
      state.estimated = null
    },
    setTicker(state, { newTicker, isLeft }) {
      if (isLeft) {
        state.leftTicker = newTicker
      } else {
        state.rightTicker = newTicker
      }
    },
    setTickerString(state) {
      state.tickerString = state.leftTicker + '_' + state.rightTicker
    },
    newValue(state, value) {
      state.value = value
    },
    clearValues(state) {
      state.value = null
      state.estimated = null
    },
    swapTickers(state) {
      [state.rightTicker, state.leftTicker] = [state.leftTicker, state.rightTicker]

    }
  },
  getters: {},
  modules: {}
})