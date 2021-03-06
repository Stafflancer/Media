declare module '*.hbs?include';
declare module '*.json';
declare module '*.yml';
declare module 'swiper';

type Constructor<T = {}> = new (...args: any[]) => T;

// declare const process: {
//   env: {
//     NODE_ENV: 'production' | 'development';
//   };
// };

interface Window {
  webpackPublicPath: string;
}
