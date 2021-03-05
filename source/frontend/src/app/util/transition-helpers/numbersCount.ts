import { TweenMax } from 'gsap';

export const numbersCount = (items: Array<HTMLElement>): Array<TweenMax> =>
  items.map(item => {
    const data = { currentValue: '0', finalValue: item.dataset.value };
    const figure = item.innerHTML.substring(1);

    return TweenMax.to(data, 1.5, {
      currentValue: `+=${data.finalValue}`,
      roundProps: 'currentValue',
      onUpdate: () => {
        item.innerHTML = `${data.currentValue}${figure}`;
      },
    });
  });
