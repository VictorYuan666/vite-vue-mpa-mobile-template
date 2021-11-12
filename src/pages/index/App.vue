<template>
  <HelloWorld msg="hello" class="p-1" />

  <van-button type="primary" size="mini" @click="test">test</van-button>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Dialog } from 'vant';
  import HelloWorld from '@/components/HelloWorld.vue';
  import { delay } from '@/utils';
  const test = async () => {
    await delay(1000);
    Dialog.alert({
      title: '标题',
      message: '弹窗内容',
      theme: 'round-button',
    });
  };
</script>
<style lang="scss" scoped>
  @import '@/styles/var.scss';
  .p-1 {
    color: $blue;
  }
</style>
