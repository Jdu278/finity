'use strict';

exports.__esModule = true;

var _configuration = require('./configuration');

var _HierarchicalStateMachine = require('./core/HierarchicalStateMachine');

var _HierarchicalStateMachine2 = _interopRequireDefault(_HierarchicalStateMachine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Finity = {
  configure() {
    return new _configuration.StateMachineConfigurator();
  },

  async start(config) {
    return await _HierarchicalStateMachine2.default.start(config);
  }
};

exports.default = Finity;
