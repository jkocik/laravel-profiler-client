import Tracker from '@/models/tracker';
import TabQueries from '@/components/dashboard/details/TabQueries';
import { trackerFactory, mountWithTracker } from './../../../test-helper';

describe('TabQueries Component', () => {
    let tracker;
    let query;
    let wrapper;

    beforeEach(() => {
        tracker = new Tracker(trackerFactory.create());
        query = tracker.queries[0];
        wrapper = mountWithTracker(TabQueries, tracker);
    });

    it('has a list of queries', () => {
        expect(wrapper.find('.header').text()).to.contain(tracker.queriesExecutionTimeForHuman);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(2)').text()).to.contain(query.query);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(3)').text()).to.contain(query.database);
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(4)').text()).to.contain(`${query.time}.00ms`);
    });

    it('toggles visibility of row details', () => {
        let tr = wrapper.find('table tr:nth-child(1)');

        tr.trigger('click');
        let trDetails = wrapper.find('table tr:nth-child(1) + tr.detail');
        expect(trDetails.exists()).to.be.true;
        expect(trDetails.isVisible()).to.be.true;
        expect(trDetails.find('td').attributes().colspan).to.equal('3');

        tr.trigger('click');
        let trDetailsBis = wrapper.find('table tr:nth-child(1) + tr.detail');
        expect(trDetailsBis.exists()).to.be.false;
    });

    it('has details with sql', () => {
        let tr = wrapper.find('table tr:nth-child(1)');

        tr.trigger('click');
        let trDetails = wrapper.find('table tr:nth-child(1) + tr.detail');
        expect(trDetails.text()).to.contain(query.sql);
    });

    it('has details with bindings', () => {
        let tr = wrapper.find('table tr:nth-child(1)');

        tr.trigger('click');
        let wrapperTreeView = wrapper.find({ name: 'tree-view' });
        expect(wrapperTreeView.props().data).to.deep.equal(query.bindings);
        expect(wrapperTreeView.props().label).to.equal('bindings');
    });

    it('has details with connection name', () => {
        let tr = wrapper.find('table tr:nth-child(1)');

        tr.trigger('click');
        let trDetails = wrapper.find('table tr:nth-child(1) + tr.detail');
        expect(trDetails.text()).to.contain(query.name);
    });
});
