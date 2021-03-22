import AbstractBlock from '../AbstractBlock';

export default class C10StockTimelineCard extends AbstractBlock {
  public static readonly displayName: string = 'c10-stock-timeline-card';
  private static isActive: string = 'is-active';
  private readonly dotButton = this.element.querySelectorAll('.c10-stock-timeline-card__dot');
  private readonly cardBox = this.element.querySelectorAll('.c10-stock-timeline-card__card');

  // c09-media-box
  private readonly indicatorBtn = this.getElement<HTMLElement>('.c09-media-box__iconfont');

  constructor(el: HTMLElement) {
    super(el);
    // 默认显示第三个位置
    this.dotButton[2].classList.add(C10StockTimelineCard.isActive);
    this.cardBox[2].classList.add(C10StockTimelineCard.isActive);

    // 切换显示
    for (let i = 0; i < this.dotButton.length; i++) {
      this.dotButton[i].addEventListener('click', event => {
        this.dotButton.forEach(dot => dot.classList.remove(C10StockTimelineCard.isActive));
        this.dotButton[i].classList.add(C10StockTimelineCard.isActive);
        this.cardBox.forEach(card => card.classList.remove(C10StockTimelineCard.isActive));
        this.cardBox[i].classList.add(C10StockTimelineCard.isActive);
      });
    }

    // c09-media-box
    this.indicatorBtn!.addEventListener('click', this.handleIndicatorBtn);
  }

  private handleIndicatorBtn = (event: Event): void => {
    let windoHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
    let scrollTop = document.documentElement.scrollTop;
    document.body.scrollTop = scrollTop + windoHeight;
    document.documentElement.scrollTop = scrollTop + windoHeight;
  };

  public dispose() {
    super.dispose();
  }
}
