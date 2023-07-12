"use strict";

exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.promise.js");
var _StateMachine = _interopRequireDefault(require("./StateMachine"));
var _TaskScheduler = _interopRequireDefault(require("./TaskScheduler"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
class HierarchicalStateMachine {
  constructor(rootStateMachine, currentStateMachine, taskScheduler) {
    this.rootStateMachine = rootStateMachine;
    this.currentStateMachine = currentStateMachine;
    this.taskScheduler = taskScheduler;
  }
  static start(config) {
    return _asyncToGenerator(function* () {
      var taskScheduler = new _TaskScheduler.default();
      var rootStateMachine;
      var createContext = stateMachine => ({
        stateMachine: new HierarchicalStateMachine(rootStateMachine, stateMachine, taskScheduler)
      });
      rootStateMachine = new _StateMachine.default(config, taskScheduler, createContext);
      yield taskScheduler.enqueue(() => rootStateMachine.start());
      yield taskScheduler.runAll();
      return new HierarchicalStateMachine(rootStateMachine, rootStateMachine, taskScheduler);
    })();
  }
  getCurrentState() {
    return this.currentStateMachine.getCurrentState();
  }
  getSubmachine() {
    var submachine = this.currentStateMachine.getSubmachine();
    if (submachine) {
      return new HierarchicalStateMachine(this.rootStateMachine, submachine, this.taskScheduler);
    }
    return null;
  }
  getStateHierarchy() {
    return this.getStateMachines().map(stateMachine => stateMachine.getCurrentState());
  }
  canHandle(event, eventPayload) {
    var _this = this;
    return _asyncToGenerator(function* () {
      var stateMachines = _this.getStateMachines();
      for (var i = stateMachines.length - 1; i >= 0; i--) {
        // eslint-disable-next-line no-await-in-loop
        if (yield stateMachines[i].canHandle(event, eventPayload)) {
          return true;
        }
      }
      return false;
    })();
  }
  handle(event, eventPayload) {
    var _this2 = this;
    return _asyncToGenerator(function* () {
      return yield new Promise((resolve, reject) => {
        _this2.taskScheduler.enqueue( /*#__PURE__*/_asyncToGenerator(function* () {
          var stateMachines = _this2.getStateMachines();
          for (var i = stateMachines.length - 1; i >= 0; i--) {
            // eslint-disable-next-line no-await-in-loop
            if (yield stateMachines[i].canHandle(event, eventPayload)) {
              // eslint-disable-next-line no-await-in-loop
              return yield stateMachines[i].handle(event, eventPayload);
            }
          }
          return yield _this2.currentStateMachine.handleUnhandledEvent(event, eventPayload);
        })).then(resolve, reject);
      });
    })();
  }
  getStateMachines() {
    var stateMachines = [];
    var stateMachine = this.rootStateMachine;
    do {
      stateMachines.push(stateMachine);
      stateMachine = stateMachine.getSubmachine();
    } while (stateMachine);
    return stateMachines;
  }
  toString() {
    return "StateMachine(currentState: " + this.getCurrentState() + ")";
  }
}
exports.default = HierarchicalStateMachine;