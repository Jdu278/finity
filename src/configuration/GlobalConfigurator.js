import delegateToAncestor from './delegateToAncestor';
import StateMachineConfigurator from './StateMachineConfigurator';
import BaseConfigurator from './BaseConfigurator';

class GlobalConfigurator extends BaseConfigurator {
  onStateEnter(handler) {
    this.config.stateEnterHandlers.push(handler);
    return this;
  }

  onStateExit(handler) {
    this.config.stateExitHandlers.push(handler);
    return this;
  }

  onStateChange(handler) {
    this.config.stateChangeHandlers.push(handler);
    return this;
  }

  onTransition(handler) {
    this.config.transitionHandlers.push(handler);
    return this;
  }

  onUnhandledEvent(handler) {
    this.config.unhandledEventHandlers.push(handler);
    return this;
  }
}

delegateToAncestor(GlobalConfigurator, StateMachineConfigurator);

export default GlobalConfigurator;
