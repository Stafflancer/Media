import AbstractComponent from 'app/component/AbstractComponent';

export default class Card extends AbstractComponent {
  public static readonly displayName: string = 'card';

  protected readonly playBtn = this.getElement<HTMLElement>('.card__media-play');
  constructor(el: HTMLElement) {
    super(el);

    this.playBtn!.addEventListener('click', this.playVideo);
  }

  protected playVideo = (event: Event): void => {};
}
