import ControllerController from 'controller-controller';
import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C15ImageGalleryTransitionController from './C15ImageGalleryTransitionController';
import { DraggableCarousel, DraggableCarouselProps } from '../../../util/DraggableCarousel';
import { ImageGallery, ImageGalleryProps } from './scripts/ImageGallery';

export default class C15ImageGallery extends AbstractTransitionBlock {
  public static displayName: string = 'c15-image-gallery';
  private static debounceDelay: number = 200;
  public transitionController: C15ImageGalleryTransitionController;
  private controllerController: ControllerController;
  private readonly galleryWrapper: HTMLElement = this.getElement('[data-gallery-wrapper]');
  private readonly carouselWrapper: HTMLElement = this.getElement('[data-carousel-wrapper]');
  private readonly carousel: HTMLElement = this.getElement('[data-carousel]');
  private readonly carouselItems: Array<HTMLElement> = this.getElements('[data-carousel-item]');
  private readonly previousButton: HTMLButtonElement = this.getElement('[data-control-previous]');
  private readonly nextButton: HTMLButtonElement = this.getElement('[data-control-next]');
  private itemsTotals: Array<HTMLSpanElement> = this.getElements('[data-counter]');

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C15ImageGalleryTransitionController(this);
    this.controllerController = this.setupControllerController();
    this.setItemsTotal();
  }

  private setupControllerController = (): ControllerController => {
    const draggableProps: DraggableCarouselProps = {
      el: this.element,
      carouselWrapper: this.carouselWrapper,
      carousel: this.carousel,
      carouselItems: this.carouselItems,
    };

    const imageGalleryProps: ImageGalleryProps = {
      ...draggableProps,
      galleryWrapper: this.galleryWrapper,
      previousButton: this.previousButton,
      nextButton: this.nextButton,
    };

    return new ControllerController({
      debounceDelay: C15ImageGallery.debounceDelay,
      controllers: [
        {
          minWidth: 0,
          controller: DraggableCarousel,
          props: draggableProps,
        },
        {
          minWidth: 1024,
          controller: ImageGallery,
          props: imageGalleryProps,
        },
      ],
    });
  };

  private setItemsTotal = (): void => {
    const total = `${this.itemsTotals.length}`;
    this.itemsTotals.forEach((item, index) => (item.innerText = `${index + 1}/${total}`));
  };
}
