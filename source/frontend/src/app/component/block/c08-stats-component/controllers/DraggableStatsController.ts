import { debounce } from 'lodash';
// @ts-ignore
import { Draggable } from 'gsap/Draggable';
import { TweenMax } from 'gsap';
import ThrowProps from '../../../../util/vendor/gsap/plugins/ThrowPropsPlugin';
import AbstractTransitionBlock from '../../AbstractTransitionBlock';

interface DraggableBounds {
  minX: number;
  maxX: number;
}

export class DraggableStatsController extends AbstractTransitionBlock {
  private static debounceDelay: number = 100;
  private controllerIsActive: boolean = true;
  private draggableStats: Draggable;
  private draggableScrollbar: Draggable;
  private scrollTrack: HTMLElement = this.getElement('[data-scrollbar]');
  private scrollKnob: HTMLElement = this.getElement('[data-scroll-knob]');
  private carouselWrapper: HTMLElement = this.getElement('[data-carousel-wrapper]');
  private carousel: HTMLElement = this.getElement('[data-carousel]');
  private carouselItems: Array<HTMLElement> = this.getElements('[data-statistic-item]');
  private scrollTrackProgress: number = 0;
  private dragProgress: number = 0;
  private usingScrollbar: boolean = false;

  constructor(el: HTMLElement) {
    super(el);
    this.draggableStats = this.setupCarousel();
    this.draggableScrollbar = this.setupScrollbar();
    this.setCopyPosition();
    window.addEventListener('resize', this.handleWindowResize);
    TweenMax.ticker.addEventListener('tick', this.handleTick);

    setTimeout(() => {
      this.setCopyPosition();
      this.draggableStats.applyBounds(this.getBounds());
    }, 1000);
  }

  private handleTick = (): void => {
    if (this.scrollTrackProgress !== this.dragProgress) {
      this.scrollTrackProgress = this.dragProgress;
      this.setDraggableCarousel();
      this.setDraggableScrollbar();
    }
  };

  private setDraggableCarousel = (): void => {
    if (!this.usingScrollbar) return;
    const width = this.getItemsWidth();
    const bounds = this.getCarouselWrapperWidth();
    const x = (bounds - width) * this.scrollTrackProgress;
    TweenMax.set(this.carousel, {
      x,
    });
  };

  private setDraggableScrollbar = (): void => {
    if (this.usingScrollbar) return;
    const x =
      Math.round(
        this.scrollTrack.getBoundingClientRect().width -
          this.scrollKnob.getBoundingClientRect().width,
      ) * this.dragProgress;

    TweenMax.set(this.scrollKnob, {
      x,
    });
  };

  private setCopyPosition = (): void => {
    const label = this.getElements('[data-label]');
    const copyItems = this.getElements('[data-copy-wrapper]');

    copyItems.forEach(item => {
      item.style.marginLeft = '0';
    });

    copyItems.forEach((item, index) => {
      item.style.marginLeft = `${label[index].offsetLeft}px`;
    });
  };

  private setupCarousel = (): Draggable => {
    return Draggable.create(this.carousel, {
      type: 'x',
      edgeResistance: 0.98,
      throwProps: !!ThrowProps,
      bounds: this.getBounds(),
      onDrag: this.handleScrollDragProgress,
      onThrowUpdate: this.handleScrollDragProgress,
    })[0];
  };

  private setupScrollbar = (): Draggable => {
    return Draggable.create(this.scrollKnob, {
      type: 'x',
      edgeResistance: 1,
      bounds: this.scrollTrack,
      throwProps: !!ThrowProps,
      onDrag: this.handleScrollbarProgress,
      onThrowUpdate: this.handleScrollbarProgress,
    })[0];
  };

  private handleScrollbarProgress = (): void => {
    this.usingScrollbar = true;
    const maxScrollValue = Math.round(
      this.scrollTrack.getBoundingClientRect().width -
        this.scrollKnob.getBoundingClientRect().width,
    );
    this.dragProgress = Math.abs(this.draggableScrollbar.x / maxScrollValue);
  };

  private handleScrollDragProgress = (): void => {
    this.usingScrollbar = false;
    this.dragProgress = Math.abs(
      this.draggableStats.x / (this.getItemsWidth() - this.getCarouselWrapperWidth()),
    );
  };

  private getBounds = (): DraggableBounds => {
    return {
      minX: -(this.getItemsWidth() - this.getCarouselWrapperWidth()),
      maxX: 0,
    };
  };

  private getCarouselWrapperWidth = (): number =>
    this.carouselWrapper.getBoundingClientRect().width;

  private getItemsWidth = (): number =>
    this.carouselItems
      .map(item => item.getBoundingClientRect().width)
      .reduce((acc, sum) => acc + sum);

  private handleWindowResize = debounce((): void => {
    if (!this.controllerIsActive) return;
    this.draggableStats.applyBounds(this.getBounds());
  }, DraggableStatsController.debounceDelay);

  dispose(): void {
    this.controllerIsActive = false;
    this.draggableStats.kill();
    this.draggableScrollbar.kill();
    TweenMax.set([this.carousel, this.scrollKnob, ...this.getElements('[data-copy-wrapper]')], {
      clearProps: 'all',
    });
    super.dispose();
  }
}
