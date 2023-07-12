"use strict";

exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.promise.js");
var _invokeEach = _interopRequireDefault(require("../utils/invokeEach"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var noop = () => {};
class StateMachine {
  constructor(config, taskScheduler, contextFactory) {
    if (config === undefined || config === null) {
      throw new Error('Configuration must be specified.');
    }
    if (typeof config !== 'object') {
      throw new Error('Configuration must be an object.');
    }
    if (config.initialState === undefined || config.initialState === null) {
      throw new Error('Initial state must be specified.');
    }
    this.config = config;
    this.taskScheduler = taskScheduler;
    this.contextFactory = contextFactory;
    this.currentState = null;
    this.submachines = Object.create(null);
    this.timerIDs = null;
    this.asyncActionCancelers = null;
    this.handleAsyncActionComplete = this.handleAsyncActionComplete.bind(this);
    this.handleTimeout = this.handleTimeout.bind(this);
  }
  getCurrentState() {
    return this.currentState;
  }
  canHandle(event, eventPayload) {
    var _this = this;
    return _asyncToGenerator(function* () {
      if (!_this.isStarted()) {
        return false;
      }
      var context = _this.createContextWithEvent(event, eventPayload);
      return !!(yield _this.getFirstAllowedTransitionForEvent(context));
    })();
  }
  handle(event, eventPayload) {
    var _this2 = this;
    return _asyncToGenerator(function* () {
      if (!_this2.isStarted()) {
        throw new Error('Cannot handle events before starting the state machine!');
      }
      var context = _this2.createContextWithEvent(event, eventPayload);
      var transitionConfig = yield _this2.getFirstAllowedTransitionForEvent(context);
      if (transitionConfig) {
        return yield _this2.executeTransition(transitionConfig, context);
      }
      return yield _this2.handleUnhandledEvent(event, eventPayload);
    })();
  }
  handleUnhandledEvent(event, eventPayload) {
    var _this3 = this;
    return _asyncToGenerator(function* () {
      if (_this3.config.global.unhandledEventHooks.length > 0) {
        return (yield (0, _invokeEach.default)(_this3.config.global.unhandledEventHooks, event, _this3.currentState, _this3.createContextWithEvent(event, eventPayload)))[0];
      }
      throw new Error("Unhandled event '" + event + "' in state '" + _this3.currentState + "'.");
    })();
  }
  isStarted() {
    return this.currentState !== null;
  }
  start() {
    var _this4 = this;
    return _asyncToGenerator(function* () {
      if (!_this4.isStarted()) {
        yield _this4.enterState(_this4.config.initialState, _this4.createContext());
      }
    })();
  }
  stop() {
    var _this5 = this;
    return _asyncToGenerator(function* () {
      if (_this5.isStarted()) {
        yield _this5.exitState(_this5.createContext());
        _this5.currentState = null;
      }
    })();
  }
  getSubmachine() {
    return this.isStarted() ? this.submachines[this.currentState] : null;
  }
  executeTransition(transitionConfig, context) {
    var _this6 = this;
    return _asyncToGenerator(function* () {
      if (transitionConfig.ignore) {
        return undefined;
      }
      if (!transitionConfig.isInternal) {
        yield _this6.exitState(context);
      }
      var nextState = transitionConfig.targetState !== null ? transitionConfig.targetState : _this6.currentState;
      yield (0, _invokeEach.default)(_this6.config.global.transitionHooks, _this6.currentState, nextState, context);
      var actionRetvals = yield (0, _invokeEach.default)(transitionConfig.actions, _this6.currentState, nextState, context);
      if (!transitionConfig.isInternal) {
        yield _this6.enterState(nextState, context);
      }
      return actionRetvals.length > 1 ? actionRetvals : actionRetvals[0];
    })();
  }
  enterState(state, context) {
    var _this7 = this;
    return _asyncToGenerator(function* () {
      yield (0, _invokeEach.default)(_this7.config.global.stateEnterHooks, state, context);
      var stateConfig = _this7.config.states[state];
      if (stateConfig) {
        yield (0, _invokeEach.default)(stateConfig.entryActions, state, context);
      }
      if (_this7.currentState !== null && _this7.currentState !== state) {
        yield (0, _invokeEach.default)(_this7.config.global.stateChangeHooks, _this7.currentState, state, context);
      }
      try {
        _this7.startAsyncActions(state, context);
        _this7.startTimers(state);
        yield _this7.startSubmachines(state);
      } catch (error) {
        _this7.stopTimers();
        _this7.cancelAsyncActions();
        throw error;
      }
      _this7.currentState = state;
    })();
  }
  exitState(context) {
    var _this8 = this;
    return _asyncToGenerator(function* () {
      yield _this8.stopSubmachines();
      _this8.stopTimers();
      _this8.cancelAsyncActions();
      yield (0, _invokeEach.default)(_this8.config.global.stateExitHooks, _this8.currentState, context);
      var stateConfig = _this8.config.states[_this8.currentState];
      if (stateConfig) {
        yield (0, _invokeEach.default)(stateConfig.exitActions, _this8.currentState, context);
      }
    })();
  }
  startAsyncActions(state, context) {
    var stateConfig = this.config.states[state];
    if (stateConfig) {
      stateConfig.asyncActions.forEach(asyncActionConfig => this.startAsyncAction(asyncActionConfig, state, context));
    }
  }
  startAsyncAction(asyncActionConfig, state, context) {
    this.taskScheduler.enqueue(() => {
      var {
        action,
        successTrigger,
        failureTrigger
      } = asyncActionConfig;
      var handleComplete = this.handleAsyncActionComplete;
      this.taskScheduler.enqueue( /*#__PURE__*/_asyncToGenerator(function* () {
        action(state, context).then(result => handleComplete(successTrigger, {
          result
        }), error => handleComplete(failureTrigger, {
          error
        }));
      })).then(null, x => {
        throw x;
      });
      this.asyncActionCancelers = this.asyncActionCancelers || [];
      this.asyncActionCancelers.push(() => {
        handleComplete = noop;
      });
    }).then(null, x => {
      throw x;
    });
  }
  cancelAsyncActions() {
    if (this.asyncActionCancelers) {
      this.asyncActionCancelers.forEach(x => x());
      this.asyncActionCancelers = null;
    }
  }
  handleAsyncActionComplete(triggerConfig, additionalContext) {
    var _this9 = this;
    return _asyncToGenerator(function* () {
      var context = Object.assign(_this9.createContext(), additionalContext);
      yield _this9.executeTrigger(triggerConfig, context);
    })();
  }
  startTimers(state) {
    var stateConfig = this.config.states[state];
    if (stateConfig && stateConfig.timers.length > 0) {
      this.timerIDs = stateConfig.timers.map(timerConfig => setTimeout(this.handleTimeout, timerConfig.timeout, timerConfig));
    }
  }
  stopTimers() {
    if (this.timerIDs) {
      this.timerIDs.forEach(clearTimeout);
      this.timerIDs = null;
    }
  }
  handleTimeout(timerConfig) {
    this.executeTrigger(timerConfig, this.createContext()).then(null, x => {
      throw x;
    });
  }
  startSubmachines(state) {
    var _this10 = this;
    return _asyncToGenerator(function* () {
      var stateConfig = _this10.config.states[state];
      if (stateConfig && stateConfig.submachine) {
        if (!_this10.submachines[state]) {
          _this10.submachines[state] = new StateMachine(stateConfig.submachine, _this10.taskScheduler, _this10.contextFactory);
        }
        yield _this10.submachines[state].start();
      }
    })();
  }
  stopSubmachines() {
    var _this11 = this;
    return _asyncToGenerator(function* () {
      var submachine = _this11.submachines[_this11.currentState];
      if (submachine) {
        yield submachine.stop();
      }
    })();
  }
  createContext() {
    return this.contextFactory(this);
  }
  createContextWithEvent(event, eventPayload) {
    var context = this.createContext();
    context.event = event;
    if (eventPayload !== undefined) {
      context.eventPayload = eventPayload;
    }
    return context;
  }
  static getFirstAllowedTransition(transitions, context) {
    return _asyncToGenerator(function* () {
      for (var i = 0; i < transitions.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        if (!transitions[i].condition || (yield transitions[i].condition(context))) {
          return transitions[i];
        }
      }
      return null;
    })();
  }
  getFirstAllowedTransitionForEvent(context) {
    var _this12 = this;
    return _asyncToGenerator(function* () {
      var stateConfig = _this12.config.states[_this12.currentState];
      if (!stateConfig) {
        return null;
      }
      var transitionConfig = null;
      var eventConfig = stateConfig.events[context.event];
      if (eventConfig) {
        transitionConfig = yield StateMachine.getFirstAllowedTransition(eventConfig.transitions, context);
      }
      if (!transitionConfig && stateConfig.anyEventTrigger) {
        transitionConfig = yield StateMachine.getFirstAllowedTransition(stateConfig.anyEventTrigger.transitions, context);
      }
      return transitionConfig;
    })();
  }
  executeTrigger(triggerConfig, context) {
    var _this13 = this;
    return _asyncToGenerator(function* () {
      return yield _this13.taskScheduler.enqueue( /*#__PURE__*/_asyncToGenerator(function* () {
        var transitionConfig = yield StateMachine.getFirstAllowedTransition(triggerConfig.transitions, context);
        if (transitionConfig) {
          return yield _this13.executeTransition(transitionConfig, context);
        }
        return undefined;
      }));
    })();
  }
}
exports.default = StateMachine;