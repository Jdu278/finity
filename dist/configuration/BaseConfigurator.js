"use strict";

exports.__esModule = true;
exports.default = void 0;
var _mapValues = _interopRequireDefault(require("../utils/mapValues"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class BaseConfigurator {
  constructor(parent) {
    this.parent = parent;
  }
  getAncestor(type) {
    if (this.parent) {
      return this.parent instanceof type ? this.parent : this.parent.getAncestor(type);
    }
    return null;
  }
  buildConfig() {
    var mapper = value => {
      if (!value) {
        return value;
      }
      if (value instanceof BaseConfigurator) {
        return value.buildConfig();
      }
      if (Array.isArray(value)) {
        return value.map(mapper);
      }
      if (value && typeof value === 'object') {
        return (0, _mapValues.default)(value, mapper);
      }
      return value;
    };
    return (0, _mapValues.default)(this.config, mapper);
  }
}
exports.default = BaseConfigurator;