export const treeViewService = {
    maxDepthOf(data, defaultDepth = 1) {
        return Object.keys(data).length && defaultDepth;
    },
};
