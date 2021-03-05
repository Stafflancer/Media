import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import C01Hero from './C01Hero';
// import { verticalFadeIn } from '../../../util/transition-helpers';

class C01HeroTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(timeline: TimelineMax, parent: C01Hero, id: string): void {
    // const transitionItems = parent.getElements('[data-transition-item]');
    // timeline.add(verticalFadeIn(transitionItems))
  }

  protected setupTransitionOutTimeline(timeline: TimelineMax, parent: C01Hero, id: string): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: C01Hero,
    id: string,
  ): void {}
}

export default C01HeroTransitionController;
