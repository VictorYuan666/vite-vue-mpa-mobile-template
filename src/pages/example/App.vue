<template>
  <div>
    <span class="a">{{ count }}</span>
    <van-button type="success" @click="increase">+</van-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  let count = ref(0);
  function increase() {
    count.value = count.value + 1;
  }
</script>

<style lang="less" scoped>
  .b {
    color: white;
    opacity: 0.5;
    position: relative;
  }

  .a {
    font-size: 16px;
    color: red;
    background-color: white;
  }
</style>
