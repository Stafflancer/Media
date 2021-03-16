// @ts-ignore
import Draggable from 'gsap/Draggable';
import { TweenMax, Expo } from 'gsap';
import { debounce } from 'lodash';
import AbstractComponent from '../component/AbstractComponent';
import ThrowProps from './vendor/gsap/plugins/ThrowPropsPlugin';

interface DraggableBounds {
  minX: number;
  maxX: number;
}

class CardCarousel extends AbstractComponent {
  private static debounceDelay: number = 100;
  private readonly itemsInView: number = 3;
  private static isDisabled: string = 'is-disabled';
  private readonly elementsToAnimate: Array<Array<HTMLElement>>;
  private readonly carouselWrapper: HTMLElement = this.getElement('[data-carousel-wrapper]');
  private readonly carousel: HTMLElement = this.getElement('[data-carousel]');
  private readonly carouselItems: Array<HTMLElement> = this.getElements('[data-carousel-item]');
  private previousButton: HTMLButtonElement = this.getElement('[data-control-previous]');
  private nextButton: HTMLButtonElement = this.getElement('[data-control-next]');
  private controlButtons: Array<HTMLButtonElement> = [this.previousButton, this.nextButton];
  private draggable: Draggable;
  private activeIndex: number = 0;
  private prevActiveIndex: number = 0;
  private readonly gutter: number = parseFloat(
    getComputedStyle(this.element).getPropertyValue('--gutter'),
  );

  constructor(props: any) {
    super(props.el);
    const { el, elementsToAnimate } = props;
    this.elementsToAnimate = elementsToAnimate;
    this.setButtonState();
    this.draggable = this.setupDraggable();
    this.controlButtons.forEach(button =>
      button.addEventListener('click', this.handleCarouselControlButtonClick),
    );
    window.addEventListener('resize', this.handleWindowResize);
    // this.transitionIn();
  }

  private setButtonState = (): void => {
    this.activeIndex === 0
      ? this.previousButton.classList.add(CardCarousel.isDisabled)
      : this.previousButton.classList.remove(CardCarousel.isDisabled);

    this.activeIndex === this.carouselItems.length - this.itemsInView
      ? this.nextButton.classList.add(CardCarousel.isDisabled)
      : this.nextButton.classList.remove(CardCarousel.isDisabled);
  };

  private setupDraggable = (): Draggable => {
    return Draggable.create(this.carousel, {
      type: 'x',
      edgeResistance: 0.97,
      throwProps: !!ThrowProps,
      bounds: this.getBounds(),
      snap: this.handleSnap,
    })[0];
  };

  private transitionIn = (): void => {
    this.elementsToAnimate.forEach(elements => {
      elements.forEach((element: any, index) => {
        if (index >= this.itemsInView) return;
        TweenMax.fromTo(
          element,
          1.2,
          {
            autoAlpha: 0,
            y: 20,
            ease: Expo.easeInOut,
          },
          {
            autoAlpha: 1,
            y: 0,
            delay: 0.05 * index,
          },
        );
      });
    });
  };

  private handleCarouselControlButtonClick = (event: Event): void => {
    const multiplier = event.currentTarget === this.nextButton ? 1 : -1;
    const targetIndex = this.activeIndex + multiplier * this.itemsInView;
    this.prevActiveIndex = this.activeIndex;
    this.activeIndex =
      targetIndex < 0
        ? 0
        : targetIndex > this.carouselItems.length - this.itemsInView
        ? this.carouselItems.length - this.itemsInView
        : targetIndex;
    this.animateCarousel(multiplier);
    this.setButtonState();
  };

  private getBounds = (): DraggableBounds => {
    const minX = -(this.getTotalItemWidth() - this.carouselWrapper.getBoundingClientRect().width);
    return {
      minX,
      maxX: 0,
    };
  };

  private handleSnap = (value: number): number => {
    const itemWidth = this.carouselItems[0].getBoundingClientRect().width;
    this.activeIndex = this.getSnapIndex(value);
    this.setButtonState();
    return -(this.activeIndex * (itemWidth + this.gutter));
  };

  private getSnapIndex = (value: number): number => {
    const itemWidth = this.carouselItems[0].getBoundingClientRect().width;
    const index = Math.abs(Math.round(value / itemWidth));
    return index < 0
      ? 0
      : index > this.carouselItems.length - 1
      ? this.carouselItems.length - 1
      : index;
  };

  private getTotalItemWidth = (): number => {
    const totalGutter = this.gutter * (this.carouselItems.length - 1);
    const totalItemsWidth = this.carouselItems
      .map(item => item.getBoundingClientRect().width)
      .reduce((sum, acc) => sum + acc);
    return totalGutter + totalItemsWidth;
  };

  private handleWindowResize = debounce((): void => {
    this.draggable.applyBounds(this.getBounds());
    this.animateCarousel();
  }, CardCarousel.debounceDelay);

  private animateCarousel = (direction: number = 1): void => {
    const x = -(
      (this.carouselItems[0].getBoundingClientRect().width + this.gutter) *
      this.activeIndex
    );
    TweenMax.to(this.carousel, 1, {
      x,
      ease: Expo.easeInOut,
    });

    // this.animateCardContent(direction);
  };

  private animateCardContent = (direction: number) => {
    if (this.activeIndex === this.carouselItems.length - this.itemsInView) {
      if (this.activeIndex - this.prevActiveIndex >= 3) {
        this.elementsToAnimate.forEach((elements, index) => {
          this.animateContent(
            direction,
            [
              elements[this.activeIndex],
              elements[this.activeIndex + 1],
              elements[this.activeIndex + 2],
            ],
            index,
          );
        });
      }
      if (this.activeIndex - this.prevActiveIndex == 2) {
        this.elementsToAnimate.forEach((elements, index) => {
          this.animateContent(
            direction,
            [elements[this.activeIndex + 1], elements[this.activeIndex + 2]],
            index,
          );
        });
      }
      if (this.activeIndex - this.prevActiveIndex == 1) {
        this.elementsToAnimate.forEach((elements, index) => {
          this.animateContent(direction, [elements[this.activeIndex + 2]], index);
        });
      }
    } else if (this.activeIndex < 1) {
      if (this.prevActiveIndex >= this.activeIndex + this.itemsInView - 1) {
        this.elementsToAnimate.forEach((elements, index) => {
          this.animateContent(
            direction,
            this.prevActiveIndex + 1 - this.itemsInView === this.activeIndex
              ? [elements[1]]
              : [elements[1], elements[2]],
            index,
          );
        });
      }
      this.elementsToAnimate.forEach((elements, index) => {
        this.animateContent(direction, [elements[0]], index);
      });
    } else {
      this.elementsToAnimate.forEach((elements, index) => {
        this.animateContent(
          direction,
          [
            elements[this.activeIndex],
            elements[this.activeIndex + 1],
            elements[this.activeIndex + 2],
          ],
          index,
        );
      });
    }
    // this.animateOutContent(direction);
  };

  private animateOutContent = (direction: number): void => {
    this.elementsToAnimate.forEach(elements => {
      elements.forEach((element: any, index) => {
        if (index < this.activeIndex || index > this.activeIndex + this.itemsInView - 1) {
          TweenMax.to(element, 1, {
            autoAlpha: 0,
            x: -direction * 75,
            ease: Expo.easeInOut,
          });
        }
      });
    });
  };

  private animateContent = (
    direction: number,
    elements: Array<HTMLElement>,
    index: number = 0,
  ): void => {
    TweenMax.staggerFromTo(
      elements,
      1.2,
      {
        autoAlpha: 0,
        x: direction * 50,
        ease: Expo.easeInOut,
      },
      {
        autoAlpha: 1,
        x: 0,
        delay: 0.05 * index,
      },
      0.2,
    );
  };

  public dispose() {
    this.draggable.kill();
  }
}

export { CardCarousel };
