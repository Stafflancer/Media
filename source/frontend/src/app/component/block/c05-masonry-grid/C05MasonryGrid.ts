import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C05MasonryGridTransitionController from './C05MasonryGridTransitionController';

export default class C05MasonryGrid extends AbstractTransitionBlock {
  public static displayName: string = 'c05-masonry-grid';
  private static paddingRequired: string = 'padding-required';
  public transitionController: C05MasonryGridTransitionController;
  private list: HTMLElement = this.getElement('[data-masonry-list]');
  private gridItems: Array<HTMLElement> = this.getElements('[data-grid-item]');

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C05MasonryGridTransitionController(this);
    this.setGridListStyling();
  }

  private setGridListStyling = (): void => {
    if (this.gridItems.length % 2 === 0) {
      this.list.classList.add(C05MasonryGrid.paddingRequired);
      this.gridItems[this.gridItems.length - 2].style.marginBottom = '0';
    }
  };
}
