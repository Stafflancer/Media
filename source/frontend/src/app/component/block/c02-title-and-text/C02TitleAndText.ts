import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C02TitleAndTextTransitionController from './C02TitleAndTextTransitionController';

export default class C02TitleAndText extends AbstractTransitionBlock {
  public static displayName: string = 'c02-title-and-text';
  public transitionController: C02TitleAndTextTransitionController;

  constructor(el: HTMLElement) {
    super(el);
    this.enterViewThreshold = 0.5;
    this.transitionController = new C02TitleAndTextTransitionController(this);
  }
}
