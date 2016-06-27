var guideHtml = require('../demohtml/guide.string');

SPA.defineView('guide',{
  html:guideHtml,

  plugins:['delegated'],

  bindActions:{
    'gotoIndex':function(e){
      //跳转到第一页
      SPA.open('index');
    }
  },

  bindEvents:{
    show:function(){
      var mySwiper = new Swiper('#guide-swiper',{
        loop:false
      });
    }
  }
});
