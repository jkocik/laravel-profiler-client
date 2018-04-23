export const filterService = {
    filter(data, filterBy, fullLists) {
        const keys = Object.keys(filterBy).filter((key) => {
            return !this.areArraysNotEmptyAndEqual(filterBy[key], fullLists[key]);
        });

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

    areArraysNotEmptyAndEqual(arrA, arrB) {
        return !!arrA.length && [...arrA].sort().toString() === [...arrB].sort().toString();
    },
};
