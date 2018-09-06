<template>
    <form @submit.prevent="connect">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ $t('modals.connection.title') }}</p>
            </header>
            <section class="modal-card-body">
                <b-field :label="$t('modals.connection.label')">
                    <b-input
                        type="text"
                        placeholder="http://localhost:1901"
                        required
                        v-model="url"
                        @focus="inputFocus"
                    ></b-input>
                </b-field>
                <span class="help is-danger" v-if="connectionFailed">
                    {{ $t('modals.connection.connection-failed') }}
                </span>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="close">{{ $t('modals.connection.button-cancel') }}</button>
                <button class="button is-info" type="submit">{{ $t('modals.connection.button-submit') }}</button>
            </footer>
        </div>
    </form>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'connection-modal',
        mounted() {
            this.newUrl = this.url;
        },
        computed: {
            ...mapGetters('sockets', [
                'isConnected',
                'connectErrorCount',
            ]),

            url: {
                get() {
                    return this.$store.state.sockets.url;
                },
                set(url) {
                    this.newUrl = url;
                },
            },
        },
        data() {
            return {
                newUrl: '',
                connectionFailed: false,
            };
        },
        watch: {
            isConnected() {
                this.close();
            },
            connectErrorCount() {
                this.connectionFailed = true;
                this.$socket.disconnect();
            },
        },
        methods: {
            inputFocus() {
                this.connectionFailed = false;
            },
            connect() {
                this.connectionFailed = false;
                this.$socket.connect(this.newUrl);
            },
            close() {
                this.$parent.close && this.$parent.close();
            },
        },
    };
</script>

<style lang="sass" src="./../../css/connection-modal-scoped.sass" scoped></style>
