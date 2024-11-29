<template>
  <div class="flex h-48 items-center justify-center bg-white">
    <img class="w-48" src="./assets/img/ghost-logo.png" alt="" />
  </div>
  <div class="border-b-2 border-t bg-white px-4">
    <div class="flex h-14 items-center justify-center md:hidden">
      <label for="toggle">
        <i class="iconfont icon-zhedie cursor-pointer"></i>
      </label>
    </div>
    <input id="toggle" type="checkbox" class="peer hidden" />
    <ul class="hidden peer-checked:block md:!flex md:justify-center">
      <li
        class="relative flex h-14 items-center px-5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-amber-500"
      >
        <a href="#">首页</a>
      </li>
      <li class="relative flex h-14 items-center px-5">
        <a href="#">论坛</a>
      </li>
      <li class="relative flex h-14 items-center px-5">
        <a href="#">快捷手册</a>
      </li>
      <li class="relative flex h-14 items-center px-5">
        <a href="#">中文文档</a>
      </li>
      <li class="relative flex h-14 items-center px-5">
        <a href="#">关于</a>
      </li>
    </ul>
  </div>
  <div
    class="mx-auto box-border w-full px-4 lg:grid lg:w-[940px] lg:grid-cols-12 xl:w-[1160px]"
  >
    <div class="lg:col-span-8 lg:px-4">
      <div v-for="i in 3" :key="i" class="mt-9 bg-white p-9 leading-normal">
        <h2 class="text-center text-4xl">全新的 Ghost 文档上线</h2>
        <div class="my-4 text-center text-gray-500">
          <span>作者：王赛</span> • <span>2018年11月20日</span>
        </div>
        <p class="text-lg">
          我们的整个 Ghost 文档
          已经全新改版了！并且添加了一些新的补充，包括使用教程和功能集成。
          新文档的目标是帮助更多人有效地安装并管理他们发布的内容，并且最大限度地发挥
          Ghost
          作为一个开源发布平台的灵活性。文档的设计和结构已经修订完毕，我们的改进包括
          Ghost 安装和设
        </p>
        <button class="my-7 bg-yellow-600 p-2 text-white">阅读全文</button>
        <section class="border-t pt-5">
          <i class="iconfont icon-wenjianjia mr-2.5"></i>
          <a href="#">Android</a>，
          <a href="#">客户端</a>
        </section>
      </div>
    </div>
    <div class="lg:col-span-4 lg:px-4">
      <div class="mt-9 bg-white p-9">
        <h3
          class="relative border-b pb-2.5 text-xl after:absolute after:-bottom-px after:left-0 after:h-px after:w-24 after:bg-yellow-600"
        >
          声明
        </h3>
        <p class="mt-7">Ghost 中文版不再继续维护，请去官方下载。</p>
      </div>
      <div class="mt-9 bg-white p-9">
        <h3
          class="relative border-b pb-2.5 text-xl after:absolute after:-bottom-px after:left-0 after:h-px after:w-24 after:bg-yellow-600"
        >
          下载
        </h3>
        <button class="mt-7 w-full bg-yellow-600 p-2 text-white">
          Ghost最新版
        </button>
      </div>
      <div class="mt-9 bg-white p-9">
        <h3
          class="relative border-b pb-2.5 text-xl after:absolute after:-bottom-px after:left-0 after:h-px after:w-24 after:bg-yellow-600"
        >
          标签云
        </h3>
        <div class="mt-5">
          <a href="#" class="mr-2 mt-3 inline-block border px-3 py-1.5"
            >客户端</a
          >
          <a href="#" class="mr-2 mt-3 inline-block border px-3 py-1.5"
            >Android</a
          >
          <a href="#" class="mr-2 mt-3 inline-block border px-3 py-1.5"
            >jQuery</a
          >
          <a href="#" class="mr-2 mt-3 inline-block border px-3 py-1.5"
            >Ghost 0.7 版本</a
          >
          <a href="#" class="mr-2 mt-3 inline-block border px-3 py-1.5">开源</a>
          <a href="#" class="mr-2 mt-3 inline-block border px-3 py-1.5"
            >助手函数</a
          >
          <a href="#" class="mr-2 mt-3 inline-block border px-3 py-1.5"
            >客户端</a
          >
          <a href="#" class="mr-2 mt-3 inline-block border px-3 py-1.5"
            >Android</a
          >
          <a href="#" class="mr-2 mt-3 inline-block border px-3 py-1.5"
            >jQuery</a
          >
          <a href="#" class="mr-2 mt-3 inline-block border px-3 py-1.5"
            >Ghost 0.7 版本</a
          >
          <a href="#" class="mr-2 mt-3 inline-block border px-3 py-1.5">开源</a>
          <a href="#" class="mr-2 mt-3 inline-block border px-3 py-1.5"
            >助手函数</a
          >
        </div>
      </div>
    </div>
  </div>
  <div class="mt-9 bg-gray-900 pt-9">
    <div class="mx-auto lg:grid lg:w-[940px] lg:grid-cols-12 xl:w-[1160px]">
      <div class="mb-7 px-7 lg:col-span-4">
        <h3
          class="relative border-b border-b-gray-400 pb-2.5 text-xl text-white after:absolute after:-bottom-px after:left-0 after:h-px after:w-24 after:bg-yellow-600"
        >
          友链
        </h3>
        <div class="mt-5">
          <a class="m-2.5 inline-block text-gray-500" href="#"
            >Bootstrap中文网</a
          >
          <a class="m-2.5 inline-block text-gray-500" href="#">React</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">Vue.js</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">Svelte</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">Preact</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">Babel</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">Webpack</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">Rollup.js</a>
          <a class="m-2.5 inline-block text-gray-500" href="#"
            >Bootstrap中文网</a
          >
          <a class="m-2.5 inline-block text-gray-500" href="#">React</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">Vue.js</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">Svelte</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">Preact</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">Babel</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">Webpack</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">Rollup.js</a>
        </div>
      </div>
      <div class="mb-7 px-7 lg:col-span-4">
        <h3
          class="relative border-b border-b-gray-400 pb-2.5 text-xl text-white after:absolute after:-bottom-px after:left-0 after:h-px after:w-24 after:bg-yellow-600"
        >
          标签云
        </h3>
        <div class="mt-5">
          <a class="m-2.5 inline-block text-gray-500" href="#">客户端</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">Android</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">jQuery</a>
          <a class="m-2.5 inline-block text-gray-500" href="#"
            >Ghost 0.7 版本</a
          >
          <a class="m-2.5 inline-block text-gray-500" href="#">开源</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">助手函数</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">客户端</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">客户端</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">Android</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">jQuery</a>
          <a class="m-2.5 inline-block text-gray-500" href="#"
            >Ghost 0.7 版本</a
          >
          <a class="m-2.5 inline-block text-gray-500" href="#">开源</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">助手函数</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">客户端</a>
        </div>
      </div>
      <div class="mb-7 px-7 lg:col-span-4">
        <h3
          class="relative border-b border-b-gray-400 pb-2.5 text-xl text-white after:absolute after:-bottom-px after:left-0 after:h-px after:w-24 after:bg-yellow-600"
        >
          合作伙伴
        </h3>
        <div class="mt-5">
          <a class="m-2.5 inline-block text-gray-500" href="#">腾讯</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">阿里巴巴</a>
          <a class="m-2.5 inline-block text-gray-500" href="#">百度</a>
        </div>
      </div>
    </div>
    <div class="flex h-20 items-center justify-center bg-black text-gray-400">
      <p>
        Copyright © Ghost中文网 | 京ICP备11008151号-11 |
        京公网安备11010802014853
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
