import { mount } from '@vue/test-utils';
import TreeView from '@/tree-view/components/TreeView';

describe('TreeView Component', () => {
    it('has tree-view component name', () => {
        let wrapper = mount(TreeView, {
            propsData: { label: '', data: {} },
        });

        expect(wrapper.name()).to.equal('tree-view');
    });

    it('has label', () => {
        let wrapper = mount(TreeView, {
            propsData: { label: 'config', data: {} },
        });

        expect(wrapper.findAll('section > span').at(0).text()).to.equal('config');
    });

    it('counts first level of passed data', () => {
        let wrapperA = mount(TreeView, {
            propsData: { data: {} },
        });
        let wrapperB = mount(TreeView, {
            propsData: { data: [] },
        });
        let wrapperC = mount(TreeView, {
            propsData: { data: { x: 1 } },
        });
        let wrapperD = mount(TreeView, {
            propsData: { data: [1, 2] },
        });
        let wrapperE = mount(TreeView, {
            propsData: { data: { x: 1, y: 2, z: { a: 'a', b: 'b' } } },
        });
        let wrapperF = mount(TreeView, {
            propsData: { data: [1, 2, 3, { a: 'a', b: 'b' }] },
        });

        expect(wrapperA.findAll('section > span').at(1).text()).to.equal('(0)');
        expect(wrapperB.findAll('section > span').at(1).text()).to.equal('(0)');
        expect(wrapperC.findAll('section > span').at(1).text()).to.equal('(1)');
        expect(wrapperD.findAll('section > span').at(1).text()).to.equal('(2)');
        expect(wrapperE.findAll('section > span').at(1).text()).to.equal('(3)');
        expect(wrapperF.findAll('section > span').at(1).text()).to.equal('(4)');
    });

    it('lists by default first level of data', () => {
        let wrapper = mount(TreeView, {
            propsData: { data: { x: 'first', y: 'second', z: { a: 1, b: 2 }, w: [1, 2, 3] } },
        });

        expect(wrapper.findAll('ul > li').at(0).text()).to.equal('x: first');
        expect(wrapper.findAll('ul > li').at(1).text()).to.equal('y: second');
        expect(wrapper.findAll('ul > li').at(2).text()).to.equal('z (object: 2)');
        expect(wrapper.findAll('ul > li').at(3).text()).to.equal('w (array: 3)');
    });

    it('lists values in different colors', () => {
        let wrapper = mount(TreeView, {
            propsData: { data: { a: 1, b: 1.23, c: 'string', d: true, e: null } },
        });

        expect(wrapper.findAll('ul > li').at(0).find('span > span').classes()).to.contain('is-number');
        expect(wrapper.findAll('ul > li').at(1).find('span > span').classes()).to.contain('is-number');
        expect(wrapper.findAll('ul > li').at(2).find('span > span').classes()).to.contain('is-string');
        expect(wrapper.findAll('ul > li').at(3).find('span > span').classes()).to.contain('is-boolean');
        expect(wrapper.findAll('ul > li').at(4).find('span > span').classes()).to.contain('is-null');
    });

    it('opens next level on click', () => {
        let wrapper = mount(TreeView, {
            propsData: { data: { x: {}, y: [], z: { a: 1, b: 2 }, w: [1, 2, 3] } },
        });

        expect(wrapper.findAll('ul > li').at(0).find('i').exists()).to.be.false;
        expect(wrapper.findAll('ul > li').at(0).find('span').classes()).to.not.contain('is-toggleable');
        expect(wrapper.findAll('ul > li').at(1).find('i').exists()).to.be.false;
        expect(wrapper.findAll('ul > li').at(1).find('span').classes()).to.not.contain('is-toggleable');

        let li2 = wrapper.findAll('ul > li').at(2);
        let li3 = wrapper.findAll('ul > li').at(3);
        expect(li2.find('i').classes()).to.contain('fa-angle-right');
        expect(li3.find('i').classes()).to.contain('fa-angle-right');

        li2.find('.is-toggleable').trigger('click');

        li2 = wrapper.findAll('ul > li').at(2);
        expect(li2.find('i').classes()).to.not.contain('fa-angle-right');
        expect(li2.find('i').classes()).to.contain('fa-angle-down');
        expect(li2.find('ul').text()).to.contain('a: 1');
        expect(li2.find('ul').text()).to.contain('b: 2');
    });
});
