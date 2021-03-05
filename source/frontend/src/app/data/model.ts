import ko, { Observable } from 'knockout';

export class Model {
  public static showLanguageSelector: Observable<boolean> = ko.observable(false);
  public static showVideoOverlay: Observable<boolean> = ko.observable(false);
  public static videoOverlayId: Observable<string> = ko.observable('');
}
