import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import N04VideoOverlay from './N04VideoOverlay';
// import { verticalFadeIn } from '../../../util/transition-helpers';

class N04VideoOverlayTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: N04VideoOverlay,
    id: string,
  ): void {
    // const transitionItems = parent.getElements('[data-transition-item]');
    // timeline.add(verticalFadeIn(transitionItems))
  }

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: N04VideoOverlay,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: N04VideoOverlay,
    id: string,
  ): void {}
}

export default N04VideoOverlayTransitionController;
