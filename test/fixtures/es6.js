import Tracker from '@/models/tracker';
import trackers from './trackers.json';

export const dummyTrackerData = trackers[0];
export const dummyTrackerDataB = trackers[1];

export const dummyTracker = new Tracker(dummyTrackerData);
export const dummyTrackerB = new Tracker(dummyTrackerDataB);
