<template>
  <div class="container">
    <h1>Crypto Exchange</h1>
    <h3>Exchange fast and easy</h3>
    <div class="row">
      <ExchangeField
        @tickerWasChanged="changeTicker"
        :defaultTicker="leftTicker"
        :defaultValue="leftValue"
        :isLeft="true"
        :tickerString="tickerString"
        @inputValue="setLeftValue"
      />
      <img src="./assets/swap.svg" class="swap-img" alt="" />
      <ExchangeField
        @tickerWasChanged="changeTicker"
        :defaultTicker="rigthTicker"
        :isLeft="false"
        :tickerString="tickerString"
        :rightValue="rightValue"
      />
    </div>
    <EtheriumAddress @submitForm="submitHandler" />
  </div>
</template>

<script>
import EtheriumAddress from "./components/EtheriumAddress.vue";
import ExchangeField from "./components/ExchangeField.vue";
export default {
  components: { EtheriumAddress, ExchangeField },
  data() {
    return {
      info: null,
      leftTicker: "btc",
      leftValue: null,
      rigthTicker: "eth",
      rightValue: null,
      tickerString: "",
      leftOptions: {
        ticker: "btc",
        value: null,
        isLeft: true,
      },
    };
  },
  async mounted() {
    await this.$store.dispatch("loadInfo");
    this.info = this.$store.state.info;
    this.createTickerString();
  },
  methods: {
    changeTicker(newTicker, left) {
      if (left) {
        this.leftTicker = newTicker;
      } else {
        this.rigthTicker = newTicker;
      }
      this.createTickerString();
    },
    createTickerString() {
      if (this.leftTicker !== this.rigthTicker) {
        this.tickerString = this.leftTicker + "_" + this.rigthTicker;
      } else {
        alert("Тикеры равны! Выберите другую валюту!");
      }
    },
    setLeftValue(value) {
      this.leftValue = value;
    },
    async submitHandler() {
      if (this.leftValue < this.$store.state.min) {
        alert("Введенная сумма слишком мала!");
        this.setLeftValue(null);
        return;
      }
      await this.$store.dispatch("estimatedAmount", {
        amount: this.leftValue,
        tickers: this.tickerString,
      });
      this.rightValue = this.$store.state.estimated;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Vollkorn:wght@400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: "Vollkorn", sans-serif;
  height: 100vh;
  font-feature-settings: "pnum" on, "lnum" on;
}
input {
  font-family: "Vollkorn", sans-serif;
}
.container {
  width: 90vw;
  max-width: 960px;
  margin: auto;
  position: relative;
  top: 35vh;
  transform: translateY(-50%);
  color: #282828;
}
h1 {
  font-size: 50px;
  line-height: 120%;
  margin-bottom: 16px;
  font-weight: normal;
}
h3 {
  font-size: 20px;
  font-weight: normal;
  margin-bottom: 60px;
  line-height: 100%;
}
.row {
  display: flex;
  align-content: flex-start;
  justify-content: space-between;
}
.swap-img {
  cursor: pointer;
}
.curencies-list ul {
  background: #f6f7f8;
  /* border: 1px solid #c1d9e6; */
  box-sizing: border-box;
  border-radius: 5px;
}
</style>
