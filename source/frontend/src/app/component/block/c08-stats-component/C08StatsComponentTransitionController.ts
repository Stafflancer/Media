import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax, TweenMax } from 'gsap';
import C08StatsComponent from './C08StatsComponent';
import { verticalFadeIn, numbersCount } from '../../../util/transition-helpers';

class C08StatsComponentTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: C08StatsComponent,
    id: string,
  ): void {
    timeline.add(verticalFadeIn(parent.getElements('[data-transition-item]')), 1.5);
    timeline.add(verticalFadeIn(parent.getElements('[data-scrollbar]')), 2);
    timeline.add(numbersCount(parent.getElements('[data-total]')), 2);
  }

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: C08StatsComponent,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: C08StatsComponent,
    id: string,
  ): void {}
}

export default C08StatsComponentTransitionController;
