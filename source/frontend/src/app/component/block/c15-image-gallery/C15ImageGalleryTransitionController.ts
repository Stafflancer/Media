import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import C15ImageGallery from './C15ImageGallery';
import { verticalFadeIn } from '../../../util/transition-helpers';

class C15ImageGalleryTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: C15ImageGallery,
    id: string,
  ): void {
    const transitionItems = parent.getElements('[data-transition-item]');
    timeline.add(verticalFadeIn(transitionItems));
  }

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: C15ImageGallery,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: C15ImageGallery,
    id: string,
  ): void {}
}

export default C15ImageGalleryTransitionController;
