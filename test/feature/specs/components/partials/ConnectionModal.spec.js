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
        let wrapper = mountWithoutProps(ConnectionModal);
        wrapper.vm.$parent = { close: () => {} };

        let parent = sinon.mock(wrapper.vm.$parent);
        parent.expects('close').once();

        wrapper.find('button[type=button]').trigger('click');

        parent.verify();
        parent.restore();
    });
});
