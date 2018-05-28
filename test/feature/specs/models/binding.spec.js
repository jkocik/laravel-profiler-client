import Binding from '@/models/binding';
import { dummyTrackerData } from './../../../fixtures/es6';

describe('Binding Model', () => {
    it('has abstract', () => {
        let binding = new Binding(dummyTrackerData.data.bindings[0]);

        expect(binding.abstract).to.equal(dummyTrackerData.data.bindings[0].abstract);
    });

    it('has resolved', () => {
        let binding = new Binding(dummyTrackerData.data.bindings[0]);

        expect(binding.resolved).to.equal(dummyTrackerData.data.bindings[0].resolved);
    });

    it('has resolved even resolved is null', () => {
        expect(dummyTrackerData.data.bindings[1].resolved).to.be.null;

        let binding = new Binding(dummyTrackerData.data.bindings[1]);

        expect(binding.resolved).to.be.null;
    });
});
