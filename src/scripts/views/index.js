//引用index.string
var indexHtml = require('../demohtml/index.string');


SPA.defineView('index',{
  html:indexHtml,
  //delegated 实现页面切换
  plugins:['delegated'],
  //初始化属性和方法
  init:{

  },
  //定义子试图
  modules:[{
    name:'content',
    views:['home'],
    defaultTag:'home',
    container:'.m-container'
  }],
  bindEvents:{
    show:function(){

    }
  },
  //绑定tab事件
  bindActions:{
}
});
