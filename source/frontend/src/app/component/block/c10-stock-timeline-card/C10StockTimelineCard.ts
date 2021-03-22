import AbstractBlock from '../AbstractBlock';

export default class C10StockTimelineCard extends AbstractBlock {
  public static readonly displayName: string = 'c10-stock-timeline-card';
  private static isActive: string = 'is-active';
  private readonly dotButton = this.element.querySelectorAll('.c10-stock-timeline-card__dot');
  private readonly cardBox = this.element.querySelectorAll('.c10-stock-timeline-card__card');

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
  }

  public dispose() {
    super.dispose();
  }
}
