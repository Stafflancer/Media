import ControllerController from 'controller-controller';
import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C14IconicCardsTransitionController from './C14IconicCardsTransitionController';
import { DraggableCarousel, DraggableCarouselProps } from '../../../util/DraggableCarousel';
import { CardCarousel } from '../../../util/CardCarousel';

export default class C14IconicCards extends AbstractTransitionBlock {
  public static displayName: string = 'c14-iconic-cards';
  public transitionController: C14IconicCardsTransitionController;
  private controllerController: ControllerController;
  private readonly carouselWrapper: HTMLElement = this.getElement('[data-carousel-wrapper]');
  private readonly carousel: HTMLElement = this.getElement('[data-carousel]');
  private readonly carouselItems: Array<HTMLElement> = this.getElements('[data-carousel-item]');
  private readonly cardIcons: Array<HTMLButtonElement> = this.getElements('[data-icon-wrapper]');
  private readonly cardHeadings: Array<HTMLButtonElement> = this.getElements('[data-heading]');
  private readonly cardCopies: Array<HTMLButtonElement> = this.getElements('[data-copy]');

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C14IconicCardsTransitionController(this);
    this.controllerController = this.setupControllerController();
  }

  private setupControllerController = (): ControllerController => {
    const props: DraggableCarouselProps = {
      el: this.element,
      carouselWrapper: this.carouselWrapper,
      carousel: this.carousel,
      carouselItems: this.carouselItems,
      elementsToAnimate: [this.cardIcons, this.cardHeadings, this.cardCopies],
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
            elementsToAnimate: [this.cardIcons, this.cardHeadings, this.cardCopies],
          },
        },
      ],
    });
  };
}
