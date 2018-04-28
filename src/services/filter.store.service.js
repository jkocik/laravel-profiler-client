import helper from './helper.service';

export const filterService = {
    filter(data, filterBy, fullLists) {
        const keys = Object.keys(filterBy).filter((key) => {
            return ! helper.areArraysNotEmptyAndEqual(filterBy[key], fullLists[key]);
        });

        return data.filter((item) => {
            return keys.every(key => helper.isIn(filterBy[key], item[key]));
        });
    },
};
