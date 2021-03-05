import ControllerController from 'controller-controller';
import { DraggableCarousel, DraggableCarouselProps } from '../../../util/DraggableCarousel';
import { ClickCarousel } from './scripts/ClickCarousel';
import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C06VisualCardsTransitionController from './C06VisualCardsTransitionController';

export default class C06VisualCards extends AbstractTransitionBlock {
  public static displayName: string = 'c06-visual-cards';
  public transitionController: C06VisualCardsTransitionController;
  private controllerController: ControllerController;
  private readonly carouselWrapper: HTMLElement = this.getElement('[data-carousel-wrapper]');
  private readonly carousel: HTMLElement = this.getElement('[data-carousel]');
  private readonly carouselItems: Array<HTMLElement> = this.getElements('[data-carousel-item]');
  private cardHeaders: Array<HTMLElement> = this.getElements('[data-card-heading]');
  private cardPlayButtons: Array<HTMLElement> = this.getElements('[data-play-button]');

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C06VisualCardsTransitionController(this);
    this.controllerController = this.setupControllerController();
  }

  private setupControllerController = (): ControllerController => {
    const props: DraggableCarouselProps = {
      el: this.element,
      carouselWrapper: this.carouselWrapper,
      carousel: this.carousel,
      carouselItems: this.carouselItems,
      elementsToAnimate: [this.cardPlayButtons, this.cardHeaders],
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
          minWidth: 1024,
          controller: ClickCarousel,
          props: this.element,
        },
      ],
    });
  };
}
