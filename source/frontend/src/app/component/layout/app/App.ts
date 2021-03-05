import getComponentForElement from 'muban-core/lib/utils/getComponentForElement';
import { IMubanTransitionMixin, MubanTransitionVariable } from 'muban-transition-component';
import { ScrollTrackerComponentManager } from 'scroll-tracker-component-manager';
import AbstractComponent from '../../AbstractComponent';

export default class App extends AbstractComponent {
  public static readonly displayName: string = 'app-root';

  public scrollTrackerComponentManager: ScrollTrackerComponentManager<
    IMubanTransitionMixin
  > = new ScrollTrackerComponentManager<IMubanTransitionMixin>({
    setDebugLabel: false,
    debugBorderColor: 'red',
    inViewProgressEnabled: true,
    scrollThrottle: 100,
    resizeDebounce: 100,
    enableSmoothScroll: false,
    smoothScrollOptions: {
      damping: 0.1,
      alwaysShowTracks: false,
    },
  });

  constructor(element: HTMLElement) {
    super(element);
    if (process.env.NODE_ENV === 'development') {
      import('grid-checker')
        .then(({ default: GridChecker }) => {
          new GridChecker({
            columns: 12,
            gutter: 4,
            maxWidth: 2500,
            padding: 24,
            color: 'magenta',
            className: 'grid-layout',
            breakpoints: [
              {
                threshold: 1024,
                padding: 40,
                gutter: 20,
              },
            ],
          });
        })
        .catch();
    }
  }

  public adopted(): void {
    this.getElements(`[${MubanTransitionVariable.scrollComponentAttribute}]`).forEach(
      (element: HTMLElement) => {
        this.scrollTrackerComponentManager.addComponentToScrollTracker(<IMubanTransitionMixin>(
          getComponentForElement(element)
        ));
      },
    );
  }

  public dispose() {
    if (this.scrollTrackerComponentManager) {
      this.scrollTrackerComponentManager.dispose();
    }
  }
}
