import AbstractBlock from '../AbstractBlock';

export default class VideoOverlay extends AbstractBlock {
  public static readonly displayName: string = 'video-overlay';
  // private readonly makeBtn: HTMLElement = this.getElement<HTMLElement>('.popup__make-btn');
  private readonly videoOverlayPopup = this.getElement<HTMLElement>('.js-video-overlay');
  private readonly closePopup = this.getElement<HTMLElement>('.video-overlay__popup-close');
  private readonly closeH5Popup = this.getElement<HTMLElement>('.video-overlay__popup-close-h5');

  constructor(el: HTMLElement) {
    super(el);
    this.closePopup!.addEventListener('click', this.closePopupHandel);
    this.closeH5Popup!.addEventListener('click', this.closePopupHandel);
  }

  protected closePopupHandel = (event: Event): void => {
    this.element.style.display = 'none';
  };

  public dispose() {
    super.dispose();
  }
}
