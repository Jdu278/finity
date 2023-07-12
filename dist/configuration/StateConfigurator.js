"use strict";

exports.__esModule = true;
exports.default = void 0;
var _BaseConfigurator = _interopRequireDefault(require("./BaseConfigurator"));
var _TriggerConfigurator = _interopRequireDefault(require("./TriggerConfigurator"));
var _TimerConfigurator = _interopRequireDefault(require("./TimerConfigurator"));
var _AsyncActionConfigurator = _interopRequireDefault(require("./AsyncActionConfigurator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class StateConfigurator extends _BaseConfigurator.default {
  constructor(parent) {
    super(parent);
    this.config = {
      entryActions: [],
      exitActions: [],
      events: Object.create(null),
      anyEventTrigger: null,
      timers: [],
      asyncActions: [],
      submachine: null
    };
  }
  onEnter(action) {
    this.config.entryActions.push(action);
    return this;
  }
  onExit(action) {
    this.config.exitActions.push(action);
    return this;
  }
  on(event) {
    if (!this.config.events[event]) {
      this.config.events[event] = new _TriggerConfigurator.default(this);
    }
    return this.config.events[event];
  }
  onAny() {
    if (!this.config.anyEventTrigger) {
      this.config.anyEventTrigger = new _TriggerConfigurator.default(this);
    }
    return this.config.anyEventTrigger;
  }
  onTimeout(timeout) {
    var timerConfigurator = new _TimerConfigurator.default(this, timeout);
    this.config.timers.push(timerConfigurator);
    return timerConfigurator;
  }
  do(asyncAction) {
    var asyncActionConfigurator = new _AsyncActionConfigurator.default(this, asyncAction);
    this.config.asyncActions.push(asyncActionConfigurator);
    return asyncActionConfigurator;
  }
  submachine(submachineConfig) {
    this.config.submachine = submachineConfig;
    return this;
  }
}
exports.default = StateConfigurator;