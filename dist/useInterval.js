import { useEffect, useRef } from 'react';
export var useInterval = function (callback, delay) {
    var savedCallback = useRef(callback);
    useEffect(function () {
        savedCallback.current = callback;
    }, [callback]);
    useEffect(function () {
        if (delay === null) {
            return;
        }
        var id = setInterval(function () { return savedCallback.current(); }, delay);
        return function () { return clearInterval(id); };
    }, [delay]);
};
