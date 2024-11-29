<template>
  <div>
    <h2>滤镜效果</h2>
    <div class="flex">
      <div>
        <img class="blur-sm" width="200" src="./assets/1.jpg" alt="" />
        <img class="blur-[1px]" width="200" src="./assets/1.jpg" alt="" />
      </div>
      <div>
        <img class="brightness-50" width="200" src="./assets/1.jpg" alt="" />
        <img class="brightness-200" width="200" src="./assets/1.jpg" alt="" />
      </div>
      <div>
        <img class="contrast-50" width="200" src="./assets/1.jpg" alt="" />
        <img class="contrast-200" width="200" src="./assets/1.jpg" alt="" />
      </div>
      <div>
        <div class="flex justify-center items-center relative">
          <div class="backdrop-blur-sm bg-white/30 absolute w-24 h-24">
          </div>
          <img width="200" src="./assets/1.jpg" alt="" />
        </div>
        <div class="flex justify-center items-center relative">
          <div class="backdrop-brightness-200 bg-white/30 absolute w-24 h-24">
          </div>
          <img width="200" src="./assets/1.jpg" alt="" />
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
