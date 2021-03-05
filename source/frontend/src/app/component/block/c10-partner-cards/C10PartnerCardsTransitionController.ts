import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import C10PartnerCards from './C10PartnerCards';
// import { verticalFadeIn } from '../../../util/transition-helpers';

class C10PartnerCardsTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: C10PartnerCards,
    id: string,
  ): void {
    // const transitionItems = parent.getElements('[data-transition-item]');
    // timeline.add(verticalFadeIn(transitionItems))
  }

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: C10PartnerCards,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: C10PartnerCards,
    id: string,
  ): void {}
}

export default C10PartnerCardsTransitionController;
