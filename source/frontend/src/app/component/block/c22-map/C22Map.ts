import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C22MapTransitionController from './C22MapTransitionController';
import { hidePanel, setActiveHotspotIndex } from './helpers';

export default class C22Map extends AbstractTransitionBlock {
  public static displayName: string = 'c22-map';
  private static mapName: number = 2.2;
  public transitionController: C22MapTransitionController;
  private hotspots: Array<HTMLElement> = this.getElements('[data-region-hotspot]');
  private contentWrapper: HTMLElement = this.getElement('[data-content-wrapper]');

  constructor(el: HTMLElement) {
    super(el);
    this.addVersion();
    this.transitionController = new C22MapTransitionController(this);
    this.hotspots.forEach(hotspot => hotspot.addEventListener('click', this.handleHotspotClick));
    this.contentWrapper.addEventListener('click', this.handleContentWrapperClick);
  }

  private addVersion = (): void => {
    const element = document.createElement('div');
    element.style.display = 'none';
    element.innerText = `${C22Map.mapName}`;
    this.element.appendChild(element);
  };

  private handleContentWrapperClick = (): void => {
    hidePanel();
  };

  private handleHotspotClick = (event: Event): void => {
    event.stopPropagation();
    setActiveHotspotIndex(this.hotspots.indexOf(<HTMLElement>event.currentTarget));
  };
}
