import AbstractBlock from '../AbstractBlock';
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper';

export default class C26ProductIntro extends AbstractBlock {
  public static readonly displayName: string = 'c26-product-intro';

  private readonly swiperContainer = this.getElement<HTMLElement>('.swiper-container');
  private readonly playIcon = this.getElement<HTMLElement>('.c26-product-intro__img-icon');
  private readonly imgView = this.getElement<HTMLElement>('.c26-product-intro__product-img');

  constructor(el: HTMLElement) {
    super(el);

    let swiper = new Swiper(this.swiperContainer, {
      slidesPerView: 'auto',
      mousewheel: true,
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
    });

    this.playIcon!.addEventListener('click', this.changeImg);
  }

  protected changeImg = (): void => {
    if (this.playIcon!.classList.contains('active')) {
      this.playIcon!.classList.remove('active');
      this.imgView!.setAttribute('src', '../../assets/c26-product-intro/c26-product.png');
    } else {
      this.playIcon!.classList.add('active');
      this.imgView!.setAttribute('src', '../../assets/c26-product-intro/c26-product2.png');
    }
  };
  public dispose() {
    super.dispose();
  }
}
