import { TimelineMax, TweenMax, Expo, Power0, Power2 } from 'gsap';
import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import {
  getPanelState,
  hidePanel,
  handleHotspotState,
  handlePanelState,
  getActiveHotspotIndex,
} from '../../helpers';

export default class InfoPanel extends AbstractTransitionBlock {
  public static displayName: string = 'info-panel';
  private static isHidden: string = 'is-hidden';
  private static largeLayoutQuery: string = '(min-width: 768px)';
  private readonly revealPanelTimeline: TimelineMax;
  private readonly localesTimelines: Array<TimelineMax>;
  private closeButton: HTMLElement = this.getElement('[data-close-button]');
  private drawer: HTMLElement = this.getElement('[data-drawer]');
  private activeIndex: number;

  constructor(el: HTMLElement) {
    super(el);
    el.classList.remove(InfoPanel.isHidden);
    this.activeIndex = getActiveHotspotIndex();
    handlePanelState(this.showInfoPanel);
    handleHotspotState(this.handleHotspotState);
    this.localesTimelines = this.setupLocalesTimelines();
    this.revealPanelTimeline = this.setupRevealTimeline();
    this.closeButton.addEventListener('click', this.handleCloseButtonClick);
  }

  private setupLocalesTimelines = (): Array<TimelineMax> =>
    this.getElements('[data-local-info]').map(locale => this.localeTimeline(locale));

  private handleCloseButtonClick = (): void => {
    hidePanel();
  };

  private localeTimeline = (element: HTMLElement): TimelineMax => <TimelineMax>new TimelineMax({
      paused: true,
    }).from(element, 0.5, {
      autoAlpha: 0,
      x: 40,
    });

  private handleHotspotState = (): void => {
    const currentIndex = this.activeIndex;
    const nextIndex = getActiveHotspotIndex();
    this.hideContent(currentIndex);
    this.showContent(nextIndex);
    this.activeIndex = nextIndex;
  };

  private hideContent = (index: number): void => {
    if (index < 0) return;
    this.manageItems(false, index);
  };

  private showContent = (index: number): void => {
    this.manageItems(true, index);
  };

  private manageItems = (state: boolean, index: number): void => {
    const timeline = this.localesTimelines[index];
    const duration = state ? timeline.duration() - timeline.time() : timeline.time();
    const progress = state ? 1 : 0;
    TweenMax.to(timeline, duration, {
      progress,
      ease: Expo.easeInOut,
    });
  };

  private setupRevealTimeline = (): TimelineMax => {
    const largeLayout: boolean = window.matchMedia(InfoPanel.largeLayoutQuery).matches;
    const timeline = new TimelineMax({ paused: true });
    largeLayout ? timeline.add(this.shiftDrawerIn()) : timeline.add(this.fadeDrawerIn());
    return timeline;
  };

  private shiftDrawerIn = (): TweenMax => {
    return TweenMax.fromTo(
      this.drawer,
      1.5,
      {
        x: '100%',
      },
      {
        x: '0%',
        ease: Power2.easeInOut,
      },
    );
  };

  private fadeDrawerIn = (): TweenMax => {
    return TweenMax.from(this.drawer, 0.4, {
      autoAlpha: 0,
      ease: Power0.easeNone,
    });
  };

  private showInfoPanel = (): void => {
    this.animateInfoPanel();
  };

  private animateInfoPanel = (): void => {
    const timeline = this.revealPanelTimeline;
    const duration = getPanelState() ? timeline.duration() - timeline.time() : timeline.time();
    const progress = getPanelState() ? 1 : 0;
    TweenMax.to(timeline, duration, {
      progress,
      ease: Expo.easeInOut,
    });
  };

  public dispose() {
    super.dispose();
  }
}
