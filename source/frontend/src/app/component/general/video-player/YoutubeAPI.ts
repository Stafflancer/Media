const INIT_CALLBACK = 'onYouTubeIframeAPIReady';
class YoutubeAPI {
  // @ts-ignore
  private initPromise: Promise<void>;
  public init(): Promise<void> {
    if (!this.initPromise) {
      // @ts-ignore
      if (typeof window[INIT_CALLBACK] !== 'undefined') {
        // @ts-ignore
        throw new Error(`window.${window[INIT_CALLBACK]} is already defined`);
      }
      this.initPromise = new Promise<void>((resolve: () => void) => {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        // @ts-ignore
        document.querySelector('head').appendChild(script);
        // @ts-ignore
        window[INIT_CALLBACK] = () => {
          // @ts-ignore
          delete window[INIT_CALLBACK];
          resolve();
        };
      });
    }
    return this.initPromise;
  }
}
export default new YoutubeAPI();
