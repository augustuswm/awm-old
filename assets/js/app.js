var z = document.querySelectorAll.bind(document);
require('./../css/main.scss');
require('particles.js');
var particleConfig = require('./../data/particles.json');

window.particlesJS(
  'particles',
  particleConfig
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
    target.classList.add('active');
    list.classList.add('article-activated');
  } else {
    target.classList.remove('active');
    list.classList.remove('article-activated');
  }
};

var articles = z('.article');

articles.forEach(
  function(article) {
    article.addEventListener('click', articleSelectHandler);
  }
);