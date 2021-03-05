import { debounce } from 'lodash';
import { Subscription } from 'knockout';
import { TimelineMax, TweenMax, Power2, Power0, Expo } from 'gsap';
import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import N03LanguageSelectorTransitionController from './N03LanguageSelectorTransitionController';
import { Model } from 'app/data/model';
import { closeLanguageSelector } from '../../../util/language-selector';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { makeVisible } from '../../../util/helpers/makeVisible';

export default class N03LanguageSelector extends AbstractTransitionBlock {
  public static displayName: string = 'n03-language-selector';
  public transitionController: N03LanguageSelectorTransitionController;
  private static debounceDelay: number = 100;
  private closeButton = this.getElement('[data-close-button]');
  private transitionItems = this.getElements('[data-transition-item]');
  private overlay = this.getElement('[data-overlay]');
  private drawer = this.getElement('[data-content-drawer]');
  private languageSelectorSubscription: Subscription;
  private timeline: TimelineMax;

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new N03LanguageSelectorTransitionController(this);
    this.timeline = this.setupTimeline();
    makeVisible(el);
    this.languageSelectorSubscription = Model.showLanguageSelector.subscribe(
      this.handleLanguageSelectorSubscription,
    );
    window.addEventListener('resize', this.handleWindowResize);
    this.closeButton.addEventListener('click', this.handleCloseButtonClick);
    this.setCorrectSettings();
    this.transitionMenu();
  }

  private setupTimeline = (): TimelineMax => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const timeline = new TimelineMax({
      paused: true,
    });
    timeline.add(this.overlayTransitionIn(), 0);
    timeline.add(isDesktop ? this.popupTransitionIn() : this.drawerTransitionIn(), 0);
    timeline.add(this.contentTransitionIn(), '-=0.5');
    timeline.add(this.closeButtonTransitionIn(), 1);
    return timeline;
  };

  private handleWindowResize = debounce((): void => {
    const progress = Model.showLanguageSelector() ? 1 : 0;
    this.timeline = this.setupTimeline();
    TweenMax.set(this.timeline, { progress });
  }, N03LanguageSelector.debounceDelay);

  private handleLanguageSelectorSubscription = (): void => {
    this.handleLanguageSelectorState();
  };

  private overlayTransitionIn = (): TweenMax => {
    return TweenMax.fromTo(
      this.overlay,
      0.25,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        ease: Power0.easeNone,
      },
    );
  };

  private drawerTransitionIn = (): TweenMax => {
    return TweenMax.fromTo(
      this.drawer,
      1.2,
      {
        y: '100%',
      },
      {
        y: '0%',
        ease: Expo.easeInOut,
        clearProps: 'all',
      },
    );
  };

  private popupTransitionIn = (): TweenMax => {
    return TweenMax.fromTo(
      this.drawer,
      1.2,
      {
        autoAlpha: 0,
        scale: 0.9,
        clearProps: 'visibility',
      },
      {
        autoAlpha: 1,
        scale: 1,
        clearProps: 'all',
        ease: Expo.easeInOut,
      },
    );
  };

  private handleLanguageSelectorState = (): void => {
    this.setScrollState();
    this.transitionMenu();
    this.setKeyboardListeners();
  };

  private setScrollState = (): void => {
    Model.showLanguageSelector() ? disableBodyScroll(this.element) : enableBodyScroll(this.element);
  };

  private transitionMenu = (): void => {
    const duration = Model.showLanguageSelector()
      ? this.timeline.duration() - this.timeline.time()
      : this.timeline.time() * 0.5;

    const progress = Model.showLanguageSelector() ? 1 : 0;

    TweenMax.to(this.timeline, duration, {
      progress,
      onStart: this.setCorrectSettings,
    });
  };

  private contentTransitionIn = (): Array<TweenMax> => {
    return TweenMax.staggerFromTo(
      this.transitionItems,
      0.6,
      {
        x: 100,
        autoAlpha: 0,
      },
      {
        x: 0,
        autoAlpha: 1,
        ease: Power2.easeInOut,
      },
      0.1,
    );
  };

  private handleCloseButtonClick = (): void => {
    closeLanguageSelector();
  };

  private setCorrectSettings = (): void => {
    this.element.style.pointerEvents = Model.showLanguageSelector() ? 'auto' : 'none';
  };

  private setKeyboardListeners = () => {
    Model.showLanguageSelector()
      ? window.addEventListener('keyup', this.handleKeyClick)
      : window.removeEventListener('keyup', this.handleKeyClick);
  };

  private handleKeyClick = (event: KeyboardEvent): void => {
    if (event.code != 'Escape') return;
    Model.showLanguageSelector(false);
  };

  private closeButtonTransitionIn = (): TweenMax => {
    return TweenMax.fromTo(
      this.closeButton,
      0.5,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
      },
    );
  };
}
