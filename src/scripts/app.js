//引用 js 文件
require('./lib/spa.min.js');
require('./lib/swiper-3.3.1.min.js');
require('./views/home.js');
require('./views/guide.js');
require('./views/essay.js');
require('./views/font.js');
require('./views/review.js');
require('./views/search.js');
require('./views/login.js');
require('./views/index.js');
//SPA设置
SPA.config({
  indexView:'guide'
});
