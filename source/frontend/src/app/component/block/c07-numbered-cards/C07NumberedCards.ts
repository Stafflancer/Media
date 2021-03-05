import ControllerController from 'controller-controller';
import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C07NumberedCardsTransitionController from './C07NumberedCardsTransitionController';
import { DraggableCarousel, DraggableCarouselProps } from '../../../util/DraggableCarousel';
import { SliderController } from './controllers/SliderController';

export default class C07NumberedCards extends AbstractTransitionBlock {
  public static displayName: string = 'c07-numbered-cards';
  public transitionController: C07NumberedCardsTransitionController;
  private controllerController: ControllerController;
  private readonly carouselWrapper: HTMLElement = this.getElement('[data-carousel-wrapper]');
  private readonly carousel: HTMLElement = this.getElement('[data-carousel]');
  private readonly carouselItems: Array<HTMLElement> = this.getElements('[data-carousel-item]');
  private readonly cardHeaders: Array<HTMLElement> = this.getElements('[data-card-heading]');
  private readonly cardPlayButtons: Array<HTMLElement> = this.getElements('[data-play-button]');

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C07NumberedCardsTransitionController(this);
    this.controllerController = this.setupControllerController(el);
  }

  private setupControllerController = (el: HTMLElement): ControllerController => {
    const props: DraggableCarouselProps = {
      el: this.element,
      carouselWrapper: this.carouselWrapper,
      carousel: this.carousel,
      carouselItems: this.carouselItems,
      elementsToAnimate: [this.cardPlayButtons, this.cardHeaders],
    };
    return new ControllerController({
      debounceDelay: 100,
      controllers: [
        {
          props,
          minWidth: 0,
          controller: DraggableCarousel,
        },
        {
          minWidth: 1024,
          controller: SliderController,
          props: el,
        },
      ],
    });
  };
}
