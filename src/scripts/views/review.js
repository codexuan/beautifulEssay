var reviewHtml = require('../demohtml/review');
require('../lib/swiper.animate1.0.2.min.js');

SPA.defineView('review',{
  html:reviewHtml,

  plugins:['delegated',{
    name:'avalon',
    options:function(vm){
      vm.setTimer = null
    }
  }],
  init:{
      that : null
  },
  bindEvents:{
    show:function(){
      that = this;
    }
  },
  bindActions:{
    'back':function(){
      this.hide();
    },
    'r-finish':function(){
      var vm = that.getVM();
      clearInterval( vm.setTimer );
      //获取输入内容，为空时给出提示
      var content = $('.r-content').val();
      // console.log( content );
      if( !content ){
        $('.diaTips').addClass('show');
        vm.setTimer = setTimeout(function(){
          $('.diaTips').removeClass('show');
        },2000);
      }else{
        $('.mask').addClass('show');
        vm.setTimer = setTimeout(function(){
          $('.mask').removeClass('show');
          that.hide();
        },4000);
      }
    }
  }
});
