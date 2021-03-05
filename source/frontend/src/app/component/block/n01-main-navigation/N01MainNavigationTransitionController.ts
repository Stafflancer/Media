import { MubanTransitionController, IMubanTransitionMixin } from 'muban-transition-component';
import { TimelineMax, Expo } from 'gsap';
import N01MainNavigation from './N01MainNavigation';
import { verticalFadeIn } from '../../../util/transition-helpers';

class N01MainNavigationTransitionController extends MubanTransitionController {
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: N01MainNavigation,
    id: string,
  ): void {
    const transitionItems = parent.getElements('[data-transition-item]');
    timeline.add(this.logoTransitionIn());
    timeline.add(this.menuIconTransitionIn(), 0);
    timeline.add(verticalFadeIn(transitionItems));
  }

  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: N01MainNavigation,
    id: string,
  ): void {}

  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: N01MainNavigation,
    id: string,
  ): void {}

  private logoTransitionIn(): TimelineMax {
    const flames = this.parentController.element.querySelectorAll('.flame-part');
    const copy = this.parentController.element.querySelector('.copy');
    const timeline = new TimelineMax();
    timeline.staggerFromTo(
      flames,
      1,
      {
        y: 20,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        ease: Expo.easeOut,
      },
      0.15,
    );
    timeline.fromTo(
      copy!,
      1,
      {
        y: 40,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        ease: Expo.easeOut,
      },
      0.1,
    );
    return timeline;
  }

  private menuIconTransitionIn(): TimelineMax {
    const timeline = new TimelineMax();
    const menuBars = this.parentController.element.querySelectorAll('.bar');
    timeline.staggerFromTo(
      menuBars,
      0.8,
      {
        y: 10,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        ease: Expo.easeInOut,
      },
      0.2,
    );
    return timeline;
  }
}

export default N01MainNavigationTransitionController;
