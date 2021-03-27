import AbstractBlock from '../AbstractBlock';
export default class C16TechnologyAndInnovation extends AbstractBlock {
  public static readonly displayName: string = 'c16-technology-and-innovation';
  private readonly playBtn = this.getElement<HTMLElement>(
    '.c16-technology-and-innovation__video-play-button',
  );
  private readonly pauseBtn = this.getElement<HTMLElement>(
    '.c16-technology-and-innovation__video-play-button.pause',
  );
  private readonly audioContent = this.getElement<HTMLVideoElement>(
    '.c16-technology-and-innovation__audio',
  );

  constructor(el: HTMLElement) {
    super(el);

    this.playBtn!.addEventListener('click', this.playVideo);
    this.pauseBtn!.addEventListener('click', this.pauseVideo);
  }

  private playVideo = (event: Event): void => {
    this.playBtn!.style.display = 'none';
    this.pauseBtn!.style.display = 'block';
    this.audioContent!.play();
  };

  private pauseVideo = (event: Event): void => {
    this.audioContent!.pause();
    this.playBtn!.style.display = 'block';
    this.pauseBtn!.style.display = 'none';
  };

  public dispose() {
    super.dispose();
  }
}
