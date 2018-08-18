export const bTableService = {
    toggleOpenedDetails(openedDetails, item) {
        const index = openedDetails.indexOf(item);

        if (~index) {
            openedDetails.splice(index, 1);
            return;
        }

        openedDetails.push(item);
    },
};
