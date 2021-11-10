<template>
  <h1>{{ props.msg }}</h1>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ msg?: string }>(), {
    msg: 'hello',
  });
</script>

<style scoped>
  a {
    color: #42b983;
  }
  h1 {
    font-size: 20px;
  }
</style>
