"use strict";

exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.promise.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
class TaskScheduler {
  constructor() {
    this.queue = [];
    this.runningPromise = null;
  }
  enqueue(task) {
    var _this = this;
    return _asyncToGenerator(function* () {
      var retvalPromise = new Promise((resolve, reject) => {
        _this.queue.push( /*#__PURE__*/_asyncToGenerator(function* () {
          try {
            resolve(yield task());
          } catch (e) {
            reject(e);
          }
        }));
      });
      if (!_this.runningPromise) yield _this.runAll();
      return yield retvalPromise;
    })();
  }
  runAll() {
    var _this2 = this;
    return _asyncToGenerator(function* () {
      if (_this2.runningPromise) {
        yield _this2.runningPromise;
        return;
      }
      var finished;
      _this2.runningPromise = new Promise(resolve => {
        finished = resolve;
      });
      try {
        while (_this2.queue.length > 0) {
          var nextTask = _this2.queue.shift();
          // eslint-disable-next-line no-await-in-loop
          yield nextTask();
        }
      } finally {
        // Clean up
        if (_this2.queue.length > 0) {
          _this2.queue = [];
        }
        finished();
        _this2.runningPromise = null;
      }
    })();
  }
}
exports.default = TaskScheduler;