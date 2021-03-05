import { TweenMax, Expo } from 'gsap';
import { debounce } from 'lodash';
import { getGutter } from '../../../../util/helpers/getGutter';
import AbstractBlock from '../../AbstractBlock';

interface ImageGalleryProps {
  el: HTMLElement;
  galleryWrapper: HTMLElement;
  carouselWrapper: HTMLElement;
  carousel: HTMLElement;
  carouselItems: Array<HTMLElement>;
  previousButton: HTMLButtonElement;
  nextButton: HTMLButtonElement;
}

class ImageGallery extends AbstractBlock {
  public element: HTMLElement;
  private static debounceDelay: number = 100;
  private static isDisabled: string = 'is-disabled';
  private readonly galleryWrapper: HTMLElement;
  private readonly carouselWrapper: HTMLElement;
  private readonly previousButton: HTMLButtonElement;
  private readonly nextButton: HTMLButtonElement;
  private readonly carousel: HTMLElement;
  private readonly carouselButtons: Array<HTMLButtonElement>;
  private readonly carouselItems: Array<HTMLElement>;
  private activeIndex: number = 0;
  private controllerActive: boolean = true;

  constructor(props: ImageGalleryProps) {
    super(props.el);
    const { el, carouselWrapper, carousel, carouselItems, previousButton, nextButton } = props;
    this.element = el;
    this.galleryWrapper = props.galleryWrapper;
    this.carouselWrapper = carouselWrapper;
    this.carousel = carousel;
    this.previousButton = previousButton;
    this.nextButton = nextButton;
    this.carouselButtons = [previousButton, nextButton];
    this.carouselItems = carouselItems;
    this.setButtonState();
    this.setItemWidth();
    this.setCarouselWidth();
    window.addEventListener('resize', this.handleWindowResize);
    this.carouselButtons.forEach(button =>
      button.addEventListener('click', this.handleCarouselButtonClick),
    );
  }

  private setItemWidth = (): void => {
    const width = this.getCarouselWidth();
    this.carouselItems.forEach(item => (item.style.width = `${width}px`));
  };

  private setCarouselWidth = (): void => {
    const gutterTotal = getGutter() * (this.carouselItems.length - 1);
    const columnTotal =
      ((this.galleryWrapper.getBoundingClientRect().width - this.getCarouselWidth()) / 2) *
      (this.carouselItems.length - 1);
    const carouselWidthTotal = this.getCarouselWidth() * this.carouselItems.length;
    const width = gutterTotal + columnTotal + carouselWidthTotal;
    this.carousel.style.width = `${width}px`;
  };

  private handleWindowResize = debounce((): void => {
    if (!this.controllerActive) return;
    this.setItemWidth();
    this.setCarouselWidth();
    this.animateCarousel();
  }, ImageGallery.debounceDelay);

  private getCarouselWidth = (): number => this.carouselWrapper.getBoundingClientRect().width;

  private handleCarouselButtonClick = (event: Event): void => {
    const indexOffset = event.currentTarget === this.nextButton ? 1 : -1;
    const targetIndex = this.activeIndex + indexOffset;
    this.activeIndex =
      targetIndex < 0
        ? 0
        : targetIndex > this.carouselItems.length - 1
        ? this.carouselItems.length - 1
        : targetIndex;
    this.animateCarousel();
    this.setButtonState();
  };

  private animateCarousel = (): void => {
    const carouselWrapperWidth = this.carouselWrapper.getBoundingClientRect().width;
    const padding = (this.galleryWrapper.getBoundingClientRect().width - carouselWrapperWidth) / 2;
    const itemOffset = carouselWrapperWidth + padding + getGutter();
    const x = -(itemOffset * this.activeIndex);
    TweenMax.to(this.carousel, 1, {
      x,
      ease: Expo.easeInOut,
    });
  };

  private setButtonState = (): void => {
    this.activeIndex === 0
      ? this.previousButton.classList.add(ImageGallery.isDisabled)
      : this.previousButton.classList.remove(ImageGallery.isDisabled);

    this.activeIndex === this.carouselItems.length - 1
      ? this.nextButton.classList.add(ImageGallery.isDisabled)
      : this.nextButton.classList.remove(ImageGallery.isDisabled);
  };

  public dispose() {
    this.controllerActive = false;
    window.addEventListener('resize', this.handleWindowResize);
    TweenMax.set([this.carousel, ...this.carouselItems], {
      clearProps: 'all',
    });
  }
}

export { ImageGalleryProps, ImageGallery };
