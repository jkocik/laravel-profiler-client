import Tracker from '@/models/tracker';
import { trackerFactory } from './../../test-helper';
import { detailsFactory } from '@/store/modules/details';

describe('Details Store Module', () => {
    let details;
    let state;
    let trackerA;
    let trackerB;

    beforeEach(() => {
        details = detailsFactory();
        state = Object.assign({}, details.state);

        trackerA = new Tracker(
            trackerFactory
                .set('meta', { id: 123 })
                .set('meta', { is_running_in_console: true })
                .set('meta', { env: 'local' })
                .set('meta', { type: 'http' })
                .set('meta', { status: 200 })
                .set('meta', { method: 'PUT' })
                .create()
        );

        trackerB = new Tracker(
            trackerFactory
                .set('meta', { id: 456 })
                .set('meta', { is_running_in_console: false })
                .set('meta', { env: 'production' })
                .set('meta', { type: 'command-finished' })
                .set('meta', { status: 0 })
                .set('meta', { method: '---' })
                .create()
        );
    });

    it('toggles opened details', () => {
        details.mutations.toggleOpenedDetails(state, trackerA.id);
        details.mutations.toggleOpenedDetails(state, trackerB.id);

        expect(state.openedDetails).to.be.instanceOf(Array);
        expect(state.openedDetails).to.deep.equal([
            trackerA.id,
            trackerB.id,
        ]);

        details.mutations.toggleOpenedDetails(state, trackerA.id);

        expect(state.openedDetails).to.deep.equal([
            trackerB.id,
        ]);
    });
});
