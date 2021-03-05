import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C25CtaBlockTransitionController from './C25CtaBlockTransitionController';

export default class C25CtaBlock extends AbstractTransitionBlock {
  public static displayName:string = 'c25-cta-block';
  public transitionController:C25CtaBlockTransitionController;

  constructor(el:HTMLElement) {
    super(el);
    this.transitionController = new C25CtaBlockTransitionController(this);
  }
}
