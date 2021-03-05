import { debounce } from 'lodash';
import ControllerController from 'controller-controller';
// @ts-ignore
import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C08StatsComponentTransitionController from './C08StatsComponentTransitionController';
import { DraggableStatsController } from './controllers/DraggableStatsController';
import { FooController } from './controllers/FooController';

export default class C08StatsComponent extends AbstractTransitionBlock {
  private static debounceDelay: number = 100;
  private static desktopBreakpoint: number = 1024;
  public static displayName: string = 'c08-stats-component';
  public transitionController: C08StatsComponentTransitionController;
  private controllerController: ControllerController;

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C08StatsComponentTransitionController(this);
    this.controllerController = this.setupControllerController();
  }

  private setupControllerController = (): ControllerController => {
    return new ControllerController({
      debounceDelay: C08StatsComponent.debounceDelay,
      controllers: [
        {
          minWidth: 0,
          controller: FooController,
        },
        {
          minWidth: C08StatsComponent.desktopBreakpoint,
          controller: DraggableStatsController,
          props: this.element,
        },
      ],
    });
  };

  public dispose() {}
}
