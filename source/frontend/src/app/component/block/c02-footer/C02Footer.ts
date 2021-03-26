import AbstractBlock from '../AbstractBlock';

export default class C02Footer extends AbstractBlock {
  public static readonly displayName: string = 'c02-footer';

  constructor(el: HTMLElement) {
    super(el);
    
  }

  public dispose() {
    super.dispose();
  }
}
