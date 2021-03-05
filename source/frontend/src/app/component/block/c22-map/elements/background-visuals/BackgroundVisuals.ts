import { TweenMax, TimelineMax, Expo, Power2, Power0 } from 'gsap';
import {
  handlePanelState,
  getActiveLocationIndex,
  getPanelState,
  handleRegionState,
} from '../../helpers';
import AbstractTransitionBlock from '../../../AbstractTransitionBlock';

export default class BackgroundVisuals extends AbstractTransitionBlock {
  public static displayName: string = 'background-visuals';
  private static isHidden: string = 'is-hidden';
  private readonly itemRevealTimelines: Array<TimelineMax>;
  private activeIndex: number = 0;
  private visualList: HTMLElement = this.getElement('[data-visual-list]');
  private overlay: HTMLElement = this.getElement('[data-overlay]');
  private visuals: Array<HTMLElement> = this.getElements('[data-visual]');
  private readonly focusTimeline: TimelineMax;

  constructor(el: HTMLElement) {
    super(el);
    this.element.classList.remove(BackgroundVisuals.isHidden);
    this.setActiveIndex();
    this.focusTimeline = this.setupFocusTimeline();
    this.itemRevealTimelines = this.setupRevealTimelines();
    this.setTimelineProgress(this.activeIndex, true);
    this.showVisual();
    handlePanelState(this.handleShowPanelSubscription);
    handleRegionState(this.handleActiveIndexSubscription);
  }

  private setTimelineProgress = (index: number, status: boolean): void => {
    const progress = status ? 1 : 0;
    TweenMax.set(this.itemRevealTimelines[index], {
      progress,
    });
  };

  private handleActiveIndexSubscription = (): void => {
    this.updateVisual();
  };

  private setActiveIndex = (): void => {
    this.activeIndex = getActiveLocationIndex();
  };

  private handleShowPanelSubscription = (): void => {
    this.animateFocusTimeline();
  };

  private animateFocusTimeline = (): void => {
    if (!window.matchMedia('(min-width: 1440px)').matches) return;
    const timeline = this.focusTimeline;
    const state = getPanelState();
    const duration = state ? timeline.duration() - timeline.time() : timeline.time();
    const progress = state ? 1 : 0;
    TweenMax.to(timeline, duration, { progress });
  };

  private updateVisual = (): void => {
    this.hideVisual();
    this.setActiveIndex();
    this.showVisual();
  };

  private showVisual = (): void => {
    this.fixZIndex();
    const timeline = this.itemRevealTimelines[this.activeIndex];
    const duration = timeline.duration() - timeline.time();
    TweenMax.to(timeline, duration, {
      progress: 1,
      ease: Expo.easeInOut,
    });
  };

  private hideVisual = (): void => {
    this.fixZIndex();
    const timeline = this.itemRevealTimelines[this.activeIndex];
    TweenMax.to(timeline, timeline.time(), {
      progress: 0,
      ease: Expo.easeInOut,
    });
  };

  private fixZIndex = () => {
    const zIndex = this.activeIndex === getActiveLocationIndex() ? 1 : 0;
    this.visuals[this.activeIndex].style.zIndex = `${zIndex}`;
  };

  private setupRevealTimelines = (): Array<TimelineMax> => {
    return this.visuals.map(visual => this.createRevealTimeline(visual));
  };

  private setupFocusTimeline = (): TimelineMax => {
    const timelineMax = new TimelineMax({ paused: true });
    timelineMax.add(this.animateOverlay());
    timelineMax.add(this.shiftVisual(), 0);
    return timelineMax;
  };

  private createRevealTimeline = (el: HTMLElement): TimelineMax => {
    const timeline = new TimelineMax({ paused: true });
    timeline.fromTo(
      el,
      1.5,
      {
        autoAlpha: 0,
        scale: 1.1,
      },
      {
        autoAlpha: 1,
        scale: 1,
        ease: Power2.easeOut,
      },
    );
    return timeline;
  };

  private animateOverlay = (): TweenMax => {
    return TweenMax.to(this.overlay, 1, {
      autoAlpha: 1,
    });
  };

  private shiftVisual = (): TweenMax => {
    return TweenMax.to(this.visualList, 0.5, {
      scale: 1.2,
      ease: Power0.easeNone,
    });
  };

  public dispose() {
    super.dispose();
  }
}
