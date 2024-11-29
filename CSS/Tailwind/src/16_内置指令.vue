<template>
  <div>
    <h2>内置指令</h2>
    <div class="test1">aaaaaa</div>
    <div class="test2">bbbbbb</div>
    <div class="test">cccccc</div>
    <button class="border rounded-full px-2 py-1 text-white bg-cyan-400 hover:bg-cyan-600 active:bg-cyan-950">这是一个按钮</button>
    <button class="btn-primary">这是一个按钮</button>
    <button class="btn-danger">这是一个危险按钮</button>
  </div>
</template>

<script setup>

</script>

<style scoped>
.btn-danger {
  @apply border rounded-full px-2 py-1 text-white bg-red-400 hover:bg-red-600 active:bg-red-950
}
</style>