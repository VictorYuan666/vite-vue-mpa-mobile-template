<template>
  <HelloWorld msg="hello" />

  <van-button type="primary" size="mini" @click="test">test</van-button>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Dialog } from 'vant';
  import HelloWorld from '@/components/HelloWorld.vue';
  const test = () => {
    Dialog.alert({
      title: '标题',
      message: '弹窗内容',
      theme: 'round-button',
    });
  };
</script>
