# 717

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).    

# 项目总结

    项目结构：
        目录mock: 生成随机数据，拦截Ajax请求,开始前后端分离
        目录service：json数据
        目录components：存放单个组件
        目录plugins: 存放插件
        目录route: 路由配置
        目录store: vuex状态管理
        目录views: 存放路由视图

* 仿照717商城，实现717商城首页，商品详情页，用户登录注册页，购物车等效果。

* 工具es6、vue、mock、vuex、router-loader、swiper、vue-router、axios等。
        
* 首页
    1. 在首页用swiper做banner图的轮播效果，利用icon图标做图标列表，减少浏览器的请求速度。
        <pre>
            mounted() {
                new Swiper('.swiper-banner', {
                    pagination: '.swiper-pagination',
                    autoplay: 2000,
                    loop: true
                }),
                new Swiper('.trends-content',{
                    direction: 'vertical',
                    autoplay: 2000,
                    loop: true
                })
            }
        </pre>

    2. 使用vuex中的store进行数据存储，对列表中的每个产品进行组件化封装，之后利用路由跳转到详情页。

    3. 家乡味道等数据用下拉加载实现，监听scroll事件，判断container滚动的距离离屏幕顶部多远 小于阙值，就去请求数据。当所有商品配请求完，则不再请求。
        <pre>
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
        </pre>

    4. 单个产品组件：点击购物车图标时，获取cookie中的token，判断是否为用户登陆状态，没有登录则提示用户先登录，登录状态下，将商品的各项参数，以及用户登录返回的token提交给mock，后台接收到后将token作为key，商品信息作为value存储在localstorage中。
        <pre>
            add_to_cart() {
                let token = document.cookie.split('=')[1];
                if (token) {
                    this.$http.post('/user/cart/addCart', {
                        goods_desc: {
                            id: this.goods.goods_id,
                            price: this.goods.discount_price,
                            name: this.goods.goods_name,
                            src: this.goods.obj_data,
                            count: 1
                        },
                        token: token
                    })
                        .then(res => {
                            if (res.data == 1) {
                                let data = {
                                    id: this.goods.goods_id,
                                    price: this.goods.discount_price,
                                    name: this.goods.goods_name,
                                    src: this.goods.obj_data,
                                    count: 1
                                }
                                this.$store.commit('add_cart', data);
                                this.$emit('show-mark', {bool:true,desc:'添加购物车成功'});
                            }
                        })
                } else {
                    this.$emit('show-mark', {bool:true,desc:'请先登录'});
                }
            }
        </pre>

* 分类页
    1. 利用axios拦截器请求数据，通过路由传参进行参数匹配、数据渲染，实现产品列表效果。
        <router-link :to="{name:'catagory',params:{index:0}}" tag="li">
            <span class="icon iconfont icon-apps"></span>
            <span>分类</span>
        </router-link>
        <pre>
            {
                name: 'catagory',
                path: 'catagory/:index?',
                component: catagory
            }
        </pre>

* 购物页
    1. 通过变量来控制空的购物车页与有商品的购物车页面之前的切换，通过set注册新的变量到vue的监听里去，用来控制产品的单选和全选。通过v-model来控制变量改变产品数量的增减，使用自定义过滤器来过滤金额。
        <pre>
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
            },
            changeCount(product, way) { // 增减数量
                if (way > 0) {
                    product.count++;
                } else {
                    product.count--;
                    if (product.count < 1) {
                        product.count = 1;
                    }
                }
                this.sum();
            },
            sum() { // 求和
                this.total_price = 0;
                this.cart_list.forEach(item => {
                    if (item.checked) {
                        this.total_price += item.price * item.count;
                    }
                })
            },
            filters: { // 格式化金额
                filter_money: function(val, type) {
                    return "￥" + val.toFixed(2) + type;
                }
            } 
        </pre>

    2. 编辑状态下,将选中的商品id, push到数组里,将数组提交到vuex的store里，运用store里的mutations来遍历购物车商品数组和id数组，从而排重，然后删除选中数据。通过路由钩子beforeRouteEnter将用户登陆的token和其购物车数据绑定到一起。
        <pre>
            delItem(state,idArr) { // 购物车删除数据
                let temp = [],tempArr = []; //临时数组temp/tempArr  
                for(let i=0;i&lt;idArr.length;i++){
                    temp[idArr[i]] = true; //把数组idArr的值当成临时数组temp的键并赋值为真
                }
                for(let i=0;i&lt;state.cart_list.length;i++){
                    if(!temp[state.cart_list[i].id]){
                        tempArr.push(state.cart_list[i]); //同时把数组state.cart_list的值当成临时数组temp的键并判断是否为真，如果不为真说明没重复，就合并到一个新数组里，这样就可以得到一个全新并无重复的数组
                    }
                }
                state.cart_list = tempArr;
            }
        </pre>
            
* 我的页面
    1. 注册：首先进行格式验证，将成功的注册信息保存到本地存储中，方便登录时进行验证。
        <pre>
            register() {
                let telReg = /^1(3|5|7|8)\d{9}$/;
                let pwdReg = /^\w{6,20}$/;
                if (telReg.test(this.register_phone) && pwdReg.test(this.register_password)) {

                    this.$http.post('/register', {
                        phone_number: this.register_phone,
                        verify_code: this.valid,
                        password: this.register_password
                    }).then((params) => {
                        if (params.data.code == 1) {
                            this.if_login = true
                        } else {
                            this.show_mark(params.data.msg);
                        }
                    })
                } else {
                    this.show_mark('用户名或密码格式错误');
                }
            }
            mocker.onPost('/register').reply(function (config) {
                let register_info = JSON.parse(config.data)
                console.log(register_info);
                let ls = localStorage;
                let register_history = [];
                let if_register = true;
                if (ls.getItem('register-info')) {
                    register_history = JSON.parse(ls.getItem('register-info'));
                }
                register_history.forEach(function (item, ind) {
                    if (item.phone_number == register_info.phone_number) {
                        if_register = false;
                    }
                })

                if (if_register) {
                    register_history.push(register_info);
                    ls.setItem('register-info', JSON.stringify(register_history));
                    return [200, { code: 1, msg: '注册成功' }];
                } else {
                    return [200, { code: 0, msg: '该账号已经注册' }];
                }

            })
        </pre>

    2. 登录：每次进入我的路由前通过获取cookie信息判断是否为登录状态，若token已存在表示已登录，则直接进入，否则先进入登录页
        <pre>
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
        </pre>

    3. 点击登录时：首先判断格式是否正确，错误给出相应提示，正确将相应信息发送给后台，在后台进行登录信息验证，返回对应信息，并在成功时将登录信息保存到cookie中，根据返回值判断，成功就跳转到我的页面，否则提示用户注册。
        <pre>
            login() {
                let telReg = /^1(3|5|7|8)\d{9}$/;
                let pwdReg = /^\w{6,20}$/;
                if (telReg.test(this.login_phone) && pwdReg.test(this.login_password)) {

                    this.$http.post('/login', {
                        phone: this.login_phone,
                        password: this.login_password
                    }).then((res) => {
                        if (res.data.token) {
                            document.cookie = "717-token=" + res.data.token;
                            this.$router.push({ name: 'user' })
                        } else {
                            this.show_mark(res.data.msg);
                        }
                    })

                } else {
                    this.show_mark('用户名或密码格式错误');
                }
            },
            mocker.onPost('/login').reply(config => {
                let login_info = JSON.parse(config.data)
                let register_history = JSON.parse(ls.getItem('register-info'));
                let is_right = 0;
                register_history.forEach((item, index) => {

                    if (item.phone_number === login_info.phone && item.password === login_info.password) {
                        is_right = 1
                    }
                })

                if (is_right) {
                    return [200, {
                        token: login_info.phone
                    }]
                } else {
                    return [200, {
                        msg: "登录信息有误"
                    }]
                }
            })
        </pre>

    4. 点击地址管理时，跳转路由到地址页面，并在进入前进行请求，判断当前账号下是否有相关的地址信息
        <pre>
            created() {
                let token = document.cookie.match(/717-token=(\d+)/)[1];
                this.$http.get('address/addressList', { token: token }).then(res => {
                    this.address_list = res.data;
                })
            }
        </pre>

    5. 点击删除时，取到要删除的地址对应的id ，根据id在本地存储中删除对应的地址。
        <pre>
            // 子组件
            delAdr(item){
                let _this = this;
                this.$dialog.show({
                    title:'提示信息',
                    info:'您确定要删除吗？',
                    callback(){
                        _this.$emit('delAdr',item); // 向父组件派发事件
                    }
                })
            }
            // 父组件
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
        </pre>

    6. 点击编辑时，携带对应的id跳转。
        <pre>
            editAdr(item){
                this.$router.push({name:'addAddress',params:{id:item.id}});
            }
        </pre>
    
    7. 进入新增地址页时，判断是否带有参数，若有参数则为编辑，向后台请求相关信息，渲染页面，没有参数则为空白的添加地址页，同时请求城市信息。

    8. 保存地址时，首先判断信息是否填写完整，没有填写完整则给出相应的用户提示，完整则向后台发送请求，将地址信息保存到当前登录用户名下，并保存到本地存储中。
        <pre>
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
        </pre>
    
    项目难点：
        购物车全选单选：一开始将购物车内的单个商品封装成组件渲染，避免了单选时选中一个其他商品也同时被选中的情况，但在全选时，组件通信过程中通过传递控制的变量来实现单选和全选的关联时遇到了困难。后取消了单个产品的组价封装，通过set注册新的变量到vue的监听里去，用来控制产品的单选和全选。解决了这一问题。
        
# 项目git地址

    https://github.com/hui1004/vueTest.git
    