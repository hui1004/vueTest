<template>
    <div class="address">
        <header class="adr-head">
            <div class="back" @click="go_back">
                <i class="iconfont icon-back"></i>
            </div>
            <div class="adr-title">
                <span>新增地址</span>
            </div>
        </header>
        <div class="adr-cont">
            <adr-item v-for="(item,index) in address_list" :key="index" :item="item" @setDef="setDef" @delAdr="delAdr"></adr-item>
        </div>
        <div class="add-adr">
            <router-link :to="{name:'addAddress'}" tag="button">＋ 新增地址</router-link>
        </div>
    </div>
</template>
<script>
import adr_item from './adr-item/adr-item.vue'

export default {
    data() {
        return {
            address_list: []
        }
    },
    created() {
        let token = document.cookie.match(/717-token=(\d+)/)[1];
        this.$http.get('address/addressList', { token: token }).then(res => {
            this.address_list = res.data;
        })
    },
    methods: {
        go_back() {
            this.$router.go(-1);
        },
        setDef(item) { // 设置默认地址
            this.address_list.forEach((val) => {
                if (val.id == item.id) {
                    val.isDefault = true;
                } else {
                    val.isDefault = false;
                }
            })
        },
        delAdr(item) { // 删除地址
            let ls = localStorage;
            let address_info = JSON.parse(ls.getItem('address-info'));
            let token = document.cookie.match(/717-token=(\d+)/)[1];
            this.address_list = this.address_list.filter((val) => {
                if (val.id != item.id) {
                    return val;
                }
            })
            address_info[token] = this.address_list;
            ls.setItem('address-info', JSON.stringify(address_info));
        }

    },
    components: {
        'adr-item': adr_item
    }
}
</script>
<style lang="scss" scoped>
.address {
    height: 100%;
    background: #f3f3f3;
    display: -webkit-flex;
    -webkit-flex-direction: column;
}

.adr-head {
    height: 0.88rem;
    text-align: center;
    line-height: .88rem;
    position: relative;
    border-bottom: 1px solid #eee;
    background: #fff;
    .back {
        position: absolute;
        left: 0;
        top: 0;
        line-height: .88rem;
        padding: 0 .3rem;
        .iconfont {
            font-size: .32rem;
            color: #333;
        }
    }
    .adr-title span {
        font-size: .36rem;
    }
}

section {
    margin-bottom: .2rem;
}

.adr-cont {
    -webkit-flex: 1;
    overflow-y: scroll;
}

.add-adr {
    text-align: center;
    height: 1rem;
    padding-bottom: .4rem;
    padding-top: .4rem;
    background: #fff;
    button {
        width: 70%;
        height: 1rem;
        border: 0;
        background: #fc4141;
        color: #fff;
        font-size: .38rem;
        border-radius: .5rem;
    }
}
</style>
