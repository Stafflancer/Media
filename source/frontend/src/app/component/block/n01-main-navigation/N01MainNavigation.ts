import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import N01MainNavigationTransitionController from './N01MainNavigationTransitionController';
import ControllerController from 'controller-controller';
import { MobileNavigation } from './script/MobileNavigation';
import { DesktopNavigation } from './script/DesktopNavigation';

export default class N01MainNavigation extends AbstractTransitionBlock {
  public static displayName: string = 'n01-main-navigation';
  public transitionController: N01MainNavigationTransitionController;
  private controllerController: ControllerController;

  constructor(el: HTMLElement) {
    super(el);
    this.controllerController = this.setupControllerController();
    this.transitionController = new N01MainNavigationTransitionController(this);
  }

  private setupControllerController = (): ControllerController => {
    return new ControllerController({
      debounceDelay: 200,
      controllers: [
        { minWidth: 0, controller: MobileNavigation, props: this.element },
        { minWidth: 1024, controller: DesktopNavigation, props: this.element },
      ],
    });
  };
}
