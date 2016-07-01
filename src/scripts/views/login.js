var loginHtml = require('../demohtml/login.string');
var _ = SPA.util;
SPA.defineView('login',{
  html:loginHtml,
  plugins:['delegated',{
    name:'avalon',
    options:function(vm){
      // vm.timer = null,
      vm.email = '',
      vm.pwd = ''
    }
  }],
  init:{
    // timer : null
  },
  bindActions:{
    'close':function(){
      this.hide();
    },
    'submit': function(){
      var vm = this.getVM();
      var _this = this;
        $.ajax({
          url:'/beautifulEssay/mockData/loginInfo.json',
          type:'get',
          data:{
            email:vm.email,
            pwd:vm.pwd
          },
          success:function( res ){
            $('.diaTips').removeClass('show');
            if( !vm.email || !vm.pwd ){
              $('.diaTips').text('用户名密码不能为空!').addClass('show');
              Timer = setTimeout(function(){
                $('.diaTips').removeClass('show');
              },2000);
            }else{
              for( var i=0; i<res.length; i++ ){
                  if( vm.email == res[i].email && vm.pwd == res[i].pwd ){
                    $('.mask').addClass('show');
                    setTimer( '登陆成功' );
                    _.storage('isLogin',true)
                    _this.hide();
                    return;
                  }else{
                    $('.mask').addClass('show');
                    setTimer( '用户名密码错误' );
                    return;
                  }
                }
            }
          }
        });
    }
  }
});


function setTimer( str ){
  var Timer = null;
  Timer = setTimeout(function(){
     $('.mask').removeClass('show');
    $('.diaTips').text(''+ str +'').addClass('show');
  },1000);
}
