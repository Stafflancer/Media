import { debounce } from 'lodash';
import AbstractComponent from '../../../AbstractComponent';
import { Expo, TweenMax } from 'gsap';

class ClickCarousel extends AbstractComponent {
  private static gutter: number = 20;
  private readonly itemsInView: number = 2;
  private static isDisabled: string = 'is-disabled';
  private carouselWrapper: HTMLElement = this.getElement('[data-carousel-wrapper]');
  private carousel: HTMLElement = this.getElement('[data-carousel]');
  private carouselItems: Array<HTMLElement> = this.getElements('[data-carousel-item]');
  private previousButton: HTMLButtonElement = this.getElement('[data-control-previous]');
  private nextButton: HTMLButtonElement = this.getElement('[data-control-next]');
  private cardHeaders: Array<HTMLElement> = this.getElements('[data-card-heading]');
  private cardPlayButtons: Array<HTMLElement> = this.getElements('[data-play-button]');
  private controlButtons: Array<HTMLButtonElement> = [this.previousButton, this.nextButton];
  private activeIndex: number = 0;
  private prevActiveIndex: number = 0;

  constructor(el: HTMLElement) {
    super(el);
    this.setButtonState();
    this.controlButtons.forEach(button =>
      button.addEventListener('click', this.handleCarouselControlButtonClick),
    );
    window.addEventListener('resize', this.handleWindowResize);
    // this.transitionIn();
  }

  private setButtonState = (): void => {
    this.activeIndex < this.itemsInView - 1
      ? this.previousButton.classList.add(ClickCarousel.isDisabled)
      : this.previousButton.classList.remove(ClickCarousel.isDisabled);

    this.activeIndex === this.carouselItems.length - this.itemsInView
      ? this.nextButton.classList.add(ClickCarousel.isDisabled)
      : this.nextButton.classList.remove(ClickCarousel.isDisabled);
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

  private animateCarousel = (direction: number = 1): void => {
    const x = -this.carouselItems[this.activeIndex].offsetLeft;
    TweenMax.to(this.carousel, 1.2, {
      x,
      ease: Expo.easeInOut,
    });

    // this.animateCardContent(direction);
  };

  private animateCardContent = (direction: number) => {
    if (this.activeIndex === this.carouselItems.length - this.itemsInView) {
      this.carouselItems.length % 2 == 0 &&
        this.animateContent(direction, [
          this.cardHeaders[this.activeIndex],
          this.cardPlayButtons[this.activeIndex],
        ]);
      this.animateContent(direction, [
        this.cardHeaders[this.activeIndex + 1],
        this.cardPlayButtons[this.activeIndex + 1],
      ]);
    } else if (this.activeIndex < this.itemsInView - 1) {
      if (this.carouselItems.length % 2 === 0 || this.prevActiveIndex !== this.activeIndex + 1)
        this.animateContent(direction, [this.cardHeaders[1], this.cardPlayButtons[1]]);

      this.animateContent(direction, [this.cardHeaders[0], this.cardPlayButtons[0]]);
    } else {
      this.animateContent(direction, [
        this.cardHeaders[this.activeIndex],
        this.cardPlayButtons[this.activeIndex],
        this.cardHeaders[this.activeIndex + 1],
        this.cardPlayButtons[this.activeIndex + 1],
      ]);
    }
    // this.animateOutContent(direction);
  };

  private animateOutContent = (direction: number): void => {
    this.cardHeaders.forEach((header, index) => {
      if (this.activeIndex === index || this.activeIndex + 1 === index) return;
      TweenMax.to(header, 1, {
        autoAlpha: 0,
        x: -direction * 75,
        ease: Expo.easeInOut,
      });
    });
    this.cardPlayButtons.forEach((button, index) => {
      if (this.activeIndex === index || this.activeIndex + 1 === index) return;
      TweenMax.to(button, 1, {
        autoAlpha: 0,
        x: -direction * 75,
        ease: Expo.easeInOut,
      });
    });
  };

  private animateContent = (direction: number, elements: Array<HTMLElement>): void => {
    elements.forEach(element => {
      TweenMax.fromTo(
        element,
        1.2,
        {
          autoAlpha: 0,
          x: direction * 75,
          ease: Expo.easeInOut,
        },
        {
          autoAlpha: 1,
          x: 0,
          delay: 0.35,
        },
      );
    });
  };

  private transitionIn = (): void => {
    this.animateContent(1, [
      this.cardHeaders[this.activeIndex],
      this.cardPlayButtons[this.activeIndex],
      this.cardHeaders[this.activeIndex + 1],
      this.cardPlayButtons[this.activeIndex + 1],
    ]);
  };

  private handleWindowResize = debounce((): void => {
    this.animateCarousel();
  }, 200);

  public dispose() {
    this.carouselItems.forEach(item => (item.style.width = 'auto'));
  }
}

export { ClickCarousel };
