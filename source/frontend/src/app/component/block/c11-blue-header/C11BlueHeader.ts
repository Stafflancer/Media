import { debounce } from 'lodash';
import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C11BlueHeaderTransitionController from './C11BlueHeaderTransitionController';

export default class C11BlueHeader extends AbstractTransitionBlock {
  public static displayName: string = 'c11-blue-header';
  public transitionController: C11BlueHeaderTransitionController;

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C11BlueHeaderTransitionController(this);
    this.adjustLogoHack();
    window.addEventListener('resize', this.handleWindowResize);
  }

  private handleWindowResize = debounce((): void => {
    this.adjustLogoHack();
  }, 200);

  private adjustLogoHack = (): void => {
    const flames = window.document.querySelectorAll('.n01-main-navigation .logo .flame-part');
    if (!flames) return;
    if (window.matchMedia('(min-width: 1024px)').matches) {
      flames.forEach(flame => ((<HTMLElement>flame).style.fill = '#fff'));
    } else {
      flames.forEach(flame => ((<HTMLElement>flame).style.fill = ''));
    }
  };
}
