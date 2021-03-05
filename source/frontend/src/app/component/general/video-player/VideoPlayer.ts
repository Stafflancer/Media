import AbstractComponent from '../../AbstractComponent';
import YoutubeAPI from './YoutubeAPI';

export default class VideoPlayer extends AbstractComponent {
  public static displayName: string = 'video-player';

  private readonly playerElement: HTMLElement = this.getElement('[data-player]');

  private player: YT.Player | null = null;
  private done = false;
  private autoPlay = false;

  constructor(el: HTMLElement) {
    super(el);
    const videoId = el.getAttribute('youtube-id');

    if (videoId === '' || videoId === null) return;

    this.setVideoID(videoId);
  }

  public setVideoID = (source: string) => {
    if (this.player) this.player.destroy();

    let videoId = source;

    const isUrl = source.search('youtube.com') >= 0 ? true : false;
    if (isUrl) videoId = source.split('v=')[1];

    YoutubeAPI.init().then(() => {
      this.player = new YT.Player(this.playerElement, {
        videoId,
        height: '100%',
        width: '100%',
        events: {
          onStateChange: this.onPlayerStateChange,
        },
        playerVars: {
          controls: 1,
          rel: 0,
          autoplay: this.autoPlay ? 1 : 0,
        },
      });
    });
  };

  public onPlayerStateChange = (event: any) => {
    if (event.data === YT.PlayerState.PLAYING && !this.done) {
      this.done = true;
    }
  };

  public play = () => {
    if (this.player) this.player.playVideo();
    else this.autoPlay = true;
  };

  public stop = () => {
    this.player && this.player.stopVideo();
  };

  public dispose() {
    super.dispose();
  }
}
