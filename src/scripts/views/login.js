var loginHtml = require('../demohtml/login.string');

SPA.defineView('login',{
  html:loginHtml,
  plugins:['delegated',{
    name:'avalon',
    options:function(vm){
      vm.timer = null
    }
  }],
  init:{
    // timer : null
  },
  bindActions:{
    'l-login':function(){
      var Timer = this.getVM();
      $('.diaTips').removeClass('show');
      clearInterval( Timer );
      //获取输入内容，为空时给出提示
      var content = $('.email').val();
      var pwd = $('.pwd').val();
      // console.log( content );
      if( !content || !pwd ){
        $('.diaTips').text('用户名密码不能为空!').addClass('show');
        Timer = setTimeout(function(){
          $('.diaTips').removeClass('show');
        },2000);
      }else{
        $('.mask').addClass('show');
        Timer = setTimeout(function(){
           $('.mask').removeClass('show');
          $('.diaTips').text('错误，忘记密码？').addClass('show');
        },1000);
      }
    },
    'close':function(){
      this.hide();
    }
  }
});
