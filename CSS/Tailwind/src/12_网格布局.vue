<template>
  <div>
    <h2>网格布局</h2>
    <!-- <div class="w-[500px] h-[500px] border grid grid-cols-3 grid-rows-3">
      <div v-for="i in 9" class="bg-red-500">{{ i }}</div>
    </div> -->
    <!-- <div class="w-[500px] h-[500px] border grid grid-cols-3 grid-rows-3 justify-items-center items-center">
      <div v-for="i in 9" class="w-[100px] h-[100px] bg-red-500">{{ i }}</div>
    </div> -->

    <!-- <div class="w-[500px] h-[500px] border grid grid-cols-3 grid-rows-3 gap-1">
      <div class="bg-red-500 col-span-2 row-span-2">1</div>
      <div class="bg-red-500 row-span-2">2</div>
      <div class="bg-red-500 col-span-3">3</div>
    </div> -->

    <!-- <div class="h-[300px] border inline-grid grid-cols-1 grid-rows-3 grid-flow-col">
      <div v-for="i in 7" class="w-[100px] h-[100px] bg-red-500">{{ i }}</div>
    </div> -->

    <div class="w-[500px] h-[500px] border grid grid-cols-[100px_100px_100px] grid-rows-[100px_100px_100px] justify-between content-between">
      <div v-for="i in 9" class="w-[100px] h-[100px] bg-red-500">{{ i }}</div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>