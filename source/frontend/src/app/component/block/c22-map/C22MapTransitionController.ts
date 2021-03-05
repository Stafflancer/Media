import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import C22Map from './C22Map';
import { verticalFadeIn } from '../../../util/transition-helpers';

class C22MapTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(timeline: TimelineMax, parent: C22Map, id: string): void {
    const transitionItems = parent.getElements('[data-transition-item]');
    timeline.add(verticalFadeIn([parent.element, ...transitionItems]));
  }

  protected setupTransitionOutTimeline(timeline: TimelineMax, parent: C22Map, id: string): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: C22Map,
    id: string,
  ): void {}
}

export default C22MapTransitionController;
