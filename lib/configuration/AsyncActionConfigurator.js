'use strict';

exports.__esModule = true;

var _BaseConfigurator = require('./BaseConfigurator');

var _BaseConfigurator2 = _interopRequireDefault(_BaseConfigurator);

var _TriggerConfigurator = require('./TriggerConfigurator');

var _TriggerConfigurator2 = _interopRequireDefault(_TriggerConfigurator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AsyncActionConfigurator extends _BaseConfigurator2.default {
  constructor(parent, action) {
    super(parent);
    this.config = {
      action,
      successTrigger: new _TriggerConfigurator2.default(this),
      failureTrigger: new _TriggerConfigurator2.default(this)
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