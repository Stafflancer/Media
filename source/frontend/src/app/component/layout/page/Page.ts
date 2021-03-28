import AbstractComponent from '../../AbstractComponent';

export default class Page extends AbstractComponent {
  public static readonly displayName: string = 'page-root';

  constructor(element: HTMLElement) {
    super(element);

    // for generic app logic
  }

  public dispose() {
    // clean up stuff when hot reloading
    super.dispose();
  }
}
