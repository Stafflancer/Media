import AbstractComponent from 'app/component/AbstractComponent';

export default class Card extends AbstractComponent {
  public static readonly displayName: string = 'card';

  private readonly playBtn = this.getElement<HTMLElement>('.card__media-play');
  private readonly stopBtn = this.getElement<HTMLElement>('.card__media-stop');

  private readonly docuW = document.body.offsetWidth;
  private readonly videoContent = this.getElement<HTMLVideoElement>('.card__media.video');
  private readonly videoPopup = document.body.querySelector<HTMLElement>(
    '[data-component="video-overlay"]',
  );
  private readonly popupVideo = document.body.querySelector<HTMLElement>(
    '[data-component="video-overlay"] video',
  );
  private readonly $pageBody = document.body;

  constructor(el: HTMLElement) {
    super(el);

    if (this.playBtn) this.playBtn!.addEventListener('click', this.playVideo);
    if (this.stopBtn) this.stopBtn!.addEventListener('click', this.stopVideo);
    if (this.videoContent) this.videoContent!.addEventListener('ended', this.endVideo);
  }

  protected playVideo = (event: Event): void => {
    let src = this.videoContent!.getAttribute('src') || '';
    if (this.docuW < 1024) {
      this.videoPopup!.style.display = 'block';
      this.popupVideo!.setAttribute('src', src);
      this.$pageBody.style.overflow = 'hidden';
      this.$pageBody.style.height = '100%';
    } else {
      this.playBtn!.style.display = 'none';
      this.stopBtn!.style.display = 'block';
      this.videoContent!.play();
    }
  };
  protected stopVideo = (event: Event): void => {
    this.videoContent!.pause();
    this.playBtn!.style.display = 'block';
    this.stopBtn!.style.display = 'none';
  };

  // 监听视频播放完成，此时把播放按钮替换
  protected endVideo = (event: Event): void => {
    if (this.videoContent!.style.display === 'block') {
      this.playBtn!.style.display = 'block';
      this.stopBtn!.style.display = 'none';
    }
  };
}
