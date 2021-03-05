import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import N02FooterNavigation from './N02FooterNavigation';
import { verticalFadeIn } from '../../../util/transition-helpers';

class N02FooterNavigationTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: N02FooterNavigation,
    id: string,
  ): void {
    const transitionItems = parent.getElements('[data-transition-item]');
    timeline.add(verticalFadeIn(transitionItems));
  }

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: N02FooterNavigation,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: N02FooterNavigation,
    id: string,
  ): void {}
}

export default N02FooterNavigationTransitionController;
