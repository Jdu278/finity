"use strict";

exports.__esModule = true;
exports.default = void 0;
var _BaseConfigurator = _interopRequireDefault(require("./BaseConfigurator"));
var _GlobalConfigurator = _interopRequireDefault(require("./GlobalConfigurator"));
var _StateConfigurator = _interopRequireDefault(require("./StateConfigurator"));
var _HierarchicalStateMachine = _interopRequireDefault(require("../core/HierarchicalStateMachine"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class StateMachineConfigurator extends _BaseConfigurator.default {
  constructor() {
    super();
    this.config = {
      global: new _GlobalConfigurator.default(this),
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
      this.config.states[state] = new _StateConfigurator.default(this);
    }
    return this.config.states[state];
  }
  getConfig() {
    return this.buildConfig();
  }
  start() {
    var config = this.getConfig();
    return _HierarchicalStateMachine.default.start(config);
  }
}
exports.default = StateMachineConfigurator;