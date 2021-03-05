import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import C11BlueHeader from './C11BlueHeader';
// import { verticalFadeIn } from '../../../util/transition-helpers';

class C11BlueHeaderTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: C11BlueHeader,
    id: string,
  ): void {
    // const transitionItems = parent.getElements('[data-transition-item]');
    // timeline.add(verticalFadeIn(transitionItems))
  }

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: C11BlueHeader,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: C11BlueHeader,
    id: string,
  ): void {}
}

export default C11BlueHeaderTransitionController;
