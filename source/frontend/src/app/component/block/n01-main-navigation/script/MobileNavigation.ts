import { TimelineMax, TweenMax, Power0, Power1, Power2 } from 'gsap';
import AbstractBlock from '../../AbstractTransitionBlock';

class MobileNavigation extends AbstractBlock {
  public element: HTMLElement;
  private readonly menuTimeline: TimelineMax;
  private menuStatus: boolean = false;
  private menuButton: HTMLButtonElement = this.getElement('[data-menu-button]');
  private navigationItems: Array<HTMLElement> = this.getElements('[data-navigation-link]');
  private subMenuItem: HTMLElement = this.getElement('[data-sub-menu-item]');
  private subMenuList: HTMLElement = this.getElement('[data-sub-menu-list]');
  private menuWrapper: HTMLElement = this.getElement('[data-menu-wrapper]');
  private menuBar: HTMLElement = this.getElement('[data-menu-bar]');
  private backgroundDrawer: HTMLElement = this.getElement('[data-background-drawer]');
  private languageSelector: HTMLElement = this.getElement('[data-language-selector]');
  private contactButton: HTMLElement = this.getElement('[data-contact-button]');

  constructor(el: HTMLElement) {
    super(el);
    this.element = el;
    this.menuButton && this.menuButton.addEventListener('click', this.handleMenuButtonClick);
    this.subMenuItem && this.subMenuItem.addEventListener('click', this.handleSubMenuClick);
    this.menuTimeline = this.setupMenuTimeline();
  }

  private handleSubMenuClick = (): void => {
    if (this.subMenuItem.classList.contains('is-open')) {
      TweenMax.to(this.subMenuList, 0.2, {
        scaleY: 0,
        onComplete: () => {
          TweenMax.set(this.subMenuList, { display: 'none' });
        },
      });
    } else {
      this.subMenuList && TweenMax.set(this.subMenuList, { display: 'initial' });
      this.subMenuList &&
        TweenMax.fromTo(
          this.subMenuList,
          0.2,
          {
            scaleY: 0,
          },
          {
            scaleY: 1,
          },
        );
    }
    // ? '0'
    // : `${this.subMenuList.scrollHeight}px`;
    this.subMenuItem && this.subMenuItem.classList.toggle('is-open');
  };

  private handleMenuButtonClick = (): void => {
    this.menuStatus = !this.menuStatus;
    this.animateTimeline();
  };

  private animateTimeline = (): void => {
    const ease = this.getEase();
    const progress = this.getProgress();
    TweenMax.to(this.menuTimeline, this.getDuration(), {
      progress,
      ease,
      onStart: this.handleTimelineStart,
      onComplete: this.handleTimelineComplete,
    });
  };

  private handleTimelineStart = (): void => {
    if (this.menuStatus) this.setMenuWrapperHeight();
  };

  private handleTimelineComplete = (): void => {
    if (!this.menuStatus) this.setMenuWrapperHeight();
  };

  private setupMenuTimeline = (): TimelineMax => {
    const timeline = new TimelineMax({ paused: true });
    timeline.add(this.animateDrawer());
    timeline.add(this.animateOpenButtonOut(), 0);
    timeline.add(this.animateCloseButtonIn(), 0);
    timeline.add(this.animateItemsIn(), 0.1);
    return timeline;
  };

  private animateItemsIn = (): Array<TweenMax> => {
    return TweenMax.staggerFrom(
      [...this.navigationItems, this.contactButton],
      0.4,
      {
        x: 40,
        autoAlpha: 0,
        ease: Power2.easeInOut,
      },
      0.05,
    );
  };

  private animateDrawer = (): TweenMax => {
    return TweenMax.fromTo(
      this.backgroundDrawer,
      0.85,
      {
        height: '0%',
        y: -80,
      },
      {
        y: 0,
        height: '100%',
        rotation: 0,
        ease: Power2.easeInOut,
      },
    );
  };

  private animateOpenButtonOut = (): TimelineMax => {
    const timeline = new TimelineMax();
    timeline.staggerFromTo(
      this.getElements('.bar'),
      0.2,
      {
        x: 0,
        autoAlpha: 1,
      },
      {
        x: 40,
        autoAlpha: 0,
      },
      0.05,
    );
    return timeline;
  };

  private animateCloseButtonIn = (): TimelineMax => {
    const timeline = new TimelineMax();

    timeline.staggerFromTo(
      this.getElements('.cross'),
      0.2,
      {
        cycle: {
          x: [20, 20],
          y: [20, -20],
        },
        autoAlpha: 0,
      },
      {
        x: 0,
        y: 0,
        autoAlpha: 1,
      },
      0.05,
      0.75,
    );
    return timeline;
  };

  private setMenuWrapperHeight = (): void => {
    this.menuWrapper.style.minHeight = this.menuStatus
      ? `calc(100% - ${this.menuBar.getBoundingClientRect().height}px)`
      : '0px';
  };

  private getDuration = (): number => {
    return this.menuStatus
      ? this.menuTimeline.duration() - this.menuTimeline.time()
      : this.menuTimeline.time();
  };

  private getProgress = (): number => {
    return this.menuStatus ? 1 : 0;
  };

  private getEase = (): gsap.Ease => {
    return this.menuStatus ? Power0.easeInOut : Power1.easeOut;
  };

  public dispose() {
    this.menuButton.removeEventListener('click', this.handleMenuButtonClick);
    this.menuTimeline.kill();
    this.menuStatus = false;
    this.menuWrapper.style.height = `auto`;
    TweenMax.set([...this.navigationItems, this.contactButton, this.languageSelector], {
      clearProps: 'all',
    });
  }
}

export { MobileNavigation };
