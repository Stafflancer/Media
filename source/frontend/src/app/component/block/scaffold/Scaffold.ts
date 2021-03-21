import AbstractBlock from '../AbstractBlock';
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css';

export default class Scaffold extends AbstractBlock {
  public static readonly displayName:string = 'scaffold';
  private readonly swiperContainer = this.getElement<HTMLElement>('.swiper-container');

  constructor(el:HTMLElement) {
    super(el);
    
    var swiper = new Swiper(this.swiperContainer!, {
      speed: 2000,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    console.log(swiper)
  }

  public dispose() {
    super.dispose();
  }
}