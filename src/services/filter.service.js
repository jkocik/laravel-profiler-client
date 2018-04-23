export const filterService = {
    filter(data, filterBy) {
        const keys = Object.keys(filterBy);
        return data.filter((item) => {
            return keys.every(key => this.isIn(filterBy[key], item[key]));
        });
    },

    isIn(data, itemToFind) {
        return !this.isNotIn(data, itemToFind);
    },

    isNotIn(data, itemToFind) {
        return !~data.indexOf(itemToFind);
    },
};
