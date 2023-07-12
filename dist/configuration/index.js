"use strict";

exports.__esModule = true;
var _StateMachineConfigurator = _interopRequireDefault(require("./StateMachineConfigurator"));
exports.StateMachineConfigurator = _StateMachineConfigurator.default;
var _GlobalConfigurator = _interopRequireDefault(require("./GlobalConfigurator"));
var _StateConfigurator = _interopRequireDefault(require("./StateConfigurator"));
var _TriggerConfigurator = _interopRequireDefault(require("./TriggerConfigurator"));
var _TransitionConfigurator = _interopRequireDefault(require("./TransitionConfigurator"));
var _AsyncActionConfigurator = _interopRequireDefault(require("./AsyncActionConfigurator"));
var _delegateToAncestor = _interopRequireDefault(require("./delegateToAncestor"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable import/prefer-default-export */

(0, _delegateToAncestor.default)(_GlobalConfigurator.default, _StateMachineConfigurator.default);
(0, _delegateToAncestor.default)(_StateConfigurator.default, _StateMachineConfigurator.default);
(0, _delegateToAncestor.default)(_TransitionConfigurator.default, _StateConfigurator.default);
(0, _delegateToAncestor.default)(_TransitionConfigurator.default, _TriggerConfigurator.default);
(0, _delegateToAncestor.default)(_TransitionConfigurator.default, _AsyncActionConfigurator.default);