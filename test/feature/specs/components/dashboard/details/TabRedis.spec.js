import Tracker from '@/models/tracker';
import TabRedis from '@/components/dashboard/details/TabRedis';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabRedis Component', () => {
    let tracker;
    let redis;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        redis = tracker.redis[0];
        wrapper = mountWithTracker(TabRedis, tracker);
    });

    it('has a list of redis commands', () => {
        expect(wrapper.find('.header').text()).to.contain(tracker.redisExecutionTimeForHuman);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(1)').text()).to.contain(redis.command);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(1)').text()).to.contain(redis.parameters[0]);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(1)').text()).to.contain(redis.parameters[1]);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(2)').text()).to.contain(redis.name);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(3)').text()).to.contain(`${redis.time}.00ms`);
    });
});
