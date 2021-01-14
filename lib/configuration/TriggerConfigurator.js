'use strict';

exports.__esModule = true;

var _BaseConfigurator = require('./BaseConfigurator');

var _BaseConfigurator2 = _interopRequireDefault(_BaseConfigurator);

var _TransitionConfigurator = require('./TransitionConfigurator');

var _TransitionConfigurator2 = _interopRequireDefault(_TransitionConfigurator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TriggerConfigurator extends _BaseConfigurator2.default {
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
    return this.transition(null, { isInternal: true });
  }

  ignore() {
    return this.transition(null, { ignore: true });
  }

  transition(targetState, options) {
    const transitionConfigurator = new _TransitionConfigurator2.default(this, targetState, options);
    this.config.transitions.push(transitionConfigurator);
    return transitionConfigurator;
  }
}
exports.default = TriggerConfigurator;