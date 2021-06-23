<template>
  <div>
    <span class="a">{{ count }}</span>
    <Button type="primary" @click="increase"> + </Button>
  </div>
</template>

<script lang="ts">
  import { Button } from 'vant';

  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    components: {
      Button,
    },
    setup() {
      let count = ref(0);
      const test = {
        a: 1,
      };

      function increase() {
        count.value += test.a;
      }
      return { count, increase };
    },
  });
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
