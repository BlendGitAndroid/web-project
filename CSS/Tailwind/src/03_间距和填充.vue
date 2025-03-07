<template>
  <div>
    <h2>间距和填充</h2>
    <div class="m-20">aaaaa</div>
    <div class="-m-2">aaaaa</div>
    <div class="m-[100px]">aaaaa</div>
    <div class="p-20">bbbb</div>

    <div class="w-full h-1 bg-red-500"></div>

    <!--
    这个选择器匹配 .space-y-7 类的直接子元素中，所有非隐藏元素（即不具有 hidden 属性的元素）之间的兄弟元素。
    ~ 是通用兄弟选择器，表示选择所有后续兄弟元素,也就是第一个元素不算,是算后续的兄弟元素的。
    .space-y-7 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;  // 自定义属性,这个值是0
    margin-top: calc(1.75rem /* 28px */ * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1.75rem /* 28px */ * var(--tw-space-y-reverse)); }
    -->
    <div class=" space-y-7 border">
      <div class="bg-red-50">aaaa</div>
      <div class="bg-red-50">bbbb</div>
      <div class="bg-red-50">cccc</div>
    </div>
    <div class="flex space-x-7">
      <div>aaaa</div>
      <div>bbbb</div>
      <div>cccc</div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
