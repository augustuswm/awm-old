require('./../css/main.scss');

var z = require('zest');
require('particles.js');

particlesJS.load(
  'particles',
  'assets/data/particles.json'
);

var list = z('.article-list')[0];

var articleSelectHandler = function articleSelectHandler(e) {

  var target = e.currentTarget,
      isActivated = target.classList.contains('activated')
      currentActivated = z('.activated');

  if (!isActivated) {
    currentActivated.forEach(
      function(article) {
        article.classList.remove('activated');
      }
    );
    target.classList.add('activated');
    list.classList.add('article-activated');
  } else {
    // target.classList.remove('activated');
    list.classList.remove('article-activated');
  }
};

var articles = z('.article');

articles.forEach(
  function(article) {
    article.addEventListener('click', articleSelectHandler);
  }
);