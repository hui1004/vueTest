Vue.component('vue-dialog',{
    props:{
        title:{
            type:String,
            default:'转账记录'
        },
        sureBtn:{
            type: Function
        },
        cancelBtn:{
            type: Function
        },
        context:{
            type: Array || Object
        }
    },
    template:`
    <transition name="fade">
        <div class="dialog" v-if="showDialog">
            <div class="mark"></div>
            <div class="transfer">
                <h3 class="transfer-record">{{title}}</h3>
                <ul class="transfer-details">
                    <li class="transfer-item" v-for="(item,i) in myContext" @click="selected(i)" :class="{default:ind==i}">
                        <span>{{item.name}}</span>
                        <span>{{item.account}}</span>
                    </li>
                </ul>
                <div class="btns">
                    <button class="verify" @click="verify">确认</button>
                    <button class="cancel" @click="cancel">取消</button>
                </div>
            </div>
        </div>
    </transition>
    `,
    data:function(){
        return {
            myContext:this.context,
            showDialog:false,
            ind:NaN
        }
    },
    methods:{
        verify(){
            this.sureBtn ? this.sureBtn() : this.close();
        },
        cancel(){
            this.cancelBtn ? this.cancelBtn() : this.close();
        },
        close(){
            this.showDialog = false;
        },
        show(){
            this.showDialog = true;
        },
        selected(i){
            console.log(i);
            this.ind = i;
        }
    },
    created(){
        this.$http.get('./mock/account.json').then(res=>{
            this.myContext = this.myContext ? this.myContext : res.data;
        })
    },
    mounted(){
        setTimeout(() => {
            this.showDialog = true;
        }, 2000);
    }
    
})


