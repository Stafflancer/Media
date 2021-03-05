import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import C02TitleAndText from './C02TitleAndText';
import { verticalFadeIn } from '../../../util/transition-helpers';

class C02TitleAndTextTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: C02TitleAndText,
    id: string,
  ): void {
    const transitionItems = parent.getElements('[data-transition-item]');
    timeline.add(verticalFadeIn(transitionItems));
  }

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: C02TitleAndText,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: C02TitleAndText,
    id: string,
  ): void {}
}

export default C02TitleAndTextTransitionController;
