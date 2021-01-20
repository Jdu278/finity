'use strict';

exports.__esModule = true;

var _BaseConfigurator = require('./BaseConfigurator');

var _BaseConfigurator2 = _interopRequireDefault(_BaseConfigurator);

var _TriggerConfigurator = require('./TriggerConfigurator');

var _TriggerConfigurator2 = _interopRequireDefault(_TriggerConfigurator);

var _TimerConfigurator = require('./TimerConfigurator');

var _TimerConfigurator2 = _interopRequireDefault(_TimerConfigurator);

var _AsyncActionConfigurator = require('./AsyncActionConfigurator');

var _AsyncActionConfigurator2 = _interopRequireDefault(_AsyncActionConfigurator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StateConfigurator extends _BaseConfigurator2.default {
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
      this.config.events[event] = new _TriggerConfigurator2.default(this);
    }
    return this.config.events[event];
  }

  onAny() {
    if (!this.config.anyEventTrigger) {
      this.config.anyEventTrigger = new _TriggerConfigurator2.default(this);
    }
    return this.config.anyEventTrigger;
  }

  onTimeout(timeout) {
    const timerConfigurator = new _TimerConfigurator2.default(this, timeout);
    this.config.timers.push(timerConfigurator);
    return timerConfigurator;
  }

  do(asyncAction) {
    const asyncActionConfigurator = new _AsyncActionConfigurator2.default(this, asyncAction);
    this.config.asyncActions.push(asyncActionConfigurator);
    return asyncActionConfigurator;
  }

  submachine(submachineConfig) {
    this.config.submachine = submachineConfig;
    return this;
  }
}
exports.default = StateConfigurator;