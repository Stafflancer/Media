import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import ScaffoldTransitionController from './ScaffoldTransitionController';

export default class Scaffold extends AbstractTransitionBlock {
  public static displayName:string = 'scaffold';
  public transitionController:ScaffoldTransitionController;

  constructor(el:HTMLElement) {
    super(el);
    this.transitionController = new ScaffoldTransitionController(this);
  }
}
