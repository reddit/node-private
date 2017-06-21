(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("superagent"), require("url"));
	else if(typeof define === 'function' && define.amd)
		define(["superagent", "url"], factory);
	else if(typeof exports === 'object')
		exports["index.js"] = factory(require("superagent"), require("url"));
	else
		root["index.js"] = factory(root["superagent"], root["url"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_superagent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_url__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Base64__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Base64___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_Base64__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





var SCOPES = 'history,identity,mysubreddits,read,subscribe,vote,submit,' + 'save,edit,account,creddits,flair,livemanage,modconfig,' + 'modcontributors,modflair,modlog,modmail,modothers,modposts,modself,' + 'modwiki,privatemessages,report,wikiedit,wikiread';

var login = function login(apiOptions, username, pass, otp, orderedHeaders, clientUserAgent) {
  return new Promise(function (resolve, reject) {
    if (!apiOptions.oauthAppOrigin) {
      reject('Please set up a Reddit Oauth App, and pass in its URL as oauthAppOrigin to config.');
    }

    if (!apiOptions.clientId) {
      reject('Please set up a Reddit Oauth App, and pass in its id as clientId to config.');
    }

    if (!apiOptions.clientSecret) {
      reject('Please set up a Reddit Oauth App, and pass in its secret as clientSecret to config.');
    }

    var headers = _extends({}, apiOptions.headers, {
      'User-Agent': clientUserAgent + ' - ' + apiOptions.userAgent,
      'X-Reddit-Debug': orderedHeaders.join(';')
    });

    __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.post(apiOptions.origin + '/api/login/' + username).type('form').set(headers).send({ user: username, passwd: pass, otp: otp, api_type: 'json' }).end(function (err, res) {
      if (err || !res.ok) {
        return reject(err || res);
      }

      var details = parseDetails(res);
      if (details === 'TWO_FA_REQUIRED'){
        resolve(details);
      }

      var errors = parseErrors(res);
      if (errors.length) {
        if (Array.isArray(errors[0]) && !!errors[0][0]) {
          var firstError = errors[0][0];
          return reject(firstError);
        }
        return reject('UNKNOWN_ERROR');
      }

      var cookies = parseCookies(res);
      var redditSessionExists = sessionExists(res);
      if (redditSessionExists) {
        return convertCookiesToAuthToken(apiOptions, cookies, orderedHeaders, clientUserAgent).then(resolve, reject);
      }

      reject('Invalid login information.');
    });
  });
};

var register = function register(apiOptions, username, password, email, newsletter, gRecaptchaResponse, orderedHeaders, clientUserAgent) {

  return new Promise(function (resolve, reject) {
    if (!apiOptions.oauthAppOrigin) {
      reject('Please set up a Reddit Oauth App, and pass in its URL as oauthAppOrigin to config.');
    }

    if (!apiOptions.clientId) {
      reject('Please set up a Reddit Oauth App, and pass in its id as clientId to config.');
    }

    if (!apiOptions.clientSecret) {
      reject('Please set up a Reddit Oauth App, and pass in its secret as clientSecret to config.');
    }

    var data = {
      user: username,
      passwd: password,
      passwd2: password,
      'g-recaptcha-response': gRecaptchaResponse,
      api_type: 'json'
    };

    if (email) {
      data.email = email;
    }

    if (newsletter) {
      data.newsletter_subscribe = true;

      if (!email) {
        reject('NEWSLETTER_NO_EMAIL');
      }
    }

    var endpoint = apiOptions.origin + '/api/register';
    var s = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_Base64__["btoa"])(apiOptions.clientId + ':' + apiOptions.clientSecret);
    var basicAuth = 'Basic ' + s;
    var headers = _extends({}, apiOptions.headers, {
      'User-Agent': clientUserAgent + ' - ' + apiOptions.userAgent,
      'Authorization': basicAuth,
      'X-Reddit-Debug': orderedHeaders.join(';')
    });

    __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.post(endpoint).set(headers).type('form').send(data).timeout(10000).end(function (err, res) {
      var obj = {};
      if (err || !res.ok) {
        obj.status = err.timeout ? 504 : res.status || 500;
        obj.errorType = obj.status;
      }

      var errors = parseErrors(res);
      if (errors.length) {
        if (Array.isArray(errors[0]) && !!errors[0][0]) {
          var firstError = errors[0][0];
          return reject(firstError);
        }
        return reject('UNKNOWN_ERROR');
      }

      var cookies = parseCookies(res);
      var redditSessionExists = sessionExists(res);
      if (redditSessionExists) {
        return convertCookiesToAuthToken(apiOptions, cookies, orderedHeaders, clientUserAgent).then(resolve, reject);
      }
      reject('UNKNOWN_ERROR');
    });
  });
};

// Parses the error message for login and register functions
var parseErrors = function parseErrors(res) {
  if (res.body.json && res.body.json.errors) {
    return res.body.json.errors;
  }
  return [];
};

// Parses the details for login function
var parseDetails = function parseDetails(res) {
  if (res.body.json && res.body.json.data) {
    return res.body.json.data.details;
  }
};

// Parses the cookies for the login and register functions
var parseCookies = function parseCookies(res) {
  return (res.header['set-cookie'] || []).map(function (c) {
    return c.split(';')[0];
  });
};

// Parses set-cookie header to see if the session exists
var sessionExists = function sessionExists(res) {
  return res.header['set-cookie'].join('').indexOf('reddit_session') > -1;
};

var refreshToken = function refreshToken(apiOptions, _refreshToken, orderedHeaders, clientUserAgent) {
  return new Promise(function (resolve, reject) {
    var endpoint = apiOptions.origin + '/api/v1/access_token';
    var s = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_Base64__["btoa"])(apiOptions.clientId + ':' + apiOptions.clientSecret);

    var basicAuth = 'Basic ' + s;

    var data = {
      grant_type: 'refresh_token',
      refresh_token: _refreshToken
    };

    var headers = _extends({}, apiOptions.headers, {
      'Authorization': basicAuth,
      'User-Agent': clientUserAgent + ' - ' + apiOptions.userAgent,
      'X-Reddit-Debug': orderedHeaders.join(';')
    });

    __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.post(endpoint).set(headers).type('form').send(data).end(function (err, res) {
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
};

var convertCookiesToAuthToken = function convertCookiesToAuthToken(apiOptions, cookies, orderedHeaders, clientUserAgent) {
  return new Promise(function (resolve, reject) {
    if (!cookies) {
      reject('No cookies passed in');
    }

    var endpoint = apiOptions.origin + '/api/me.json';

    var headers = _extends({}, apiOptions.headers, {
      'User-Agent': clientUserAgent + ' - ' + apiOptions.userAgent,
      'X-Reddit-Debug': orderedHeaders.join(';'),
      cookie: cookies.join('; ')
    });

    __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.get(endpoint).set(headers).end(function (err, res) {
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
      var endpoint = apiOptions.origin + '/api/v1/authorize';

      var redirect_uri = apiOptions.oauthAppOrigin + '/oauth2/token';

      var clientId = apiOptions.clientId;
      var clientSecret = apiOptions.clientSecret;

      var additionalScopes = apiOptions.additionalScopes ? ',' + apiOptions.additionalScopes : '';
      var scope = SCOPES + additionalScopes;

      var postParams = {
        client_id: clientId,
        redirect_uri: redirect_uri,
        scope: scope,
        state: modhash,
        duration: 'permanent',
        authorize: 'yes'
      };

      var modhashedHeaders = _extends({}, headers, { 'x-modhash': modhash });

      __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.post(endpoint).set(modhashedHeaders).type('form').send(postParams).redirects(0).end(function (err, res) {
        if (res.status !== 302) {
          return resolve(res.status || 500);
        }

        if (res.body.error) {
          return resolve(401);
        }

        var location = __WEBPACK_IMPORTED_MODULE_1_url___default.a.parse(res.headers.location, true);
        var code = location.query.code;

        var endpoint = apiOptions.origin + '/api/v1/access_token';

        var postData = {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirect_uri
        };

        var s = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_Base64__["btoa"])(clientId + ':' + clientSecret);

        var basicAuth = 'Basic ' + s;

        var headers = _extends({
          'User-Agent': apiOptions.userAgent,
          'Authorization': basicAuth
        }, apiOptions.defaultHeaders);

        __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.post(endpoint).set(headers).send(postData).type('form').end(function (err, res) {
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
};

/* harmony default export */ exports["a"] = {
  login: login,
  register: register,
  refreshToken: refreshToken,
  convertCookiesToAuthToken: convertCookiesToAuthToken
};

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
/***/ function(module, exports) {

module.exports = require("superagent");

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("url");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_es6_js__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "PrivateAPI", function() { return PrivateAPI; });


var PrivateAPI = __WEBPACK_IMPORTED_MODULE_0__api_es6_js__["a" /* default */];

/***/ }
/******/ ])
});
;