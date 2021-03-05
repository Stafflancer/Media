import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C04ImageTextTransitionController from './C04ImageTextTransitionController';

export default class C04ImageText extends AbstractTransitionBlock {
  public static displayName: string = 'c04-image-text';
  public transitionController: C04ImageTextTransitionController;

  constructor(el: HTMLElement) {
    super(el);
    this.enterViewThreshold = 0.5;
    this.transitionController = new C04ImageTextTransitionController(this);
  }
}
