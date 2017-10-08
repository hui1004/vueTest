<template>
    <div class="list">
        <div class="list-head">
            <p @focus="go_to_search">
                <input type="text" placeholder="输入您要购买的商品">
                <i class="icon iconfont icon-search"></i>
            </p>
            <i class="icon iconfont icon-message"></i>
        </div>
        <div class="list-section">
            <div class="list-left">
                <ul>
                    <li v-for="(item,i) in catagory_list" :key="i">
                        <router-link :to="{name:'catagory',params:{index:i}}">
                            <i class="icon iconfont icon-shop"></i>
                            <span>{{item.title}}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="list-right">
                <dl v-for="(val,ind) in catagory_content" :key="ind">
                    <dt><img :src="val.pic" alt=""></dt>
                    <dd>{{val.name}}</dd>
                </dl>
            </div>
        </div>
        <global-mask :isActive="isActive"></global-mask>
    </div>
</template>
<script>
import globalMask from '../../components/global_mask/global_mask.vue';
export default {
    data(){
        return {
            isActive:true,     
            catagory_list:[],
            catagory_content:[]
        }
    },
    methods:{
        go_to_search(){
            this.$router.push('/search');
        }
    },
    components: {
        "globalMask": globalMask
    },
    created(){
        this.$http.post('/h5/hotRecommend').then(res=>{
            this.isActive = false;
            this.catagory_list = res.data.data.result[0].moduleList; // 分类列表数据
            this.catagory_content = this.catagory_list[0].items; // 产品列表
        })
    },
    watch:{
        "$route":function(n,o){
            let index = n.params.index;
            this.catagory_content = [...this.catagory_list[index].items];
        }
    }
}
</script>
<style scoped lang="scss">
.list {
    height: 100%;
    width: 100%;
    display: -webkit-flex;
    -webkit-flex-direction: column;
    background-color: #fff;
}
.list-head {
    height: .89rem;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.01rem solid #ccc;
    box-sizing: border-box;
    p {
        width: 80%;
        padding: 0 .2rem;
        position: absolute;
        input {
            width: 100%;
            border: none;
            background: #F6F6F6;
            height: .45rem;
            text-align: center;
            border-radius: 0.05rem;
        }
        i {
            position: absolute;
            left: 20%;
            top: .04rem;
            color: #999;
        }
    }
    & > i {
        position: absolute;
        right: .2rem;
    }
}

.list-section{
    -webkit-flex: 1;
    overflow-y: scroll;
}
.list-section {
    .list-left {
        width: 35%;
        background: #eee;
        float: left;
        height: 100%;
        ul {
            li {
                height: .72rem;
                a{
                    height: 100%;
                    display: -webkit-flex;
                    align-items: center;
                }
                i {
                    padding-right: .16rem;
                    padding-left: .3rem;
                    box-sizing: border-box;
                }
                span {
                    font-size: .26rem;
                }
            }
        }
    }
    .list-right {
        width: 65%;
        height: 100%;
        overflow-y: scroll;
        // display: -webkit-flex;
        // -webkit-flex-wrap: wrap;
        dl {
            margin: .26rem .1rem;
            float: left;
            dt {
                width: 1.42rem;
                height: 1.42rem;
                background-color: #eee;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            dd {
                font-size: .24rem;
                line-height: .6rem;
                text-align: center;
            }
        }
    }
}
.router-link-active{
    border-left: .04rem solid #fc4141;
    background-color: #fff;
    color: #fc4141;
}
</style>

