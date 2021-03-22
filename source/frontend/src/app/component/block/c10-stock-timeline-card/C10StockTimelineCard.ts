import AbstractBlock from '../AbstractBlock';

export default class C10StockTimelineCard extends AbstractBlock {
  public static readonly displayName: string = 'c10-stock-timeline-card';
  private static isActive: string = 'is-active';
  private readonly dotButton = this.element.querySelectorAll('.c10-stock-timeline-card__dot');

  constructor(el: HTMLElement) {
    super(el);

    for (let i = 0; i < this.dotButton.length; i++) {
      this.dotButton[i].addEventListener('click', event => {
        this.dotButton.forEach(dot => dot.classList.remove(C10StockTimelineCard.isActive));
        this.dotButton[i].classList.add(C10StockTimelineCard.isActive);
      });
    }
  }

  public dispose() {
    super.dispose();
  }
}
