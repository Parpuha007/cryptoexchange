<template>
  <div class="input-box">
    <h4>Your Ethereum address</h4>
    <div class="row">
      <input type="text" />
      <div class="center">
        <button @click="$emit('submitForm')">Exchange</button>
        <p v-if="this.$store.state.showError">This pair is disabled now</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.input-box {
  margin-top: 32px;
}
h4 {
  font-size: 16px;
  line-height: 23px;
  font-weight: normal;
  margin-bottom: 8px;
}
input {
  background: #f6f7f8;
  border: 1px solid #e3ebef;
  box-sizing: border-box;
  border-radius: 5px;
  height: 50px;
  width: 75%;
  max-width: 723px;
  outline: none;
  text-indent: 14px;
  font-size: 16px;
  color: #000;
}
button {
  background: #11b3fe;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  font-size: 16px;
  line-height: 120%;
  color: #fff;
  width: 100%;
  text-transform: uppercase;
  transition: 0.3s;
  cursor: pointer;
  height: 50px;
}
button:hover {
  background: #0095e0;
}
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 21%;
  max-width: 205px;
  position: relative;
}
.center p {
  color: #e03f3f;
  position: absolute;
  bottom: -30px;
}
@media (max-width: 480px) {
  input {
    width: 100%;
    margin-bottom: 16px;
  }
  .center {
    width: 100%;
    max-width: unset;
  }
}
</style>