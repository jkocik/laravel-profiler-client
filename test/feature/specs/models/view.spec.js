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
            data: { a: { b: 'c' } },
        });

        expect(viewA.hasData()).to.be.false;
        expect(viewA.countParams()).to.be.equal(0);
        expect(viewB.hasData()).to.be.true;
        expect(viewB.countParams()).to.be.equal(1);
    });

    it('has params', () => {
        let viewA = new View({
            name: 'some test name',
            path: 'some test path',
        });
        let viewB = new View({
            name: 'some test name',
            path: 'some test path',
            params: { a: 'x', b: 'y' },
        });

        expect(viewA.hasParams()).to.be.false;
        expect(viewA.countParams()).to.be.equal(0);
        expect(viewB.hasParams()).to.be.true;
        expect(viewB.countParams()).to.be.equal(2);
    });
});
