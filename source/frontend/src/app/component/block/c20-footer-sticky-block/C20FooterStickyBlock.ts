import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C20FooterStickyBlockTransitionController from './C20FooterStickyBlockTransitionController';

export default class C20FooterStickyBlock extends AbstractTransitionBlock {
  public static displayName: string = 'c20-footer-sticky-block';
  public transitionController: C20FooterStickyBlockTransitionController;

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C20FooterStickyBlockTransitionController(this);
  }
}
