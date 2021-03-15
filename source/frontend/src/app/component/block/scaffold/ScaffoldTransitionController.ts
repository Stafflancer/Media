import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax } from 'gsap';
import Scaffold from './Scaffold';
import { verticalFadeIn } from '../../../util/transition-helpers'; //如有关于滚动条的动画则开启

class ScaffoldTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(timeline:TimelineMax, parent:Scaffold, id:string): void {
    const transitionItems = parent.getElements('[data-transition-item]');//如有关于滚动条的动画则开启
    timeline.add(verticalFadeIn(transitionItems)) //如有关于滚动条的动画则开启
  }

  protected setupTransitionOutTimeline(timeline:TimelineMax, parent:Scaffold, id:string): void {}

  protected setupLoopingAnimationTimeline(timeline:TimelineMax, parent:Scaffold, id:string): void {}
}

export default ScaffoldTransitionController;
