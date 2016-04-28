(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("superagent"), require("url"));
	else if(typeof define === 'function' && define.amd)
		define(["superagent", "url"], factory);
	else if(typeof exports === 'object')
		exports["index.js"] = factory(require("superagent"), require("url"));
	else
		root["index.js"] = factory(root["superagent"], root["url"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent___default = __WEBPACK_IMPORTED_MODULE_0_superagent__ && __WEBPACK_IMPORTED_MODULE_0_superagent__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_superagent__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_superagent__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_superagent___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_superagent___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_url__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_url___default = __WEBPACK_IMPORTED_MODULE_1_url__ && __WEBPACK_IMPORTED_MODULE_1_url__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_url__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_url__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_url___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_url___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Base64__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Base64___default = __WEBPACK_IMPORTED_MODULE_2_Base64__ && __WEBPACK_IMPORTED_MODULE_2_Base64__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_Base64__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_Base64__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2_Base64___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2_Base64___default });

	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return _default; }});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





	var SCOPES = 'history,identity,mysubreddits,read,subscribe,vote,submit,' + 'save,edit,account,creddits,flair,livemanage,modconfig,' + 'modcontributors,modflair,modlog,modothers,modposts,modself,' + 'modwiki,privatemessages,report,wikiedit,wikiread';

	function _default(API) {
	  return function (_API) {
	    _inherits(PrivateAPI, _API);

	    function PrivateAPI() {
	      _classCallCheck(this, PrivateAPI);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(PrivateAPI).apply(this, arguments));
	    }

	    _createClass(PrivateAPI, [{
	      key: 'login',
	      value: function login(username, pass) {
	        var _this2 = this;

	        return new Promise(function (r, x) {
	          if (!_this2.config.oauthAppOrigin) {
	            x('Please set up a Reddit Oauth App, and pass in its URL as oauthAppOrigin to config.');
	          }

	          if (!_this2.config.clientId) {
	            x('Please set up a Reddit Oauth App, and pass in its id as clientId to config.');
	          }

	          if (!_this2.config.clientSecret) {
	            x('Please set up a Reddit Oauth App, and pass in its secret as clientSecret to config.');
	          }

	          /* harmony import */__WEBPACK_IMPORTED_MODULE_0_superagent___default.a.post(_this2.config.origin + '/api/login/' + username).type('form').send({ user: username, passwd: pass, api_type: 'json' }).end(function (err, res) {
	            if (err || !res.ok) {
	              return x(err || res);
	            }

	            var cookies = (res.header['set-cookie'] || []).map(function (c) {
	              return c.split(';')[0];
	            });

	            if (res.header['set-cookie'].join('').indexOf('reddit_session')) {
	              return _this2.convertCookiesToAuthToken(cookies).then(r, x);
	            }

	            x('Invalid login information.');
	          });
	        });
	      }
	    }, {
	      key: 'refreshToken',
	      value: function refreshToken(_refreshToken) {
	        var _this3 = this;

	        return new Promise(function (resolve, reject) {
	          var endpoint = _this3.config.origin + '/api/v1/access_token';
	          var s = /* harmony import */__WEBPACK_IMPORTED_MODULE_2_Base64__["btoa"].bind()(_this3.config.clientId + ':' + _this3.config.clientSecret);

	          var basicAuth = 'Basic ' + s;

	          var data = {
	            grant_type: 'refresh_token',
	            refresh_token: _refreshToken
	          };

	          var headers = _extends({
	            'User-Agent': _this3.config.userAgent,
	            'Authorization': basicAuth
	          }, _this3.config.defaultHeaders);

	          /* harmony import */__WEBPACK_IMPORTED_MODULE_0_superagent___default.a.post(endpoint).set(headers).type('form').send(data).end(function (err, res) {
	            if (err || !res.ok) {
	              if (err.timeout) {
	                err.status = 504;
	              }
	              return reject(err || res);
	            }

	            /* temporary while api returns a `200` with an error in body */
	            if (res.body.error) {
	              return reject(401);
	            }

	            return resolve(res.body);
	          });
	        });
	      }
	    }, {
	      key: 'convertCookiesToAuthToken',
	      value: function convertCookiesToAuthToken(cookies) {
	        var _this4 = this;

	        return new Promise(function (resolve, reject) {
	          if (!cookies) {
	            reject('No cookies passed in');
	          }

	          var endpoint = _this4.config.origin + '/api/me.json';

	          var headers = _extends({
	            'User-Agent': _this4.config.userAgent,
	            cookie: cookies.join('; ')
	          }, _this4.config.defaultHeaders);

	          /* harmony import */__WEBPACK_IMPORTED_MODULE_0_superagent___default.a.get(endpoint).set(headers).end(function (err, res) {
	            if (err || !res.ok) {
	              if (err.timeout) {
	                err.status = 504;
	              }
	              return reject(err || res);
	            }

	            if (res.body.error || !res.body.data) {
	              return reject(401);
	            }

	            var modhash = res.body.data.modhash;
	            var endpoint = _this4.config.origin + '/api/v1/authorize';

	            var redirect_uri = _this4.config.oauthAppOrigin + '/oauth2/token';

	            var clientId = _this4.config.clientId;
	            var clientSecret = _this4.config.clientSecret;

	            var postParams = {
	              client_id: clientId,
	              redirect_uri: redirect_uri,
	              scope: SCOPES,
	              state: modhash,
	              duration: 'permanent',
	              authorize: 'yes'
	            };

	            headers['x-modhash'] = modhash;

	            /* harmony import */__WEBPACK_IMPORTED_MODULE_0_superagent___default.a.post(endpoint).set(headers).type('form').send(postParams).redirects(0).end(function (err, res) {
	              if (res.status !== 302) {
	                return resolve(res.status || 500);
	              }

	              if (res.body.error) {
	                return resolve(401);
	              }

	              var location = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_url___default.a.parse(res.headers.location, true);
	              var code = location.query.code;

	              var endpoint = _this4.config.origin + '/api/v1/access_token';

	              var postData = {
	                grant_type: 'authorization_code',
	                code: code,
	                redirect_uri: redirect_uri
	              };

	              var s = /* harmony import */__WEBPACK_IMPORTED_MODULE_2_Base64__["btoa"].bind()(clientId + ':' + clientSecret);

	              var basicAuth = 'Basic ' + s;

	              var headers = _extends({
	                'User-Agent': _this4.config.userAgent,
	                'Authorization': basicAuth
	              }, _this4.config.defaultHeaders);

	              /* harmony import */__WEBPACK_IMPORTED_MODULE_0_superagent___default.a.post(endpoint).set(headers).send(postData).type('form').end(function (err, res) {
	                if (err || !res.ok) {
	                  if (err.timeout) {
	                    err.status = 504;
	                  }
	                  reject(err);
	                }

	                return resolve(res.body);
	              });
	            });
	          });
	        });
	      }
	    }]);

	    return PrivateAPI;
	  }(API);
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	;(function () {

	  var object =  true ? exports : this; // #8: web workers
	  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	  function InvalidCharacterError(message) {
	    this.message = message;
	  }
	  InvalidCharacterError.prototype = new Error;
	  InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	  // encoder
	  // [https://gist.github.com/999166] by [https://github.com/nignag]
	  object.btoa || (
	  object.btoa = function (input) {
	    var str = String(input);
	    for (
	      // initialize result and counter
	      var block, charCode, idx = 0, map = chars, output = '';
	      // if the next str index does not exist:
	      //   change the mapping table to "="
	      //   check if d has no fractional digits
	      str.charAt(idx | 0) || (map = '=', idx % 1);
	      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	    ) {
	      charCode = str.charCodeAt(idx += 3/4);
	      if (charCode > 0xFF) {
	        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
	      }
	      block = block << 8 | charCode;
	    }
	    return output;
	  });

	  // decoder
	  // [https://gist.github.com/1020396] by [https://github.com/atk]
	  object.atob || (
	  object.atob = function (input) {
	    var str = String(input).replace(/=+$/, '');
	    if (str.length % 4 == 1) {
	      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
	    }
	    for (
	      // initialize result and counters
	      var bc = 0, bs, buffer, idx = 0, output = '';
	      // get next character
	      buffer = str.charAt(idx++);
	      // character found in table? initialize bit storage and add its ascii value;
	      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
	        // and if not first of each 4 characters,
	        // convert the first 8 bits to one ascii character
	        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
	    ) {
	      // try to find character in table (0-63, not found => -1)
	      buffer = chars.indexOf(buffer);
	    }
	    return output;
	  });

	}());


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_es6_js__ = __webpack_require__(0);


	var privateAPI = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__api_es6_js__["a"];
	/* harmony export */ Object.defineProperty(exports, "privateAPI", {configurable: false, enumerable: true, get: function() { return privateAPI; }});

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("superagent");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ }
/******/ ])
});
;