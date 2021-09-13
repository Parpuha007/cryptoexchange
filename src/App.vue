<template>
  <div v-if="info" class="container">
    <h1>Crypto Exchange</h1>
    <h3>Exchange fast and easy</h3>
    <div class="row">
      <ExchangeField ref="left" :isLeft="true" />
      <img src="./assets/swap.svg" @click="swap" class="swap-img" alt="" />
      <ExchangeField ref="right" :isLeft="false" />
    </div>
    <EtheriumAddress @submitForm="submitHandler" />
  </div>
  <p v-else>Loading...</p>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import EtheriumAddress from "./components/EtheriumAddress.vue";
import ExchangeField from "./components/ExchangeField.vue";
export default {
  components: { EtheriumAddress, ExchangeField },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["clearValues", "swapTickers", "setTickerString"]),
    ...mapActions(["estimatedAmount", "loadMinimalAmount", "loadInfo"]),
    submitHandler() {
      if (this.value < this.min) {
        alert(`Слишком маленькая сумма для обмена! Минимум: ${this.min}`);
        this.clearValues();
        return;
      }
      this.estimatedAmount();
    },
    async swap() {
      await this.swapTickers();
      this.clearValues();
      this.setTickerString();
      this.loadMinimalAmount(this.tickerString);
    },
  },
  async mounted() {
    await this.loadInfo();
    await this.loadMinimalAmount(this.tickerString);
  },
  computed: {
    ...mapState(["info", "min", "value", "estimated", "tickerString"]),
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
@media (max-width: 480px) {
  .row {
    flex-direction: column;
  }
  .swap-img {
    width: 24px;
    height: 24px;
    margin: 16px 0 16px auto;
    transform: rotate(90deg);
  }
  .container {
    top: unset;
    padding-top: 60px;
    transform: unset;
  }
  h1 {
    font-size: 11vw;
  }
  h3 {
    font-size: 5.5vw;
  }
}
</style>
