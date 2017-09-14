import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    question: null,
    selected_question: [],
    mask_active: true
  },
  mutations: {
    set_question: function (state, data) {
      state.question = data;
    },
    set_selected_questions: function (state, type) {
      let arr = [];
      let { question } = state;
      // 随机取四个数据
      function get4from(arr) {
        let temp_arr = [];
        for (let i = 0; i < 4; i++) {
          let temp = random(0, arr.length);
          if (temp_arr.indexOf(temp) == -1) {
            temp_arr.push(temp);
          } else {
            i--;
          }
        }
        return [arr[temp_arr[0]], arr[temp_arr[1]], arr[temp_arr[2]], arr[temp_arr[3]]];
      }
      // 获取随机数
      function random(min, max) {
        return Math.floor(Math.random() * max - min);
      }
      // 根据类型判断文理科
      if (type == 'liberal') {
        Object.values(question).forEach(val => {
          if (val.type !== 1) {
            arr.push(val);
          }
        })
      } else if (type == 'science') {
        Object.values(question).forEach(val => {
          if (val.type == 1 || val.type == 2) {
            arr.push(val);
          }
        })
      }

      state.selected_question = [...get4from(arr)];
    }
  },
  actions: {
    get_question: function ({ commit }, data) {
      commit('set_question', data);
    }
  }
})

export default store;