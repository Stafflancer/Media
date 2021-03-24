import AbstractBlock from '../AbstractBlock';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
export default class C16TechnologyAndInnovation extends AbstractBlock {
  public static readonly displayName: string = 'c16-technology-and-innovation';
  private readonly swiperContainer = this.getElement<HTMLElement>('.swiper-container');

  constructor(el: HTMLElement) {
    super(el);

    new Swiper(this.swiperContainer!, {
      speed: 2000,
    });
  }

  public dispose() {
    super.dispose();
  }
}
