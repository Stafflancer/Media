import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import {{name_pc}} from './{{name_pc}}';
// import { verticalFadeIn } from '../../../util/transition-helpers';

class {{name_pc}}TransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(timeline:TimelineMax, parent:{{name_pc}}, id:string): void {
    // const transitionItems = parent.getElements('[data-transition-item]');
    // timeline.add(verticalFadeIn(transitionItems))
  }

  protected setupTransitionOutTimeline(timeline:TimelineMax, parent:{{name_pc}}, id:string): void {}

  protected setupLoopingAnimationTimeline(timeline:TimelineMax, parent:{{name_pc}}, id:string): void {}
}

export default {{name_pc}}TransitionController;
