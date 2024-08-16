<template>
  <li class="item-class">{{ itemValue }}</li>
</template>

<script>
// 在子组件中，可以使用父组件的样式，item-class就是定义在父组件中的样式

export default {
  name: "ListItem",
  props: {
    itemValue: String,
  },
};
</script>
