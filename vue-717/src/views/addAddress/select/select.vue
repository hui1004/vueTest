<template>
    <div class="select" @click.stop>
        <p class="selected" @click="select" :class="{'selected-open':open}">
            {{sel}}
            <i class="iconfont icon-back"></i>
        </p>
        <ul class="options">
            <li class="opt-item" @click="choose(mysel)">
                {{mysel}}
            </li>
            <li class="opt-item" v-for="(item,index) in list" :key="index" @click="choose(item)">{{item.name?item.name:item}}</li>
        </ul>
    </div>
</template>
<script>

export default {
    props: ['list','sel'],
    data() {
        return {
            open:false,
            mysel:this.sel
        }
    },
    methods:{
        select(){ // 打开关闭下拉框
            this.open = !this.open;
        },
        choose(item){
            this.open = false;
            this.$emit('choice',item);
        }
    },
    mounted(){
        document.addEventListener('click',()=>{ // 点击空白处 收起下拉框 并且需要阻止事件冒泡
            this.open = false;
        })
    }

}
</script>
<style lang="scss" scoped>
.select {
    position: relative;
}

.select {
    .selected {
        width: 100%;
        height: 100%;
        position: absolute;
        background: #fff;
        left: 0;
        top: 0;
        line-height: .9rem;
        text-indent: .2rem;
        cursor: pointer;
        font-size: .32rem;
        .iconfont {
            position: absolute;
            right: 0.15rem;
            font-size: .3rem;
            top: .1rem;
            transform: rotate(-90deg);
        }
    }
    .selected-open {
        .iconfont {
            top: .1rem;
            transform: rotate(-90deg);
        }
    }
}

.options {
    width: 100%;
    position: absolute;
    top: .9rem;
    left: 0;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    transition: all .5s;
    height: 0rem;
    overflow-y: auto;
    box-sizing: border-box;
    z-index: 20;
    background: #fff;
    transition: height 200ms;
    box-shadow: 0px 0px 2px #ccc;
}

.selected-open+.options {
    height: 4rem;
}

.opt-item {
    line-height: .6rem;
    border-bottom: 1px solid #ccc;
    text-indent: .2rem;
    cursor: pointer;
    font-size: .3rem;
    position: relative;
    z-index: 21;
    &:first-child {
        border-top: 1px solid #ccc;
        ;
    }
}

.opt-item:hover {
    background: #ccc;
}
</style>
