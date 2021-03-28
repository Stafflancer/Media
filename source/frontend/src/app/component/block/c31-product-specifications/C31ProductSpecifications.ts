import AbstractBlock from '../AbstractBlock';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

export default class C31ProductSpecifications extends AbstractBlock {
  public static readonly displayName: string = 'c31-product-specifications';
  private readonly swiperContainer = this.getElement<HTMLElement>('.swiper-container');

  constructor(el: HTMLElement) {
    super(el);

    var swiper = new Swiper(this.swiperContainer!, {
      speed: 2000,
      mousewheel: {
        forceToAxis: true,
        releaseOnEdges: true,
      },
      agination: '.swiper-pagination',
      slidesPerView: 'auto',
      centeredSlides: true,
      paginationClickable: true,
      preventLinksPropagation: true,
      pagination: {
        el: '.swiper-pagination',
      },
      spaceBetween: 30,
    });
    console.log(swiper);
  }

  public dispose() {
    super.dispose();
  }
}
