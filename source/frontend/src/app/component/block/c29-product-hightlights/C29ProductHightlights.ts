import AbstractBlock from '../AbstractBlock';

export default class C29ProductHightlights extends AbstractBlock {
  public static readonly displayName: string = 'c29-product-hightlights';
  private static isActive: string = 'is-active';
  private readonly dots = this.getElements<HTMLElement>('.c29-product-hightlights__dot');

  constructor(el: HTMLElement) {
    super(el);
    this.dots.forEach(dot => {
      dot.addEventListener('click', this.handleClick);
    });
  }

  private handleClick = (e: MouseEvent) => {
    let self = e.currentTarget as HTMLElement;
    this.dots.forEach(dot =>
      dot.nextElementSibling!.classList.remove(C29ProductHightlights.isActive),
    );
    self.nextElementSibling!.classList.add(C29ProductHightlights.isActive);
  };

  public dispose() {
    super.dispose();
  }
}
