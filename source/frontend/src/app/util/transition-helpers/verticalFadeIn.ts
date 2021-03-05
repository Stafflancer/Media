import { TweenMax, Power2 } from 'gsap';

export const verticalFadeIn = (items: Array<HTMLElement>): Array<TweenMax> => {
  return TweenMax.staggerFromTo(
    items,
    1,
    {
      y: 20,
      autoAlpha: 0,
    },
    {
      y: 0,
      autoAlpha: 1,
      clearProps: 'visibility, opacity, transform',
      ease: Power2.easeOut,
    },
    0.2,
  );
};
