"use strict";

exports.__esModule = true;
exports.default = void 0;
var _BaseConfigurator = _interopRequireDefault(require("./BaseConfigurator"));
var _TransitionConfigurator = _interopRequireDefault(require("./TransitionConfigurator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class TriggerConfigurator extends _BaseConfigurator.default {
  constructor(parent) {
    super(parent);
    this.config = {
      transitions: []
    };
  }
  transitionTo(targetState) {
    return this.transition(targetState);
  }
  selfTransition() {
    return this.transition(null);
  }
  internalTransition() {
    return this.transition(null, {
      isInternal: true
    });
  }
  ignore() {
    return this.transition(null, {
      ignore: true
    });
  }
  transition(targetState, options) {
    var transitionConfigurator = new _TransitionConfigurator.default(this, targetState, options);
    this.config.transitions.push(transitionConfigurator);
    return transitionConfigurator;
  }
}
exports.default = TriggerConfigurator;