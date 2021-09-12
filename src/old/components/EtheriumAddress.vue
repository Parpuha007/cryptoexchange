<template>
  <div class="input-box">
    <h4>Your Ethereum address</h4>
    <div class="row">
      <input type="text" />
      <button @click="$emit('submitForm')">Exchange</button>
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
}
button {
  background: #11b3fe;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  font-size: 16px;
  line-height: 120%;
  color: #fff;
  width: 21%;
  max-width: 205px;
  text-transform: uppercase;
  transition: 0.3s;
  cursor: pointer;
}
button:hover {
  background: #0095e0;
}
</style>