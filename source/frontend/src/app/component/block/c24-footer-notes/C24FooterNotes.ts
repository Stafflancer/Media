import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C24FooterNotesTransitionController from './C24FooterNotesTransitionController';

export default class C24FooterNotes extends AbstractTransitionBlock {
  public static displayName: string = 'c24-footer-notes';
  public transitionController: C24FooterNotesTransitionController;

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C24FooterNotesTransitionController(this);
  }
}
