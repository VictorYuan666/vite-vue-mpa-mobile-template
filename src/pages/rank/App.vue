<template>
  <div> rank{{ count }} </div>
</template>

<script>
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    setup() {
      let count = ref(0);

      return {
        count,
      };
    },
  });
</script>
