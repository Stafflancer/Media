import { TimelineMax, TweenMax, Expo } from 'gsap';
import AbstractBlock from '../component/block/AbstractBlock';
import { getGutter } from './helpers/getGutter';

interface ClickCarouselProps {
  el: HTMLElement;
  carouselWrapper: HTMLElement;
  carousel: HTMLElement;
  carouselItems: Array<HTMLElement>;
  previousButton: HTMLButtonElement;
  nextButton: HTMLButtonElement;
  itemsInView: number;
}

class ClickCarousel extends AbstractBlock {
  public element: HTMLElement;
  private readonly carouselWrapper: HTMLElement;
  private readonly carousel: HTMLElement;
  private readonly carouselItems: Array<HTMLElement>;
  private readonly previousButton: HTMLButtonElement;
  private readonly nextButton: HTMLButtonElement;
  private readonly timeline: TimelineMax;
  private carouselIsAnimating: boolean = false;
  private itemsInView: number;
  private activeIndex: number = 0;

  constructor(props: ClickCarouselProps) {
    super(props.el);
    const {
      el,
      carouselWrapper,
      carousel,
      carouselItems,
      previousButton,
      nextButton,
      itemsInView,
    } = props;
    this.element = el;
    this.carouselWrapper = carouselWrapper;
    this.carousel = carousel;
    this.carouselItems = carouselItems;
    this.previousButton = previousButton;
    this.nextButton = nextButton;
    this.itemsInView = itemsInView;
    this.setItemWidth();
    this.setCarouselWidth();
    this.timeline = this.setupTimeline();
    this.setButtonState();
    this.addEventListeners();
  }

  private setItemWidth = (): void => {
    const width = this.carouselItems[0].getBoundingClientRect().width;
    this.carouselItems.forEach(item => (item.style.width = `${width}px`));
  };

  private setCarouselWidth = (): void => {
    const gutter = getGutter() * (this.carouselItems.length - 1);
    const totalItemWidth =
      this.carouselItems[0].getBoundingClientRect().width * this.carouselItems.length;
    this.carousel.style.width = `${gutter + totalItemWidth}px`;
  };

  private setupTimeline = (): TimelineMax => {
    const timeline = new TimelineMax({ paused: false });

    this.carouselItems.forEach((item, index) => {
      if (index > this.carouselItems.length - this.itemsInView) return;
      timeline.add(this.addTransition(index));
    });

    return timeline;
  };

  private addTransition = (index: number): TimelineMax => {
    const x = -this.carouselItems[index].offsetLeft;
    const timeline = new TimelineMax();
    timeline.to(this.carousel, 1, {
      x,
    });
    return timeline;
  };

  private getOffset = (): number => {
    return 200;
  };

  private setButtonState = (): void => {};

  private addEventListeners = (): void => {
    this.nextButton.addEventListener('click', this.handleControlClick);
  };

  private handleControlClick = (): void => {};

  public dispose() {
    //
  }
}

export { ClickCarousel, ClickCarouselProps };
