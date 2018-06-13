const getters = {
    isConnected: state => state.connected,
    connectErrorCount: state => state.connectErrorCount,
    url: state => state.url,
};

const mutations = {
    updateConnected(state, connected) {
        state.connected = connected;
    },

    incrementConnectErrorCount(state) {
        state.connectErrorCount++;
    },

    updateUrl(state, url) {
        state.url = url;
    },
};

export function socketsFactory() {
    const state = {
        connected: false,
        connectErrorCount: 0,
        url: 'http://localhost:1901',
    };

    return {
        namespaced: true,
        state,
        getters,
        mutations,
    };
};
