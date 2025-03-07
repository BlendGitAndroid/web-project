<template>
  <div>
    <h2>尺寸与边框</h2>
    <!--    w-1就是0.25rem-->
    <div class="w-1 bg-red-500">aaaaaaa</div>
    <div class="w-2 bg-red-500">aaaaaaa</div>
    <div class="w-3 bg-red-500">aaaaaaa</div>
    <div class="w-96 bg-red-500">aaaaaaa</div>
    <div class="w-px bg-red-500">aaaaaaa</div>
    <div class="w-[3px] bg-red-500">aaaaaaa</div>
    <div class="w-1/2 bg-red-500">aaaaaaa</div>
    <div class="w-1/4 bg-red-500">aaaaaaa</div>
    <div class="w-1/6 bg-red-500">aaaaaaa</div>
    <div class="w-full bg-red-500">aaaaaaa</div>
    <div class="w-1.5 bg-red-500">aaaaaaa</div>
    <div class="w-screen bg-red-500">aaaaaaa</div>
    <br>
    <div class="w-64 h-64 bg-red-500"></div>

    <br>

    <div class="border border-red-500">bbbbbbbbb</div>

    <br>

    <ul class="divide-y-4">
      <li>aaaa</li>
      <li>bbbb</li>
      <li>cccc</li>
    </ul>

    <br>

    <!-- 先设置边框,再在边框的外面设置dashed,设置outline的宽度,再设置outline距离边框的距离-->
    <button class="border outline-dashed outline-4 outline-offset-2 mb-6">按钮1</button>
    <br>
    <!-- 先设置边框,再在边框的外面设置dashed,设置outline的阴影宽度,再设置阴影距离边框的距离   -->
    <button class="border outline-dashed ring-4 ring-offset-8">按钮2</button>
    <br>
    <div class="border">aaaaaa</div>

    <br>

    <button class="border p-2 rounded-full">测试按钮</button>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>