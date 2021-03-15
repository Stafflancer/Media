import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import StyleGuideTransitionController from './StyleGuideTransitionController';

export default class StyleGuide extends AbstractTransitionBlock {
  public static displayName:string = 'style-guide';
  public transitionController:StyleGuideTransitionController;

  constructor(el:HTMLElement) {
    super(el);
    this.transitionController = new StyleGuideTransitionController(this);
  }
}
