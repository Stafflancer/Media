import { TweenMax, Expo } from 'gsap';
import AbstractBlock from '../../AbstractBlock';

class SliderController extends AbstractBlock {
  public element: HTMLElement;
  private controllerActive: boolean = true;
  private readonly itemsInView: number = 2;
  private readonly gutter: number;
  private readonly carouselWrapper: HTMLElement;
  private readonly carousel: HTMLElement;
  private readonly carouselItems: Array<HTMLElement>;
  private readonly previousButton: HTMLElement;
  private readonly nextButton: HTMLElement;
  private itemWidth: number = 0;
  private activeIndex: number = 0;
  private cardHeaders: Array<HTMLElement> = this.getElements('[data-card-heading]');
  private cardPlayButtons: Array<HTMLElement> = this.getElements('[data-play-button]');

  constructor(el: HTMLElement) {
    super(el);
    this.element = el;
    this.gutter = parseFloat(getComputedStyle(this.element).getPropertyValue('--gutter-offset'));
    this.carouselWrapper = this.getElement('[data-carousel-wrapper]');
    this.carousel = this.getElement('[data-carousel]');
    this.carouselItems = this.getElements('[data-carousel-item]');
    this.previousButton = this.getElement('[data-control-previous]');
    this.nextButton = this.getElement('[data-control-next]');
    this.setButtonState();
    this.setSliderWidth();
    this.setItemWidth();
    window.addEventListener('resize', this.handleWindowResize);
    this.previousButton.addEventListener('click', this.handlePreviousSlide);
    this.nextButton.addEventListener('click', this.handleNextSlide);
  }

  private handlePreviousSlide = (): void => {
    this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : 0;
    this.animateToItem(-1);
    this.setButtonState();
  };

  private handleNextSlide = (): void => {
    this.activeIndex =
      this.activeIndex < this.carouselItems.length - 1
        ? this.activeIndex + 1
        : this.carouselItems.length - 1;
    this.animateToItem(1);
    this.setButtonState();
  };

  private setButtonState = (): void => {
    this.activeIndex === 0
      ? this.previousButton.classList.add('is-disabled')
      : this.previousButton.classList.remove('is-disabled');
    this.activeIndex === this.carouselItems.length - 1
      ? this.nextButton.classList.add('is-disabled')
      : this.nextButton.classList.remove('is-disabled');
  };

  private getCarouselWrapperWidth = (): number =>
    this.carouselWrapper.getBoundingClientRect().width;

  private setSliderWidth = (): void => {
    const width = (this.getCarouselWrapperWidth() + this.gutter) * this.carouselItems.length;
    this.itemWidth = width;
    this.carousel.style.width = `${width}px`;
  };

  private setItemWidth = (): void => {
    this.carouselItems.forEach(item => (item.style.width = `${this.getItemWidth()}px`));
  };

  private getItemWidth = (): number => this.getCarouselWrapperWidth() + this.gutter;

  private animateToItem = (direction: number = 1): void => {
    const x = -(this.getItemWidth() * this.activeIndex);
    TweenMax.to(this.carousel, 1, {
      x,
      ease: Expo.easeInOut,
    });
    // this.animateCardContent(direction);
  };

  private animateCardContent = (direction: number): void => {
    if (this.activeIndex < this.itemsInView - 1) {
      this.animateContent(direction, [this.cardPlayButtons[0]]);
    } else {
      direction < 1
        ? this.animateContent(direction, [this.cardPlayButtons[this.activeIndex]])
        : this.animateContent(direction, [this.cardPlayButtons[this.activeIndex + 1]]);
    }
    // this.animateOutContent(direction);
  };

  private animateOutContent = (direction: number): void => {
    this.cardPlayButtons.forEach((card, index) => {
      if (this.activeIndex === index || this.activeIndex + 1 === index) return;
      TweenMax.to(card, 1, {
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
        },
      );
    });
  };

  private handleWindowResize = (): void => {
    if (!this.controllerActive) return;
    this.setSliderWidth();
    this.setItemWidth();
    this.animateToItem();
  };

  public dispose() {
    this.controllerActive = false;

    this.previousButton.addEventListener('click', this.handlePreviousSlide);
    this.nextButton.addEventListener('click', this.handleNextSlide);
  }
}

export { SliderController };
