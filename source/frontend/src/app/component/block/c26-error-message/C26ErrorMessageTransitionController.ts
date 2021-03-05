import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import C26ErrorMessage from './C26ErrorMessage';
// import { verticalFadeIn } from '../../../util/transition-helpers';

class C26ErrorMessageTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(timeline:TimelineMax, parent:C26ErrorMessage, id:string): void {
    // const transitionItems = parent.getElements('[data-transition-item]');
    // timeline.add(verticalFadeIn(transitionItems))
  }

  protected setupTransitionOutTimeline(timeline:TimelineMax, parent:C26ErrorMessage, id:string): void {}

  protected setupLoopingAnimationTimeline(timeline:TimelineMax, parent:C26ErrorMessage, id:string): void {}
}

export default C26ErrorMessageTransitionController;
