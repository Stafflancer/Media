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
    let windoHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
    let scrollTop = document.documentElement.scrollTop;
    document.body.scrollTop = scrollTop + windoHeight;
    document.documentElement.scrollTop = scrollTop + windoHeight;
  };

  public dispose() {
    super.dispose();
  }
}
