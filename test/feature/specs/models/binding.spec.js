import Binding from '@/models/binding';
import { bindingsFactory } from './../test-helper';

describe('Binding Model', () => {
    let bindingSource;

    beforeEach(() => {
        bindingSource = bindingsFactory.create();
    });

    it('has abstract', () => {
        let binding = new Binding(bindingSource);

        expect(binding.abstract).to.equal(bindingSource.abstract);
    });

    it('has resolved', () => {
        let binding = new Binding(bindingSource);

        expect(binding.resolved).to.equal(bindingSource.resolved);
    });

    it('has resolved even resolved is null', () => {
        let binding = new Binding(bindingsFactory.create({ resolved: null }));

        expect(binding.resolved).to.be.null;
    });
});
