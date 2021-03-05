import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C18ImageSetTransitionController from './C18ImageSetTransitionController';

export default class C18ImageSet extends AbstractTransitionBlock {
  public static displayName: string = 'c18-image-set';
  public transitionController: C18ImageSetTransitionController;

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C18ImageSetTransitionController(this);
  }
}
