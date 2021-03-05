import AbstractBlock from '../../AbstractBlock';
// @ts-ignore
import Draggable from 'gsap/Draggable';
import ThrowPropsPlugin from '../../../../util/vendor/gsap/plugins/ThrowPropsPlugin';
import { debounce } from 'lodash';
import { TweenLite } from 'gsap';

interface DraggableBounds {
  minX: number;
  maxX: number;
}

class SliderCarousel extends AbstractBlock {
  private static gutter: number = 16; // in pixels
  private static debounceDelay: number = 200;

  private draggable: Draggable;

  private readonly carouselWrapperElement: HTMLElement = this.getElement('[data-carousel-wrapper]');
  private readonly carouselElement: HTMLElement = this.getElement('[data-carousel]');
  private readonly nextElement: HTMLElement = this.getElement('[data-carousel-next]');
  private readonly prevElement: HTMLElement = this.getElement('[data-carousel-prev]');
  private readonly carouselItemElements: Array<HTMLElement> = this.getElements(
    '[data-carousel-item]',
  );

  private snapValues: Array<number> = [];
  private currentSlideIndex: number = 0;

  constructor(el: HTMLElement) {
    super(el);

    this.setCarouselWidth();
    this.setCarouselItemWidth();
    this.updateSnapValues();

    this.draggable = this.initializeDraggable();

    window.addEventListener('resize', this.handleWindowResize);
    this.nextElement.addEventListener('click', this.next);
    this.prevElement.addEventListener('click', this.prev);
  }

  private initializeDraggable = () => {
    if (!Draggable || !ThrowPropsPlugin || window.innerWidth > 1024) return;

    return Draggable.create(this.carouselElement, {
      type: 'x',
      bounds: this.getBounds(),
      edgeResistance: 0.85,
      throwProps: true,
      snap: { x: this.snapValues },
      onThrowComplete: () => {
        this.updateCurrentSlideIndex(this.draggable.endX);
      },
    })[0];
  };

  private handleWindowResize = debounce((): void => {
    if (window.innerWidth > 1024 && this.draggable) {
      this.draggable.disable();
    } else {
      this.draggable = this.initializeDraggable();
    }
    this.setCarouselWidth();
    this.setCarouselItemWidth();
    this.updateSnapValues();
    this.setBounds();
    this.repositionSlider();
  }, SliderCarousel.debounceDelay);

  private setCarouselWidth = (): void => {
    this.carouselElement.style.width = `${this.getCarouselWidth()}px`;
  };

  private setCarouselItemWidth = (): void => {
    this.carouselItemElements.forEach(item => {
      item.style.width = `${Math.min(
        445,
        this.carouselWrapperElement.getBoundingClientRect().width,
      )}px`;
    });
  };

  private getCarouselWidth = (): number => {
    const gutter = SliderCarousel.gutter * (this.carouselItemElements.length - 1);
    const width =
      Math.min(445, this.carouselWrapperElement.getBoundingClientRect().width) *
        this.carouselItemElements.length +
      gutter;
    return width;
  };

  private setBounds = (): void => {
    this.draggable.applyBounds(this.getBounds());
  };

  private getBounds = (): DraggableBounds => ({
    minX: -(this.getCarouselWidth() - this.carouselWrapperElement.getBoundingClientRect().width),
    maxX: 0,
  });

  private updateSnapValues = () => {
    this.snapValues.length = 0;
    this.carouselItemElements.forEach((element, index) => {
      this.snapValues[index] = -(element.clientWidth + SliderCarousel.gutter) * index;
    });
  };

  private updateCurrentSlideIndex = (xPosition: number) => {
    this.currentSlideIndex = this.snapValues.findIndex(v => v === xPosition);
  };

  private repositionSlider = () => {
    TweenLite.to(this.carouselElement, 0.5, {
      x: this.snapValues[this.currentSlideIndex],
    });
  };

  private next = () => {
    if (
      this.currentSlideIndex >=
      this.carouselItemElements.length - Math.floor(window.innerWidth / 445) // 445 is the maximum width of our items
      /*      Total elements           -    Amount of elements on screen   */
    ) {
      return;
    }
    this.currentSlideIndex++;
    TweenLite.to(this.carouselElement, 0.5, {
      x: this.snapValues[this.currentSlideIndex],
    });
  };

  private prev = () => {
    if (this.currentSlideIndex <= 0) {
      return;
    }
    this.currentSlideIndex--;
    TweenLite.to(this.carouselElement, 0.5, {
      x: this.snapValues[this.currentSlideIndex],
    });
  };
}

export { SliderCarousel };
