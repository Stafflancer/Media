import AbstractBlock from '../AbstractBlock';
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper';

export default class C26ProductIntro extends AbstractBlock {
  public static readonly displayName: string = 'c26-product-intro';

  private readonly swiperContainer = this.getElement<HTMLElement>('.swiper-container');

  private readonly contentView = this.getElement<HTMLElement>('.c26-product-intro__top');
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
    this.imgView!.classList.remove('fade-in');
    this.imgView!.classList.add('fade-out');
    if (this.playIcon!.classList.contains('active')) {
      this.contentView!.classList.remove('active');
      this.playIcon!.classList.remove('active');
    } else {
      this.contentView!.classList.add('active');
      this.playIcon!.classList.add('active');
    }
    let timer = setTimeout(() => {
      if (this.playIcon!.classList.contains('active')) {
        this.imgView!.setAttribute('src', '../../assets/c26-product-intro/c26-product2.png');
        this.imgView!.onload = () => {
          this.imgView!.classList.remove('fade-out');
          this.imgView!.classList.add('fade-in');
          clearInterval(timer);
        };
      } else {
        this.imgView!.setAttribute('src', '../../assets/c26-product-intro/c26-product.png');
        this.imgView!.onload = () => {
          this.imgView!.classList.remove('fade-out');
          this.imgView!.classList.add('fade-in');
          clearInterval(timer);
        };
      }
    }, 400);
  };
  public dispose() {
    super.dispose();
  }
}
