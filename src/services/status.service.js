export const statusService = {
    statusGroup(status) {
        const group = [2, 3, 4, 5].find((item) => {
            return item === Math.floor(status / 100);
        }) || '?';

        return status ? `${group}xx` : 'x';
    },
};
