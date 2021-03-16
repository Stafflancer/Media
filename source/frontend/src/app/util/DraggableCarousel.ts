// @ts-ignore
import Draggable from 'gsap/Draggable';
import { debounce } from 'lodash';
import { TweenMax, Power2 } from 'gsap';
import AbstractBlock from '../component/block/AbstractBlock';
import ThrowPropsPlugin from './vendor/gsap/plugins/ThrowPropsPlugin';
import { getGutter } from './helpers/getGutter';

interface DraggableBounds {
  minX: number;
  maxX: number;
}

interface DraggableCarouselProps {
  el: HTMLElement;
  carouselWrapper: HTMLElement;
  carousel: HTMLElement;
  carouselItems: Array<HTMLElement>;
  draggableProps?: object;
  elementsToAnimate?: Array<Array<HTMLElement>>;
}

class DraggableCarousel extends AbstractBlock {
  public element: HTMLElement;
  private static debounceDelay: number = 200;
  private draggable: Draggable;
  private readonly carouselWrapper: HTMLElement;
  private readonly carousel: HTMLElement;
  private readonly carouselItems: Array<HTMLElement>;
  private readonly draggableProps: object;
  private readonly elementsToAnimate?: Array<Array<HTMLElement>>;
  private activeSlideIndex: number = 0;
  private previousActiveSlideIndex: number = 0;
  private controllerActive: boolean = true;

  constructor(props: DraggableCarouselProps) {
    super(props.el);
    const {
      el,
      carouselWrapper,
      carousel,
      carouselItems,
      draggableProps = {},
      elementsToAnimate,
    } = props;
    this.element = el;
    this.carouselWrapper = carouselWrapper;
    this.carousel = carousel;
    this.carouselItems = carouselItems;
    this.draggableProps = draggableProps;
    this.elementsToAnimate = elementsToAnimate;
    this.setCarouselWidth();
    this.setCarouselItemWidth();
    this.draggable = this.initializeDraggable();
    window.addEventListener('resize', this.handleWindowResize);
  }

  private setCarouselWidth = (): void => {
    this.carousel.style.width = `${this.getCarouselWidth()}px`;
  };

  private initializeDraggable = (): Draggable => {
    // this.transitionIn();
    return Draggable.create(this.carousel, {
      type: 'x',
      edgeResistance: 0.95,
      throwProps: !!ThrowPropsPlugin,
      bounds: this.getBounds(),
      snap: this.handleSnap,
      ...this.draggableProps,
    })[0];
  };

  private transitionToActiveSlide = (): void => {
    const x = (this.getCarouselWrapperWidth() + getGutter()) * this.activeSlideIndex * -1;
    TweenMax.to(this.carousel, 0.5, {
      x,
      ease: Power2.easeInOut,
    });
  };

  private handleWindowResize = debounce((): void => {
    if (!this.controllerActive) return;
    this.setCarouselWidth();
    this.setCarouselItemWidth();
    this.setBounds();
    this.transitionToActiveSlide();
  }, DraggableCarousel.debounceDelay);

  private handleSnap = (value: number) => {
    this.previousActiveSlideIndex = this.activeSlideIndex;
    this.activeSlideIndex = this.getSnapIndex(value);
    // this.animateElements();
    return -(this.activeSlideIndex * (this.getCarouselWrapperWidth() + getGutter()));
  };

  private filterElementsByIndex = (array: Array<Array<HTMLElement>>, index: number) =>
    array.filter(element => element && element).map(element => element[index]);

  private animateOutElements = (): void => {
    this.elementsToAnimate &&
      this.elementsToAnimate.forEach(elements => {
        elements.forEach((element, index) => {
          if (index === this.activeSlideIndex) return;
          TweenMax.to(element, 0.1, {
            autoAlpha: 0,
            ease: Power2.easeInOut,
          });
        });
      });
    const activeElements =
      this.elementsToAnimate &&
      this.filterElementsByIndex(this.elementsToAnimate, this.activeSlideIndex);
    this.elementsToAnimate &&
      TweenMax.staggerTo(
        activeElements,
        1,
        {
          autoAlpha: 1,
          x: 0,
          ease: Power2.easeInOut,
        },
        0.2,
      );
  };

  private animateElements = (): void => {
    if (this.activeSlideIndex === this.previousActiveSlideIndex) return;
    // this.animateOutElements();

    const prevElements =
      this.elementsToAnimate &&
      this.filterElementsByIndex(this.elementsToAnimate, this.previousActiveSlideIndex);

    const activeElements =
      this.elementsToAnimate &&
      this.filterElementsByIndex(this.elementsToAnimate, this.activeSlideIndex);

    prevElements &&
      TweenMax.staggerTo(
        prevElements,
        0.35,
        {
          autoAlpha: 0,
          x: this.activeSlideIndex < this.previousActiveSlideIndex ? -30 : +30,
          ease: Power2.easeInOut,
        },
        0.02,
      );
  };

  private transitionIn = (): void => {
    const activeElements =
      this.elementsToAnimate &&
      this.filterElementsByIndex(this.elementsToAnimate, this.activeSlideIndex);
    this.elementsToAnimate &&
      TweenMax.staggerTo(
        activeElements,
        1,
        {
          autoAlpha: 1,
          x: 0,
          ease: Power2.easeInOut,
        },
        0.2,
      );
  };

  private getSnapIndex = (value: number): number => {
    const index = Math.round(value / this.getCarouselWrapperWidth()) * -1;
    return index < 0
      ? 0
      : index > this.carouselItems.length - 1
      ? this.carouselItems.length - 1
      : index;
  };

  private setCarouselItemWidth = (): void => {
    this.carouselItems.forEach(item => {
      item.style.width = `${this.getCarouselWrapperWidth()}px`;
    });
  };

  private getCarouselWidth = (): number => {
    const gutter = getGutter() * (this.carouselItems.length - 1);
    return this.getCarouselWrapperWidth() * this.carouselItems.length + gutter;
  };

  private getCarouselWrapperWidth = (): number =>
    this.carouselWrapper.getBoundingClientRect().width;

  private setBounds = (): void => {
    this.draggable.applyBounds(this.getBounds());
  };

  private getBounds = (): DraggableBounds => ({
    minX: -(this.getCarouselWidth() - this.carouselWrapper.getBoundingClientRect().width),
    maxX: 0,
  });

  public dispose() {
    this.controllerActive = false;
    window.removeEventListener('resize', this.handleWindowResize);
    this.draggable.kill();
    TweenMax.set([this.carousel, ...this.carouselItems], {
      clearProps: 'all',
    });
  }
}

// @ts-ignore
export { DraggableCarousel, DraggableCarouselProps };
