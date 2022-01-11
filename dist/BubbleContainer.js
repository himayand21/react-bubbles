var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState, } from 'react';
import { useInterval } from './useInterval';
import { bubble } from './bubble';
import './styles/bubble.css';
var defaultWrapperClasses = [
    'bubble-1',
    'bubble-2',
    'bubble-3',
    'bubble-4',
    'bubble-5',
];
var getRemainderOnDividingByFive = function (number) { return (parseInt(number, 10) % 5); };
var getObjectFromNumber = function (number, value) {
    var _a;
    var object = {};
    for (var iterator = 0; iterator < number; iterator += 1) {
        object = __assign(__assign({}, object), (_a = {}, _a[iterator] = value, _a));
    }
    return object;
};
var Bubble = function (_a) {
    var wrapperClass = _a.wrapperClass, label = _a.label, getLabel = _a.getLabel;
    return (_jsx("div", __assign({ className: "bubble-column " + (label ? wrapperClass : 'hidden') }, { children: _jsx("div", __assign({ className: "bubble-container" }, { children: _jsx("div", __assign({ className: "bubble" }, { children: (getLabel === null || getLabel === void 0 ? void 0 : getLabel(label !== null && label !== void 0 ? label : '')) || label }), void 0) }), void 0) }), void 0));
};
export var BubbleContainer = function (_a) {
    var _b = _a.columns, columns = _b === void 0 ? 5 : _b, _c = _a.rows, rows = _c === void 0 ? 5 : _c, _d = _a.wrapperClasses, wrapperClasses = _d === void 0 ? defaultWrapperClasses : _d, getLabel = _a.getLabel;
    var _e = useState([]), bubbleContent = _e[0], setBubbleContent = _e[1];
    var _f = useState({}), busyColumns = _f[0], setBusyColumns = _f[1];
    var _g = useState({}), bubbles = _g[0], setBubbles = _g[1];
    var bubbleTimeoutRef = useRef(null);
    var busyTimeoutRef = useRef(null);
    var addBubbleContent = function (content) {
        setBubbleContent(function (prevBubbleContent) { return __spreadArray([
            content
        ], prevBubbleContent); });
    };
    var clearBubbles = function () {
        setBubbleContent([]);
        setBubbles({});
        setBusyColumns({});
    };
    useEffect(function () {
        bubble.add = addBubbleContent;
        bubble.clearAll = clearBubbles;
        setBusyColumns(getObjectFromNumber(columns, false));
        setBubbles(getObjectFromNumber((columns * rows), null));
        return (function () {
            if (bubbleTimeoutRef.current) {
                clearTimeout(bubbleTimeoutRef.current);
            }
            if (busyTimeoutRef.current) {
                clearTimeout(busyTimeoutRef.current);
            }
            clearBubbles();
        });
    }, []);
    var getRandomFromOneToFive = function () {
        var emptyKeys = Object.keys(bubbles).filter(function (key) {
            var isColumnFree = busyColumns[getRemainderOnDividingByFive(key)] === false;
            var isCellFree = bubbles[key] === null;
            return isCellFree && isColumnFree;
        });
        var emptyKeysLength = emptyKeys.length;
        if (!emptyKeysLength)
            return null;
        if (emptyKeysLength === 1)
            return emptyKeys[0];
        var randomIndex = Math.floor(Math.random() * (emptyKeysLength - 1)) + 1;
        return emptyKeys[randomIndex];
    };
    useInterval(function () {
        var firstBubbleContent = bubbleContent[0], otherBubbles = bubbleContent.slice(1);
        if (firstBubbleContent) {
            var bubbleKey_1 = getRandomFromOneToFive();
            if (bubbleKey_1 !== null) {
                var column_1 = getRemainderOnDividingByFive(bubbleKey_1);
                setBubbles(function (prevBubbles) {
                    var _a;
                    return (__assign(__assign({}, prevBubbles), (_a = {}, _a[bubbleKey_1] = firstBubbleContent, _a)));
                });
                setBusyColumns(function (prevBusyColumns) {
                    var _a;
                    return (__assign(__assign({}, prevBusyColumns), (_a = {}, _a[column_1] = true, _a)));
                });
                setBubbleContent(otherBubbles);
                bubbleTimeoutRef.current = setTimeout(function () {
                    setBubbles(function (prevBubbles) {
                        var _a;
                        return (__assign(__assign({}, prevBubbles), (_a = {}, _a[bubbleKey_1] = null, _a)));
                    });
                }, 2000);
                busyTimeoutRef.current = setTimeout(function () {
                    setBusyColumns(function (prevBusyColumns) {
                        var _a;
                        return (__assign(__assign({}, prevBusyColumns), (_a = {}, _a[column_1] = false, _a)));
                    });
                }, (2000 / (rows * columns)));
            }
        }
    }, (2000 / (rows * columns)));
    return (_jsx(_Fragment, { children: Object.entries(bubbles).map(function (_a) {
            var key = _a[0], content = _a[1];
            var column = getRemainderOnDividingByFive(key);
            return (_jsx(Bubble, { wrapperClass: wrapperClasses[column], label: content, getLabel: getLabel }, void 0));
        }) }, void 0));
};
