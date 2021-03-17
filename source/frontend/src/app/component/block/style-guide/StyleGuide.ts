import AbstractBlock from '../AbstractBlock';

export default class StyleGuide extends AbstractBlock {
  public static readonly displayName:string = 'style-guide';

  constructor(el:HTMLElement) {
    super(el);
  }

  public dispose() {
    super.dispose();
  }
}