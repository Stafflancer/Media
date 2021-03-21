import AbstractBlock from '../AbstractBlock';

export default class StyleGuide extends AbstractBlock {
  public static readonly displayName: string = 'style-guide';
  private readonly videoOverlay = this.getElement<HTMLElement>('.js-video-overlay');
  private readonly videoOverlayPopup = document.body.querySelector<HTMLElement>(
    '[data-component=video-overlay]',
  );

  constructor(el: HTMLElement) {
    super(el);
    if (this.videoOverlay) {
      this.videoOverlay.addEventListener('click', this.handleVideoOverlay);
    }
  }

  private handleVideoOverlay = (event: Event): void => {
    this.videoOverlayPopup!.style.display = 'block';
  };

  public dispose() {
    super.dispose();
  }
}
