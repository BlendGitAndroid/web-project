<template>
  <div>
    <h2>弹性布局</h2>
    <div class="w-[500px] h-[500px] border flex flex-col-reverse">
      <div class="w-[100px] h-[100px] bg-red-500">1</div>
      <div class="w-[100px] h-[100px] bg-red-500">2</div>
      <div class="w-[100px] h-[100px] bg-red-500">3</div>
    </div>

    <div class="w-[500px] h-[500px] border flex justify-around items-center">
      <div class="w-[100px] h-[100px] bg-red-500">1</div>
      <div class="w-[100px] h-[100px] bg-red-500">2</div>
      <div class="w-[100px] h-[100px] bg-red-500">3</div>
    </div>

    <div class="w-[500px] h-[500px] border flex flex-wrap content-between">
      <div v-for="i in 7" class="w-[100px] h-[100px] bg-red-500">{{ i }}</div>
    </div>

    <div class="w-[500px] h-[500px] border flex">
      <!--       shrink 当空间不足时，等比例的缩放-->
      <div v-for="i in 7" class="w-[100px] h-[100px] bg-red-500 shrink-0">{{ i }}</div>
    </div>

    <div class="w-[500px] h-[500px] border flex">
      <!--      grow属性，等比例的扩大-->
      <div v-for="i in 3" class="w-[100px] h-[100px] bg-red-500 grow">{{ i }}</div>
    </div>

    <div class="w-[500px] h-[500px] border flex">
      <div v-for="i in 3" class="w-[100px] h-[100px] bg-red-500 flex-initial order">{{ i }}</div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>