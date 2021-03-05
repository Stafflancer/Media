import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C17CenteredTextTransitionController from './C17CenteredTextTransitionController';

export default class C17CenteredText extends AbstractTransitionBlock {
  public static displayName: string = 'c17-centered-text';
  public transitionController: C17CenteredTextTransitionController;

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C17CenteredTextTransitionController(this);
  }
}
