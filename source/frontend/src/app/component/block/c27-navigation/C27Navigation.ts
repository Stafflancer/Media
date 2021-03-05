import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C27NavigationTransitionController from './C27NavigationTransitionController';

export default class C27Navigation extends AbstractTransitionBlock {
  public static displayName:string = 'c27-navigation';
  public transitionController:C27NavigationTransitionController;

  constructor(el:HTMLElement) {
    super(el);
    this.transitionController = new C27NavigationTransitionController(this);
  }
}
