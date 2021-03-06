"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageBlob = exports.scrapeImages = void 0;
var cheerio = require("cheerio");
var streamToString = require("stream-to-string");
exports.scrapeImages = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var fetch, body, data, $, imagesElements, images, i, imgSrc, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fetch = require('node-fetch');
                if (url.indexOf('http') !== 0)
                    url = 'http://' + url;
                if (!checkValidUrl(url))
                    return [2 /*return*/, []];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(url)];
            case 2:
                body = (_a.sent()).body;
                return [4 /*yield*/, streamToString(body)];
            case 3:
                data = _a.sent();
                $ = cheerio.load(data);
                imagesElements = $('img');
                images = [];
                if (imagesElements && imagesElements.length > 0) {
                    // tslint:disable-next-line:prefer-for-of
                    for (i = 0; i < imagesElements.length; i++) {
                        imgSrc = $(imagesElements[i]).attr('src');
                        if (imgSrc && checkValidUrl(imgSrc)) {
                            images.push(imgSrc);
                        }
                        else {
                            imgSrc = $(imagesElements[i]).attr('data-lazy-src');
                            if (imgSrc && checkValidUrl(imgSrc)) {
                                images.push(imgSrc);
                            }
                        }
                    }
                }
                return [2 /*return*/, images];
            case 4:
                e_1 = _a.sent();
                throw e_1;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getImageBlob = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var fetch;
    return __generator(this, function (_a) {
        fetch = require('node-fetch');
        if (url.indexOf('http') !== 0)
            url = 'http://' + url;
        if (!checkValidUrl(url))
            throw new Error('Image URL is not valid');
        try {
            return [2 /*return*/, fetch(url)
                    .then(function (data) {
                    return data.blob();
                })
                    .then(function (blob) {
                    return blob;
                })];
        }
        catch (e) {
            throw e;
        }
        return [2 /*return*/];
    });
}); };
var checkValidUrl = function (str) {
    var urlRegex = '^(?:(?:http|https)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    var url = new RegExp(urlRegex, 'i');
    return str !== undefined && str.length < 2083 && url.test(str);
};
