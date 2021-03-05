// @ts-ignore
import { Draggable } from 'gsap/Draggable';
import ThrowPropsPlugin from '../../../../../util/vendor/gsap/plugins/ThrowPropsPlugin';
import { TweenMax, TimelineMax, Expo } from 'gsap';
import AbstractTransitionBlock from '../../../AbstractTransitionBlock';
import { getActiveLocationIndex, handleRegionState, setActiveHotspotIndex } from '../../helpers';

export default class HotspotNavigation extends AbstractTransitionBlock {
  public static displayName: string = 'hotspot-navigation';
  private readonly draggableNavigationTimelines: Array<TimelineMax>;
  private readonly hotspotButtons: Array<HTMLElement> = this.getElements('[data-hotspot-button]');
  private readonly draggableNavigations: Array<HTMLElement> = this.getElements(
    '[data-draggable-navigation]',
  );
  private activeIndex: number = getActiveLocationIndex();
  private draggables: any;

  constructor(el: HTMLElement) {
    super(el);
    this.draggableNavigationTimelines = this.setupDraggableNavigationTimelines();
    handleRegionState(this.handleRegionUpdate);
    this.setNavigationState(true);
    this.hotspotButtons.forEach(button =>
      button.addEventListener('click', this.handleHotspotButtonClick),
    );
    this.draggables = this.setupDraggableNavigations();
  }

  private setupDraggableNavigations = (): Array<any> => {
    return this.draggableNavigations.map(navigation => {
      const navigationItems = navigation.querySelectorAll('[data-navigation-item]');
      if (navigationItems.length <= 1) return;
      return this.setupDraggable(navigation);
    });
  };

  private setupDraggable = (element: HTMLElement): Draggable => {
    return Draggable.create(element, {
      type: 'x',
      edgeResistance: 0.95,
      throwProps: !!ThrowPropsPlugin,
      bounds: this.getBounds(element),
    })[0];
  };

  private getBounds = (element: HTMLElement): Object => {
    const minX =
      this.element.getBoundingClientRect().width *
      (element.querySelectorAll('[data-navigation-item]').length - 1) *
      -1;
    return {
      minX,
      maxX: 0,
    };
  };

  private handleHotspotButtonClick = (event: Event): void => {
    event.stopPropagation();
    setActiveHotspotIndex(this.hotspotButtons.indexOf(<HTMLElement>event.currentTarget));
  };

  private handleRegionUpdate = (): void => {
    this.showDraggableNavigation();
  };

  private setupDraggableNavigationTimelines = (): Array<TimelineMax> => {
    return this.draggableNavigations.map(navigation => this.setupNavigationTimeline(navigation));
  };

  private setupNavigationTimeline = (navigation: HTMLElement): TimelineMax => {
    return <TimelineMax>new TimelineMax({ paused: true }).from(navigation, 1, {
      autoAlpha: 0,
    });
  };

  private showDraggableNavigation = (): void => {
    this.setNavigationState(false);
    this.activeIndex = getActiveLocationIndex();
    this.setNavigationState(true);
  };

  private setNavigationState = (state: boolean): void => {
    const timeline = this.draggableNavigationTimelines[this.activeIndex];
    const progress = state ? 1 : 0;
    const delay = state ? timeline.duration() : 0;
    const duration = state ? timeline.duration() - timeline.time() : timeline.time();
    TweenMax.to(timeline, duration, {
      progress,
      delay,
    });
  };

  public dispose() {
    super.dispose();
  }
}
