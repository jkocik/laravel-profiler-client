import Tracker from '@/models/tracker';

export let dummyTrackerData = {
    meta: {
        id: 'abc4567890abc4567890abc456789012',
        version: '5.6.0',
        env: 'local',
    },
};

export let dummyTracker = new Tracker(dummyTrackerData);

export let dummyTrackerDataB = {
    meta: {
        id: '12345678901234567890123456789012',
        version: '5.5.0',
        env: 'testing',
    },
};

export let dummyTrackerB = new Tracker(dummyTrackerDataB);
