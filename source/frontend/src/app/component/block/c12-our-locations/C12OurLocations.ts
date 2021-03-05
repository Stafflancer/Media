import ControllerController from 'controller-controller';
import { DraggableCarousel, DraggableCarouselProps } from '../../../util/DraggableCarousel';
import { CardCarousel } from '../../../util/CardCarousel';
import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C12OurLocationsTransitionController from './C12OurLocationsTransitionController';

export default class C12OurLocations extends AbstractTransitionBlock {
  public static displayName: string = 'c12-our-locations';
  private static itemsInView: number = 2;
  public transitionController: C12OurLocationsTransitionController;
  private controllerController: ControllerController;
  private readonly carouselWrapper: HTMLElement = this.getElement('[data-carousel-wrapper]');
  private readonly carousel: HTMLElement = this.getElement('[data-carousel]');
  private readonly carouselItems: Array<HTMLElement> = this.getElements('[data-carousel-item]');
  private readonly previousButton: HTMLButtonElement = this.getElement('[data-control-previous]');
  private readonly nextButton: HTMLButtonElement = this.getElement('[data-control-next]');
  private readonly cardHeadings: Array<HTMLButtonElement> = this.getElements('[data-heading]');
  private readonly cardCopies: Array<HTMLButtonElement> = this.getElements('[data-copy]');
  private readonly cardCtas: Array<HTMLButtonElement> = this.getElements('[data-cta]');

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C12OurLocationsTransitionController(this);
    this.controllerController = this.setupControllerController();
  }

  private setupControllerController = (): ControllerController => {
    const draggableProps: DraggableCarouselProps = {
      el: this.element,
      carouselWrapper: this.carouselWrapper,
      carousel: this.carousel,
      carouselItems: this.carouselItems,
      elementsToAnimate: [this.cardHeadings, this.cardCopies, this.cardCtas],
    };

    return new ControllerController({
      debounceDelay: 100,
      controllers: [
        {
          minWidth: 0,
          controller: DraggableCarousel,
          props: draggableProps,
        },
        {
          minWidth: 768,
          controller: CardCarousel,
          props: {
            el: this.element,
            elementsToAnimate: [this.cardHeadings, this.cardCopies, this.cardCtas],
          },
        },
      ],
    });
  };

  public dispose() {
    this.controllerController.dispose();
    super.dispose();
  }
}
