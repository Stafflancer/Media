import AbstractBlock from '../AbstractBlock';

export default class C07OnPageJumpLinks extends AbstractBlock {
  public static readonly displayName: string = 'c07-on-page-jump-links';
  private readonly anchors = this.getElements<HTMLElement>('.js-anchor');

  constructor(el: HTMLElement) {
    super(el);
    this.anchors.forEach((anchor) => {
      anchor.addEventListener('click', this.handleClick)
    })
  }

  private handleClick = (e: MouseEvent) => {
    let self = e.currentTarget as HTMLElement;
    let targetElement = document.querySelector(`[data-component=${self.dataset.target}]`) as HTMLElement;
    if (targetElement) {
      window.scroll({
				behavior: 'smooth',
				left: 0,
				top: targetElement.offsetTop
			});
    }
  }

  public dispose() {
    super.dispose();
  }
}
