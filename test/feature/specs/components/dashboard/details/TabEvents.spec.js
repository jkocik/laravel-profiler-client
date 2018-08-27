import Tracker from '@/models/tracker';
import TabEvents from '@/components/dashboard/details/TabEvents';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabEvents Component', () => {
    let tracker;
    let event;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        event = tracker.events[0];
        wrapper = mountWithTracker(TabEvents, tracker);
    });

    it('has a list of events', () => {
        tracker = new Tracker(trackerFactory.create('data', { events: [
            { name: 'eventA', count: 1 },
            { name: 'eventB', count: 2 },
            { name: 'eventC', count: 5 },
        ]}));
        wrapper = mountWithTracker(TabEvents, tracker);

        expect(wrapper.find('table tr:nth-child(1) td:nth-child(2)').text()).to.contain('eventA');
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(3)').text()).to.not.contain('1');
        expect(wrapper.find('table tr:nth-child(2) td:nth-child(2)').text()).to.contain('eventB');
        expect(wrapper.find('table tr:nth-child(2) td:nth-child(3)').text()).to.contain(
            wrapper.vm.$t('tabs.events.group', { times: 2 })
        );
        expect(wrapper.find('table tr:nth-child(3) td:nth-child(2)').text()).to.contain('eventC');
        expect(wrapper.find('table tr:nth-child(3) td:nth-child(3)').text()).to.contain(
            wrapper.vm.$t('tabs.events.group', { times: 5 })
        );
    });

    it('toggles visibility of row details', () => {
        let tr = wrapper.find('table tr:nth-child(1)');

        tr.trigger('click');
        let trDetails = wrapper.find('table tr:nth-child(1) + tr.detail');
        expect(trDetails.exists()).to.be.true;
        expect(trDetails.isVisible()).to.be.true;
        expect(trDetails.find('td').attributes().colspan).to.equal('1');

        tr.trigger('click');
        let trDetailsBis = wrapper.find('table tr:nth-child(1) + tr.detail');
        expect(trDetailsBis.exists()).to.be.false;
    });

    it('has details with data', () => {
        let tr = wrapper.find('table tr:nth-child(1)');

        tr.trigger('click');
        let wrapperTreeView = wrapper.find({ name: 'tree-view' });
        expect(wrapperTreeView.props().data).to.deep.equal(event.data);
        expect(wrapperTreeView.props().label).to.equal('data');
    });

    it('has not details if data are not provided', () => {
        tracker = new Tracker(trackerFactory.create('data', { events: [
            { name: 'a', count: 1 },
        ]}));
        wrapper = mountWithTracker(TabEvents, tracker);
        let tr = wrapper.find('table tr:nth-child(1)');

        tr.trigger('click');
        let trDetails = wrapper.find('table tr:nth-child(1) + tr.detail');
        expect(trDetails.exists()).to.be.false;
    });
});
