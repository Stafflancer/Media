import { debounce } from 'lodash';
import { getGutter } from '../../../../util/helpers/getGutter';
import AbstractBlock from '../../AbstractBlock';
import { TweenMax, Expo, TimelineMax } from 'gsap';

class ColoredCardsClickCarousel extends AbstractBlock {
  public element: HTMLElement;
  private itemsInView: number = 2;
  private static debounceDelay: number = 100;
  private static isDisabled: string = 'is-disabled';
  private controllerActive: boolean = true;
  private readonly carouselWrapper: HTMLElement;
  private readonly carousel: HTMLElement;
  private readonly carouselItems: Array<HTMLElement>;
  private readonly cardHeaders: Array<HTMLElement>;
  private readonly cardPlayButtons: Array<HTMLElement>;
  private readonly elementsToAnimate?: Array<Array<HTMLElement>>;
  private activeIndex: number = 0;
  private previousButton: HTMLButtonElement = this.getElement('[data-control-previous]');
  private nextButton: HTMLButtonElement = this.getElement('[data-control-next]');
  private controlButtons: Array<HTMLButtonElement> = [this.previousButton, this.nextButton];

  constructor(props: any) {
    super(props.el);
    const {
      el,
      carouselWrapper,
      carousel,
      carouselItems,
      cardHeaders,
      cardPlayButtons,
      elementsToAnimate,
    } = props;
    this.element = el;
    this.carouselWrapper = carouselWrapper;
    this.carousel = carousel;
    this.carouselItems = carouselItems;
    this.cardHeaders = cardHeaders;
    this.cardPlayButtons = cardPlayButtons;
    this.elementsToAnimate = elementsToAnimate;
    this.setItemWidth();
    this.setCarouselWidth();
    this.setButtonState();
    window.addEventListener('resize', this.handleWindowResize);
    this.controlButtons.forEach(button =>
      button.addEventListener('click', this.handleCarouselControlButtonClick),
    );
    this.animateCarousel();
    // this.transitionIn();
  }

  private setButtonState = (): void => {
    if (this.carouselItems.length <= this.itemsInView) {
      this.getElement('.carousel-controls').classList.add('is-hidden');
      return;
    }

    this.activeIndex < this.itemsInView - 1
      ? this.previousButton.classList.add(ColoredCardsClickCarousel.isDisabled)
      : this.previousButton.classList.remove(ColoredCardsClickCarousel.isDisabled);

    this.activeIndex === this.carouselItems.length - this.itemsInView
      ? this.nextButton.classList.add(ColoredCardsClickCarousel.isDisabled)
      : this.nextButton.classList.remove(ColoredCardsClickCarousel.isDisabled);
  };

  private animateCardContent = (direction: number): void => {
    // this.animateOutContent(direction);

    if (this.activeIndex === this.carouselItems.length - this.itemsInView) {
      this.elementsToAnimate &&
        this.elementsToAnimate.forEach((elements, index) => {
          if (elements.length === 0) return;
          this.animateContent(direction, [elements[this.activeIndex + 1]], index);
        });
    } else if (this.activeIndex < this.itemsInView - 1) {
      this.elementsToAnimate &&
        this.elementsToAnimate.forEach((elements, index) => {
          if (elements.length === 0) return;
          this.animateContent(direction, [elements[0]], index);
        });
    } else {
      this.elementsToAnimate &&
        this.elementsToAnimate.forEach((elements, index) => {
          if (elements.length === 0) return;
          this.animateContent(
            direction,
            [elements[this.activeIndex], elements[this.activeIndex + 1]],
            index,
          );
        });
    }
  };

  private animateOutContent = (direction: number): void => {
    this.elementsToAnimate &&
      this.elementsToAnimate.forEach(elements => {
        if (elements.length === 0) return;
        elements.forEach((element, index) => {
          if (index === this.activeIndex || index === this.activeIndex + 1) return;
          TweenMax.to(element, 1, {
            autoAlpha: 0,
            x: -direction * 75,
            ease: Expo.easeInOut,
          });
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
        x: direction * 75,
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

  private animateCarousel = (direction: number = 1): void => {
    const x = -(
      this.activeIndex *
      (this.carouselWrapper.getBoundingClientRect().width / this.itemsInView +
        getGutter() / this.itemsInView)
    );
    TweenMax.to(this.carousel, 1.2, {
      x,
      ease: Expo.easeInOut,
    });

    // this.animateCardContent(direction);
  };

  private transitionIn = (): void => {
    this.elementsToAnimate &&
      this.elementsToAnimate.forEach((elements, index) => {
        console.log(elements);
        if (elements.length === 0) return;
        this.animateContent(1, [elements[0], elements[1]], index);
      });
  };

  private setItemWidth = (): void => {
    const width = this.carouselItems[0].getBoundingClientRect().width;
    this.carouselItems.forEach(item => (item.style.width = `${width}px`));
  };

  private setCarouselWidth = (): void => {
    const gutter = (this.carouselItems.length - 1) * getGutter();
    const width = this.carouselItems[0].getBoundingClientRect().width * this.carouselItems.length;
    this.carousel.style.width = `${gutter + width}px`;
  };

  private handleWindowResize = debounce((): void => {
    if (!this.controllerActive) return;
    this.setItemWidth();
    this.setCarouselWidth();
  }, ColoredCardsClickCarousel.debounceDelay);

  private handleCarouselControlButtonClick = (event: Event): void => {
    const multiplier = event.currentTarget === this.nextButton ? 1 : -1;
    const targetIndex = this.activeIndex + multiplier * this.itemsInView;
    this.activeIndex =
      targetIndex < 0
        ? 0
        : targetIndex > this.carouselItems.length - this.itemsInView
        ? this.carouselItems.length - this.itemsInView
        : targetIndex;
    this.animateCarousel(multiplier);
    this.setButtonState();
  };

  public dispose() {
    this.controllerActive = false;
    this.controlButtons.forEach(button =>
      button.removeEventListener('click', this.handleCarouselControlButtonClick),
    );
    window.addEventListener('resize', this.handleWindowResize);
    TweenMax.set([this.carousel, ...this.carouselItems], {
      clearProps: 'all',
    });
  }
}

export { ColoredCardsClickCarousel };
