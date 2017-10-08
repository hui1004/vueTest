<template>
    <section>
        <div class="user">
            <span>{{item.name}} {{item.phone}}</span>
        </div>
        <p>{{item.province}} {{item.city}} {{item.area}}</p>
        <div class="operate">
            <div class="default">
                <b :class="{'active':item.isDefault}" @click="setDef(item)"></b>默认地址</div>
            <div class="edit">
                <span @click="editAdr(item)">
                    <i class="iconfont icon-settings"></i> 编辑</span>
                <span @click="delAdr(item)">
                    <i class="iconfont icon-apps"></i> 删除</span>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: ['item'],
    data() {
        return {
            isDefault: false
        }
    },
    methods: {
        setDef(item){
            this.$emit('setDef',item);
        },
        editAdr(item){
            this.$router.push({name:'addAddress',params:{id:item.id}});
        },
        delAdr(item){
            let _this = this;
            this.$dialog.show({
                title:'提示信息',
                info:'您确定要删除吗？',
                callback(){
                    _this.$emit('delAdr',item);
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
section {
    padding: 0 .3rem;
    background: #fff;
    .user {
        line-height: .98rem;
        span {
            font-size: .32rem;
            color: #333;
        }
    }
    p {
        font-size: .28rem;
        color: #666;
    }
    .operate {
        margin-top: .24rem;
        height: .96rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #eee;
        .default {
            display: flex;
            align-items: center;
            font-size: .28rem;
            color: #666;
        }
        b {
            display: inline-block;
            width: 0.44rem;
            height: 0.44rem;
            line-height: 0.44rem;
            text-align: center;
            font-size: .24rem;
            border-radius: 50%;
            border: .01rem solid #ccc;
            margin-right: .1rem;
        }

        b.active {
            border-color: #fc4141;
            background-color: #fc4141;
            &:after {
                content: '✔';
                color: #fff;
            }
        }
        .edit {
            color: #666;
            .iconfont {
                font-size: .34rem;
            }
            span {
                font-size: .28rem;
            }
        }
    }
}
</style>
