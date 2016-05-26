/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	var z = __webpack_require__(2);
	__webpack_require__(3);

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

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Zest (https://github.com/chjj/zest)
	 * A css selector engine.
	 * Copyright (c) 2011-2012, Christopher Jeffrey. (MIT Licensed)
	 */

	// TODO
	// - Recognize the TR subject selector when parsing.
	// - Pass context to scope.
	// - Add :column pseudo-classes.

	;(function() {

	/**
	 * Shared
	 */

	var window = this
	  , document = this.document
	  , old = this.zest;

	/**
	 * Helpers
	 */

	var compareDocumentPosition = (function() {
	  if (document.compareDocumentPosition) {
	    return function(a, b) {
	      return a.compareDocumentPosition(b);
	    };
	  }
	  return function(a, b) {
	    var el = a.ownerDocument.getElementsByTagName('*')
	      , i = el.length;

	    while (i--) {
	      if (el[i] === a) return 2;
	      if (el[i] === b) return 4;
	    }

	    return 1;
	  };
	})();

	var order = function(a, b) {
	  return compareDocumentPosition(a, b) & 2 ? 1 : -1;
	};

	var next = function(el) {
	  while ((el = el.nextSibling)
	         && el.nodeType !== 1);
	  return el;
	};

	var prev = function(el) {
	  while ((el = el.previousSibling)
	         && el.nodeType !== 1);
	  return el;
	};

	var child = function(el) {
	  if (el = el.firstChild) {
	    while (el.nodeType !== 1
	           && (el = el.nextSibling));
	  }
	  return el;
	};

	var lastChild = function(el) {
	  if (el = el.lastChild) {
	    while (el.nodeType !== 1
	           && (el = el.previousSibling));
	  }
	  return el;
	};

	var unquote = function(str) {
	  if (!str) return str;
	  var ch = str[0];
	  return ch === '"' || ch === '\''
	    ? str.slice(1, -1)
	    : str;
	};

	var indexOf = (function() {
	  if (Array.prototype.indexOf) {
	    return Array.prototype.indexOf;
	  }
	  return function(obj, item) {
	    var i = this.length;
	    while (i--) {
	      if (this[i] === item) return i;
	    }
	    return -1;
	  };
	})();

	var makeInside = function(start, end) {
	  var regex = rules.inside.source
	    .replace(/</g, start)
	    .replace(/>/g, end);

	  return new RegExp(regex);
	};

	var replace = function(regex, name, val) {
	  regex = regex.source;
	  regex = regex.replace(name, val.source || val);
	  return new RegExp(regex);
	};

	var truncateUrl = function(url, num) {
	  return url
	    .replace(/^(?:\w+:\/\/|\/+)/, '')
	    .replace(/(?:\/+|\/*#.*?)$/, '')
	    .split('/', num)
	    .join('/');
	};

	/**
	 * Handle `nth` Selectors
	 */

	var parseNth = function(param, test) {
	  var param = param.replace(/\s+/g, '')
	    , cap;

	  if (param === 'even') {
	    param = '2n+0';
	  } else if (param === 'odd') {
	    param = '2n+1';
	  } else if (!~param.indexOf('n')) {
	    param = '0n' + param;
	  }

	  cap = /^([+-])?(\d+)?n([+-])?(\d+)?$/.exec(param);

	  return {
	    group: cap[1] === '-'
	      ? -(cap[2] || 1)
	      : +(cap[2] || 1),
	    offset: cap[4]
	      ? (cap[3] === '-' ? -cap[4] : +cap[4])
	      : 0
	  };
	};

	var nth = function(param, test, last) {
	  var param = parseNth(param)
	    , group = param.group
	    , offset = param.offset
	    , find = !last ? child : lastChild
	    , advance = !last ? next : prev;

	  return function(el) {
	    if (el.parentNode.nodeType !== 1) return;

	    var rel = find(el.parentNode)
	      , pos = 0;

	    while (rel) {
	      if (test(rel, el)) pos++;
	      if (rel === el) {
	        pos -= offset;
	        return group && pos
	          ? !(pos % group) && (pos < 0 === group < 0)
	          : !pos;
	      }
	      rel = advance(rel);
	    }
	  };
	};

	/**
	 * Simple Selectors
	 */

	var selectors = {
	  '*': (function() {
	    if (function() {
	      var el = document.createElement('div');
	      el.appendChild(document.createComment(''));
	      return !!el.getElementsByTagName('*')[0];
	    }()) {
	      return function(el) {
	        if (el.nodeType === 1) return true;
	      };
	    }
	    return function() {
	      return true;
	    };
	  })(),
	  'type': function(type) {
	    type = type.toLowerCase();
	    return function(el) {
	      return el.nodeName.toLowerCase() === type;
	    };
	  },
	  'attr': function(key, op, val, i) {
	    op = operators[op];
	    return function(el) {
	      var attr;
	      switch (key) {
	        case 'for':
	          attr = el.htmlFor;
	          break;
	        case 'class':
	          // className is '' when non-existent
	          // getAttribute('class') is null
	          attr = el.className;
	          if (attr === '' && el.getAttribute('class') == null) {
	            attr = null;
	          }
	          break;
	        case 'href':
	          attr = el.getAttribute('href', 2);
	          break;
	        case 'title':
	          // getAttribute('title') can be '' when non-existent sometimes?
	          attr = el.getAttribute('title') || null;
	          break;
	        case 'id':
	          if (el.getAttribute) {
	            attr = el.getAttribute('id');
	            break;
	          }
	        default:
	          attr = el[key] != null
	            ? el[key]
	            : el.getAttribute && el.getAttribute(key);
	          break;
	      }
	      if (attr == null) return;
	      attr = attr + '';
	      if (i) {
	        attr = attr.toLowerCase();
	        val = val.toLowerCase();
	      }
	      return op(attr, val);
	    };
	  },
	  ':first-child': function(el) {
	    return !prev(el) && el.parentNode.nodeType === 1;
	  },
	  ':last-child': function(el) {
	    return !next(el) && el.parentNode.nodeType === 1;
	  },
	  ':only-child': function(el) {
	    return !prev(el) && !next(el)
	      && el.parentNode.nodeType === 1;
	  },
	  ':nth-child': function(param, last) {
	    return nth(param, function() {
	      return true;
	    }, last);
	  },
	  ':nth-last-child': function(param) {
	    return selectors[':nth-child'](param, true);
	  },
	  ':root': function(el) {
	    return el.ownerDocument.documentElement === el;
	  },
	  ':empty': function(el) {
	    return !el.firstChild;
	  },
	  ':not': function(sel) {
	    var test = compileGroup(sel);
	    return function(el) {
	      return !test(el);
	    };
	  },
	  ':first-of-type': function(el) {
	    if (el.parentNode.nodeType !== 1) return;
	    var type = el.nodeName;
	    while (el = prev(el)) {
	      if (el.nodeName === type) return;
	    }
	    return true;
	  },
	  ':last-of-type': function(el) {
	    if (el.parentNode.nodeType !== 1) return;
	    var type = el.nodeName;
	    while (el = next(el)) {
	      if (el.nodeName === type) return;
	    }
	    return true;
	  },
	  ':only-of-type': function(el) {
	    return selectors[':first-of-type'](el)
	        && selectors[':last-of-type'](el);
	  },
	  ':nth-of-type': function(param, last) {
	    return nth(param, function(rel, el) {
	      return rel.nodeName === el.nodeName;
	    }, last);
	  },
	  ':nth-last-of-type': function(param) {
	    return selectors[':nth-of-type'](param, true);
	  },
	  ':checked': function(el) {
	    return !!(el.checked || el.selected);
	  },
	  ':indeterminate': function(el) {
	    return !selectors[':checked'](el);
	  },
	  ':enabled': function(el) {
	    return !el.disabled && el.type !== 'hidden';
	  },
	  ':disabled': function(el) {
	    return !!el.disabled;
	  },
	  ':target': function(el) {
	    return el.id === window.location.hash.substring(1);
	  },
	  ':focus': function(el) {
	    return el === el.ownerDocument.activeElement;
	  },
	  ':matches': function(sel) {
	    return compileGroup(sel);
	  },
	  ':nth-match': function(param, last) {
	    var args = param.split(/\s*,\s*/)
	      , arg = args.shift()
	      , test = compileGroup(args.join(','));

	    return nth(arg, test, last);
	  },
	  ':nth-last-match': function(param) {
	    return selectors[':nth-match'](param, true);
	  },
	  ':links-here': function(el) {
	    return el + '' === window.location + '';
	  },
	  ':lang': function(param) {
	    return function(el) {
	      while (el) {
	        if (el.lang) return el.lang.indexOf(param) === 0;
	        el = el.parentNode;
	      }
	    };
	  },
	  ':dir': function(param) {
	    return function(el) {
	      while (el) {
	        if (el.dir) return el.dir === param;
	        el = el.parentNode;
	      }
	    };
	  },
	  ':scope': function(el, con) {
	    var context = con || el.ownerDocument;
	    if (context.nodeType === 9) {
	      return el === context.documentElement;
	    }
	    return el === context;
	  },
	  ':any-link': function(el) {
	    return typeof el.href === 'string';
	  },
	  ':local-link': function(el) {
	    if (el.nodeName) {
	      return el.href && el.host === window.location.host;
	    }
	    var param = +el + 1;
	    return function(el) {
	      if (!el.href) return;

	      var url = window.location + ''
	        , href = el + '';

	      return truncateUrl(url, param) === truncateUrl(href, param);
	    };
	  },
	  ':default': function(el) {
	    return !!el.defaultSelected;
	  },
	  ':valid': function(el) {
	    return el.willValidate || (el.validity && el.validity.valid);
	  },
	  ':invalid': function(el) {
	    return !selectors[':valid'](el);
	  },
	  ':in-range': function(el) {
	    return el.value > el.min && el.value <= el.max;
	  },
	  ':out-of-range': function(el) {
	    return !selectors[':in-range'](el);
	  },
	  ':required': function(el) {
	    return !!el.required;
	  },
	  ':optional': function(el) {
	    return !el.required;
	  },
	  ':read-only': function(el) {
	    if (el.readOnly) return true;

	    var attr = el.getAttribute('contenteditable')
	      , prop = el.contentEditable
	      , name = el.nodeName.toLowerCase();

	    name = name !== 'input' && name !== 'textarea';

	    return (name || el.disabled) && attr == null && prop !== 'true';
	  },
	  ':read-write': function(el) {
	    return !selectors[':read-only'](el);
	  },
	  ':hover': function() {
	    throw new Error(':hover is not supported.');
	  },
	  ':active': function() {
	    throw new Error(':active is not supported.');
	  },
	  ':link': function() {
	    throw new Error(':link is not supported.');
	  },
	  ':visited': function() {
	    throw new Error(':visited is not supported.');
	  },
	  ':column': function() {
	    throw new Error(':column is not supported.');
	  },
	  ':nth-column': function() {
	    throw new Error(':nth-column is not supported.');
	  },
	  ':nth-last-column': function() {
	    throw new Error(':nth-last-column is not supported.');
	  },
	  ':current': function() {
	    throw new Error(':current is not supported.');
	  },
	  ':past': function() {
	    throw new Error(':past is not supported.');
	  },
	  ':future': function() {
	    throw new Error(':future is not supported.');
	  },
	  // Non-standard, for compatibility purposes.
	  ':contains': function(param) {
	    return function(el) {
	      var text = el.innerText || el.textContent || el.value || '';
	      return !!~text.indexOf(param);
	    };
	  },
	  ':has': function(param) {
	    return function(el) {
	      return zest(param, el).length > 0;
	    };
	  }
	  // Potentially add more pseudo selectors for
	  // compatibility with sizzle and most other
	  // selector engines (?).
	};

	/**
	 * Attribute Operators
	 */

	var operators = {
	  '-': function() {
	    return true;
	  },
	  '=': function(attr, val) {
	    return attr === val;
	  },
	  '*=': function(attr, val) {
	    return attr.indexOf(val) !== -1;
	  },
	  '~=': function(attr, val) {
	    var i = attr.indexOf(val)
	      , f
	      , l;

	    if (i === -1) return;
	    f = attr[i - 1];
	    l = attr[i + val.length];

	    return (!f || f === ' ') && (!l || l === ' ');
	  },
	  '|=': function(attr, val) {
	    var i = attr.indexOf(val)
	      , l;

	    if (i !== 0) return;
	    l = attr[i + val.length];

	    return l === '-' || !l;
	  },
	  '^=': function(attr, val) {
	    return attr.indexOf(val) === 0;
	  },
	  '$=': function(attr, val) {
	    return attr.indexOf(val) + val.length === attr.length;
	  },
	  // non-standard
	  '!=': function(attr, val) {
	    return attr !== val;
	  }
	};

	/**
	 * Combinator Logic
	 */

	var combinators = {
	  ' ': function(test) {
	    return function(el) {
	      while (el = el.parentNode) {
	        if (test(el)) return el;
	      }
	    };
	  },
	  '>': function(test) {
	    return function(el) {
	      return test(el = el.parentNode) && el;
	    };
	  },
	  '+': function(test) {
	    return function(el) {
	      return test(el = prev(el)) && el;
	    };
	  },
	  '~': function(test) {
	    return function(el) {
	      while (el = prev(el)) {
	        if (test(el)) return el;
	      }
	    };
	  },
	  'noop': function(test) {
	    return function(el) {
	      return test(el) && el;
	    };
	  },
	  'ref': function(test, name) {
	    var node;

	    function ref(el) {
	      var doc = el.ownerDocument
	        , nodes = doc.getElementsByTagName('*')
	        , i = nodes.length;

	      while (i--) {
	        node = nodes[i];
	        if (ref.test(el)) {
	          node = null;
	          return true;
	        }
	      }

	      node = null;
	    }

	    ref.combinator = function(el) {
	      if (!node || !node.getAttribute) return;

	      var attr = node.getAttribute(name) || '';
	      if (attr[0] === '#') attr = attr.substring(1);

	      if (attr === el.id && test(node)) {
	        return node;
	      }
	    };

	    return ref;
	  }
	};

	/**
	 * Grammar
	 */

	var rules = {
	  qname: /^ *([\w\-]+|\*)/,
	  simple: /^(?:([.#][\w\-]+)|pseudo|attr)/,
	  ref: /^ *\/([\w\-]+)\/ */,
	  combinator: /^(?: +([^ \w*]) +|( )+|([^ \w*]))(?! *$)/,
	  attr: /^\[([\w\-]+)(?:([^\w]?=)(inside))?\]/,
	  pseudo: /^(:[\w\-]+)(?:\((inside)\))?/,
	  inside: /(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|<[^"'>]*>|\\["'>]|[^"'>])*/
	};

	rules.inside = replace(rules.inside, '[^"\'>]*', rules.inside);
	rules.attr = replace(rules.attr, 'inside', makeInside('\\[', '\\]'));
	rules.pseudo = replace(rules.pseudo, 'inside', makeInside('\\(', '\\)'));
	rules.simple = replace(rules.simple, 'pseudo', rules.pseudo);
	rules.simple = replace(rules.simple, 'attr', rules.attr);

	/**
	 * Compiling
	 */

	var compile = function(sel) {
	  var sel = sel.replace(/^\s+|\s+$/g, '')
	    , test
	    , filter = []
	    , buff = []
	    , subject
	    , qname
	    , cap
	    , op
	    , ref;

	  while (sel) {
	    if (cap = rules.qname.exec(sel)) {
	      sel = sel.substring(cap[0].length);
	      qname = cap[1];
	      buff.push(tok(qname, true));
	    } else if (cap = rules.simple.exec(sel)) {
	      sel = sel.substring(cap[0].length);
	      qname = '*';
	      buff.push(tok(qname, true));
	      buff.push(tok(cap));
	    } else {
	      throw new Error('Invalid selector.');
	    }

	    while (cap = rules.simple.exec(sel)) {
	      sel = sel.substring(cap[0].length);
	      buff.push(tok(cap));
	    }

	    if (sel[0] === '!') {
	      sel = sel.substring(1);
	      subject = makeSubject();
	      subject.qname = qname;
	      buff.push(subject.simple);
	    }

	    if (cap = rules.ref.exec(sel)) {
	      sel = sel.substring(cap[0].length);
	      ref = combinators.ref(makeSimple(buff), cap[1]);
	      filter.push(ref.combinator);
	      buff = [];
	      continue;
	    }

	    if (cap = rules.combinator.exec(sel)) {
	      sel = sel.substring(cap[0].length);
	      op = cap[1] || cap[2] || cap[3];
	      if (op === ',') {
	        filter.push(combinators.noop(makeSimple(buff)));
	        break;
	      }
	    } else {
	      op = 'noop';
	    }

	    filter.push(combinators[op](makeSimple(buff)));
	    buff = [];
	  }

	  test = makeTest(filter);
	  test.qname = qname;
	  test.sel = sel;

	  if (subject) {
	    subject.lname = test.qname;

	    subject.test = test;
	    subject.qname = subject.qname;
	    subject.sel = test.sel;
	    test = subject;
	  }

	  if (ref) {
	    ref.test = test;
	    ref.qname = test.qname;
	    ref.sel = test.sel;
	    test = ref;
	  }

	  return test;
	};

	var tok = function(cap, qname) {
	  // qname
	  if (qname) {
	    return cap === '*'
	      ? selectors['*']
	      : selectors.type(cap);
	  }

	  // class/id
	  if (cap[1]) {
	    return cap[1][0] === '.'
	      ? selectors.attr('class', '~=', cap[1].substring(1))
	      : selectors.attr('id', '=', cap[1].substring(1));
	  }

	  // pseudo-name
	  // inside-pseudo
	  if (cap[2]) {
	    return cap[3]
	      ? selectors[cap[2]](unquote(cap[3]))
	      : selectors[cap[2]];
	  }

	  // attr name
	  // attr op
	  // attr value
	  if (cap[4]) {
	    var i;
	    if (cap[6]) {
	      i = cap[6].length;
	      cap[6] = cap[6].replace(/ +i$/, '');
	      i = i > cap[6].length;
	    }
	    return selectors.attr(cap[4], cap[5] || '-', unquote(cap[6]), i);
	  }

	  throw new Error('Unknown Selector.');
	};

	var makeSimple = function(func) {
	  var l = func.length
	    , i;

	  // Potentially make sure
	  // `el` is truthy.
	  if (l < 2) return func[0];

	  return function(el) {
	    if (!el) return;
	    for (i = 0; i < l; i++) {
	      if (!func[i](el)) return;
	    }
	    return true;
	  };
	};

	var makeTest = function(func) {
	  if (func.length < 2) {
	    return function(el) {
	      return !!func[0](el);
	    };
	  }
	  return function(el) {
	    var i = func.length;
	    while (i--) {
	      if (!(el = func[i](el))) return;
	    }
	    return true;
	  };
	};

	var makeSubject = function() {
	  var target;

	  function subject(el) {
	    var node = el.ownerDocument
	      , scope = node.getElementsByTagName(subject.lname)
	      , i = scope.length;

	    while (i--) {
	      if (subject.test(scope[i]) && target === el) {
	        target = null;
	        return true;
	      }
	    }

	    target = null;
	  }

	  subject.simple = function(el) {
	    target = el;
	    return true;
	  };

	  return subject;
	};

	var compileGroup = function(sel) {
	  var test = compile(sel)
	    , tests = [ test ];

	  while (test.sel) {
	    test = compile(test.sel);
	    tests.push(test);
	  }

	  if (tests.length < 2) return test;

	  return function(el) {
	    var l = tests.length
	      , i = 0;

	    for (; i < l; i++) {
	      if (tests[i](el)) return true;
	    }
	  };
	};

	/**
	 * Selection
	 */

	var find = function(sel, node) {
	  var results = []
	    , test = compile(sel)
	    , scope = node.getElementsByTagName(test.qname)
	    , i = 0
	    , el;

	  while (el = scope[i++]) {
	    if (test(el)) results.push(el);
	  }

	  if (test.sel) {
	    while (test.sel) {
	      test = compile(test.sel);
	      scope = node.getElementsByTagName(test.qname);
	      i = 0;
	      while (el = scope[i++]) {
	        if (test(el) && !~indexOf.call(results, el)) {
	          results.push(el);
	        }
	      }
	    }
	    results.sort(order);
	  }

	  return results;
	};

	/**
	 * Native
	 */

	var select = (function() {
	  var slice = (function() {
	    try {
	      Array.prototype.slice.call(document.getElementsByTagName('zest'));
	      return Array.prototype.slice;
	    } catch(e) {
	      e = null;
	      return function() {
	        var a = [], i = 0, l = this.length;
	        for (; i < l; i++) a.push(this[i]);
	        return a;
	      };
	    }
	  })();

	  if (document.querySelectorAll) {
	    return function(sel, node) {
	      try {
	        return slice.call(node.querySelectorAll(sel));
	      } catch(e) {
	        return find(sel, node);
	      }
	    };
	  }

	  return function(sel, node) {
	    try {
	      if (sel[0] === '#' && /^#[\w\-]+$/.test(sel)) {
	        return [node.getElementById(sel.substring(1))];
	      }
	      if (sel[0] === '.' && /^\.[\w\-]+$/.test(sel)) {
	        sel = node.getElementsByClassName(sel.substring(1));
	        return slice.call(sel);
	      }
	      if (/^[\w\-]+$/.test(sel)) {
	        return slice.call(node.getElementsByTagName(sel));
	      }
	    } catch(e) {
	      ;
	    }
	    return find(sel, node);
	  };
	})();

	/**
	 * Zest
	 */

	var zest = function(sel, node) {
	  try {
	    sel = select(sel, node || document);
	  } catch(e) {
	    if (window.ZEST_DEBUG) {
	      console.log(e.stack || e + '');
	    }
	    sel = [];
	  }
	  return sel;
	};

	/**
	 * Expose
	 */

	zest.selectors = selectors;
	zest.operators = operators;
	zest.combinators = combinators;
	zest.compile = compileGroup;

	zest.matches = function(el, sel) {
	  return !!compileGroup(sel)(el);
	};

	zest.cache = function() {
	  if (compile.raw) return;

	  var raw = compile
	    , cache = {};

	  compile = function(sel) {
	    return cache[sel]
	      || (cache[sel] = raw(sel));
	  };

	  compile.raw = raw;
	  zest._cache = cache;
	};

	zest.noCache = function() {
	  if (!compile.raw) return;
	  compile = compile.raw;
	  delete zest._cache;
	};

	zest.noConflict = function() {
	  window.zest = old;
	  return zest;
	};

	zest.noNative = function() {
	  select = find;
	};

	if (true) {
	  module.exports = zest;
	} else {
	  this.zest = zest;
	}

	if (window.ZEST_DEBUG) {
	  zest.noNative();
	} else {
	  zest.cache();
	}

	}).call(function() {
	  return this || (typeof window !== 'undefined' ? window : global);
	}());

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports) {

	/* -----------------------------------------------
	/* Author : Vincent Garreau  - vincentgarreau.com
	/* MIT license: http://opensource.org/licenses/MIT
	/* Demo / Generator : vincentgarreau.com/particles.js
	/* GitHub : github.com/VincentGarreau/particles.js
	/* How to use? : Check the GitHub README
	/* v2.0.0
	/* ----------------------------------------------- */

	var pJS = function(tag_id, params){

	  var canvas_el = document.querySelector('#'+tag_id+' > .particles-js-canvas-el');

	  /* particles.js variables with default values */
	  this.pJS = {
	    canvas: {
	      el: canvas_el,
	      w: canvas_el.offsetWidth,
	      h: canvas_el.offsetHeight
	    },
	    particles: {
	      number: {
	        value: 400,
	        density: {
	          enable: true,
	          value_area: 800
	        }
	      },
	      color: {
	        value: '#fff'
	      },
	      shape: {
	        type: 'circle',
	        stroke: {
	          width: 0,
	          color: '#ff0000'
	        },
	        polygon: {
	          nb_sides: 5
	        },
	        image: {
	          src: '',
	          width: 100,
	          height: 100
	        }
	      },
	      opacity: {
	        value: 1,
	        random: false,
	        anim: {
	          enable: false,
	          speed: 2,
	          opacity_min: 0,
	          sync: false
	        }
	      },
	      size: {
	        value: 20,
	        random: false,
	        anim: {
	          enable: false,
	          speed: 20,
	          size_min: 0,
	          sync: false
	        }
	      },
	      line_linked: {
	        enable: true,
	        distance: 100,
	        color: '#fff',
	        opacity: 1,
	        width: 1
	      },
	      move: {
	        enable: true,
	        speed: 2,
	        direction: 'none',
	        random: false,
	        straight: false,
	        out_mode: 'out',
	        bounce: false,
	        attract: {
	          enable: false,
	          rotateX: 3000,
	          rotateY: 3000
	        }
	      },
	      array: []
	    },
	    interactivity: {
	      detect_on: 'canvas',
	      events: {
	        onhover: {
	          enable: true,
	          mode: 'grab'
	        },
	        onclick: {
	          enable: true,
	          mode: 'push'
	        },
	        resize: true
	      },
	      modes: {
	        grab:{
	          distance: 100,
	          line_linked:{
	            opacity: 1
	          }
	        },
	        bubble:{
	          distance: 200,
	          size: 80,
	          duration: 0.4
	        },
	        repulse:{
	          distance: 200,
	          duration: 0.4
	        },
	        push:{
	          particles_nb: 4
	        },
	        remove:{
	          particles_nb: 2
	        }
	      },
	      mouse:{}
	    },
	    retina_detect: false,
	    fn: {
	      interact: {},
	      modes: {},
	      vendors:{}
	    },
	    tmp: {}
	  };

	  var pJS = this.pJS;

	  /* params settings */
	  if(params){
	    Object.deepExtend(pJS, params);
	  }

	  pJS.tmp.obj = {
	    size_value: pJS.particles.size.value,
	    size_anim_speed: pJS.particles.size.anim.speed,
	    move_speed: pJS.particles.move.speed,
	    line_linked_distance: pJS.particles.line_linked.distance,
	    line_linked_width: pJS.particles.line_linked.width,
	    mode_grab_distance: pJS.interactivity.modes.grab.distance,
	    mode_bubble_distance: pJS.interactivity.modes.bubble.distance,
	    mode_bubble_size: pJS.interactivity.modes.bubble.size,
	    mode_repulse_distance: pJS.interactivity.modes.repulse.distance
	  };


	  pJS.fn.retinaInit = function(){

	    if(pJS.retina_detect && window.devicePixelRatio > 1){
	      pJS.canvas.pxratio = window.devicePixelRatio; 
	      pJS.tmp.retina = true;
	    } 
	    else{
	      pJS.canvas.pxratio = 1;
	      pJS.tmp.retina = false;
	    }

	    pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
	    pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;

	    pJS.particles.size.value = pJS.tmp.obj.size_value * pJS.canvas.pxratio;
	    pJS.particles.size.anim.speed = pJS.tmp.obj.size_anim_speed * pJS.canvas.pxratio;
	    pJS.particles.move.speed = pJS.tmp.obj.move_speed * pJS.canvas.pxratio;
	    pJS.particles.line_linked.distance = pJS.tmp.obj.line_linked_distance * pJS.canvas.pxratio;
	    pJS.interactivity.modes.grab.distance = pJS.tmp.obj.mode_grab_distance * pJS.canvas.pxratio;
	    pJS.interactivity.modes.bubble.distance = pJS.tmp.obj.mode_bubble_distance * pJS.canvas.pxratio;
	    pJS.particles.line_linked.width = pJS.tmp.obj.line_linked_width * pJS.canvas.pxratio;
	    pJS.interactivity.modes.bubble.size = pJS.tmp.obj.mode_bubble_size * pJS.canvas.pxratio;
	    pJS.interactivity.modes.repulse.distance = pJS.tmp.obj.mode_repulse_distance * pJS.canvas.pxratio;

	  };



	  /* ---------- pJS functions - canvas ------------ */

	  pJS.fn.canvasInit = function(){
	    pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
	  };

	  pJS.fn.canvasSize = function(){

	    pJS.canvas.el.width = pJS.canvas.w;
	    pJS.canvas.el.height = pJS.canvas.h;

	    if(pJS && pJS.interactivity.events.resize){

	      window.addEventListener('resize', function(){

	          pJS.canvas.w = pJS.canvas.el.offsetWidth;
	          pJS.canvas.h = pJS.canvas.el.offsetHeight;

	          /* resize canvas */
	          if(pJS.tmp.retina){
	            pJS.canvas.w *= pJS.canvas.pxratio;
	            pJS.canvas.h *= pJS.canvas.pxratio;
	          }

	          pJS.canvas.el.width = pJS.canvas.w;
	          pJS.canvas.el.height = pJS.canvas.h;

	          /* repaint canvas on anim disabled */
	          if(!pJS.particles.move.enable){
	            pJS.fn.particlesEmpty();
	            pJS.fn.particlesCreate();
	            pJS.fn.particlesDraw();
	            pJS.fn.vendors.densityAutoParticles();
	          }

	        /* density particles enabled */
	        pJS.fn.vendors.densityAutoParticles();

	      });

	    }

	  };


	  pJS.fn.canvasPaint = function(){
	    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
	  };

	  pJS.fn.canvasClear = function(){
	    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
	  };


	  /* --------- pJS functions - particles ----------- */

	  pJS.fn.particle = function(color, opacity, position){

	    /* size */
	    this.radius = (pJS.particles.size.random ? Math.random() : 1) * pJS.particles.size.value;
	    if(pJS.particles.size.anim.enable){
	      this.size_status = false;
	      this.vs = pJS.particles.size.anim.speed / 100;
	      if(!pJS.particles.size.anim.sync){
	        this.vs = this.vs * Math.random();
	      }
	    }

	    /* position */
	    this.x = position ? position.x : Math.random() * pJS.canvas.w;
	    this.y = position ? position.y : Math.random() * pJS.canvas.h;

	    /* check position  - into the canvas */
	    if(this.x > pJS.canvas.w - this.radius*2) this.x = this.x - this.radius;
	    else if(this.x < this.radius*2) this.x = this.x + this.radius;
	    if(this.y > pJS.canvas.h - this.radius*2) this.y = this.y - this.radius;
	    else if(this.y < this.radius*2) this.y = this.y + this.radius;

	    /* check position - avoid overlap */
	    if(pJS.particles.move.bounce){
	      pJS.fn.vendors.checkOverlap(this, position);
	    }

	    /* color */
	    this.color = {};
	    if(typeof(color.value) == 'object'){

	      if(color.value instanceof Array){
	        var color_selected = color.value[Math.floor(Math.random() * pJS.particles.color.value.length)];
	        this.color.rgb = hexToRgb(color_selected);
	      }else{
	        if(color.value.r != undefined && color.value.g != undefined && color.value.b != undefined){
	          this.color.rgb = {
	            r: color.value.r,
	            g: color.value.g,
	            b: color.value.b
	          }
	        }
	        if(color.value.h != undefined && color.value.s != undefined && color.value.l != undefined){
	          this.color.hsl = {
	            h: color.value.h,
	            s: color.value.s,
	            l: color.value.l
	          }
	        }
	      }

	    }
	    else if(color.value == 'random'){
	      this.color.rgb = {
	        r: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
	        g: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
	        b: (Math.floor(Math.random() * (255 - 0 + 1)) + 0)
	      }
	    }
	    else if(typeof(color.value) == 'string'){
	      this.color = color;
	      this.color.rgb = hexToRgb(this.color.value);
	    }

	    /* opacity */
	    this.opacity = (pJS.particles.opacity.random ? Math.random() : 1) * pJS.particles.opacity.value;
	    if(pJS.particles.opacity.anim.enable){
	      this.opacity_status = false;
	      this.vo = pJS.particles.opacity.anim.speed / 100;
	      if(!pJS.particles.opacity.anim.sync){
	        this.vo = this.vo * Math.random();
	      }
	    }

	    /* animation - velocity for speed */
	    var velbase = {}
	    switch(pJS.particles.move.direction){
	      case 'top':
	        velbase = { x:0, y:-1 };
	      break;
	      case 'top-right':
	        velbase = { x:0.5, y:-0.5 };
	      break;
	      case 'right':
	        velbase = { x:1, y:-0 };
	      break;
	      case 'bottom-right':
	        velbase = { x:0.5, y:0.5 };
	      break;
	      case 'bottom':
	        velbase = { x:0, y:1 };
	      break;
	      case 'bottom-left':
	        velbase = { x:-0.5, y:1 };
	      break;
	      case 'left':
	        velbase = { x:-1, y:0 };
	      break;
	      case 'top-left':
	        velbase = { x:-0.5, y:-0.5 };
	      break;
	      default:
	        velbase = { x:0, y:0 };
	      break;
	    }

	    if(pJS.particles.move.straight){
	      this.vx = velbase.x;
	      this.vy = velbase.y;
	      if(pJS.particles.move.random){
	        this.vx = this.vx * (Math.random());
	        this.vy = this.vy * (Math.random());
	      }
	    }else{
	      this.vx = velbase.x + Math.random()-0.5;
	      this.vy = velbase.y + Math.random()-0.5;
	    }

	    // var theta = 2.0 * Math.PI * Math.random();
	    // this.vx = Math.cos(theta);
	    // this.vy = Math.sin(theta);

	    this.vx_i = this.vx;
	    this.vy_i = this.vy;

	    

	    /* if shape is image */

	    var shape_type = pJS.particles.shape.type;
	    if(typeof(shape_type) == 'object'){
	      if(shape_type instanceof Array){
	        var shape_selected = shape_type[Math.floor(Math.random() * shape_type.length)];
	        this.shape = shape_selected;
	      }
	    }else{
	      this.shape = shape_type;
	    }

	    if(this.shape == 'image'){
	      var sh = pJS.particles.shape;
	      this.img = {
	        src: sh.image.src,
	        ratio: sh.image.width / sh.image.height
	      }
	      if(!this.img.ratio) this.img.ratio = 1;
	      if(pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg != undefined){
	        pJS.fn.vendors.createSvgImg(this);
	        if(pJS.tmp.pushing){
	          this.img.loaded = false;
	        }
	      }
	    }

	    

	  };


	  pJS.fn.particle.prototype.draw = function() {

	    var p = this;

	    if(p.radius_bubble != undefined){
	      var radius = p.radius_bubble; 
	    }else{
	      var radius = p.radius;
	    }

	    if(p.opacity_bubble != undefined){
	      var opacity = p.opacity_bubble;
	    }else{
	      var opacity = p.opacity;
	    }

	    if(p.color.rgb){
	      var color_value = 'rgba('+p.color.rgb.r+','+p.color.rgb.g+','+p.color.rgb.b+','+opacity+')';
	    }else{
	      var color_value = 'hsla('+p.color.hsl.h+','+p.color.hsl.s+'%,'+p.color.hsl.l+'%,'+opacity+')';
	    }

	    pJS.canvas.ctx.fillStyle = color_value;
	    pJS.canvas.ctx.beginPath();

	    switch(p.shape){

	      case 'circle':
	        pJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
	      break;

	      case 'edge':
	        pJS.canvas.ctx.rect(p.x-radius, p.y-radius, radius*2, radius*2);
	      break;

	      case 'line':
	        pJS.canvas.ctx.moveTo(p.x-radius, p.y-radius);
	        pJS.canvas.ctx.lineTo(p.x+radius, p.y+radius);
	      break;

	      case 'triangle':
	        pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x-radius, p.y+radius / 1.66, radius*2, 3, 2);
	      break;

	      case 'polygon':
	        pJS.fn.vendors.drawShape(
	          pJS.canvas.ctx,
	          p.x - radius / (pJS.particles.shape.polygon.nb_sides/3.5), // startX
	          p.y - radius / (2.66/3.5), // startY
	          radius*2.66 / (pJS.particles.shape.polygon.nb_sides/3), // sideLength
	          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
	          1 // sideCountDenominator
	        );
	      break;

	      case 'star':
	        pJS.fn.vendors.drawShape(
	          pJS.canvas.ctx,
	          p.x - radius*2 / (pJS.particles.shape.polygon.nb_sides/4), // startX
	          p.y - radius / (2*2.66/3.5), // startY
	          radius*2*2.66 / (pJS.particles.shape.polygon.nb_sides/3), // sideLength
	          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
	          2 // sideCountDenominator
	        );
	      break;

	      case 'image':

	        function draw(){
	          pJS.canvas.ctx.drawImage(
	            img_obj,
	            p.x-radius,
	            p.y-radius,
	            radius*2,
	            radius*2 / p.img.ratio
	          );
	        }

	        if(pJS.tmp.img_type == 'svg'){
	          var img_obj = p.img.obj;
	        }else{
	          var img_obj = pJS.tmp.img_obj;
	        }

	        if(img_obj){
	          draw();
	        }

	      break;

	    }

	    pJS.canvas.ctx.closePath();

	    if(pJS.particles.shape.stroke.width > 0){

	      if (p.shape === 'line') {
	        pJS.canvas.ctx.strokeStyle = color_value;
	      } else {
	        pJS.canvas.ctx.strokeStyle = pJS.particles.shape.stroke.color;
	      }
	      
	      pJS.canvas.ctx.lineWidth = pJS.particles.shape.stroke.width;
	      pJS.canvas.ctx.stroke();
	    }
	    
	    pJS.canvas.ctx.fill();
	    
	  };


	  pJS.fn.particlesCreate = function(){
	    for(var i = 0; i < pJS.particles.number.value; i++) {
	      pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color, pJS.particles.opacity.value));
	    }
	  };

	  pJS.fn.particlesUpdate = function(){

	    for(var i = 0; i < pJS.particles.array.length; i++){

	      /* the particle */
	      var p = pJS.particles.array[i];

	      // var d = ( dx = pJS.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = pJS.interactivity.mouse.click_pos_y - p.y ) * dy;
	      // var f = -BANG_SIZE / d;
	      // if ( d < BANG_SIZE ) {
	      //     var t = Math.atan2( dy, dx );
	      //     p.vx = f * Math.cos(t);
	      //     p.vy = f * Math.sin(t);
	      // }

	      /* move the particle */
	      if(pJS.particles.move.enable){
	        var ms = pJS.particles.move.speed/2;
	        p.x += p.vx * ms;
	        p.y += p.vy * ms;
	      }

	      /* change opacity status */
	      if(pJS.particles.opacity.anim.enable) {
	        if(p.opacity_status == true) {
	          if(p.opacity >= pJS.particles.opacity.value) p.opacity_status = false;
	          p.opacity += p.vo;
	        }else {
	          if(p.opacity <= pJS.particles.opacity.anim.opacity_min) p.opacity_status = true;
	          p.opacity -= p.vo;
	        }
	        if(p.opacity < 0) p.opacity = 0;
	      }

	      /* change size */
	      if(pJS.particles.size.anim.enable){
	        if(p.size_status == true){
	          if(p.radius >= pJS.particles.size.value) p.size_status = false;
	          p.radius += p.vs;
	        }else{
	          if(p.radius <= pJS.particles.size.anim.size_min) p.size_status = true;
	          p.radius -= p.vs;
	        }
	        if(p.radius < 0) p.radius = 0;
	      }

	      /* change particle position if it is out of canvas */
	      if(pJS.particles.move.out_mode == 'bounce'){
	        var new_pos = {
	          x_left: p.radius,
	          x_right:  pJS.canvas.w,
	          y_top: p.radius,
	          y_bottom: pJS.canvas.h
	        }
	      }else{
	        var new_pos = {
	          x_left: -p.radius,
	          x_right: pJS.canvas.w + p.radius,
	          y_top: -p.radius,
	          y_bottom: pJS.canvas.h + p.radius
	        }
	      }

	      if(p.x - p.radius > pJS.canvas.w){
	        p.x = new_pos.x_left;
	        p.y = Math.random() * pJS.canvas.h;
	      }
	      else if(p.x + p.radius < 0){
	        p.x = new_pos.x_right;
	        p.y = Math.random() * pJS.canvas.h;
	      }
	      if(p.y - p.radius > pJS.canvas.h){
	        p.y = new_pos.y_top;
	        p.x = Math.random() * pJS.canvas.w;
	      }
	      else if(p.y + p.radius < 0){
	        p.y = new_pos.y_bottom;
	        p.x = Math.random() * pJS.canvas.w;
	      }

	      /* out of canvas modes */
	      switch(pJS.particles.move.out_mode){
	        case 'bounce':
	          if (p.x + p.radius > pJS.canvas.w) p.vx = -p.vx;
	          else if (p.x - p.radius < 0) p.vx = -p.vx;
	          if (p.y + p.radius > pJS.canvas.h) p.vy = -p.vy;
	          else if (p.y - p.radius < 0) p.vy = -p.vy;
	        break;
	      }

	      /* events */
	      if(isInArray('grab', pJS.interactivity.events.onhover.mode)){
	        pJS.fn.modes.grabParticle(p);
	      }

	      if(isInArray('bubble', pJS.interactivity.events.onhover.mode) || isInArray('bubble', pJS.interactivity.events.onclick.mode)){
	        pJS.fn.modes.bubbleParticle(p);
	      }

	      if(isInArray('repulse', pJS.interactivity.events.onhover.mode) || isInArray('repulse', pJS.interactivity.events.onclick.mode)){
	        pJS.fn.modes.repulseParticle(p);
	      }

	      /* interaction auto between particles */
	      if(pJS.particles.line_linked.enable || pJS.particles.move.attract.enable){
	        for(var j = i + 1; j < pJS.particles.array.length; j++){
	          var p2 = pJS.particles.array[j];

	          /* link particles */
	          if(pJS.particles.line_linked.enable){
	            pJS.fn.interact.linkParticles(p,p2);
	          }

	          /* attract particles */
	          if(pJS.particles.move.attract.enable){
	            pJS.fn.interact.attractParticles(p,p2);
	          }

	          /* bounce particles */
	          if(pJS.particles.move.bounce){
	            pJS.fn.interact.bounceParticles(p,p2);
	          }

	        }
	      }


	    }

	  };

	  pJS.fn.particlesDraw = function(){

	    /* clear canvas */
	    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);

	    /* update each particles param */
	    pJS.fn.particlesUpdate();

	    /* draw each particle */
	    for(var i = 0; i < pJS.particles.array.length; i++){
	      var p = pJS.particles.array[i];
	      p.draw();
	    }

	  };

	  pJS.fn.particlesEmpty = function(){
	    pJS.particles.array = [];
	  };

	  pJS.fn.particlesRefresh = function(){

	    /* init all */
	    cancelRequestAnimFrame(pJS.fn.checkAnimFrame);
	    cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
	    pJS.tmp.source_svg = undefined;
	    pJS.tmp.img_obj = undefined;
	    pJS.tmp.count_svg = 0;
	    pJS.fn.particlesEmpty();
	    pJS.fn.canvasClear();
	    
	    /* restart */
	    pJS.fn.vendors.start();

	  };


	  /* ---------- pJS functions - particles interaction ------------ */

	  pJS.fn.interact.linkParticles = function(p1, p2){

	    var dx = p1.x - p2.x,
	        dy = p1.y - p2.y,
	        dist = Math.sqrt(dx*dx + dy*dy);

	    /* draw a line between p1 and p2 if the distance between them is under the config distance */
	    if(dist <= pJS.particles.line_linked.distance){

	      var opacity_line = pJS.particles.line_linked.opacity - (dist / (1/pJS.particles.line_linked.opacity)) / pJS.particles.line_linked.distance;

	      if(opacity_line > 0){        
	        
	        /* style */
	        var color_line = pJS.particles.line_linked.color_rgb_line;
	        pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity_line+')';
	        pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
	        //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
	        
	        /* path */
	        pJS.canvas.ctx.beginPath();
	        pJS.canvas.ctx.moveTo(p1.x, p1.y);
	        pJS.canvas.ctx.lineTo(p2.x, p2.y);
	        pJS.canvas.ctx.stroke();
	        pJS.canvas.ctx.closePath();

	      }

	    }

	  };


	  pJS.fn.interact.attractParticles  = function(p1, p2){

	    /* condensed particles */
	    var dx = p1.x - p2.x,
	        dy = p1.y - p2.y,
	        dist = Math.sqrt(dx*dx + dy*dy);

	    if(dist <= pJS.particles.line_linked.distance){

	      var ax = dx/(pJS.particles.move.attract.rotateX*1000),
	          ay = dy/(pJS.particles.move.attract.rotateY*1000);

	      p1.vx -= ax;
	      p1.vy -= ay;

	      p2.vx += ax;
	      p2.vy += ay;

	    }
	    

	  }


	  pJS.fn.interact.bounceParticles = function(p1, p2){

	    var dx = p1.x - p2.x,
	        dy = p1.y - p2.y,
	        dist = Math.sqrt(dx*dx + dy*dy),
	        dist_p = p1.radius+p2.radius;

	    if(dist <= dist_p){
	      p1.vx = -p1.vx;
	      p1.vy = -p1.vy;

	      p2.vx = -p2.vx;
	      p2.vy = -p2.vy;
	    }

	  }


	  /* ---------- pJS functions - modes events ------------ */

	  pJS.fn.modes.pushParticles = function(nb, pos){

	    pJS.tmp.pushing = true;

	    for(var i = 0; i < nb; i++){
	      pJS.particles.array.push(
	        new pJS.fn.particle(
	          pJS.particles.color,
	          pJS.particles.opacity.value,
	          {
	            'x': pos ? pos.pos_x : Math.random() * pJS.canvas.w,
	            'y': pos ? pos.pos_y : Math.random() * pJS.canvas.h
	          }
	        )
	      )
	      if(i == nb-1){
	        if(!pJS.particles.move.enable){
	          pJS.fn.particlesDraw();
	        }
	        pJS.tmp.pushing = false;
	      }
	    }

	  };


	  pJS.fn.modes.removeParticles = function(nb){

	    pJS.particles.array.splice(0, nb);
	    if(!pJS.particles.move.enable){
	      pJS.fn.particlesDraw();
	    }

	  };


	  pJS.fn.modes.bubbleParticle = function(p){

	    /* on hover event */
	    if(pJS.interactivity.events.onhover.enable && isInArray('bubble', pJS.interactivity.events.onhover.mode)){

	      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
	          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
	          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse),
	          ratio = 1 - dist_mouse / pJS.interactivity.modes.bubble.distance;

	      function init(){
	        p.opacity_bubble = p.opacity;
	        p.radius_bubble = p.radius;
	      }

	      /* mousemove - check ratio */
	      if(dist_mouse <= pJS.interactivity.modes.bubble.distance){

	        if(ratio >= 0 && pJS.interactivity.status == 'mousemove'){
	          
	          /* size */
	          if(pJS.interactivity.modes.bubble.size != pJS.particles.size.value){

	            if(pJS.interactivity.modes.bubble.size > pJS.particles.size.value){
	              var size = p.radius + (pJS.interactivity.modes.bubble.size*ratio);
	              if(size >= 0){
	                p.radius_bubble = size;
	              }
	            }else{
	              var dif = p.radius - pJS.interactivity.modes.bubble.size,
	                  size = p.radius - (dif*ratio);
	              if(size > 0){
	                p.radius_bubble = size;
	              }else{
	                p.radius_bubble = 0;
	              }
	            }

	          }

	          /* opacity */
	          if(pJS.interactivity.modes.bubble.opacity != pJS.particles.opacity.value){

	            if(pJS.interactivity.modes.bubble.opacity > pJS.particles.opacity.value){
	              var opacity = pJS.interactivity.modes.bubble.opacity*ratio;
	              if(opacity > p.opacity && opacity <= pJS.interactivity.modes.bubble.opacity){
	                p.opacity_bubble = opacity;
	              }
	            }else{
	              var opacity = p.opacity - (pJS.particles.opacity.value-pJS.interactivity.modes.bubble.opacity)*ratio;
	              if(opacity < p.opacity && opacity >= pJS.interactivity.modes.bubble.opacity){
	                p.opacity_bubble = opacity;
	              }
	            }

	          }

	        }

	      }else{
	        init();
	      }


	      /* mouseleave */
	      if(pJS.interactivity.status == 'mouseleave'){
	        init();
	      }
	    
	    }

	    /* on click event */
	    else if(pJS.interactivity.events.onclick.enable && isInArray('bubble', pJS.interactivity.events.onclick.mode)){


	      if(pJS.tmp.bubble_clicking){
	        var dx_mouse = p.x - pJS.interactivity.mouse.click_pos_x,
	            dy_mouse = p.y - pJS.interactivity.mouse.click_pos_y,
	            dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse),
	            time_spent = (new Date().getTime() - pJS.interactivity.mouse.click_time)/1000;

	        if(time_spent > pJS.interactivity.modes.bubble.duration){
	          pJS.tmp.bubble_duration_end = true;
	        }

	        if(time_spent > pJS.interactivity.modes.bubble.duration*2){
	          pJS.tmp.bubble_clicking = false;
	          pJS.tmp.bubble_duration_end = false;
	        }
	      }


	      function process(bubble_param, particles_param, p_obj_bubble, p_obj, id){

	        if(bubble_param != particles_param){

	          if(!pJS.tmp.bubble_duration_end){
	            if(dist_mouse <= pJS.interactivity.modes.bubble.distance){
	              if(p_obj_bubble != undefined) var obj = p_obj_bubble;
	              else var obj = p_obj;
	              if(obj != bubble_param){
	                var value = p_obj - (time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration);
	                if(id == 'size') p.radius_bubble = value;
	                if(id == 'opacity') p.opacity_bubble = value;
	              }
	            }else{
	              if(id == 'size') p.radius_bubble = undefined;
	              if(id == 'opacity') p.opacity_bubble = undefined;
	            }
	          }else{
	            if(p_obj_bubble != undefined){
	              var value_tmp = p_obj - (time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration),
	                  dif = bubble_param - value_tmp;
	                  value = bubble_param + dif;
	              if(id == 'size') p.radius_bubble = value;
	              if(id == 'opacity') p.opacity_bubble = value;
	            }
	          }

	        }

	      }

	      if(pJS.tmp.bubble_clicking){
	        /* size */
	        process(pJS.interactivity.modes.bubble.size, pJS.particles.size.value, p.radius_bubble, p.radius, 'size');
	        /* opacity */
	        process(pJS.interactivity.modes.bubble.opacity, pJS.particles.opacity.value, p.opacity_bubble, p.opacity, 'opacity');
	      }

	    }

	  };


	  pJS.fn.modes.repulseParticle = function(p){

	    if(pJS.interactivity.events.onhover.enable && isInArray('repulse', pJS.interactivity.events.onhover.mode) && pJS.interactivity.status == 'mousemove') {

	      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
	          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
	          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

	      var normVec = {x: dx_mouse/dist_mouse, y: dy_mouse/dist_mouse},
	          repulseRadius = pJS.interactivity.modes.repulse.distance,
	          velocity = 100,
	          repulseFactor = clamp((1/repulseRadius)*(-1*Math.pow(dist_mouse/repulseRadius,2)+1)*repulseRadius*velocity, 0, 50);
	      
	      var pos = {
	        x: p.x + normVec.x * repulseFactor,
	        y: p.y + normVec.y * repulseFactor
	      }

	      if(pJS.particles.move.out_mode == 'bounce'){
	        if(pos.x - p.radius > 0 && pos.x + p.radius < pJS.canvas.w) p.x = pos.x;
	        if(pos.y - p.radius > 0 && pos.y + p.radius < pJS.canvas.h) p.y = pos.y;
	      }else{
	        p.x = pos.x;
	        p.y = pos.y;
	      }
	    
	    }


	    else if(pJS.interactivity.events.onclick.enable && isInArray('repulse', pJS.interactivity.events.onclick.mode)) {

	      if(!pJS.tmp.repulse_finish){
	        pJS.tmp.repulse_count++;
	        if(pJS.tmp.repulse_count == pJS.particles.array.length){
	          pJS.tmp.repulse_finish = true;
	        }
	      }

	      if(pJS.tmp.repulse_clicking){

	        var repulseRadius = Math.pow(pJS.interactivity.modes.repulse.distance/6, 3);

	        var dx = pJS.interactivity.mouse.click_pos_x - p.x,
	            dy = pJS.interactivity.mouse.click_pos_y - p.y,
	            d = dx*dx + dy*dy;

	        var force = -repulseRadius / d * 1;

	        function process(){

	          var f = Math.atan2(dy,dx);
	          p.vx = force * Math.cos(f);
	          p.vy = force * Math.sin(f);

	          if(pJS.particles.move.out_mode == 'bounce'){
	            var pos = {
	              x: p.x + p.vx,
	              y: p.y + p.vy
	            }
	            if (pos.x + p.radius > pJS.canvas.w) p.vx = -p.vx;
	            else if (pos.x - p.radius < 0) p.vx = -p.vx;
	            if (pos.y + p.radius > pJS.canvas.h) p.vy = -p.vy;
	            else if (pos.y - p.radius < 0) p.vy = -p.vy;
	          }

	        }

	        // default
	        if(d <= repulseRadius){
	          process();
	        }

	        // bang - slow motion mode
	        // if(!pJS.tmp.repulse_finish){
	        //   if(d <= repulseRadius){
	        //     process();
	        //   }
	        // }else{
	        //   process();
	        // }
	        

	      }else{

	        if(pJS.tmp.repulse_clicking == false){

	          p.vx = p.vx_i;
	          p.vy = p.vy_i;
	        
	        }

	      }

	    }

	  }


	  pJS.fn.modes.grabParticle = function(p){

	    if(pJS.interactivity.events.onhover.enable && pJS.interactivity.status == 'mousemove'){

	      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
	          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
	          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

	      /* draw a line between the cursor and the particle if the distance between them is under the config distance */
	      if(dist_mouse <= pJS.interactivity.modes.grab.distance){

	        var opacity_line = pJS.interactivity.modes.grab.line_linked.opacity - (dist_mouse / (1/pJS.interactivity.modes.grab.line_linked.opacity)) / pJS.interactivity.modes.grab.distance;

	        if(opacity_line > 0){

	          /* style */
	          var color_line = pJS.particles.line_linked.color_rgb_line;
	          pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity_line+')';
	          pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
	          //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
	          
	          /* path */
	          pJS.canvas.ctx.beginPath();
	          pJS.canvas.ctx.moveTo(p.x, p.y);
	          pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y);
	          pJS.canvas.ctx.stroke();
	          pJS.canvas.ctx.closePath();

	        }

	      }

	    }

	  };



	  /* ---------- pJS functions - vendors ------------ */

	  pJS.fn.vendors.eventsListeners = function(){

	    /* events target element */
	    if(pJS.interactivity.detect_on == 'window'){
	      pJS.interactivity.el = window;
	    }else{
	      pJS.interactivity.el = pJS.canvas.el;
	    }


	    /* detect mouse pos - on hover / click event */
	    if(pJS.interactivity.events.onhover.enable || pJS.interactivity.events.onclick.enable){

	      /* el on mousemove */
	      pJS.interactivity.el.addEventListener('mousemove', function(e){

	        if(pJS.interactivity.el == window){
	          var pos_x = e.clientX,
	              pos_y = e.clientY;
	        }
	        else{
	          var pos_x = e.offsetX || e.clientX,
	              pos_y = e.offsetY || e.clientY;
	        }

	        pJS.interactivity.mouse.pos_x = pos_x;
	        pJS.interactivity.mouse.pos_y = pos_y;

	        if(pJS.tmp.retina){
	          pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
	          pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
	        }

	        pJS.interactivity.status = 'mousemove';

	      });

	      /* el on onmouseleave */
	      pJS.interactivity.el.addEventListener('mouseleave', function(e){

	        pJS.interactivity.mouse.pos_x = null;
	        pJS.interactivity.mouse.pos_y = null;
	        pJS.interactivity.status = 'mouseleave';

	      });

	    }

	    /* on click event */
	    if(pJS.interactivity.events.onclick.enable){

	      pJS.interactivity.el.addEventListener('click', function(){

	        pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
	        pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
	        pJS.interactivity.mouse.click_time = new Date().getTime();

	        if(pJS.interactivity.events.onclick.enable){

	          switch(pJS.interactivity.events.onclick.mode){

	            case 'push':
	              if(pJS.particles.move.enable){
	                pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
	              }else{
	                if(pJS.interactivity.modes.push.particles_nb == 1){
	                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
	                }
	                else if(pJS.interactivity.modes.push.particles_nb > 1){
	                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb);
	                }
	              }
	            break;

	            case 'remove':
	              pJS.fn.modes.removeParticles(pJS.interactivity.modes.remove.particles_nb);
	            break;

	            case 'bubble':
	              pJS.tmp.bubble_clicking = true;
	            break;

	            case 'repulse':
	              pJS.tmp.repulse_clicking = true;
	              pJS.tmp.repulse_count = 0;
	              pJS.tmp.repulse_finish = false;
	              setTimeout(function(){
	                pJS.tmp.repulse_clicking = false;
	              }, pJS.interactivity.modes.repulse.duration*1000)
	            break;

	          }

	        }

	      });
	        
	    }


	  };

	  pJS.fn.vendors.densityAutoParticles = function(){

	    if(pJS.particles.number.density.enable){

	      /* calc area */
	      var area = pJS.canvas.el.width * pJS.canvas.el.height / 1000;
	      if(pJS.tmp.retina){
	        area = area/(pJS.canvas.pxratio*2);
	      }

	      /* calc number of particles based on density area */
	      var nb_particles = area * pJS.particles.number.value / pJS.particles.number.density.value_area;

	      /* add or remove X particles */
	      var missing_particles = pJS.particles.array.length - nb_particles;
	      if(missing_particles < 0) pJS.fn.modes.pushParticles(Math.abs(missing_particles));
	      else pJS.fn.modes.removeParticles(missing_particles);

	    }

	  };


	  pJS.fn.vendors.checkOverlap = function(p1, position){
	    for(var i = 0; i < pJS.particles.array.length; i++){
	      var p2 = pJS.particles.array[i];

	      var dx = p1.x - p2.x,
	          dy = p1.y - p2.y,
	          dist = Math.sqrt(dx*dx + dy*dy);

	      if(dist <= p1.radius + p2.radius){
	        p1.x = position ? position.x : Math.random() * pJS.canvas.w;
	        p1.y = position ? position.y : Math.random() * pJS.canvas.h;
	        pJS.fn.vendors.checkOverlap(p1);
	      }
	    }
	  };


	  pJS.fn.vendors.createSvgImg = function(p){

	    /* set color to svg element */
	    var svgXml = pJS.tmp.source_svg,
	        rgbHex = /#([0-9A-F]{3,6})/gi,
	        coloredSvgXml = svgXml.replace(rgbHex, function (m, r, g, b) {
	          if(p.color.rgb){
	            var color_value = 'rgba('+p.color.rgb.r+','+p.color.rgb.g+','+p.color.rgb.b+','+p.opacity+')';
	          }else{
	            var color_value = 'hsla('+p.color.hsl.h+','+p.color.hsl.s+'%,'+p.color.hsl.l+'%,'+p.opacity+')';
	          }
	          return color_value;
	        });

	    /* prepare to create img with colored svg */
	    var svg = new Blob([coloredSvgXml], {type: 'image/svg+xml;charset=utf-8'}),
	        DOMURL = window.URL || window.webkitURL || window,
	        url = DOMURL.createObjectURL(svg);

	    /* create particle img obj */
	    var img = new Image();
	    img.addEventListener('load', function(){
	      p.img.obj = img;
	      p.img.loaded = true;
	      DOMURL.revokeObjectURL(url);
	      pJS.tmp.count_svg++;
	    });
	    img.src = url;

	  };


	  pJS.fn.vendors.destroypJS = function(){
	    cancelAnimationFrame(pJS.fn.drawAnimFrame);
	    canvas_el.remove();
	    pJSDom = null;
	  };


	  pJS.fn.vendors.drawShape = function(c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator){

	    // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
	    var sideCount = sideCountNumerator * sideCountDenominator;
	    var decimalSides = sideCountNumerator / sideCountDenominator;
	    var interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
	    var interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians
	    c.save();
	    c.beginPath();
	    c.translate(startX, startY);
	    c.moveTo(0,0);
	    for (var i = 0; i < sideCount; i++) {
	      c.lineTo(sideLength,0);
	      c.translate(sideLength,0);
	      c.rotate(interiorAngle);
	    }
	    //c.stroke();
	    c.fill();
	    c.restore();

	  };

	  pJS.fn.vendors.exportImg = function(){
	    window.open(pJS.canvas.el.toDataURL('image/png'), '_blank');
	  };


	  pJS.fn.vendors.loadImg = function(type){

	    pJS.tmp.img_error = undefined;

	    if(pJS.particles.shape.image.src != ''){

	      if(type == 'svg'){

	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', pJS.particles.shape.image.src);
	        xhr.onreadystatechange = function (data) {
	          if(xhr.readyState == 4){
	            if(xhr.status == 200){
	              pJS.tmp.source_svg = data.currentTarget.response;
	              pJS.fn.vendors.checkBeforeDraw();
	            }else{
	              console.log('Error pJS - Image not found');
	              pJS.tmp.img_error = true;
	            }
	          }
	        }
	        xhr.send();

	      }else{

	        var img = new Image();
	        img.addEventListener('load', function(){
	          pJS.tmp.img_obj = img;
	          pJS.fn.vendors.checkBeforeDraw();
	        });
	        img.src = pJS.particles.shape.image.src;

	      }

	    }else{
	      console.log('Error pJS - No image.src');
	      pJS.tmp.img_error = true;
	    }

	  };


	  pJS.fn.vendors.draw = function(){

	    if(pJS.particles.shape.type == 'image'){

	      if(pJS.tmp.img_type == 'svg'){

	        if(pJS.tmp.count_svg >= pJS.particles.number.value){
	          pJS.fn.particlesDraw();
	          if(!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
	          else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
	        }else{
	          //console.log('still loading...');
	          if(!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
	        }

	      }else{

	        if(pJS.tmp.img_obj != undefined){
	          pJS.fn.particlesDraw();
	          if(!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
	          else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
	        }else{
	          if(!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
	        }

	      }

	    }else{
	      pJS.fn.particlesDraw();
	      if(!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
	      else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
	    }

	  };


	  pJS.fn.vendors.checkBeforeDraw = function(){

	    // if shape is image
	    if(pJS.particles.shape.type == 'image'){

	      if(pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg == undefined){
	        pJS.tmp.checkAnimFrame = requestAnimFrame(check);
	      }else{
	        //console.log('images loaded! cancel check');
	        cancelRequestAnimFrame(pJS.tmp.checkAnimFrame);
	        if(!pJS.tmp.img_error){
	          pJS.fn.vendors.init();
	          pJS.fn.vendors.draw();
	        }
	        
	      }

	    }else{
	      pJS.fn.vendors.init();
	      pJS.fn.vendors.draw();
	    }

	  };


	  pJS.fn.vendors.init = function(){

	    /* init canvas + particles */
	    pJS.fn.retinaInit();
	    pJS.fn.canvasInit();
	    pJS.fn.canvasSize();
	    pJS.fn.canvasPaint();
	    pJS.fn.particlesCreate();
	    pJS.fn.vendors.densityAutoParticles();

	    /* particles.line_linked - convert hex colors to rgb */
	    pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color);

	  };


	  pJS.fn.vendors.start = function(){

	    if(isInArray('image', pJS.particles.shape.type)){
	      pJS.tmp.img_type = pJS.particles.shape.image.src.substr(pJS.particles.shape.image.src.length - 3);
	      pJS.fn.vendors.loadImg(pJS.tmp.img_type);
	    }else{
	      pJS.fn.vendors.checkBeforeDraw();
	    }

	  };




	  /* ---------- pJS - start ------------ */


	  pJS.fn.vendors.eventsListeners();

	  pJS.fn.vendors.start();
	  


	};

	/* ---------- global functions - vendors ------------ */

	Object.deepExtend = function(destination, source) {
	  for (var property in source) {
	    if (source[property] && source[property].constructor &&
	     source[property].constructor === Object) {
	      destination[property] = destination[property] || {};
	      arguments.callee(destination[property], source[property]);
	    } else {
	      destination[property] = source[property];
	    }
	  }
	  return destination;
	};

	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    window.mozRequestAnimationFrame    ||
	    window.oRequestAnimationFrame      ||
	    window.msRequestAnimationFrame     ||
	    function(callback){
	      window.setTimeout(callback, 1000 / 60);
	    };
	})();

	window.cancelRequestAnimFrame = ( function() {
	  return window.cancelAnimationFrame         ||
	    window.webkitCancelRequestAnimationFrame ||
	    window.mozCancelRequestAnimationFrame    ||
	    window.oCancelRequestAnimationFrame      ||
	    window.msCancelRequestAnimationFrame     ||
	    clearTimeout
	} )();

	function hexToRgb(hex){
	  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
	  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
	     return r + r + g + g + b + b;
	  });
	  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	  return result ? {
	      r: parseInt(result[1], 16),
	      g: parseInt(result[2], 16),
	      b: parseInt(result[3], 16)
	  } : null;
	};

	function clamp(number, min, max) {
	  return Math.min(Math.max(number, min), max);
	};

	function isInArray(value, array) {
	  return array.indexOf(value) > -1;
	}


	/* ---------- particles.js functions - start ------------ */

	window.pJSDom = [];

	window.particlesJS = function(tag_id, params){

	  //console.log(params);

	  /* no string id? so it's object params, and set the id with default id */
	  if(typeof(tag_id) != 'string'){
	    params = tag_id;
	    tag_id = 'particles-js';
	  }

	  /* no id? set the id to default id */
	  if(!tag_id){
	    tag_id = 'particles-js';
	  }

	  /* pJS elements */
	  var pJS_tag = document.getElementById(tag_id),
	      pJS_canvas_class = 'particles-js-canvas-el',
	      exist_canvas = pJS_tag.getElementsByClassName(pJS_canvas_class);

	  /* remove canvas if exists into the pJS target tag */
	  if(exist_canvas.length){
	    while(exist_canvas.length > 0){
	      pJS_tag.removeChild(exist_canvas[0]);
	    }
	  }

	  /* create canvas element */
	  var canvas_el = document.createElement('canvas');
	  canvas_el.className = pJS_canvas_class;

	  /* set size canvas */
	  canvas_el.style.width = "100%";
	  canvas_el.style.height = "100%";

	  /* append canvas */
	  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

	  /* launch particle.js */
	  if(canvas != null){
	    pJSDom.push(new pJS(tag_id, params));
	  }

	};

	window.particlesJS.load = function(tag_id, path_config_json, callback){

	  /* load json config */
	  var xhr = new XMLHttpRequest();
	  xhr.open('GET', path_config_json);
	  xhr.onreadystatechange = function (data) {
	    if(xhr.readyState == 4){
	      if(xhr.status == 200){
	        var params = JSON.parse(data.currentTarget.response);
	        window.particlesJS(tag_id, params);
	        if(callback) callback();
	      }else{
	        console.log('Error pJS - XMLHttpRequest status: '+xhr.status);
	        console.log('Error pJS - File config not found');
	      }
	    }
	  };
	  xhr.send();

	};

/***/ }
/******/ ]);