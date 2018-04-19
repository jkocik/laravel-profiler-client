const getters = {
    all: state => state.all,
};

const mutations = {
    store(state, tracker) {
        state.all.unshift(tracker);
    },
};

export function trackersFactory() {
    const state = {
        all: [],
    };

    return {
        namespaced: true,
        state,
        getters,
        mutations,
    };
};
