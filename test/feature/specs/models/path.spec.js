import Path from '@/models/path';

describe('Path Model', () => {
    it('has name for human', () => {
        let path = new Path({
            name: 'some_test_name',
            path: 'some_test_path',
        });

        expect(path.nameForHuman).to.equal('some test name');
    });
});
