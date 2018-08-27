import Tracker from '@/models/tracker';
import TabViews from '@/components/dashboard/details/TabViews';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabViews Component', () => {
    let tracker;
    let view;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        view = tracker.views[0];
        wrapper = mountWithTracker(TabViews, tracker);
    });

    it('has a list of views', () => {
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(2)').text()).to.contain(view.label);
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
        expect(wrapperTreeView.props().data).to.deep.equal(view.data);
        expect(wrapperTreeView.props().label).to.equal('data');
    });

    it('has not details if data are not provided', () => {
        tracker = new Tracker(trackerFactory.create('data', { views: [
            { name: 'a', path: '/' },
        ]}));
        wrapper = mountWithTracker(TabViews, tracker);
        let tr = wrapper.find('table tr:nth-child(1)');

        tr.trigger('click');
        let trDetails = wrapper.find('table tr:nth-child(1) + tr.detail');
        expect(trDetails.exists()).to.be.false;
    });
});
