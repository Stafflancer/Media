import AbstractBlock from '../AbstractBlock';

export default class Scaffold extends AbstractBlock {
  public static readonly displayName:string = 'scaffold';

  constructor(el:HTMLElement) {
    super(el);
  }

  public dispose() {
    super.dispose();
  }
}