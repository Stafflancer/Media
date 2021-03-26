import AbstractComponent from 'app/component/AbstractComponent';

export default class CardVideo extends AbstractComponent {
  public static readonly displayName: string = 'card-video';

  private readonly playBtn = this.getElement<HTMLElement>('.card-video__play');
  private readonly stopBtn = this.getElement<HTMLElement>('.card-video__stop');

  private readonly videoContent = this.getElement<HTMLVideoElement>('.card-video__media.video');
  private readonly videoPopup = document.body.querySelector<HTMLElement>(
    '[data-component="video-overlay"]',
  );
  private readonly popupVideo = document.body.querySelector<HTMLElement>(
    '[data-component="video-overlay"] video',
  );
  private readonly $pageBody = document.body;

  constructor(el: HTMLElement) {
    super(el);

    this.playBtn!.addEventListener('click', this.playVideo);
    this.stopBtn!.addEventListener('click', this.stopVideo);
    this.videoContent!.addEventListener('ended', this.endVideo);
  }
  // 播放
  protected playVideo = (event: Event): void => {
    let src = this.videoContent!.getAttribute('src') || '';
    let docuW = document.body.offsetWidth;
    if (docuW < 1024) {
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
