import { treeViewService } from '@/services/tree-view.service';

describe('Tree View Service', () => {
    it('returns 0 as max depth on empty array', () => {
        let data = [];

        expect(treeViewService.maxDepthOf(data)).to.equal(0);
    });

    it('returns 0 as max depth on empty object', () => {
        let data = {};

        expect(treeViewService.maxDepthOf(data)).to.equal(0);
    });

    it('returns default max depth on existing array', () => {
        let data = [1];
        let defaultDepth = 5;

        expect(treeViewService.maxDepthOf(data, defaultDepth)).to.equal(5);
    });

    it('returns default max depth on existing array', () => {
        let data = { a: 1 };
        let defaultDepth = 6;

        expect(treeViewService.maxDepthOf(data, defaultDepth)).to.equal(6);
    });

    it('has default max depth equal 1', () => {
        let data = [1, 2, 3];

        expect(treeViewService.maxDepthOf(data)).to.equal(1);
    });
});
