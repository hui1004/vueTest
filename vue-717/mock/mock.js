import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let mocker = new MockAdapter(axios);
let ls = localStorage;

// 首页商品列表
import getGoodsChannel from '../service/goods_channel.json';
mocker.onGet('/mall/index/getGoodsChannel', {
    channel_id: /\d+/
}).reply(200, getGoodsChannel)

// 添加购物车
import addCart from '../service/addCart.json';
mocker.onPost('/user/cart/addCart').reply(config => {

    let params = JSON.parse(config.data);
    let cart_info = {};
    cart_info[params.token] = [];
    if (ls.getItem('717-cart-info-list')) {
        cart_info = Object.assign({}, cart_info, JSON.parse(ls.getItem('717-cart-info-list')));
    }

    let len = cart_info[params.token].length, no_repeat = false;
    for (let i = 0; i < len; i++) {
        if (cart_info[params.token][i].id == params.goods_desc.id) {
            cart_info[params.token][i].count++;
            no_repeat = true;
        }
    }
    if (!no_repeat) {
        cart_info[params.token].push(params.goods_desc);
    }

    ls.setItem('717-cart-info-list', JSON.stringify(cart_info));

    return [200, addCart];
});

// 请求分类页的数据
import catagory from '../service/catagory.json';
mocker.onPost('/h5/hotRecommend').reply(function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve([200, catagory]);
        }, 2000);
    })
})

// 请求购物车数据
mocker.onPost('/cart/list').reply(config => {
    let token = JSON.parse(config.data).token;
    let existlist = {};
    existlist[token] = [];
    if (ls.getItem('717-cart-info-list')) {
        existlist = Object.assign({}, existlist, JSON.parse(localStorage.getItem('717-cart-info-list')));
    }
    return [200, existlist[token]];
})

// 验证码获取
mocker.onPost('/verifycode').reply(function (config) {
    console.log(config);
    let phone = JSON.parse(config.data).pn;
    return [200, phone.slice(-4)]
})

// 注册
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

// 登录
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

// 下拉列表省市区数据
import cityData from '../service/city.json';
mocker.onGet('/address/city/list').reply(function () {
    return [200, cityData];
});

// 新增地址
mocker.onPost('/address/addAddress/adrItem').reply(function (params) {
    let adr_info = JSON.parse(params.data)['adr_info'];
    let token = JSON.parse(params.data)['token'];
    let adrObj = {};
    adrObj[token] = [];
    if (ls.getItem('address-info')) {
        adrObj = Object.assign({}, adrObj, JSON.parse(ls.getItem('address-info'))); // 扩展对象避免不同账号登录获取不到token
        if (adr_info.isDefault && adrObj[token].length != 0) { // 设置默认
            adrObj[token].forEach(val => {
                val.isDefault = false;
            })
        }
    }

    if (adr_info.id) { // 编辑修改地址时
        adrObj[token] = adrObj[token].map(val => {
            if (adr_info.id == val.id) {
                return val
            }
        })
    } else { // 新增地址
        adr_info.id = adrObj[token].length + 1;
        adrObj[token].unshift(adr_info);
    }
    ls.setItem('address-info', JSON.stringify(adrObj));
    return [200, 1];
})

// 获取token关联地址列表
mocker.onGet('address/addressList').reply(params => {
    let adr_info = {};
    adr_info[params.token] = [];
    if(ls.getItem('address-info')){
        adr_info = Object.assign({},adr_info,JSON.parse(ls.getItem('address-info')));
    }
    return [200, adr_info[params.token]];
})

// 根据id和token获取编辑地址对应数据
mocker.onGet('/address/editAddress').reply(params => {
    let id = params.id;
    let token = params.token;
    let adrList = JSON.parse(ls.getItem('address-info'));
    let editAdr = {};
    adrList[token].forEach(val => {
        if (val.id == id) {
            editAdr = val;
        }
    })
    return [200, editAdr];
})