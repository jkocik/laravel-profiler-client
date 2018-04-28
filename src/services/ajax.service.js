export const ajaxService = {
    ajax(ajax) {
        if (ajax === null) {
            return 'x';
        }

        return ajax ? 'ajax' : 'regular';
    },
};
