const missing = '---';

export const routeService = {
    methods(methods) {
        return methods.join(', ');
    },

    name(name) {
        return name || missing;
    },

    prefix(prefix) {
        return prefix || missing;
    },

    middleware(middleware) {
        return middleware.join(', ') || missing;
    },

    usesType(uses) {
        return Object.keys(uses)[0];
    },
};
