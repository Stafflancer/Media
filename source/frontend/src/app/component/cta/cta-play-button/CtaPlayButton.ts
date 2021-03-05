import AbstractComponent from '../../AbstractComponent';
import { Model } from 'app/data/model';

export default class CTAPlayButton extends AbstractComponent {
  public static displayName: string = 'cta-play-button';

  private readonly videoId: string = this.element.getAttribute('data-video-popup') || '';

  constructor(el: HTMLElement) {
    super(el);
    this.element.addEventListener('click', this.openVideoPopup);
  }

  private openVideoPopup = () => {
    Model.videoOverlayId(this.videoId);
    Model.showVideoOverlay(true);
  };

  public dispose() {
    super.dispose();
  }
}
