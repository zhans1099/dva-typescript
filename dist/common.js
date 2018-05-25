/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "../static/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_@lingshou_watermark@1.0.2@@lingshou/watermark/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/_@lingshou_watermark@1.0.2@@lingshou/watermark/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {
    var userStr = _getCookie('user') || '{}';
    var user = JSON.parse(userStr),
        userId = user.userName || 'xingbianli';

    // draw watermark
    var canvas = document.createElement('canvas');
    canvas.id = 'watermark';

    var ctx = canvas.getContext('2d');
    ctx.font = '16px Arial';

    var textWidth = ctx.measureText(userId).width;
    canvas.width = Math.sqrt(3) * textWidth + textWidth / 5;
    canvas.height = textWidth + 20;

    ctx.fillStyle = 'rgba(12, 12, 12, 0.1)';
    ctx.font = '16px Arial';  // fix canvas resize issue
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.PI / 6);
    ctx.fillText(userId, 0, 0);

    var dataImg = canvas.toDataURL('image/png');

    // add watermark mask
    var mask = document.createElement('div');
    mask.classList.add('__watermark__');
    mask.style.position = 'fixed';
    mask.style.left = '0';
    mask.style.right = '0';
    mask.style.top = '0';
    mask.style.bottom = '0';
    mask.style.pointerEvents = 'none';
    mask.style.zIndex = '9999999';
    mask.style.background = 'url(' + dataImg + ')';

    var body = document.getElementsByTagName('body')[0];
    // body.style.userSelect = 'none';
    body.appendChild(mask);

    // get cookie
    function _getCookie(key) {
        var reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
        var arr = document.cookie.match(reg);

        if (arr) {
            return decodeURIComponent(arr[2]);
        }

        return null;
    }
}));

/***/ }),

/***/ 0:
/*!*********************************!*\
  !*** multi @lingshou/watermark ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! @lingshou/watermark */"./node_modules/_@lingshou_watermark@1.0.2@@lingshou/watermark/index.js");


/***/ })

/******/ });
//# sourceMappingURL=common.js.map