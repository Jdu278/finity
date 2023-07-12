"use strict";

exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.object.assign.js");
var _BaseConfigurator = _interopRequireDefault(require("./BaseConfigurator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class TransitionConfigurator extends _BaseConfigurator.default {
  constructor(parent, targetState, options) {
    if (options === void 0) {
      options = {};
    }
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