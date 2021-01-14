'use strict';

exports.__esModule = true;

var _BaseConfigurator = require('./BaseConfigurator');

var _BaseConfigurator2 = _interopRequireDefault(_BaseConfigurator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TransitionConfigurator extends _BaseConfigurator2.default {
  constructor(parent, targetState, options = {}) {
    super(parent);
    this.config = Object.assign({}, options, {
      targetState,
      actions: [],
      condition: null
    });
  }

  withAction(action) {
    this.config.actions.push(action);
    return this;
  }

  withCondition(condition) {
    this.config.condition = condition;
    return this;
  }
}
exports.default = TransitionConfigurator;