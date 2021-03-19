import AbstractComponent from 'app/component/AbstractComponent';

export default class CardVideo extends AbstractComponent {
  public static readonly displayName: string = 'c01-fixed-header';

  private readonly openMenuTag = this.getElement<HTMLElement>('.c01-fixed-header__menu');

  constructor(el: HTMLElement) {
    super(el);

    this.openMenuTag!.addEventListener('ended', this.openMenuContent);
  }
  // 监听视频播放完成，此时把播放按钮替换
  protected openMenuContent = (event: Event): void => {};
}
