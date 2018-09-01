import Tracker from '@/models/tracker';
import TabViews from '@/components/dashboard/details/TabViews';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabViews Component', () => {
    let tracker;
    let viewA;
    let viewB;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        viewA = tracker.views[0];
        viewB = tracker.views[1];
        wrapper = mountWithTracker(TabViews, tracker);
    });

    it('has a list of views', () => {
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(2)').text()).to.contain(viewA.label);
        expect(wrapper.find('table tr:nth-child(2) td:nth-child(2)').text()).to.contain(viewB.label);
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
        expect(wrapperTreeView.props().data).to.deep.equal(viewA.data);
        expect(wrapperTreeView.props().label).to.equal('data');
    });

    it('has details with params types if data are not provided', () => {
        let tr = wrapper.find('table tr:nth-child(2)');

        tr.trigger('click');
        let wrapperTreeView = wrapper.find({ name: 'tree-view' });
        expect(wrapperTreeView.props().data).to.deep.equal(viewB.params);
        expect(wrapperTreeView.props().label).to.equal('params types');
    });
});
