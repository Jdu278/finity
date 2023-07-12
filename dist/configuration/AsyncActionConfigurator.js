"use strict";

exports.__esModule = true;
exports.default = void 0;
var _BaseConfigurator = _interopRequireDefault(require("./BaseConfigurator"));
var _TriggerConfigurator = _interopRequireDefault(require("./TriggerConfigurator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class AsyncActionConfigurator extends _BaseConfigurator.default {
  constructor(parent, action) {
    super(parent);
    this.config = {
      action,
      successTrigger: new _TriggerConfigurator.default(this),
      failureTrigger: new _TriggerConfigurator.default(this)
    };
  }
  onSuccess() {
    return this.config.successTrigger;
  }
  onFailure() {
    return this.config.failureTrigger;
  }
}
exports.default = AsyncActionConfigurator;