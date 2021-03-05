import ControllerController from 'controller-controller';
import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C03ColoredCardsTransitionController from './C03ColoredCardsTransitionController';
import { DraggableCarousel, DraggableCarouselProps } from '../../../util/DraggableCarousel';
import { ColoredCardsClickCarousel } from './scripts/ColoredCardsClickCarousel';
import { Model } from 'app/data/model';
export default class C03ColoredCards extends AbstractTransitionBlock {
  public static displayName: string = 'c03-colored-cards';
  public transitionController: C03ColoredCardsTransitionController;
  private controllerController: ControllerController;
  private readonly carouselWrapper: HTMLElement = this.getElement('[data-carousel-wrapper]');
  private readonly carousel: HTMLElement = this.getElement('[data-carousel]');
  private readonly carouselItems: Array<HTMLElement> = this.getElements('[data-carousel-item]');
  private readonly cardHeaders: Array<HTMLElement> = this.getElements('[data-card-heading]');
  private readonly cardPlayButtons: Array<HTMLElement> = this.getElements('[data-play-button]');
  private readonly videoPopupButtons: Array<HTMLButtonElement> = this.getElements(
    '[data-video-popup]',
  );
  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C03ColoredCardsTransitionController(this);
    this.controllerController = this.setupControllerController();

    this.videoPopupButtons.forEach(videoPopupButton => {
      videoPopupButton.addEventListener('click', this.handleVideoPlayClick);
    });
  }

  private handleVideoPlayClick = (event: Event) => {
    const videoId = <string>(<HTMLElement>event.currentTarget).getAttribute('data-video-popup');

    Model.videoOverlayId(videoId);
    Model.showVideoOverlay(true);
  };

  private setupControllerController = (): ControllerController => {
    const props: DraggableCarouselProps = {
      el: this.element,
      carouselWrapper: this.carouselWrapper,
      carousel: this.carousel,
      carouselItems: this.carouselItems,
      elementsToAnimate: [this.cardPlayButtons, this.cardHeaders],
    };

    const clickCarouselProps = {
      ...props,
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
          props: clickCarouselProps,
          minWidth: 1440,
          controller: ColoredCardsClickCarousel,
        },
      ],
    });
  };
}
