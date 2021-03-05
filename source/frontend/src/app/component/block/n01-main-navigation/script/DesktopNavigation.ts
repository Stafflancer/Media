import AbstractBlock from '../../AbstractBlock';

class DesktopNavigation extends AbstractBlock {
  public element: HTMLElement;
  private static scrollNavigation: string = 'scrolled-navigation';
  private topOffset: number = 0;
  private controllerActive: boolean = true;
  private isFixed: boolean = false;
  private contentWrapper: HTMLElement = this.getElement('[data-content-wrapper]');
  private logoWrapper: HTMLElement = this.getElement('[data-menu-bar]');
  private navigationWrapper: HTMLElement = this.getElement('[data-navigation-wrapper]');
  private secondaryNavigation: HTMLElement = this.getElement('[data-secondary-navigation]');
  private request: FrameRequestCallback | undefined;

  constructor(el: HTMLElement) {
    super(el);
    this.element = el;
    this.setupHeader();
  }

  private setupHeader = (): void => {
    const heroComponent = document.documentElement.querySelector('[data-component="c01-hero"]');
    const blueHeader = document.documentElement.querySelector('[data-component="c11-blue-header"]');
    if (!blueHeader && !heroComponent) {
      (<HTMLElement>document.getElementsByTagName('body')[0]).style.paddingTop = `${
        this.element.getBoundingClientRect().height
      }px`;
      this.isFixed = true;
      this.updateStyles();
      return;
    }
    this.request = this.handleRequestAnimationFrame;
    window.requestAnimationFrame(this.request);
  };

  private handleRequestAnimationFrame = (): void => {
    if (!this.controllerActive) return;
    this.topOffset = parseFloat(getComputedStyle(this.element).getPropertyValue('--top-offset'));
    window.requestAnimationFrame(this.handleRequestAnimationFrame);
    const scrolledState = this.hasScrolledEnough();
    if (scrolledState === this.isFixed) return;
    this.isFixed = scrolledState;
    this.updateStyles();
  };

  private updateStyles = (): void => {
    [
      this.element,
      this.logoWrapper,
      this.contentWrapper,
      this.navigationWrapper,
      this.secondaryNavigation,
    ].forEach(item => {
      this.isFixed
        ? item.classList.add(DesktopNavigation.scrollNavigation)
        : item.classList.remove(DesktopNavigation.scrollNavigation);
    });
  };

  private hasScrolledEnough = (): boolean => window.scrollY >= this.topOffset;

  public dispose() {
    this.controllerActive = false;
    this.isFixed = false;
    this.updateStyles();
  }
}

export { DesktopNavigation };
