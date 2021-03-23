import AbstractBlock from 'app/component/AbstractComponent';

export default class VideoOverlay extends AbstractBlock {
  public static readonly displayName: string = 'video-overlay';
  private readonly closePopup = this.getElement<HTMLElement>('.video-overlay__popup-close');
  private readonly closeH5Popup = this.getElement<HTMLElement>('.video-overlay__popup-close-h5');
  private readonly $pageBody = document.body;
  constructor(el: HTMLElement) {
    super(el);
    this.closePopup!.addEventListener('click', this.closePopupHandel);
    this.closeH5Popup!.addEventListener('click', this.closePopupHandel);
  }

  protected closePopupHandel = (event: Event): void => {
    this.element.style.display = 'none';
    this.$pageBody.style.overflow = 'auto';
    this.$pageBody.style.height = 'auto';
  };

  public dispose() {
    super.dispose();
  }
}
