import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import C03ColoredCards from './C03ColoredCards';
import { verticalFadeIn } from '../../../util/transition-helpers';

class C03ColoredCardsTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: C03ColoredCards,
    id: string,
  ): void {
    const transitionItems = parent.getElements('[data-transition-item]');
    timeline.add(verticalFadeIn(transitionItems));
  }

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: C03ColoredCards,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: C03ColoredCards,
    id: string,
  ): void {}
}

export default C03ColoredCardsTransitionController;
