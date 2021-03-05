import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import C07NumberedCards from './C07NumberedCards';
import { verticalFadeIn } from '../../../util/transition-helpers';

class C07NumberedCardsTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: C07NumberedCards,
    id: string,
  ): void {
    const transitionItems = parent.getElements('[data-transition-item]');
    timeline.add(verticalFadeIn(transitionItems));
  }

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: C07NumberedCards,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: C07NumberedCards,
    id: string,
  ): void {}
}

export default C07NumberedCardsTransitionController;
