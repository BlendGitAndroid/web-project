<template>
  <div>
    <h2>字体与排版</h2>
    <div class=" font-sans">hello你好</div>
    <div class=" font-serif">hello你好</div>
    <div class=" font-mono">hello你好</div>
    <div class=" font-bold">hello你好</div>
    <br>
    <div class="text-3xl text-red-600">aaaaaaa</div>
    <!--    半透明0.5 -->
    <div class="text-3xl text-red-600/50">aaaaaaa</div>
    <br>
    <!--    透明度要和颜色一起使用,否则不起作用-->
    <div class="text-left text-red-600 text-opacity-50">bbbbbbbbb</div>
    <br>
    <div class=" underline underline-offset-4 decoration-red-500 decoration-wavy">aaaaaaaaaaaa</div>
    <br>
    <div class="w-20 line-clamp-4">测试测试测试测试测试测试测试测试测试测试测试测试测试</div>

    <ul class=" list-disc list-outside ml-20 marker:text-red-500">
      <li>aaaa</li>
      <li>bbbb</li>
      <li>cccc</li>
    </ul>
    <ul class=" list-disc list-inside ml-20">
      <li>aaaa</li>
      <li>bbbb</li>
      <li>cccc</li>
    </ul>

    <div class="before:content-['hello'] after:content-['world'] before:bg-red-500">aaaaaaaaaaaaaaaa</div>
  </div>
</template>

<script setup></script>

<style scoped></style>
