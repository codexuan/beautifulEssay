//引用essay.string
var essayHtml = require('../demohtml/essay.string');


SPA.defineView('essay',{
  html:essayHtml,

  plugins:['delegated',{
    name:'avalon',
    options:function( vm ){
      vm.ctTitle = '',
      vm.ctDate = '',
      vm.contents = [],
      vm.ctimg = ''
    }
  }],

  // modules:[{
  //   name:'e_content',
  //   views:['font'],
  //   //defaultTag:'footer',
  //   container:'body'
  // }],

  //绑定事件
  bindActions:{
    //关闭当前视图返回上一页
   'back':function(e,data){
         this.hide();
   },
    'DiaFont':function(){
      SPA.open('font', {
        ani: {
          name: 'actionSheet',
          distance:100,
          //点击蒙版是否关闭视图
          autoHide:false
        }
      });
    },
    'review':function(){
        console.log(1);
        SPA.open('review');
    }
  },
  //
  bindEvents:{
    beforeShow:function(){
      var objVM = this.getVM();
      var da = this.param;
      //ajax获取数据
      $.ajax({
      //  url:'/beautifulEssay/mockData/arctile.json',
        url:'/api/getDataArctile.php',
        type:'get',
        data:{
            id:da.pid
        },
        success:function( res  ){
            objVM.ctTitle = res.ctTitle;
            objVM.ctDate = res.ctDate;
            objVM.contents=res.conts;
            objVM.ctimg = res.ctimg;
        }
      });
    }
  }
});
