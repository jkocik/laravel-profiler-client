const getters = {
    isConnected: state => state.connected,
    url: state => state.url,
};

const mutations = {
    updateConnected(state, connected) {
        state.connected = connected;
    },

    updateUrl(state, url) {
        state.url = url;
    },
};

export function socketsFactory() {
    const state = {
        connected: false,
        url: 'http://localhost:1901',
    };

    return {
        namespaced: true,
        state,
        getters,
        mutations,
    };
};
