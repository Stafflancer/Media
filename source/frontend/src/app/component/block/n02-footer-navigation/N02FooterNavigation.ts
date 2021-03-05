import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import N02FooterNavigationTransitionController from './N02FooterNavigationTransitionController';

export default class N02FooterNavigation extends AbstractTransitionBlock {
  public static displayName: string = 'n02-footer-navigation';
  public transitionController: N02FooterNavigationTransitionController;
  private copyrightHolder: HTMLSpanElement = this.getElement('[data-copyright-year]');

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new N02FooterNavigationTransitionController(this);
    this.transitionController.parentController.enterViewThreshold = 0;
    this.setCopyrightYear();
  }

  private setCopyrightYear = (): void => {
    this.copyrightHolder.innerText = `${new Date().getFullYear()}`;
  };
}
