<template>
  <div>
    <h2>伪类交互</h2>
    <!-- <button class="border rounded-full px-2 py-1 text-white bg-cyan-400 hover:bg-cyan-600 active:bg-cyan-950">这是一个按钮</button> -->
    <!--  <input type="text" disabled class="disabled:bg-red-500" /> -->

    <!-- <input type="text" class="border focus:bg-red-500 placeholder:font-bold placeholder:text-blue-500" placeholder="请输入用户名" /> -->

    <!-- <input type="file" class="file:bg-red-500 file:rounded-lg file:text-white"> -->

    <!-- <ul class="ml-6 list-disc marker:text-red-500">
      <li class="odd:bg-red-500 even:bg-blue-500">aaaaaa</li>
      <li class="odd:bg-red-500 even:bg-blue-500">bbbbbb</li>
      <li class="odd:bg-red-500 even:bg-blue-500">cccccc</li>
      <li class="odd:bg-red-500 even:bg-blue-500">dddddd</li>
    </ul> -->

    <!-- <ul class="ml-6 list-disc marker:text-red-500">
      <li v-for="i in 5" class="odd:bg-red-500 even:bg-blue-500 first:!bg-slate-700 last:!bg-green-700">aaaaaa</li>
    </ul> -->
    <!-- <div class="w-48 h-48 border first-line:bg-red-500 first-letter:text-5xl selection:bg-red-500">
      测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字
    </div> -->

    <!-- <div class="before:content-['hello'] before:bg-red-500">
      测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字
    </div> -->

    <!-- <div class="group/edit">
      aaaaaaaaaaaaaaaaaaaaaaaaaa
      <div class="group/save">
        bbbbbbbbbbbbbbbbbbbbbbbbb
        <button class="border rounded-full px-2 py-1 text-white bg-cyan-400 group-hover/save:bg-blue-600 group-active/save:bg-blue-950">保存</button>
        <button class="border rounded-full px-2 py-1 text-white  bg-cyan-400 group-hover/edit:bg-cyan-600 group-active/edit:bg-cyan-950">编辑</button>
      </div>
    </div> -->
    <!-- <input type="email" class="peer border" />
    <div class="peer-invalid:bg-red-500">请输入正确的邮箱</div> -->
    <input type="checkbox" class="peer" />
    <div class="peer-checked:hidden">aaaaaaa</div>
  </div>
</template>

<script setup></script>

<style scoped></style>
