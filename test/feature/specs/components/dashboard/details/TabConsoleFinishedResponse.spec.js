import Tracker from '@/models/tracker';
import { trackerFactory, mountWithTracker } from './../../../test-helper';
import TabConsoleFinishedResponse from '@/components/dashboard/details/TabConsoleFinishedResponse';

describe('TabConsoleFinishedResponse Component', () => {
    it('has exit code', () => {
        let tracker = new Tracker(trackerFactory.create('meta', { type: 'command-finished', status: 123 }));
        let wrapper = mountWithTracker(TabConsoleFinishedResponse, tracker);

        expect(wrapper.lis(0).text()).to.contain('exitCode');
        expect(wrapper.lis(0).text()).to.contain(123);
    });
});
