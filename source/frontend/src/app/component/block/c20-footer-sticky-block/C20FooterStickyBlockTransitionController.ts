import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import C20FooterStickyBlock from './C20FooterStickyBlock';
import { verticalFadeIn } from '../../../util/transition-helpers';

class C20FooterStickyBlockTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: C20FooterStickyBlock,
    id: string,
  ): void {
    const transitionItems = parent.getElements('[data-transition-item]');
    timeline.add(verticalFadeIn(transitionItems));
  }

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: C20FooterStickyBlock,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: C20FooterStickyBlock,
    id: string,
  ): void {}
}

export default C20FooterStickyBlockTransitionController;
