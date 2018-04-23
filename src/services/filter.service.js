export const filterService = {
    filter(data, filterBy) {
        const keys = Object.keys(filterBy);
        return data.filter((item) => {
            return keys.every(key => !!~filterBy[key].indexOf(item[key]));
        });
    },
};
