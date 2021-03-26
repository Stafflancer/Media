import AbstractBlock from '../AbstractBlock';
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper';

export default class C26ProductIntro extends AbstractBlock {
  public static readonly displayName: string = 'c26-product-intro';

  private readonly swiperContainer = this.getElement<HTMLElement>('.swiper-container');

  constructor(el: HTMLElement) {
    super(el);

    let swiper = new Swiper(this.swiperContainer, {
      mouseWheel: true,
    });
  }

  public dispose() {
    super.dispose();
  }
}
