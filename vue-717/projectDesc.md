# 个人信息

    姓名： 杨佳慧
    性别： 女
    出生日期：19931004
    电话： 18672870077

# 项目总结

* 仿照717商城，实现717商城首页，商品详情页，用户登录注册页，购物车等效果
* 工具es6、vue、mock、vuex、router-loader、swiper、vue-router、axios、Gulp等
        
* 首页
    1. 在首页用swiper做banner图的轮播效果，利用icon图标做图标列表，减少浏览器的请求速度。
    2. 使用vuex中的store进行数据存储，对列表中的每个产品进行组件化封装，之后利用路由跳转到详情页。
    3. 家乡味道等数据用下拉加载实现，监听scroll事件，判断container滚动的距离离屏幕顶部多远 小于阙值，就去请求数据

    Code:
        load_goods(){ // 上拉加载数据
            let container = this.$refs.container;
            let max_height = container.querySelector('.main').offsetHeight - container.offsetHeight;
            let scrollTop = container.scrollTop;
            if(max_height-scrollTop<10){
                if(this.can_request){
                    this.can_request = false;
                    this.goods_id++;
                    if(this.goods_id>=8){
                        this.info = '我是有底线的~';
                        return;
                    };
                    this.get_goods(this.goods_id); // 请求数据
                }
            } 
        }

        get_goods(id){ //  发起网络请求,请求刷新数据
            this.$http.get('/mall/index/getGoodsChannel',{
                channel_id:id
            }).then((res)=>{
                // console.log(res.data[id].data.data);
                this.goods_channel = [...this.goods_channel,...res.data[id].data.data];
                this.can_request = true;
                // console.log(this.goods_channel);
            })
        }

    4. 单个产品组件
        点击购物车图标时，判断是否为用户登陆状态，登陆状态下，将商品的各项参数，以及用户登录返回的token提交给mock，添加成功后将数据提交给vuex的store

* 分类页
    利用axios拦截器请求数据，通过路由传参进行参数匹配、数据渲染，实现产品列表效果。

* 购物页
    1. 通过变量来控制空的购物车页与有商品的购物车页面之前的切换，通过set注册新的变量到vue的监听里去，用来控制产品的单选和全选。通过v-model来控制变量改变产品数量的增减，使用自定义过滤器来过滤金额。

    Code: 
        selected(item) { // 单选
            if (typeof item.checked == 'undefined') { // 通过检测其类型来判断数据是否存在该变量
                // Vue.set(item, "checked", true); // 在数据里全局注册变量
                this.$set(item, "checked", true); // 局部注册
            } else {
                item.checked = !item.checked;
            }
            let flag = true;
            this.cart_list.forEach((val, index) => {
                if (!val.checked) {
                    flag = false;
                }
            })
            this.checked_all = flag;
            this.sum(); // 求和
        }

    2. 编辑状态下,将选中的商品id, push到数组里,将数组提交到vuex的store里，运用store里的mutations来遍历购物车商品数组和id数组，从而排重，然后删除选中数据。通过路由钩子beforeRouteEnter将用户登陆的token和其购物车数据绑定到一起。

        Code:
            delItem(state,idArr) { // 购物车删除数据
                let temp = [],tempArr = [];
                for(let i=0;i<idArr.length;i++){
                    temp[idArr[i]] = true;
                };
                for(let i=0;i<state.cart_list.length;i++){
                    if(!temp[state.cart_list[i].id]){
                        tempArr.push(state.cart_list[i]);
                    }
                };
                state.cart_list = tempArr;
            }
            
* 我的页面
    1. 注册：首先进行格式验证，将成功的注册信息保存到本地存储中，方便登录时进行验证。

    2. 登录：每次进入我的路由前通过获取cookie信息判断是否为登录状态，若token已存在表示已登录，则直接进入，否则先进入登录页

    Code: 
        router.beforeEach(function (to, from, next) {
            if (to.name == 'login') {
                next()
                return;
            }
            if (to.name == 'user') {
                let cookie_list = document.cookie.split(';');
                let tocken = null;
                for (let i = 0; i < cookie_list.length; i++) {
                    if (cookie_list[i].indexOf('717-token') > -1) {
                        tocken = cookie_list[i].split('=')[1]
                    }
                }

                if (!tocken) {
                    next({
                        path: '/login'
                    })
                } else {
                    next()
                }
            } else {
                next()
            }


        })

    3. 点击登录时：首先判断格式是否正确，错误给出相应提示，正确将相应信息发送给后台，在后台进行登录信息验证，返回对应信息，并在成功时将登录信息保存到cookie中，根据返回值判断，成功就跳转到我的页面，否则提示用户注册。

    4. 点击地址管理时，跳转路由到地址页面，并在进入前进行请求，判断当前账号下是否有相关的地址信息
    
    Code:
        created() {
            let token = document.cookie.match(/717-token=(\d+)/)[1];
            this.$http.get('address/addressList', { token: token }).then(res => {
                this.address_list = res.data;
            })
        }

    5. 点击删除时，取到要删除的地址对应的id ，根据id在本地存储中删除对应的地址。

    6. 点击编辑时，携带对应的id跳转

        Code:
            editAdr(item){
                this.$router.push({name:'addAddress',params:{id:item.id}});
            }
    
    7. 进入新增地址页时，判断是否带有参数，若有参数则为编辑，向后台请求相关信息，渲染页面，没有参数则为空白的添加地址页，同时请求城市信息。

    8. 保存地址时，首先判断信息是否填写完整，没有填写完整则给出相应的用户提示，完整则向后台发送请求，将地址信息保存到当前登录用户名下，并保存到本地存储中。
    
    Code:
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

# 项目git地址

    ...        
    