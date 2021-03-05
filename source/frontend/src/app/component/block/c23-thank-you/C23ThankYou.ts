import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C23ThankYouTransitionController from './C23ThankYouTransitionController';

export default class C23ThankYou extends AbstractTransitionBlock {
  public static displayName: string = 'c23-thank-you';
  public transitionController: C23ThankYouTransitionController;

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C23ThankYouTransitionController(this);
  }
}
