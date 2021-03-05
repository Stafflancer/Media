import { SubscriptionCallback } from 'knockout';
import { Map } from '../map';

export const setActiveLocationIndex = (index: number): void => Map.activeLocationIndex(index);
export const setActiveHotspotIndex = (index: number): void => {
  showPanel();
  Map.activeHotspotIndex(index);
};

export const getActiveLocationIndex = (): number => Map.activeLocationIndex();
export const getActiveHotspotIndex = (): number => Map.activeHotspotIndex();

export const showPanel = () => Map.showPanel(true);
export const hidePanel = () => Map.showPanel(false);
export const getPanelState = (): boolean => Map.showPanel();

export const setOffsetRange = (offset: number) => {
  Map.offsetRange = offset;
};

export const getOffsetRange = (): number => Map.offsetRange;

export const handleRegionState = (callback: SubscriptionCallback) =>
  Map.activeLocationIndex.subscribe(callback);

export const handleHotspotState = (callback: SubscriptionCallback) =>
  Map.activeHotspotIndex.subscribe(callback);

export const handlePanelState = (callback: SubscriptionCallback) =>
  Map.showPanel.subscribe(callback);
