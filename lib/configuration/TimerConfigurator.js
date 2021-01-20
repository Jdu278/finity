'use strict';

exports.__esModule = true;

var _TriggerConfigurator = require('./TriggerConfigurator');

var _TriggerConfigurator2 = _interopRequireDefault(_TriggerConfigurator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TrimerConfigurator extends _TriggerConfigurator2.default {
  constructor(parent, timeout) {
    super(parent);
    this.config.timeout = timeout;
  }
}
exports.default = TrimerConfigurator;