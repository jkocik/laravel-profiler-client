export default {
    isIn(data, itemToFind) {
        return ! this.isNotIn(data, itemToFind);
    },

    isNotIn(data, itemToFind) {
        return ! ~data.indexOf(itemToFind);
    },

    areArraysNotEmptyAndEqual(arrA, arrB) {
        return !! arrA.length && [...arrA].sort().toString() === [...arrB].sort().toString();
    },

    uniqueOf(arr, newItem) {
        return [ ...new Set([ ...arr, newItem ]) ];
    },
};
