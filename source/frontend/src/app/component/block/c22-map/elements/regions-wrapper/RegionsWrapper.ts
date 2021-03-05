// @ts-ignore
import { Draggable } from 'gsap/Draggable';
import { TimelineMax, TweenMax, Power0, Power2, Expo } from 'gsap';
import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import {
  getActiveLocationIndex,
  setActiveHotspotIndex,
  getOffsetRange,
  getPanelState,
  handleRegionState,
  handlePanelState,
} from '../../helpers';

export default class RegionsWrapper extends AbstractTransitionBlock {
  public static displayName: string = 'regions-wrapper';
  private readonly regions: Array<HTMLElement> = this.getElements('[data-region]');
  private readonly regionTimelines: Array<TimelineMax>;
  private shiftOverTimeline: TimelineMax;
  private hotspots: Array<HTMLElement> = this.getElements('[data-region-hotspot]');
  private draggableNavigation: Draggable | null;
  private activeIndex: number = 0;

  constructor(el: HTMLElement) {
    super(el);
    handleRegionState(this.handleLocationSubscription);
    this.regionTimelines = this.setupRegionTimelines();
    this.draggableNavigation = this.setupDraggableNavigation();
    this.setActiveIndex();
    this.positionHotspots();
    this.handleRegionState();
    handlePanelState(this.handleMapPosition);
    window.addEventListener('resize', this.handleWindowResize);
    this.shiftOverTimeline = this.setupShiftOverTimeline();
  }

  private handleWindowResize = (): void => {
    this.shiftOverTimeline = this.setupShiftOverTimeline();
  };

  private setupShiftOverTimeline = (): TimelineMax => {
    const x = 400 * -1;
    return <TimelineMax>new TimelineMax({ paused: true }).to(this.element, 1, {
      x,
      ease: Power0.easeNone,
    });
  };

  private handleMapPosition = (): void => {
    if (!window.matchMedia('(min-width: 1440px)').matches) return;
    const timeline = this.shiftOverTimeline;
    const state = getPanelState();
    const duration = state ? timeline.duration() - timeline.time() : timeline.time();
    TweenMax.to(timeline, duration, {
      progress: state ? 1 : 0,
      ease: Expo.easeInOut,
    });
  };

  private setActiveIndex = (): void => {
    this.activeIndex = getActiveLocationIndex();
  };

  private positionHotspots = (): void => {
    this.hotspots.forEach(hotspot => {
      hotspot.style.top = `${hotspot.dataset.regionY}%`;
      hotspot.style.left = `${hotspot.dataset.regionX}%`;
    });
  };

  private handleRegionState = (): void => {
    this.setRegionState(this.activeIndex, false);
    this.setRegionState(getActiveLocationIndex(), true);
    this.setActiveIndex();
  };

  private setRegionState = (index: number, state: boolean): void => {
    const timeline = this.regionTimelines[index];
    const duration = state ? timeline.duration() - timeline.time() : timeline.time();
    const progress = state ? 1 : 0;
    const ease = state ? Power2.easeInOut : Power2.easeOut;
    TweenMax.to(timeline, duration, { progress, ease });
  };

  private handleLocationSubscription = (): void => {
    this.handleRegionState();
  };

  private setupRegionTimelines = (): Array<TimelineMax> => {
    return this.regions.map(region => {
      const timeline = new TimelineMax({ paused: true });
      timeline.add(this.animateRegion(region));
      timeline.add(this.animateHotspot(region));
      return timeline;
    });
  };

  private animateRegion = (region: HTMLElement): TimelineMax => {
    const timeline = new TimelineMax();
    timeline.from(region, 1, {
      autoAlpha: 0,
      ease: Power2.easeInOut,
    });
    return timeline;
  };

  private animateHotspot = (region: HTMLElement): Array<TweenMax> => {
    const hotspots = region.querySelectorAll('[data-location-hotspot]');
    return TweenMax.staggerFromTo(
      hotspots,
      1,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        ease: Power0.easeNone,
      },
      0.5,
    );
  };

  private setupDraggableNavigation = (): void => {
    return Draggable.create()[0];
  };

  public dispose() {
    super.dispose();
  }
}
