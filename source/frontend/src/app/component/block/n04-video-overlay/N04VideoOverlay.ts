import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import N04VideoOverlayTransitionController from './N04VideoOverlayTransitionController';
import VideoPlayer from 'app/component/general/video-player/VideoPlayer';
import { getComponentForElement } from 'muban-core';
import { Model } from 'app/data/model';
import { Expo, Power0, TimelineMax, TweenMax } from 'gsap';
import { Subscription } from 'knockout';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { makeVisible } from '../../../util/helpers/makeVisible';

export default class N04VideoOverlay extends AbstractTransitionBlock {
  public static displayName: string = 'n04-video-overlay';
  private readonly timeline: TimelineMax;
  private readonly closeButton: HTMLButtonElement = this.getElement('[data-close-button]');
  private readonly overlay: HTMLElement = this.getElement('[data-overlay]');
  private readonly drawer: HTMLElement = this.getElement('[data-content-drawer]');
  public transitionController: N04VideoOverlayTransitionController;
  private videoPlayerElement: HTMLElement = this.getElement('[data-component="video-player"]');
  private videoPlayer: VideoPlayer = getComponentForElement(this.videoPlayerElement);
  private videoPopupSubscription: Subscription;

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new N04VideoOverlayTransitionController(this);
    this.closeButton.addEventListener('click', this.handleCloseButtonClick);
    this.timeline = this.setupTimeline();
    makeVisible(el);
    this.videoPopupSubscription = Model.showVideoOverlay.subscribe(
      this.handleVideoOverlaySubscription,
    );
    this.setCorrectSettings();
    this.transitionVideoOverlay();
  }

  private handleVideoOverlaySubscription = () => {
    this.handleVideoOverlayState();
  };

  private handleVideoOverlayState = (): void => {
    this.setScrollState();
    this.transitionVideoOverlay();
    this.setKeyboardListeners();
  };

  private setScrollState = (): void => {
    Model.showVideoOverlay() ? disableBodyScroll(this.element) : enableBodyScroll(this.element);
  };

  private setKeyboardListeners = () => {
    Model.showVideoOverlay()
      ? window.addEventListener('keyup', this.handleKeyClick)
      : window.removeEventListener('keyup', this.handleKeyClick);
  };

  private handleKeyClick = (event: KeyboardEvent): void => {
    if (event.code != 'Escape') return;
    Model.showVideoOverlay(false);
  };

  private setupTimeline = (): TimelineMax => {
    const timelineSettings = {
      paused: true,
    };
    const timeline = new TimelineMax(timelineSettings);
    timeline.add(this.overlayTransitionIn());
    timeline.add(this.popupTransitionIn());
    timeline.add(this.closeButtonTransitionIn());
    return timeline;
  };

  private overlayTransitionIn = (): TweenMax => {
    return TweenMax.fromTo(
      this.overlay,
      0.25,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        ease: Power0.easeNone,
      },
    );
  };

  private closeButtonTransitionIn = (): TweenMax => {
    return TweenMax.fromTo(
      this.closeButton,
      0.5,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
      },
    );
  };

  private popupTransitionIn = (): TweenMax => {
    return TweenMax.fromTo(
      this.drawer,
      1.2,
      {
        autoAlpha: 0,
        scale: 0.9,
        clearProps: 'visibility',
      },
      {
        autoAlpha: 1,
        scale: 1,
        clearProps: 'all',
        ease: Expo.easeInOut,
      },
    );
  };

  private transitionVideoOverlay = (): void => {
    const duration = Model.showVideoOverlay()
      ? this.timeline.duration() - this.timeline.time()
      : this.timeline.time() * 0.5;

    const progress = Model.showVideoOverlay() ? 1 : 0;

    TweenMax.to(this.timeline, duration, {
      progress,
      onStart: this.onTransitionStart,
      onComplete: this.onTransitionComplete,
    });
  };

  private onTransitionStart = (): void => {
    this.setCorrectSettings();
    Model.showVideoOverlay() ? this.setVideoId() : this.videoPlayer.stop();
  };

  private onTransitionComplete = (): void => {
    Model.showVideoOverlay() ? this.videoPlayer.play() : this.setVideoId();
  };

  private handleCloseButtonClick = () => {
    Model.showVideoOverlay(false);
  };

  private setCorrectSettings = (): void => {
    this.element.style.pointerEvents = Model.showVideoOverlay() ? 'auto' : 'none';
  };

  private setVideoId = (): void => {
    this.videoPlayer.setVideoID(Model.videoOverlayId());
  };

  dispose(): void {
    window.removeEventListener('keyup', this.handleKeyClick)
    super.dispose();
  }
}
