import { createStore } from 'vuex'
import axios from 'axios';

// VueX 数据管理框架
// VueX 创建了一个全局唯一的仓库，用来存放全局的数据
export default createStore({

  // state 里面存放的是全局的数据
  state: {
    name: 'Blend'
  },
  getters: {
  },

  // mutation 里面只允许写同步代码，不允许写异步代码
  // commit 和 mutation 做关联
  mutations: {
    changeName(state, payload) {
      console.log(state); // {name: "Blend"}，这其实是一个Proxy对象
      console.log(payload);
      state.name = payload;
    }
  },

  // dispatch 里面允许写异步代码
  // dispatch 和 actions 做关联
  actions: {
    changeNameDispatch(store, payload) {
      setTimeout(() => {
        console.log('changeNameDispatch');
        store.commit("changeName", payload);
      }, 1000);
    },

    getGithubName(store) {
      axios.get('https://api.github.com/users')
        .then((response) => {
          const msg = response.data[0].login;
          store.commit('changeName', msg)
        })
    }
  },

  modules: {
  }
})
