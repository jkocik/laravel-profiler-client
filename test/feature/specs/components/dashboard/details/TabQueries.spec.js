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
        expect(wrapper.find('table tr:nth-child(1) td:nth-child(2)').classes()).to.contain('has-text-info');
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

    it('has transaction details only with connection name', () => {
        tracker = new Tracker(trackerFactory.create('data', { queries: [
            {
                type: 'transaction-begin',
                database: 'laravel_profiler',
                name: 'mysql_1',
            },
            {
                type: 'transaction-commit',
                database: 'laravel_profiler',
                name: 'mysql_2',
            },
            {
                type: 'transaction-rollback',
                database: 'laravel_profiler',
                name: 'mysql_3',
            },
        ]}));
        wrapper = mountWithTracker(TabQueries, tracker);

        let trA = wrapper.find('table tr:nth-child(1)');
        let trB = wrapper.find('table tr:nth-child(2)');
        let trC = wrapper.find('table tr:nth-child(3)');

        expect(trA.find('td:nth-child(2)').classes()).to.contain('has-text-primary');
        expect(trB.find('td:nth-child(2)').classes()).to.contain('has-text-success');
        expect(trC.find('td:nth-child(2)').classes()).to.contain('has-text-danger');

        trA.trigger('click');
        let trDetailsA = wrapper.find('table tr:nth-child(1) + tr.detail');
        expect(trDetailsA.text()).to.contain('mysql_1');
        expect(trDetailsA.text()).to.not.contain('query');
        expect(trDetailsA.find({ name: 'tree-view' }).exists()).to.be.false;
        trA.trigger('click');

        trB.trigger('click');
        let trDetailsB = wrapper.find('table tr:nth-child(2) + tr.detail');
        expect(trDetailsB.text()).to.contain('mysql_2');
        expect(trDetailsB.text()).to.not.contain('query');
        expect(trDetailsB.find({ name: 'tree-view' }).exists()).to.be.false;
        trB.trigger('click');

        trC.trigger('click');
        let trDetailsC = wrapper.find('table tr:nth-child(3) + tr.detail');
        expect(trDetailsC.text()).to.contain('mysql_3');
        expect(trDetailsC.text()).to.not.contain('query');
        expect(trDetailsC.find({ name: 'tree-view' }).exists()).to.be.false;
    });
});
