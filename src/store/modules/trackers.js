const state = {
    all: [],
};

const getters = {
    all: state => state.all,
};

const mutations = {
    store(state, tracker) {
        state.all.push(tracker);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
};
