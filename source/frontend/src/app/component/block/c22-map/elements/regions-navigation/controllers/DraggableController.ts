// @ts-ignore
import { Draggable } from 'gsap/Draggable';
import { TweenMax } from 'gsap';
import { debounce } from 'lodash';
import ThrowPropsPlugin from '../../../../../../util/vendor/gsap/plugins/ThrowPropsPlugin';
import AbstractTransitionBlock from '../../../../AbstractTransitionBlock';

interface DraggableBounds {
  minX: number;
  maxX: number;
}

export class DraggableController extends AbstractTransitionBlock {
  private draggable: Draggable | null;
  private controllerIsActive: boolean = true;
  private static debounceDelay: number = 100;
  private draggableWrapper: HTMLElement = this.getElement('[data-draggable-wrapper]');
  private draggableContent: HTMLElement = this.getElement('[data-draggable-content]');
  private locationButtons: Array<HTMLButtonElement> = this.getElements('[data-location-button]');

  constructor(el: HTMLElement) {
    super(el);
    this.draggable = this.setupDraggable();
    window.addEventListener('resize', this.handleWindowResize);
  }

  private setupDraggable = (): Draggable | null => {
    if (this.getDraggableOffset() >= 0) return;
    return Draggable.create(this.draggableContent, {
      type: 'x',
      bounds: this.getDraggableBounds(),
      edgeResistance: 0.98,
      throwProps: !!ThrowPropsPlugin,
    })[0];
  };

  private getDraggableBounds = (): DraggableBounds => ({
    minX: this.getDraggableOffset(),
    maxX: 0,
  });

  private handleWindowResize = debounce((): void => {
    if (!this.controllerIsActive) return;
    this.handleDraggableState();
  }, DraggableController.debounceDelay);

  private handleDraggableState = (): void => {
    this.getDraggableOffset() >= 0
      ? this.draggable && this.killDraggable()
      : this.draggable
      ? this.draggable.applyBounds(this.getDraggableBounds())
      : (this.draggable = this.setupDraggable());
  };

  private killDraggable = (): void => {
    this.draggable.kill();
    this.draggable = null;
    TweenMax.set(this.draggableContent, { clearProps: 'all' });
  };

  private getDraggableOffset = (): number =>
    this.draggableWrapper.getBoundingClientRect().width -
    this.locationButtons
      .map(button => button.getBoundingClientRect().width)
      .reduce((acc, sum) => acc + sum);

  public dispose() {
    this.controllerIsActive = false;
    window.removeEventListener('resize', this.handleWindowResize);
    this.killDraggable();
  }
}
