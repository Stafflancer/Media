import { TimelineMax, TweenMax, Power0, Expo } from 'gsap';
import ControllerController from 'controller-controller';
import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import { DraggableController } from './controllers/DraggableController';
import {
  getActiveLocationIndex,
  handlePanelState,
  setActiveLocationIndex,
  getPanelState,
} from '../../helpers';

export default class RegionsNavigation extends AbstractTransitionBlock {
  public static displayName: string = 'regions-navigation';
  private static isActive: string = 'is-active';
  private static debounceDelay: number = 100;
  private readonly shiftTimeline: TimelineMax;
  private controllerController: ControllerController;
  private locationButtons: Array<HTMLButtonElement> = this.getElements('[data-location-button]');

  constructor(el: HTMLElement) {
    super(el);
    this.controllerController = this.setupControllerController();
    this.shiftTimeline = this.setupShiftTimeline();
    this.setTotals();
    this.setButtonState();
    handlePanelState(this.handlePanelState);
    this.locationButtons.forEach(button =>
      button.addEventListener('click', this.handleLocationButtonClick),
    );
  }

  private setTotals = (): void => {};

  private setupShiftTimeline = (): TimelineMax => {
    return <TimelineMax>new TimelineMax({ paused: true }).to(this.element, 1, {
      x: -100,
      autoAlpha: 0,
      ease: Power0.easeNone,
    });
  };

  private setupControllerController = (): ControllerController => {
    return new ControllerController({
      debounceDelay: RegionsNavigation.debounceDelay,
      controllers: [
        {
          minWidth: 0,
          controller: DraggableController,
          props: this.element,
        },
      ],
    });
  };

  private handlePanelState = (): void => {
    if (!window.matchMedia('(min-width: 1440px)').matches) return;
    const state = getPanelState();
    const timeline = this.shiftTimeline;
    const progress = state ? 1 : 0;
    const duration = state ? timeline.duration() - timeline.time() : timeline.time();
    TweenMax.to(timeline, duration, {
      progress,
      ease: Expo.easeInOut,
    });
  };

  private handleLocationButtonClick = (event: Event): void => {
    setActiveLocationIndex(this.locationButtons.indexOf(<HTMLButtonElement>event.currentTarget));
    this.setButtonState();
  };

  private setButtonState = (): void => {
    this.locationButtons.forEach((button, index) => {
      index === getActiveLocationIndex()
        ? button.classList.add(RegionsNavigation.isActive)
        : button.classList.remove(RegionsNavigation.isActive);
    });
  };

  public dispose() {
    super.dispose();
    this.locationButtons.forEach(button =>
      button.removeEventListener('click', this.handleLocationButtonClick),
    );
  }
}
