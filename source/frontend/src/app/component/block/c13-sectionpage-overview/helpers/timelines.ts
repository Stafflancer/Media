import { TimelineMax, TweenMax, Expo } from 'gsap';

export const handleTimelineProgress = (timeline: TimelineMax, state: boolean): void => {
  const duration = state ? timeline.duration() - timeline.time() : timeline.time();
  const progress = state ? 1 : 0;
  TweenMax.to(timeline, duration, { progress });
};

export const timeline = (element: HTMLElement, duration: number = 1, ): TimelineMax => {
  return <TimelineMax>new TimelineMax({ paused: true }).fromTo(
    element,
    duration,
    {
      autoAlpha: 0,
    },
    {
      autoAlpha: 1,
      ease: Expo.easeInOut,
    },
  );
};
