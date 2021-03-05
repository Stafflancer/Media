import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import C05MasonryGrid from './C05MasonryGrid';
import { verticalFadeIn } from '../../../util/transition-helpers';

class C05MasonryGridTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: C05MasonryGrid,
    id: string,
  ): void {
    const transitionItems = parent.getElements('[data-transition-item]');
    timeline.add(verticalFadeIn(transitionItems));
  }

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: C05MasonryGrid,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: C05MasonryGrid,
    id: string,
  ): void {}
}

export default C05MasonryGridTransitionController;
