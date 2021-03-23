import AbstractBlock from '../AbstractBlock';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

export default class C12HistoryTimeline extends AbstractBlock {
  public static readonly displayName: string = 'c12-history-timeline';

  private readonly swiperContainer = this.getElement<HTMLElement>('.swiper-container');

  constructor(el: HTMLElement) {
    super(el);

    var swiper = new Swiper(this.swiperContainer!, {
      slidesPerView: 'auto',
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      //   hide: true,
      // },
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
    });
  }

  public dispose() {
    super.dispose();
  }
}
