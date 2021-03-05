import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import C25CtaBlock from './C25CtaBlock';
// import { verticalFadeIn } from '../../../util/transition-helpers';

class C25CtaBlockTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(timeline:TimelineMax, parent:C25CtaBlock, id:string): void {
    // const transitionItems = parent.getElements('[data-transition-item]');
    // timeline.add(verticalFadeIn(transitionItems))
  }

  protected setupTransitionOutTimeline(timeline:TimelineMax, parent:C25CtaBlock, id:string): void {}

  protected setupLoopingAnimationTimeline(timeline:TimelineMax, parent:C25CtaBlock, id:string): void {}
}

export default C25CtaBlockTransitionController;
