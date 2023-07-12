"use strict";

exports.__esModule = true;
exports.default = invokeEach;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function invokeEach(_x) {
  return _invokeEach.apply(this, arguments);
}
function _invokeEach() {
  _invokeEach = _asyncToGenerator(function* (fns) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return yield Promise.all(fns.map( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (fn) {
        return yield fn(...args);
      });
      return function (_x2) {
        return _ref.apply(this, arguments);
      };
    }()));
  });
  return _invokeEach.apply(this, arguments);
}