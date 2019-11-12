import { socketsFactory } from '@/store/modules/sockets';

describe('Sockets Store Module', () => {
    it('has set default url', () => {
        let sockets = socketsFactory();

        expect(sockets.state.url).to.equal(`${window.location.protocol}//${window.location.hostname}:1901`);
    });
});
