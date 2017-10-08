import Dialog from './dialog.js';
import Vue from 'vue';

class AwesomeDialog extends Dialog {
    constructor () {
        super();
    }
    show (options={title:'this is title',info:'this is content'}) {
        this.init(options);
        this.container = this.layout.querySelector('.dialog-container');
        this.layout.addEventListener('click',()=>{
            this.hide();
        })
        this.container.addEventListener('click',e => {
            e.stopPropagation();
        })
        setTimeout(() => {
            this.layout.classList.add('layout-active');
            this.container.classList.add('dialog-container-active');
        }, 0);
    }

    hide () {
        this.layout.classList.remove('layout-active');
        this.container.classList.remove('dialog-container-active');
        let _this = this;
        const l = new Promise(resolve => {
            // console.log(345);
            this.layout.addEventListener('webkitTransitionEnd',()=>{
                resolve('layout end');
            })
        })
        const c = new Promise(function(resolve){
            // console.log(123);
            _this.container.addEventListener('webkitTransitionEnd',()=>{
                resolve('container end');
            })
        })
        let merge = Promise.all([l,c]);
        merge.then(function(msg){
            console.log(msg);
            document.querySelector('body').removeChild(_this.layout);
        })
    }
}

let myAwesomeDialog = {
    install(Vue){
        Vue.prototype.$dialog = new AwesomeDialog;
    }
}
Vue.use(myAwesomeDialog);