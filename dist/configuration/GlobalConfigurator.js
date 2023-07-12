"use strict";

exports.__esModule = true;
exports.default = void 0;
var _BaseConfigurator = _interopRequireDefault(require("./BaseConfigurator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GlobalConfigurator extends _BaseConfigurator.default {
  constructor(parent) {
    super(parent);
    this.config = {
      stateEnterHooks: [],
      stateExitHooks: [],
      stateChangeHooks: [],
      transitionHooks: [],
      unhandledEventHooks: []
    };
  }
  onStateEnter(hook) {
    this.config.stateEnterHooks.push(hook);
    return this;
  }
  onStateExit(hook) {
    this.config.stateExitHooks.push(hook);
    return this;
  }
  onStateChange(hook) {
    this.config.stateChangeHooks.push(hook);
    return this;
  }
  onTransition(hook) {
    this.config.transitionHooks.push(hook);
    return this;
  }
  onUnhandledEvent(hook) {
    this.config.unhandledEventHooks.push(hook);
    return this;
  }
}
exports.default = GlobalConfigurator;