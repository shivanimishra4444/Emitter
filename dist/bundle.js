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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_emitter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_emitter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_emitter__);
// Note: An example of using the Emitter module


// Subscribe to the event name "emitter.example"
__WEBPACK_IMPORTED_MODULE_0__src_emitter__["on"]('emitter.example', (...args) => {
    console.log('The event was triggered with the following argument::', args); // eslint-disable-line no-console
});

// Trigger the event name "emitter.example" with multiple arguments
__WEBPACK_IMPORTED_MODULE_0__src_emitter__["trigger"]('emitter.example', 'trigger.argument.A', 'trigger.argument.B', 'trigger.argument.C');

// Remove all subscriptions for the event name "emitter.example"
__WEBPACK_IMPORTED_MODULE_0__src_emitter__["off"]('emitter.example');

// The subscribed function is not triggered due to being removed
__WEBPACK_IMPORTED_MODULE_0__src_emitter__["trigger"]('emitter.example', 'trigger.argument.D');


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.off = off;
exports.on = on;
exports.once = once;
exports.trigger = trigger;
var emitter = new Emitter();
var validation = new Validation();

function off() {

	return emitter.off.apply(emitter, arguments);
}

function on() {

	return emitter.on.apply(emitter, arguments);
}

function once() {

	return emitter.once.apply(emitter, arguments);
}

function trigger() {

	return emitter.trigger.apply(emitter, arguments);
}

/*
eventList={
	event_name_one:[fn1,fn2..]
	event_name_two:[fn1,fn2..]..
}

*/
function Emitter() {}

function Validation() {}

Emitter.prototype.on = function (event, fn) {
	validation.stringData(event, 'Event Name is not valid.It must be string');
	validation.functionData(arguments.length, fn, 'Function  is not valid.It must be Function data type');
	this.eventList = this.eventList || {};
	/* difference between  this.eventList.event and this._events['$' + event] is https://www.w3schools.com/js/js_properties.asp */
	(this.eventList[event] = this.eventList[event] || []).push(fn);
	return (this.eventList[event] || []).length;
};

Emitter.prototype.off = function (event, fn) {
	validation.stringData(event, 'Event Name is not valid.It must be string');
	validation.functionData(arguments.length, fn, 'Function  is not valid.It must be Function data type');

	this.eventList = this.eventList || {};
	var eventName = this.eventList[event] || [];

	/*if (arguments.length==0) {
     this.eventList = {};
     return (eventName ||[]).length;
 }*/
	if (fn === undefined) {
		eventName.length = 0;
		return (eventName || []).length;
	}

	for (var i = 0; i < eventName.length;) {
		//eventName[i]-- it is for function(event,fn) Emitter.off(EVENT_NAME_ONE, spyFunction);
		// but eventName[i].fn is when we call function(event) without any fn Emitter.off(EVENT_NAME_ONE)
		if (eventName[i] === fn || eventName[i].fn === fn) {
			/*if 1 function then remove that function so eventName.splice(1,1)--1-1=0*/
			eventName.splice(i, 1);
		}
		i++;
	}

	return (eventName || []).length;
};

Emitter.prototype.trigger = function (event) {
	var _this = this;

	validation.stringData(event, 'Event Name is not valid.It must be string');
	this.eventList = this.eventList || {};
	/* []= Array.prototype- it will convert arguments into an array except first argument*/
	var args = [].slice.call(arguments, 1); // array of arguments except first one because in args we don't want event as passed as argument
	var eventName = this.eventList[event];

	if (eventName) {
		eventName = eventName.slice(0);
		eventName.forEach(function (event) {
			event.apply(_this, args);
		});
		return true;
	}

	return false;
};

/*
First, add an event by calling on(event, fn name), then when triggered that event then remove that event with function and then trigger it.
*/

Emitter.prototype.once = function (event, fn) {
	validation.stringData(event, 'Event Name is not valid.It must be string');
	validation.functionData(arguments.length, fn, 'Function  is not valid.It must be Function data type');
	this.eventList = this.eventList || {};
	/*
 this.on(event,fn);
 fn.apply(this,arguments);
 this.off(event,fn);*/
	function onOnce() {

		this.off(event, onOnce);

		fn.apply(this, arguments);
	}
	onOnce.fn = fn; /* we have to change onOnce to a fn function otherwise when we call it in below order for given test case then it will not off a function
                 it('should unsubscribe an event name and an optional function if not triggered', () => 
                 Emitter.once(EVENT_NAME_THREE, spyFunction3);Emitter.off(EVENT_NAME_THREE, spyFunction3);Emitter.trigger(EVENT_NAME_THREE); {*/

	this.on(event, onOnce);
	return (this.eventList[event] || []).length;
};

Validation.prototype.stringData = function (dataType, errorMessage) {
	// errorMessage= "Event Name is not valid. It must be string";
	if (typeof dataType !== "string") {
		throw Error("IllegalArgumentException:" + errorMessage);
	}
};

Validation.prototype.functionData = function (argumentsCount, dataType, errorMessage) {
	// errorMessage= "Function  is not valid. It must be Function data type"
	if (argumentsCount == 2 && typeof dataType !== "function") {
		throw Error("IllegalArgumentException:" + errorMessage);
	}
};

/***/ })
/******/ ]);