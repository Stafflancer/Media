import { TweenMax, Power2 } from 'gsap';

export const fadeIn = (items: Array<HTMLElement>): Array<TweenMax> => {
  return TweenMax.staggerFromTo(
    items,
    0.5,
    {
      autoAlpha: 0,
    },
    {
      autoAlpha: 1,
      clearProps: 'visibility, opacity',
      ease: Power2.easeOut,
    },
    0.1,
  );
};
