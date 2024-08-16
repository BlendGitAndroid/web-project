<template>
  <div class="about">
    <h1 @click="changeNameDispatch">This is an about page</h1>

    <h1 @click="changeNameCommit">{{myName}}</h1>
  </div>
</template>

<script>
  export default {
    name: "AboutView",

    computed: {
      myName() {
        return this.$store.state.name;
      },
    },

    methods: {
      changeNameDispatch() {
      // 1. dispatch 方法，派发一个 action，名字叫做change
      // 2. 感知到 change 这个action，执行store 中 actions 下面的 change 方法
      // 3. commit 提交一个叫做 change 的数据改变
      // 4. mutation 感知到提交的change改变，执行 change 方法改变数据
        this.$store.dispatch("changeNameDispatch", "Blend Dispatch");
      },

      changeNameCommit() {
        // 直接调用commit方法，提交一个叫做change的数据改变
        this.$store.commit("changeName", "Blend Commit");
      },
    },
  };
</script>
