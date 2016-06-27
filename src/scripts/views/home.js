var homeHtml = require('../demohtml/home.string');
var swiperAnimate = require('../lib/swiper.animate1.0.2.min.js');

SPA.defineView('home',{
  html:homeHtml,

  plugins:['delegated',{
    name:'avalon',
    options:function( vm ){
      //console.log(vm)
      //定义一个vm数组对象，存储ajax读取的数据
      vm.datalist = [];
      vm.datalist2 = [];
      vm.isLoading = true;
    }
  }],

   init:{
      mySwiper : null
  },

   bindEvents:{
    beforeShow:function(){
      var that = this;
      //获取vm对象
      that.vm = this.getVM();
      //ajax获取数据
      $.ajax({
        //url:'/beautifulEssay/mockData/listdata.json',
        url:'/api/getDataList.php',
        type:'get',
        data:{
          rtype:'origin'
        },
        success:function( res ){
          //console.log(res)
          //存储最初数据  用setTimeout 为了查看loading
        //  setTimeout(function(){
            that.loadDataList = res.data;
            that.vm.datalist = res.data;
            that.vm.datalist2 = res.data;
            that.vm.isLoading = false;
            /*加了延时器，show函数执行完，
            *然后再将数据显示在页面，故须在此时改变初始状态
            */
            var myScroll = that.widgets.load;
            //scrollBy可把内容滚动指定的像素数
            myScroll.scrollBy(0,-30);
        //  },300);
        }
      });
    },
    show:function(){
      var that = this;

      //创建swiper对象
      var w1 = 0, w2 = 0;
      this.mySwiper = new Swiper('#wrapper',{
        loop:false,
        //paginationClickable: true,
        onSlideChangeStart:function(swiper){
          w1 = $('.navDiv').offset().width;
          w2 = $('.navList').offset().width;
          var disw = (w1-w2)/('.navList li').length;
          //监听滑动事件
          //console.log(swiper)
          var index = swiper.activeIndex;
          /*先获取到导航栏对象
           *给对应导航栏部分添加高亮
          */
          disw = disw*index;
          console.log(disw);
          $('.navList').css({'left':disw+'px'});
          $('.navList li').removeClass('active').eq(index).addClass('active');
        }
       });
        //获取当前滚动对象
       var mScroll = that.widgets.myScroll;
       mScroll.options.scrollX = true;
       mScroll.options.scrollY = false;
      //下拉刷新
      var scrollSize = 30;
      var myScroll = that.widgets.load;
      //scrollBy可把内容滚动指定的像素数
      //myScroll.scrollBy(0,-scrollSize);

      var headImg = $('.head img');
      //刷新状态 renum 记录刷新次数，模拟没有数据时刷新不加载信息
      var topImgHasClass = headImg.hasClass('up');
      var renum = 0;
      var maxNum = 3;

      var footImg = $('.foot img');
      //加载状态 loadnum 记录加载次数，模拟数据加载完提示没有更多数据
      var footImgHasClass = footImg.hasClass('down');
      var loadnum = 0;

      myScroll.on('scroll', function(e){
        var maxY = this.maxScrollY - this.y;
        if( this.y >= 0 ){
          !topImgHasClass && headImg.addClass('up');
          return '';
        }
        if( maxY >= 0 ){
          !footImgHasClass && footImg.addClass('down');
          return '';
        }
      });
      myScroll.on('scrollEnd',function(e){
        var maxY = this.maxScrollY - this.y;
        //下拉刷新
        if (this.y >= -scrollSize && this.y < 0) {
            myScroll.scrollTo(0, -scrollSize);
            headImg.removeClass('up');
          }else if (this.y >= 0) {
            headImg.attr('src', '/beautifulEssay/images/ajax-loader.gif');
            //刷新页面数据
            $.ajax({
              //url:'/beautifulEssay/mockData/refresh.json',
              url:'/api/getDataList.php',
              type:'get',
              data:{
                rtype:'refresh'
              },
              success:function( res ){
                if( renum >= maxNum ){
                  myScroll.scrollTo(0, self.y - scrollSize);
                  headImg.removeClass('up');
                  headImg.attr('src', '/beautifulEssay/images/pull_refresh_arrow.png');
                  return;
                }
                var newArray = res.data.concat(that.loadDataList);
                that.vm.datalist = newArray;
                that.loadDataList = newArray;
                myScroll.refresh();

                //刷新完成后恢复图片原始状态
                renum++;
                myScroll.scrollTo(0, self.y - scrollSize);
                headImg.removeClass('up');
                headImg.attr('src', '/beautifulEssay/images/pull_refresh_arrow.png');
              }
            });

          }
          //上拉加载
          var self = this;
          if (maxY > -scrollSize && maxY < 0) {
              myScroll.scrollTo(0, self.maxScrollY + scrollSize);
              footImg.removeClass('down')
          } else if (maxY >= 0) {
              footImg.attr('src', '/beautifulEssay/images/ajax-loader.gif');

              //ajax获取数据
              $.ajax({
                //url:'/beautifulEssay/mockData/listdata.json',
                url:'/api/getDataList.php',
                type:'get',
                data:{
                  rtype:'more'
                },
                success:function( res ){
                  if( loadnum >= maxNum ){
                      $('.foot .tips').html('没有更多数据....');
                      myScroll.scrollTo(0, self.y + scrollSize);
                      footImg.removeClass('down');
                      footImg.attr('src', '/beautifulEssay/images/pull_refresh_arrow.png');
                      return;
                  }
                  var newArray = that.loadDataList.concat(res.data);
                  console.log(newArray);
                  that.vm.datalist = newArray;
                  that.loadDataList = newArray;
                  myScroll.refresh();

                  //加载完成后恢复图片原始状态
                  loadnum++;
                  myScroll.scrollTo(0, self.y - scrollSize*10);
                  footImg.removeClass('down');
                  footImg.attr('src', '/beautifulEssay/images/pull_refresh_arrow.png');
                }
              });
          }
      });
    }
  },
  //点击高亮显示
   bindActions:{
        'tapPage':function(e){
          // console.log(e.el);
          //文字高亮显示
          $(e.el).addClass('active').siblings().removeClass('active');
          //获取当前点击索引值
          //var index = $(e.el).index();
          //console.log(index+'--');
          //切换子视图
          this.mySwiper.slideTo($(e.el).index());
        },
        'gotoEssay':function(e,data){
              /*
              *当前点击对像data-pid编号存入sessionStorage
              *历史记录用
              */
            var curpid = $(e.el).attr('data-pid');
            sessionStorage.setItem("data-pid",curpid);
              //切换视图
              //跳转到第一页
            SPA.open('essay',{
              param:data
            });
         },
         'gotoSearch':function(){
           SPA.open('search');
         },
         'loginMenu':function(){
           if( !$('.m-home').hasClass('moveRight') ){
             $('.m-home').toggleClass('moveRight');
             $('.login').toggleClass('zoom-in');
           }else{
            $('.m-home').toggleClass('moveLeft');
            $('.login').toggleClass('zoom-out');
           }
         },
         'gotoLogin':function(){
             SPA.open('login');
             setTimeout(function(){
               $('.login').toggleClass('zoom-out');
               $('.m-home').toggleClass('moveLeft');
             },200);
         }
      }
});
