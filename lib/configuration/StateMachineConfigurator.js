'use strict';

exports.__esModule = true;

var _BaseConfigurator = require('./BaseConfigurator');

var _BaseConfigurator2 = _interopRequireDefault(_BaseConfigurator);

var _GlobalConfigurator = require('./GlobalConfigurator');

var _GlobalConfigurator2 = _interopRequireDefault(_GlobalConfigurator);

var _StateConfigurator = require('./StateConfigurator');

var _StateConfigurator2 = _interopRequireDefault(_StateConfigurator);

var _HierarchicalStateMachine = require('../core/HierarchicalStateMachine');

var _HierarchicalStateMachine2 = _interopRequireDefault(_HierarchicalStateMachine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StateMachineConfigurator extends _BaseConfigurator2.default {
  constructor() {
    super();
    this.config = {
      global: new _GlobalConfigurator2.default(this),
      initialState: null,
      states: Object.create(null)
    };
  }

  global() {
    return this.config.global;
  }

  initialState(state) {
    this.config.initialState = state;
    return this.state(state);
  }

  state(state) {
    if (!this.config.states[state]) {
      this.config.states[state] = new _StateConfigurator2.default(this);
    }
    return this.config.states[state];
  }

  getConfig() {
    return this.buildConfig();
  }

  start() {
    const config = this.getConfig();
    return _HierarchicalStateMachine2.default.start(config);
  }
}
exports.default = StateMachineConfigurator;