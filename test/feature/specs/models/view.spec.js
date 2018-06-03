import View from '@/models/view';

describe('View Model', () => {
    it('has label', () => {
        let view = new View({
            name: 'some test name',
            path: 'some test path',
            data: [],
        });

        expect(view.label).to.equal('some test name (some test path)');
    });
});
