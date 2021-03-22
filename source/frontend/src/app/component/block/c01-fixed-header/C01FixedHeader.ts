import AbstractComponent from 'app/component/AbstractComponent';

export default class C01FixedHeader extends AbstractComponent {
  public static readonly displayName: string = 'c01-fixed-header';

  private readonly openMenuTag = this.getElement<HTMLElement>('.c01-fixed-header__menu');
  private readonly closeMenuTag = this.getElement<HTMLElement>('.c01-fixed-header__close');
  private readonly popupMenu = this.getElement<HTMLElement>('.c01-fixed-header__popup');

  private readonly menus = this.getElement<HTMLElement>('.c01-fixed-header__nav-menu');
  private readonly menus2 = this.getElement<HTMLElement>('.c01-fixed-header__popup');
  private readonly menuItems = this.getElements<HTMLElement>('[data-component="cta-text"]');

  constructor(el: HTMLElement) {
    super(el);

    this.openMenuTag!.addEventListener('click', this.openMenuContent);
    this.closeMenuTag!.addEventListener('click', this.closeMenuContent);

    for (let i = 0; i < this.menuItems.length; i++) {
      this.menuItems[i]!.addEventListener(
        'click',
        (): void => {
          let childs = this.menus!.children;
          for (let j = 0; j < childs.length; j++) {
            childs[j].className = i - 4 === j || i === j ? 'cta-text with-dot' : 'cta-text';
          }

          let childs1 = this.menus2!.children;
          for (let j = 0; j < childs1.length; j++) {
            childs1[j].className = i - 4 === j || i === j ? 'cta-text with-dot' : 'cta-text';
          }
        },
      );
    }
  }
  protected openMenuContent = (): void => {
    this.openMenuTag!.style.display = 'none';
    this.closeMenuTag!.style.display = 'block';
    this.popupMenu!.style.display = 'flex';
  };
  protected closeMenuContent = (): void => {
    this.openMenuTag!.style.display = 'block';
    this.closeMenuTag!.style.display = 'none';
    this.popupMenu!.style.display = 'none';
  };
}
