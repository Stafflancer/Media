import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C01HeroTransitionController from './C01HeroTransitionController';

export default class C01Hero extends AbstractTransitionBlock {
  public static displayName: string = 'c01-hero';
  public transitionController: C01HeroTransitionController;

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C01HeroTransitionController(this);
  }
}
