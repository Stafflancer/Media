import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import N03LanguageSelector from './N03LanguageSelector';

class N03LanguageSelectorTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: N03LanguageSelector,
    id: string,
  ): void {}

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: N03LanguageSelector,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: N03LanguageSelector,
    id: string,
  ): void {}
}

export default N03LanguageSelectorTransitionController;
