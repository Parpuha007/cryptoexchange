<template>
  <div class="input-box">
    <input
      type="number"
      :placeholder="isLeft === true ? min : null"
      :disabled="isLeft ? false : true"
      @input="updateValue"
      :value="getValue"
    />
    <div @click="showList = !showList" class="current">
      <img class="current-image" :src="imageSrc" alt="" />
      <span>{{ getCurrentTicker }}</span>
    </div>
    <div class="curencies-list" v-if="showList">
      <input type="search" v-model="searchValue" placeholder="Search" />
      <img
        class="cross"
        @click="closeSearch"
        src="../assets/cross.svg"
        alt=""
      />
      <ul>
        <li
          @click="changeTicker(item.ticker)"
          :value="item.ticker"
          v-for="item in filterInfo"
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
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  props: ["isLeft"],
  data() {
    return {
      showList: false,
      currentTicker: null,
      searchValue: "",
      imageSrc: null,
    };
  },
  methods: {
    ...mapActions(["loadMinimalAmount"]),
    ...mapMutations([
      "setTicker",
      "setTickerString",
      "newValue",
      "clearValues",
    ]),
    closeSearch() {
      this.showList = false;
      this.searchValue = "";
    },
    findImage() {
      const index = this.info.findIndex(
        (item) => item.ticker === this.getCurrentTicker
      );
      this.imageSrc = this.info[index].image;
    },
    changeTicker(newTicker) {
      if (
        (this.isLeft && this.rightTicker === newTicker) ||
        (!this.isLeft && this.leftTicker === newTicker)
      ) {
        alert("Одинаковые тикеры недопустимы!");
        this.showList = false;
        return;
      }
      this.currentTicker = newTicker;
      this.showList = false;
      this.setTicker({
        newTicker: newTicker,
        isLeft: this.isLeft,
      });
      this.setTickerString();
      this.loadMinimalAmount(this.tickerString);
      this.clearValues();
      this.searchValue = "";
    },
    updateValue(e) {
      this.newValue(e.target.value);
    },
  },
  async mounted() {
    this.findImage();
  },
  computed: {
    ...mapState([
      "info",
      "rightTicker",
      "leftTicker",
      "value",
      "estimated",
      "tickerString",
      "min",
    ]),
    getCurrentTicker() {
      if (this.isLeft) {
        return this.leftTicker;
      } else {
        return this.rightTicker;
      }
    },
    getValue() {
      if (this.isLeft) {
        return this.value;
      } else {
        return this.estimated;
      }
    },
    filterInfo() {
      return this.info.filter(
        (item) =>
          item.ticker.includes(this.searchValue) ||
          item.name.toLowerCase().includes(this.searchValue) ||
          item.ticker.toUpperCase().includes(this.searchValue)
      );
    },
  },
  watch: {
    getCurrentTicker() {
      this.findImage();
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
  color: #000;
}

ul {
  position: absolute;
}
.current {
  position: absolute;
  width: 200px;
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
  z-index: 999;
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