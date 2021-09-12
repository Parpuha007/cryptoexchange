<template>
  <div class="input-box">
    <input
      type="number"
      :placeholder="minValue"
      v-model="currentValue"
      @input="sendValue"
      :disabled="this.isLeft ? false : true"
    />
    <div @click="showList = !showList" class="current">
      <img class="current-image" :src="imageSrc" alt="" />
      <span>{{ currentTicker }}</span>
    </div>
    <div class="curencies-list" v-if="showList">
      <input type="search" v-model="searchValue" placeholder="Search" />
      <img
        class="cross"
        @click="showList = !showList"
        src="../assets/cross.svg"
        alt=""
      />
      <ul>
        <li
          @click="changeTicker(item.ticker)"
          :value="item.ticker"
          v-for="item in $store.state.info"
          :key="item.ticker"
        >
          <img :src="item.image" alt="" />
          <span class="ticker">{{ item.ticker }}</span>
          <span class="name">{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "defaultTicker",
    "isLeft",
    "tickerString",
    "rightValue",
    "defaultValue",
  ],
  data() {
    return {
      showList: false,
      currentTicker: this.defaultTicker,
      searchValue: "",
      minValue: null,
      currentValue: this.defaultValue,
      imageSrc: "",
    };
  },
  methods: {
    findImage() {
      const index = this.$store.state.info.findIndex(
        (item) => item.ticker === this.currentTicker
      );
      this.imageSrc = this.$store.state.info[index].image;
      console.log("findImage вызван");
    },
    changeTicker(newTicker) {
      this.currentTicker = newTicker;
      this.showList = false;
      this.$emit("tickerWasChanged", this.currentTicker, this.isLeft);
    },
    sendValue() {
      this.$emit("inputValue", this.currentValue);
    },
  },
  async mounted() {},
  async updated() {
    await this.$store.dispatch("loadMinimalAmount", this.tickerString);
    if (this.isLeft) {
      this.minValue = this.$store.state.min;
    }
    if (!this.isLeft) {
      this.currentValue = this.rightValue;
    }
  },
  watch: {
    async currentTicker() {
      await this.findImage();
    },
  },
};
</script>
<style scoped>
.input-box {
  max-width: 440px;
  width: 100%;
  position: relative;
}
input {
  background: #f6f7f8;
  border: 1px solid #e3ebef;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 16px;
  line-height: 23px;
  height: 50px;
  width: 100%;
  max-width: 440px;
  position: relative;
  text-indent: 14px;
  outline: none;
  appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
ul {
  position: absolute;
}
.current {
  position: absolute;
  width: 150px;
  height: 50px;
  right: 0;
  border-left: 1px solid #e3ebef;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  text-transform: uppercase;
}
.current::before {
  content: "";
  width: 16px;
  height: 16px;
  position: absolute;
  background: url(../assets/arrow.svg);
  background-size: 100%;
  right: 8px;
}
.curencies-list {
  width: 100%;
  top: 0;
  position: absolute;
  background: #f6f7f8;
}
.curencies-list ul {
  list-style: none;
  height: 150px;
  width: 100%;
  overflow-y: scroll;
}
.curencies-list ul li {
  height: 50px;
  background: #f6f7f8;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
}
.curencies-list ul li:hover {
  background: #eaf1f7;
}
.curencies-list ul li img {
  margin-right: 15px;
  padding-left: 15px;
}
.curencies-list ul li .ticker {
  text-transform: uppercase;
  margin-right: 15px;
}
.curencies-list ul li .name {
  color: #80a2b6;
}
.curencies-list .cross {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
::-webkit-search-cancel-button,
::-webkit-inner-spin-button,
::-webkit-scrollbar {
  display: none;
}
.current-image {
  margin-right: 15px;
}
</style>