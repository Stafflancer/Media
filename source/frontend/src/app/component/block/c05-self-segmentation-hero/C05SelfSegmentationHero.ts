import AbstractComponent from 'app/component/AbstractComponent';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

export default class C05SelfSegmentationHero extends AbstractComponent {
  public static readonly displayName: string = 'c05-self-segmentation-hero';

  private readonly swiperContainer = this.getElement<HTMLElement>('.swiper-container');
  constructor(el: HTMLElement) {
    super(el);

    this.init();
  }

  protected init = (): void => {
    var swiper = new Swiper(this.swiperContainer!, {
      slidesPerView: 'auto',
    });
  };
}
