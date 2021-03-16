import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import StyleGuide from './StyleGuide';
// import { verticalFadeIn } from '../../../util/transition-helpers';

class StyleGuideTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(timeline:TimelineMax, parent:StyleGuide, id:string): void {
    // const transitionItems = parent.getElements('[data-transition-item]');
    // timeline.add(verticalFadeIn(transitionItems))
  }

  protected setupTransitionOutTimeline(timeline:TimelineMax, parent:StyleGuide, id:string): void {}

  protected setupLoopingAnimationTimeline(timeline:TimelineMax, parent:StyleGuide, id:string): void {}
}

export default StyleGuideTransitionController;
