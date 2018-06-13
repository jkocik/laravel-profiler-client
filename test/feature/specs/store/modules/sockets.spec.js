import { socketsFactory } from '@/store/modules/sockets';

describe('Sockets Store Module', () => {
    it('has set default url', () => {
        let sockets = socketsFactory();

        expect(sockets.state.url).to.equal('http://localhost:1901');
    });
});
