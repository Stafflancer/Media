import AbstractBlock from '../AbstractBlock';

export default class C09MediaBoxScrollIndicator extends AbstractBlock {
  public static readonly displayName: string = 'c09-media-box-scroll-indicator';
  private readonly indicatorBtn = this.getElement<HTMLElement>(
    '.c09-media-box-scroll-indicator__iconfont',
  );

  constructor(el: HTMLElement) {
    super(el);

    this.indicatorBtn!.addEventListener('click', this.handleIndicatorBtn);
  }

  private handleIndicatorBtn = (event: Event): void => {
    var docHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
    document.body.scrollTop = docHeight + 100;
    document.documentElement.scrollTop = docHeight + 100;
  };

  public dispose() {
    super.dispose();
  }
}
