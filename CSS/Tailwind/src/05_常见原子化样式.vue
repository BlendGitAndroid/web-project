<template>
  <div>
    <h2>常见原子化样式</h2>
    <div class=" bg-black">aaaaaaaaaa</div>
    <div class=" bg-white">aaaaaaaaaa</div>
    <div class=" bg-red-500">aaaaaaaaaa</div>
    <div class=" bg-blue-500">aaaaaaaaaa</div>
    <!--    设置渐变-->
    <div class=" bg-gradient-to-r from-blue-500 to-red-500">bbbbbbbbbbb</div>
    <!--    还能结合行内式-->
    <div class=" w-96 h-96" style="background-image: url(./src/assets/1.jpg);">cccccccc</div>
    <br>
    <div class="w-96 h-96 shadow-orange-700 shadow-2xl">aaaaaaaaaaa</div>
    <br>
    <div class="opacity-50">aaaaaaaaaaa</div>
    <div class="opacity-20">bbbbbbbbbbb</div>
    <br>
    <div class="block">11ccccccccc</div>
    <div class="inline-block">22ccccccccc</div>
    <div class="inline-block">22ccccccccc</div>
    <br>
    <div class="flex">33ccccccccc</div>
    <div class="grid">44ccccccccc</div>
    <div class="hidden">55ccccccccc</div>
    <div class="overflow-hidden border">
      <div class="float-left">66aaaaaaaaa11</div>
    </div>

    <div class=" float-left">XXXXXXXXXXXX</div>
    <div class=" absolute -left-60 bottom-40">cccccc11</div>
    <div class=" relative">cccccc22</div>
    <div class=" fixed">cccccc33</div>
    <div class=" sticky">cccccc44</div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>