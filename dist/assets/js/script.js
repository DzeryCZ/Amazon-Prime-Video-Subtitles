(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("AmazonPrimeSubtitles", [], factory);
	else if(typeof exports === 'object')
		exports["AmazonPrimeSubtitles"] = factory();
	else
		root["AmazonPrimeSubtitles"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FileHandler_1 = __webpack_require__(1);
const SrtParserHandler_1 = __webpack_require__(2);
const PlaybackHandler_1 = __webpack_require__(4);
const View_1 = __webpack_require__(5);
const Utils_1 = __webpack_require__(7);
const RegisterHandlers_1 = __webpack_require__(8);
class AmazonPrimeSubtitles {
    onLoad(document) {
        const registerHandlers = new RegisterHandlers_1.RegisterHandlers(document);
        registerHandlers.registerHandler(FileHandler_1.FileHandler.EVENT_NAME, new FileHandler_1.FileHandler(document));
        registerHandlers.registerHandler(SrtParserHandler_1.SrtParserHandler.EVENT_NAME, new SrtParserHandler_1.SrtParserHandler(document));
        registerHandlers.registerHandler(PlaybackHandler_1.PlaybackHandler.EVENT_NAME, new PlaybackHandler_1.PlaybackHandler(document));
        const view = new View_1.View(document);
        view.display();
    }
}
const amazonPrimeSubtitles = new AmazonPrimeSubtitles();
Utils_1.Utils.onReady(amazonPrimeSubtitles.onLoad, document);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandler = void 0;
const SrtParserHandler_1 = __webpack_require__(2);
const EventWithData_1 = __webpack_require__(6);
class FileHandler {
    constructor(document) {
        this.document = document;
    }
    handle(event) {
        const file = event.data;
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            const dropFileEvent = new EventWithData_1.EventWithData(SrtParserHandler_1.SrtParserHandler.EVENT_NAME);
            dropFileEvent.data = event.target.result;
            this.document.dispatchEvent(dropFileEvent);
        });
        reader.readAsText(file, 'UTF-8');
    }
}
exports.FileHandler = FileHandler;
FileHandler.EVENT_NAME = 'amazonPrimeSubtitlesDropFile';


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SrtParserHandler = void 0;
const OneSubtitle_1 = __webpack_require__(3);
const PlaybackHandler_1 = __webpack_require__(4);
const EventWithData_1 = __webpack_require__(6);
class SrtParserHandler {
    constructor(document) {
        this.SECONDS_IN_HOUR = 3600;
        this.SECOND_IN_MINUTE = 60;
        this.SECOND_IN_SECOND = 1;
        this.document = document;
    }
    handle(event) {
        let subtitles = [];
        const content = this.noralizeLineEnds(event.data);
        const parts = content.split('\n\n');
        parts.forEach((element) => {
            const subtitle = this.parseOnePart(element);
            subtitles.push(subtitle);
        });
        this.dispatchPlayEvent(subtitles);
    }
    dispatchPlayEvent(subtitles) {
        const dropFileEvent = new EventWithData_1.EventWithData(PlaybackHandler_1.PlaybackHandler.EVENT_NAME);
        dropFileEvent.data = subtitles;
        this.document.dispatchEvent(dropFileEvent);
    }
    parseOnePart(element) {
        const elementArray = element.split('\n');
        if (elementArray.length < 2) {
            return new OneSubtitle_1.OneSubtitle();
        }
        const startTime = this.strip(elementArray[1].split(' --> ')[0]);
        const endTime = this.strip(elementArray[1].split(' --> ')[1]);
        const text = elementArray.slice(2).join('<br>');
        const subtitle = new OneSubtitle_1.OneSubtitle();
        subtitle.startTime = this.srtTimeToSeconds(startTime);
        subtitle.endTime = this.srtTimeToSeconds(endTime);
        subtitle.text = text;
        return subtitle;
    }
    strip(str) {
        return str.replace(/^\s+|\s+$/g, "");
    }
    noralizeLineEnds(str) {
        return str.replace(/\r\n|\r|\n/g, '\n');
    }
    srtTimeToSeconds(srtTime) {
        let seconds = 0;
        const parts = srtTime.split(':');
        seconds += this.multiplyTimeParts(parts[0], this.SECONDS_IN_HOUR);
        seconds += this.multiplyTimeParts(parts[1], this.SECOND_IN_MINUTE);
        seconds += this.multiplyTimeParts(parts[2], this.SECOND_IN_SECOND);
        return seconds;
    }
    multiplyTimeParts(srtTimePart, multiplyer) {
        return parseFloat(srtTimePart.replace(',', '.')) * multiplyer;
    }
}
exports.SrtParserHandler = SrtParserHandler;
SrtParserHandler.EVENT_NAME = 'amazonPrimeSubtitlesParseSrt';


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.OneSubtitle = void 0;
class OneSubtitle {
}
exports.OneSubtitle = OneSubtitle;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaybackHandler = void 0;
const View_1 = __webpack_require__(5);
class PlaybackHandler {
    constructor(document) {
        this.document = document;
    }
    handle(event) {
        const subtitles = event.data;
        const videoElement = this.document.getElementsByTagName('video')[0];
        const subtitlesContetnElement = this.document.getElementsByClassName(View_1.View.SUBTITLES_CONTENT_ELEMENT_CLASS)[0];
        this.showSubtitles(subtitles, videoElement, subtitlesContetnElement);
    }
    showSubtitles(subtitles, videoElement, subtitlesContetnElement) {
        setInterval(() => {
            const currentTime = videoElement.currentTime;
            const subtitleToShow = subtitles.find(subtitle => subtitle.startTime <= currentTime && subtitle.endTime >= currentTime);
            if (subtitleToShow) {
                subtitlesContetnElement.innerHTML = subtitleToShow.text;
            }
            else {
                subtitlesContetnElement.innerHTML = '';
            }
        }, PlaybackHandler.SHOW_INTERVAL);
    }
}
exports.PlaybackHandler = PlaybackHandler;
PlaybackHandler.EVENT_NAME = 'amazonPrimeSubtitlesPlaySubtitles';
PlaybackHandler.SHOW_INTERVAL = 200;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const FileHandler_1 = __webpack_require__(1);
const EventWithData_1 = __webpack_require__(6);
class View {
    constructor(document) {
        this.document = document;
    }
    display() {
        const amazonSubtitlesElement = this.createSubtitlesElement();
        const webPlayerElemet = this.document.getElementById(View.WEB_PLAYER_ELEMENT_ID);
        webPlayerElemet.appendChild(amazonSubtitlesElement);
    }
    createSubtitlesElement() {
        const dropFilesElement = this.createDropFilesElement();
        const subtitlesContentElement = this.createSubtitlesContentEleent();
        const amazonSubtitlesElement = this.document.createElement("div");
        amazonSubtitlesElement.className = 'amazon-subtitles';
        amazonSubtitlesElement.appendChild(dropFilesElement);
        amazonSubtitlesElement.appendChild(subtitlesContentElement);
        return amazonSubtitlesElement;
    }
    createDropFilesElement() {
        const dropFilesElement = this.document.createElement("div");
        dropFilesElement.className = 'amazon-subtitles-drop-files';
        dropFilesElement.innerHTML = 'Drag a *.srt File Here<br>';
        const dropFileInputElement = this.document.createElement("input");
        dropFileInputElement.className = 'amazon-subtitles-drop-file-input';
        dropFileInputElement.type = 'file';
        dropFileInputElement.addEventListener('change', (event) => {
            dropFilesElement.style.display = 'none';
            const dropFileEvent = new EventWithData_1.EventWithData(FileHandler_1.FileHandler.EVENT_NAME);
            dropFileEvent.data = event.target.files[0];
            this.document.dispatchEvent(dropFileEvent);
        });
        dropFilesElement.appendChild(dropFileInputElement);
        return dropFilesElement;
    }
    createSubtitlesContentEleent() {
        const subtitlesContentElement = this.document.createElement("div");
        subtitlesContentElement.className = View.SUBTITLES_CONTENT_ELEMENT_CLASS;
        return subtitlesContentElement;
    }
}
exports.View = View;
View.WEB_PLAYER_ELEMENT_ID = 'dv-web-player';
View.SUBTITLES_CONTENT_ELEMENT_CLASS = 'amazon-subtitles-content';


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventWithData = void 0;
class EventWithData extends Event {
}
exports.EventWithData = EventWithData;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    static onReady(fn, document) {
        if (/in/.test(document.readyState)) {
            setTimeout(function () {
                Utils.onReady(fn, document);
            }, 100);
        }
        else {
            fn(document);
        }
    }
}
exports.Utils = Utils;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterHandlers = void 0;
class RegisterHandlers {
    constructor(document) {
        this.document = document;
    }
    registerHandler(name, handler) {
        this.document.addEventListener(name, (event) => handler.handle(event));
    }
}
exports.RegisterHandlers = RegisterHandlers;


/***/ })
/******/ ]);
});