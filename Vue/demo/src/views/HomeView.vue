<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <input v-model="inputValue" />
    <button class="button" @click="handleAddItem">Add Item</button>
    <list-item v-for="(item, index) in list" :key="index" :item-value="item" />

    <div @click="handleChangeName">
      {{ myName }}
    </div>

    <div @click="handleChangeName">
      {{ name }}
    </div>

    <div @click="handleGetGithubName">
      {{ name }}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

// 引入HelloWorld组件，是单文件组件
import HelloWorld from "@/components/HelloWorld.vue";
import ListItem from "@/components/ListItem.vue";
import { ref, reactive } from "vue";

import { toRefs } from "vue";
import { useStore } from "vuex";

export default {
  // 这个组件名称是HomeView的组件名称
  name: "HomeView",
  // 注册HelloWorld组件
  components: {
    HelloWorld,
    ListItem,
  },

  computed: {
    myName() {
      // 通过store获取state中的name
      return this.$store.state.name;
    },
  },

  setup() {
    const inputValue = ref("");
    const list = reactive([]);

    // 获取store
    const store = useStore();

    // 解构store中的state中的name
    const { name } = toRefs(store.state);

    const handleAddItem = () => {
      if (!inputValue.value) {
        return;
      }
      list.push(inputValue.value);
      inputValue.value = "";
    };

    const handleChangeName = () => {
      store.commit("changeName", "Composition name");
    };

    const handleGetGithubName = () => {
      store.dispatch("getGithubName");
    };

    return {
      inputValue,
      list,
      handleAddItem,
      name,
      handleChangeName,
      handleGetGithubName,
    };
  },
};
</script>

<style>
.item-class {
  margin-left: 20px;
  color: aqua;
}
.button {
  margin-left: 20px;
  color: red;
}
</style>
