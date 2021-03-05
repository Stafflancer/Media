import ko, { Observable } from 'knockout';

export class Map {
  public static offsetRange: number = 0;
  public static activeLocationIndex: Observable<number> = ko.observable(0);
  public static showPanel: Observable<boolean> = ko.observable(false);
  public static activeHotspotIndex: Observable<number> = ko.observable(-1);
}
