import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import C27Navigation from './C27Navigation';
import { verticalFadeIn } from '../../../util/transition-helpers';

class C27NavigationTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: C27Navigation,
    id: string,
  ): void {
    const transitionItems = parent.getElements('[data-transition-item]');
    timeline.add(verticalFadeIn(transitionItems));
  }

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: C27Navigation,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: C27Navigation,
    id: string,
  ): void {}
}

export default C27NavigationTransitionController;
