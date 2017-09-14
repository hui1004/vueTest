<template>
  <div class="q1">
    <div class="header">
      <div class="title">{{subjectCh+' '+step}}题/4题</div>
      <div class="question">{{question_name}}</div>
      <div class="answers">
        <ul>
          <li class="answer-item" @click="change_bg(0)" :class="{'selected-answer':bg_list[0]}">
            <span class="answer-alpha a"></span>
            <span class="answer-text">{{an1}}</span>
          </li>
          <li class="answer-item" @click="change_bg(1)" :class="{'selected-answer':bg_list[1]}">
            <span class="answer-alpha b"></span>
            <span class="answer-text">{{an2}}</span>
          </li>
          <li class="answer-item" @click="change_bg(2)" :class="{'selected-answer':bg_list[2]}">
            <span class="answer-alpha c"></span>
            <span class="answer-text">{{an3}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  created: function() {

    if (this.$route.query.type === 1) {
      this.$store.commit('set_selected_questions', 'science');// 获取理科数据
    } else if (this.$route.query.type === 0) {
      this.$store.commit('set_selected_questions', 'liberal');// 获取文科数据      
    }

    this.step = this.$route.params.step * 1;

    let { title, answers ,subjectCh  } = this.$store.state.selected_question[this.step - 1];

    this.question_name = title;
    this.subjectCh = subjectCh;
    this.an1 = answers[0];
    this.an2 = answers[1];
    this.an3 = answers[2];
  },
  watch: {
    '$route': function(n, o) {
      this.bg_list = [!1, !1, !1];
      this.step = this.$route.params.step * 1;

      let { title, answers,subjectCh } = this.$store.state.selected_question[this.step - 1];

      this.question_name = title;
      this.subjectCh = subjectCh;
      this.an1 = answers[0];
      this.an2 = answers[1];
      this.an3 = answers[2];
    }
  },
  data: function() {
    return {
      bg_list: [!1, !1, !1],
      question_name: '',
      subjectCh:'',
      step:'',
      an1: 'sdfsdf',
      an2: 'sdfsdf',
      an3: 'sdfsdfssdf',
      data: null
    }
  },
  methods: {
    change_bg(index) {
      this.bg_list = [!1, !1, !1]; // 改变选中项背景色
      this.bg_list[index] = !0;

      setTimeout(() => { // 延迟一秒后跳转到下一路由
        if ((this.$route.params.step * 1 + 1) > 4) {
          this.$router.push('/result');
        }else {
          this.$router.push('/question/' + (this.$route.params.step * 1 + 1));
        }
      }, 500);

    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 90%;
  padding-top: .25rem;
  margin: 0 auto;
}

.title {
  height: .53rem;
  line-height: .3rem;
  color: #22c485;
  font-size: .14rem;
  text-align: center;
  background: url('../../imgs/bg-qustion-top.png') no-repeat center top;
  background-size: 100% auto;
}

.question {
  padding: .1rem .32rem;
  font-size: .14rem;
  line-height: .2rem;
  text-align: left;
  background: url('../../imgs/bg-question-center.png') no-repeat center top;
  background-size: 100% 100%;
}

.answers {
  height: 3.7rem;
  background: url('../../imgs/bg-question-bottom.png') no-repeat center top;
  background-size: 100% auto;
  &>ul {
    padding: .1rem .2rem;
  }
}

.answer-item {
  width: 100%;
  height: .55rem;
  margin: .1rem 0;
  background: url('../../imgs/btn-bg-select.png') no-repeat;
  background-size: 304px 102px;
  font-size: 16px;
  color: #fff;
  text-align: left;
  display: -webkit-flex;
  &.selected-answer {
    background-position: 0 -51px;
  }
  .answer-alpha {
    float: left;
    width: 30px;
    height: 30px;
    margin: 10px;
  }
  .answer-text {
    -webkit-flex: 1;
    display: -webkit-flex;
    align-items: center;
  }
  .a {
    background: url('../../imgs/a.png') no-repeat center center;
    background-size: 29px 25px;
  }
  .b {
    background: url('../../imgs/b.png') no-repeat center center;
    background-size: contain;
  }
  .c {
    background: url('../../imgs/c.png') no-repeat center center;
    background-size: contain;
  }
}
</style>


