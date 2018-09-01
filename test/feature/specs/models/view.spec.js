import View from '@/models/view';

describe('View Model', () => {
    it('has label', () => {
        let view = new View({
            name: 'some test name',
            path: 'some test path',
        });

        expect(view.label).to.equal('some test name (some test path)');
    });

    it('has data', () => {
        let viewA = new View({
            name: 'some test name',
            path: 'some test path',
        });
        let viewB = new View({
            name: 'some test name',
            path: 'some test path',
            data: [],
        });

        expect(viewA.hasData()).to.be.false;
        expect(viewB.hasData()).to.be.true;
    });

    it('has params', () => {
        let viewA = new View({
            name: 'some test name',
            path: 'some test path',
        });
        let viewB = new View({
            name: 'some test name',
            path: 'some test path',
            params: [],
        });

        expect(viewA.hasParams()).to.be.false;
        expect(viewB.hasParams()).to.be.true;
    });
});
