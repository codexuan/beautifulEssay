var fontHtml = require('../demohtml/font.string');

SPA.defineView('font', {
  html: fontHtml,

  plugins:['delegated',{
    name:'avalon',
    options:function( vm ){
      vm.fontArr = ['font8','font10','font14','font18']
    }
  }],

  init:{
      fontScroll : null
  },

  bindActions:{
    'tapFont':function( e ){
      var index = $(e.el).index();
      //获取vm对象,得到存储字体class数组
      var vm = this.getVM();
      //设置字体大小
      $('#fontsize').attr('class',vm.fontArr[index]);
      //改变当前点击项的为active状态
      $('.ft-active').find('i').removeClass('active').eq( index ).addClass('active');
      // fontScroll.refresh;
    },
    'finish':function(){
      this.hide();
    }
  }
  // bindEvents:{
  //   show:function(){
  //     fontScroll = this.param;
  //   }
  // }
});
