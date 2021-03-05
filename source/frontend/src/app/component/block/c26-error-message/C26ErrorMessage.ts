import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C26ErrorMessageTransitionController from './C26ErrorMessageTransitionController';

export default class C26ErrorMessage extends AbstractTransitionBlock {
  public static displayName:string = 'c26-error-message';
  public transitionController:C26ErrorMessageTransitionController;

  constructor(el:HTMLElement) {
    super(el);
    this.transitionController = new C26ErrorMessageTransitionController(this);
  }
}
