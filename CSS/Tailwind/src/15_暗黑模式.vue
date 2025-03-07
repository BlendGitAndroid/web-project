<template>
  <div>
    <h2>暗黑模式</h2>
    <button @click="handleClick">切换模式</button>
    <!-- dark:是变体修饰符，指定了在暗黑模式下应用的样式   -->
    <!--    bg-black表示背景是黑色-->
    <div class="w-64 h-64 border bg-white dark:bg-black dark:text-white">aaaaaaaa</div>
  </div>
</template>

<script setup>
let isDark = false
const handleClick = () => {
  if (isDark) {
    // 取消暗黑模式
    document.documentElement.classList.remove('dark')
  } else {
    // 触发暗黑模式
    document.documentElement.classList.add('dark')
  }
  isDark = !isDark
}

</script>

<style scoped>

</style>