import ControllerController from 'controller-controller';
import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C10PartnerCardsTransitionController from './C10PartnerCardsTransitionController';
import { DraggableCarousel, DraggableCarouselProps } from '../../../util/DraggableCarousel';
import { CardCarousel } from '../../../util/CardCarousel';

export default class C10PartnerCards extends AbstractTransitionBlock {
  public static displayName: string = 'c10-partner-cards';
  public transitionController: C10PartnerCardsTransitionController;
  private controllerController: ControllerController;
  private readonly carouselWrapper: HTMLElement = this.getElement('[data-carousel-wrapper]');
  private readonly carousel: HTMLElement = this.getElement('[data-carousel]');
  private readonly carouselItems: Array<HTMLElement> = this.getElements('[data-carousel-item]');
  private readonly cardPicture: Array<HTMLElement> = this.getElements('[data-picture]');
  private readonly cardHeading: Array<HTMLElement> = this.getElements('[data-heading]');
  private readonly cardCopy: Array<HTMLElement> = this.getElements('[data-copy]');
  private readonly cardArrow: Array<HTMLElement> = this.getElements('[data-arrow]');

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C10PartnerCardsTransitionController(this);
    this.controllerController = this.setupControllerController();
  }

  private setupControllerController = (): ControllerController => {
    const props: DraggableCarouselProps = {
      el: this.element,
      carouselWrapper: this.carouselWrapper,
      carousel: this.carousel,
      carouselItems: this.carouselItems,
      elementsToAnimate: [this.cardPicture, this.cardHeading, this.cardCopy, this.cardArrow],
    };

    return new ControllerController({
      debounceDelay: 150,
      controllers: [
        {
          props,
          minWidth: 0,
          controller: DraggableCarousel,
        },
        {
          minWidth: 768,
          controller: CardCarousel,
          props: {
            el: this.element,
            elementsToAnimate: [this.cardPicture, this.cardHeading, this.cardCopy, this.cardArrow],
          },
        },
      ],
    });
  };
}
