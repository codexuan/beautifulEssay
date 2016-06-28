var guideHtml = require('../demohtml/guide.string');

SPA.defineView('guide',{
  html:guideHtml,

  plugins:['delegated'],

  init:{
    timer : null
  },

  bindActions:{
    'gotoIndex':function(e){
      clearInterval( timer );
      //跳转到第一页
      SPA.open('index');
    }
  },

  bindEvents:{
    show:function(){
      var mySwiper = new Swiper('#guide-swiper',{
        loop:false
      });

      timer = setTimeout(function(){
        SPA.open('index');
      },2000);
    }
  }
});
