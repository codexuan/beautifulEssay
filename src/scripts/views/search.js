var searchHtml = require('../demohtml/search.string');

SPA.defineView('search',{
  html:searchHtml,

  plugins:['delegated'],

  bindActions:{
    'cancel':function(){
      this.hide();
    }
  }
});
