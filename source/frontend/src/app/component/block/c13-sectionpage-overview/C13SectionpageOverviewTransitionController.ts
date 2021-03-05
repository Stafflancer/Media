import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import C13SectionpageOverview from './C13SectionpageOverview';
// import { verticalFadeIn } from '../../../util/transition-helpers';

class C13SectionpageOverviewTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: C13SectionpageOverview,
    id: string,
  ): void {
    // const transitionItems = parent.getElements('[data-transition-item]');
    // timeline.add(verticalFadeIn(transitionItems));
  }

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: C13SectionpageOverview,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: C13SectionpageOverview,
    id: string,
  ): void {}
}

export default C13SectionpageOverviewTransitionController;
