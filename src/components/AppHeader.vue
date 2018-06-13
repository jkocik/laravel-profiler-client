<template>
    <header>
        <div class="container is-widescreen">
            <div>
                <b-icon
                    pack="fab"
                    icon="laravel"
                ></b-icon>
                <h1>Laravel Profiler</h1>
            </div>
            <div>
                <span @click="connection">
                    <b-icon
                        pack="fas"
                        icon="power-off"
                        :type="connectionType"
                    ></b-icon>
                </span>
            </div>
        </div>
    </header>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ConnectionModal from './partials/ConnectionModal';

    export default {
        name: 'app-header',
        computed: {
            ...mapGetters('sockets', [
                'isConnected',
            ]),

            connectionType() {
                return this.$store.state.sockets.connected ? 'is-success' : 'is-danger';
            },
        },
        methods: {
            connection() {
                if (this.isConnected) {
                    return this.$socket.disconnect();
                }

                this.$socket.disconnect();
                this.$modal.open({
                    parent: this,
                    component: ConnectionModal,
                    hasModalCard: true,
                    scroll: 'keep',
                });
            },
        },
    };
</script>

<style lang="sass" src="./../css/app-header-scoped.sass" scoped></style>
