"use strict";

exports.__esModule = true;
exports.default = void 0;
var _TriggerConfigurator = _interopRequireDefault(require("./TriggerConfigurator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class TrimerConfigurator extends _TriggerConfigurator.default {
  constructor(parent, timeout) {
    super(parent);
    this.config.timeout = timeout;
  }
}
exports.default = TrimerConfigurator;