import { Server } from 'mock-socket';
import ConnectionModal from '@/components/partials/ConnectionModal';
import { mountWithoutProps, mountWithSocketMock } from './../../test-helper';

describe('ConnectionModal Component', () => {
    it('has url input set to current websockets url by default', () => {
        let wrapper = mountWithoutProps(ConnectionModal);

        expect(wrapper.find('input').element.value).to.equal(wrapper.vm.$store.state.sockets.url);
        expect(wrapper.vm.newUrl).to.equal(wrapper.vm.$store.state.sockets.url);
    });

    it('connects to server on submit', () => {
        let serverA = new Server('http://localhost:1991');
        let serverB = new Server('http://localhost:1999');
        let wrapper = mountWithSocketMock(ConnectionModal, 'http://localhost:1991');

        let socket = sinon.mock(wrapper.vm.$socket);
        socket.expects('connect').once().withArgs('http://localhost:1999');

        wrapper.vm.url = 'http://localhost:1999';

        wrapper.find('form').trigger('submit');

        socket.verify();
        socket.restore();

        serverA.stop();
        serverB.stop();
    });

    it('closes on close', () => {
        let closeSpy = sinon.spy();
        let wrapper = mountWithoutProps(ConnectionModal);
        wrapper.vm.$parent = { close: () => { closeSpy(); } };

        wrapper.find('button[type=button]').trigger('click');

        expect(closeSpy.calledOnce).to.be.true;
    });

    it('closes on successful connection', () => {
        let closeSpy = sinon.spy();
        let wrapper = mountWithoutProps(ConnectionModal);
        wrapper.vm.$parent = { close: () => { closeSpy(); } };

        wrapper.vm.$store.commit('sockets/updateConnected', true);

        expect(closeSpy.calledOnce).to.be.true;
    });

    it('shows connection error msg on failed connection', () => {
        let wrapper = mountWithoutProps(ConnectionModal);
        wrapper.vm.$socket = {
            connect: () => {},
            disconnect: () => {},
        };
        expect(wrapper.text()).to.not.contain(wrapper.vm.$t('modals.connection.connection-failed'));

        wrapper.vm.$store.commit('sockets/incrementConnectErrorCount');
        expect(wrapper.text()).to.contain(wrapper.vm.$t('modals.connection.connection-failed'));

        wrapper.find('input').trigger('focus');
        expect(wrapper.text()).to.not.contain(wrapper.vm.$t('modals.connection.connection-failed'));

        wrapper.vm.$store.commit('sockets/incrementConnectErrorCount');
        expect(wrapper.text()).to.contain(wrapper.vm.$t('modals.connection.connection-failed'));

        wrapper.find('form').trigger('submit');
        expect(wrapper.text()).to.not.contain(wrapper.vm.$t('modals.connection.connection-failed'));
    });

    it('stops trying to connect on failed connection', () => {
        let disconnectSpy = sinon.spy();
        let wrapper = mountWithoutProps(ConnectionModal);
        wrapper.vm.$socket = {
            connect: () => {},
            disconnect: () => { disconnectSpy(); },
        };

        wrapper.vm.$store.commit('sockets/incrementConnectErrorCount');

        expect(disconnectSpy.calledOnce).to.be.true;
    });
});
