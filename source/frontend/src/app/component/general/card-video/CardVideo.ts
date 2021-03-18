import AbstractComponent from 'app/component/AbstractComponent';

export default class CardVideo extends AbstractComponent {
  public static readonly displayName: string = 'card-video';

  private readonly playBtn = this.getElement<HTMLElement>('.card-video__play');
  private readonly stopBtn = this.getElement<HTMLElement>('.card-video__stop');

  private readonly videoContent = this.getElement<HTMLElement>('.card-video__media');

  constructor(el: HTMLElement) {
    super(el);

    this.playBtn!.addEventListener('click', this.playVideo);
    this.stopBtn!.addEventListener('click', this.stopVideo);
    this.videoContent!.addEventListener('ended', this.endVideo);
  }

  protected playVideo = (event: Event): void => {
    this.playBtn!.style.display = 'none';
    this.stopBtn!.style.display = 'block';
  };

  protected stopVideo = (event: Event): void => {
    this.playBtn!.style.display = 'block';
    this.stopBtn!.style.display = 'none';
  };
  // 监听视频播放完成，此时把播放按钮替换
  protected endVideo = (event: Event): void => {
    this.playBtn!.style.display = 'block';
    this.stopBtn!.style.display = 'none';
  };
}
