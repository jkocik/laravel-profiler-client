import { mount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld';

describe('HelloWorld.vue', () => {
    it('should render correct contents', () => {
        let wrapper = mount(HelloWorld);
        expect(wrapper.find('h1').text()).to.equal('Welcome to Your Vue.js App');
    });
});
