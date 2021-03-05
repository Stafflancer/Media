import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import C14IconicCards from './C14IconicCards';
// import { verticalFadeIn } from '../../../util/transition-helpers';

class C14IconicCardsTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: C14IconicCards,
    id: string,
  ): void {
    // const transitionItems = parent.getElements('[data-transition-item]');
    // timeline.add(verticalFadeIn(transitionItems))
  }

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: C14IconicCards,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: C14IconicCards,
    id: string,
  ): void {}
}

export default C14IconicCardsTransitionController;
