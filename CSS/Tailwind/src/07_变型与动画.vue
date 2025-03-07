<template>
  <div>
    <h2>变型与动画</h2>
    <div class="w-[100px] h-[100px] bg-[red] ml-[100px]"></div>
    <div class="w-[100px] h-[100px] bg-[blue] ml-[100px] scale-150"></div>
    <div class="w-[100px] h-[100px] bg-[yellow] ml-[100px] rotate-45"></div>
    <div class="w-[100px] h-[100px] bg-[pink] ml-[100px] translate-x-20"></div>
    <div class="w-[100px] h-[100px] bg-black ml-[100px] skew-x-12 skew-y-12"></div>
    <br>
    <!--    还使用了hover-->
    <div
        class="w-[100px] h-[100px] bg-[red] ml-[100px] transition-all duration-1000 hover:w-[200px] hover:h-[200px] hover:bg-[blue]"></div>
    <br>
    <!--    动画旋转-->
    <div class="w-[100px] h-[100px] bg-[red] ml-[100px] animate-spin"></div>
    <!--    放大,透明度变为0-->
    <div class="w-[100px] h-[100px] bg-[red] ml-[100px] animate-ping"></div>
    <!--    脉冲-->
    <div class="w-[100px] h-[100px] bg-[red] ml-[100px] animate-pulse"></div>
    <!--    跳动-->
    <div class="w-[100px] h-[100px] bg-[red] ml-[100px] animate-bounce"></div>

    <div class="w-[100px] h-[100px] bg-[red] ml-[100px] hover:animate-spin"></div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>