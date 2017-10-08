<template>
    <div class="new-adr">
        <div class="newAdr-head">
            <div class="back" @click="go_back">
                <i class="iconfont icon-back"></i>
            </div>
            <div class="newAdr-title">
                <span>收货人</span>
            </div>
        </div>
        <div class="newAdr-cont">
            <ul>
                <li class="recieve-name">
                    <input type="text" placeholder="收货人姓名" v-model.trim="name">
                </li>
                <li class="phone">
                    <input type="telephone" placeholder="手机号" v-model.trim="phone">
                </li>
                <li class="city">
                    <div class="province" is="sel-comp" :list="province_list" :sel="sel_province" @choice="choice">
                    </div>
                    <div class="town" is="sel-comp" :list="city_list" :sel="sel_city" @choice="choice">
                    </div>
                </li>
                <li class="area">
                    <sel-comp :list="area_list" :sel="sel_area" @choice="choice"></sel-comp>
                </li>
                <li class="detail-adr">
                    <input type="text" placeholder="详细地址" v-model.trim="detail_adr">
                </li>
            </ul>
            <p>
                <b :class="{'active':isDefault}" @click="isDefault = !isDefault"></b>
                <span>设为默认地址</span>
            </p>
            <div class="save">
                <button @click="save">保存</button>
            </div>
        </div>
        <tips :active="$store.state.active" :desc="$store.state.desc"></tips>

    </div>
</template>
<script>
import drop_down_select from './select/select.vue'
import tips from '../../components/tips/tips.vue'

export default {
    data() {
        return {
            province_list: [],
            city_list: [],
            area_list: [],
            sel_province: '请选择省',
            sel_city: '请选择市',
            sel_area: '请选择区',
            name: '',
            phone: '',
            detail_adr: '',
            isDefault: false,
            id: NaN
        }
    },
    created() {
        let getAddrData = new Promise((resolve, reject) => { // 异步转同步 处理高并发请求
            this.$http.get('/address/city/list').then(res => { // 请求城市列表数据
                // this.province_list = res.data;
                resolve(res.data)
            })
        })

        let getEditAddrData = new Promise((resolve, reject) => {
            if (this.$route.params.id) { // id存在 进入编辑状态 根据id请求对应数据
                let token = document.cookie.match(/717-token=(\d+)/)[1];
                this.$http.get('/address/editAddress', {
                    id: this.$route.params.id,
                    token: token
                }).then(res => {
                    resolve(res.data);
                })

            }else{
                resolve(0)
            }
        })

        Promise.all([getAddrData, getEditAddrData]).then((res) => {
            this.province_list = res[0];
            if(res[1]){
                let adrItem = res[1];
                this.name = adrItem.name;
                this.phone = adrItem.phone;
                this.sel_province = adrItem.province;
                this.sel_city = adrItem.city;
                this.sel_area = adrItem.area;
                this.detail_adr = adrItem.detail_adr;
                this.isDefault = adrItem.isDefault;
                this.id = adrItem.id;

                this.province_list.forEach((val) => { // 编辑地址时 不触发点击事件也有数据
                    if (val.name == this.sel_province) {
                        this.city_list = val.city;
                    }
                });
                this.city_list.forEach(val=>{
                    if(val.name == this.sel_city){
                        this.area_list = val.area;
                    }
                })
            }
            
        })


    },
    methods: {
        go_back() {
            this.$router.go(-1);
        },
        choice(item) { // select选择
            // console.log(item);
            switch (item) {
                case '请选择省':
                    this.sel_province = item;
                    this.sel_city = '请选择市';
                    this.sel_area = '请选择区';
                    break;
                case '请选择市':
                    this.sel_city = item;
                    this.sel_area = '请选择区';
                    break;
                case '请选择区':
                    this.sel_area = item;
                    break;
                default:
                    switch ('object') {
                        case typeof item.city: // 点击选择省份时
                            this.city_list = item.city;
                            this.sel_province = item.name;
                            this.sel_city = '请选择市';
                            this.sel_area = '请选择区';
                            break;
                        case typeof item.area: // 点击选择城市时
                            this.area_list = item.area;
                            this.sel_city = item.name;
                            this.sel_area = '请选择区';
                            break;
                        default:
                            // console.log(1);
                            this.sel_area = item; // 点击选择区域时

                    }
            }


        },
        save() { // 保存
            let telReg = /^1(3|4|5|7|8)\d{9}$/;
            let token = document.cookie.match(/717-token=(\d+)/)[1]; //717-token=18672870077
            switch (true) {
                case !this.name:
                    this.$store.commit('show_tips', { flag: true, msg: '请填写收货人姓名' });
                    break;
                case !telReg.test(this.phone):
                    this.$store.commit('show_tips', { flag: true, msg: '请填写正确的手机号' });
                    break;
                case this.sel_province == "请选择省" || this.sel_city == "请选择市" || this.sel_area == "请选择区":
                    this.$store.commit('show_tips', { flag: true, msg: '请选择省市区' });
                    break;
                case !this.detail_adr:
                    this.$store.commit('show_tips', { flag: true, msg: '请填写详细地址' });
                    break;
                default:
                    this.$http.post('/address/addAddress/adrItem', {
                        adr_info: {
                            name: this.name,
                            phone: this.phone,
                            province: this.sel_province,
                            city: this.sel_city,
                            area: this.sel_area,
                            detail_adr: this.detail_adr,
                            isDefault: this.isDefault,
                            id: this.id
                        },
                        token: token
                    }).then(res => {
                        if (res.data == 1) {
                            this.$store.commit('show_tips', { flag: true, msg: '保存成功' });
                            setTimeout(() => {
                                this.$router.push('/address');
                            }, 1000);
                        }
                    }).catch(err => {
                        console.log(err);
                    })

            }
        }
    },
    components: {
        'sel-comp': drop_down_select,
        'tips': tips
    }
}
</script>
<style lang="scss" scoped>
.new-adr {
    height: 100%;
    background: #f3f3f3;
}

.newAdr-head {
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
    .newAdr-title span {
        font-size: .36rem;
    }
}

.newAdr-cont {
    padding: 0 .3rem;
    li {
        height: 0.9rem;
        margin-top: .3rem;
        input {
            width: 100%;
            padding: 0 .2rem;
            box-sizing: border-box;
            height: 100%;
            border: 0;
            &::-webkit-input-placeholder {
                color: #999;
            }
        }
        &.city {
            display: flex;
            justify-content: space-between;
            div {
                width: 3rem;
                height: 100%;
                background: #fff;
            }
        }
        &.area .select {
            width: 100%;
            height: 100%;
        }
    }
    p {
        display: flex;
        align-items: center;
        font-size: .28rem;
        color: #666;
        padding: .25rem 0;
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
    }
    .save {
        margin-top: .7rem;
        text-align: center;
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
}
</style>
