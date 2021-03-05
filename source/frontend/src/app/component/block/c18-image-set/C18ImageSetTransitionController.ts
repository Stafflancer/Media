import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import C18ImageSet from './C18ImageSet';
import { verticalFadeIn } from '../../../util/transition-helpers';

class C18ImageSetTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: C18ImageSet,
    id: string,
  ): void {
    const transitionItems = parent.getElements('[data-transition-item]');
    timeline.add(verticalFadeIn(transitionItems));
  }

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: C18ImageSet,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: C18ImageSet,
    id: string,
  ): void {}
}

export default C18ImageSetTransitionController;
