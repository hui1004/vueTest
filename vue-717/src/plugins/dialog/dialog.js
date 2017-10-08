class Dialog {
    constructor() {
        this.show = this.show.bind(this);
    }
    template(options) {
        let { title, info } = options;
        return `
            <div class="dialog-container">
                <div class="dialog-title">${title}</div>
                <div class="dialog-content">${info}</div>
                <div class="dialog-btns">
                    <button class="certain">确定</button>
                    <button class="cancel">取消</button>
                </div>
            </div> 
        `
    }
    createElement(ele, attr = { class: '' }, text = '') {
        let el = document.createElement(ele);
        for (let key in attr) {
            el.setAttribute(key, attr[key]);
        }
        el.innerHTML = text;
        return el;
    }
    init(options) {
        let layout = document.querySelector('.layout');
        let body = document.querySelector('body');
        // console.log(options);
        if (!layout) {
            this.layout = layout = this.createElement('div', { class: 'layout' }, this.template(options));
            body.appendChild(layout);
            this.bindEvent(options.callback);
        }
    }
    bindEvent(callback) {
        this.layout.querySelector('.certain').addEventListener('click', () => {
            this.hide();
            callback && callback();
        })
        this.layout.querySelector('.cancel').addEventListener('click', () => {
            this.hide();
        })
    }
    show(options = { title: 'this is title', info: 'this is content' }) {
        this.init(options);
    }

    hide() {
        document.querySelector('body').removeChild(this.layout);
    }
}

export default Dialog;

