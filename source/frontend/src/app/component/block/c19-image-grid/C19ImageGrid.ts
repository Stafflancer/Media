import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C19ImageGridTransitionController from './C19ImageGridTransitionController';

export default class C19ImageGrid extends AbstractTransitionBlock {
  public static displayName: string = 'c19-image-grid';
  public transitionController: C19ImageGridTransitionController;

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C19ImageGridTransitionController(this);
  }
}
