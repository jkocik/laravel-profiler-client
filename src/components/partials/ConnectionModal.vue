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
                    ></b-input>
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="close">{{ $t('modals.connection.button-cancel') }}</button>
                <button class="button is-info">{{ $t('modals.connection.button-submit') }}</button>
            </footer>
        </div>
    </form>
</template>

<script>
    export default {
        name: 'connection-modal',
        mounted() {
            this.newUrl = this.url;
        },
        computed: {
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
            };
        },
        methods: {
            connect() {
                this.$socket.connect(this.newUrl);
            },
            close() {
                this.$parent.close();
            },
        },
    };
</script>

<style lang="sass" src="./../../css/connection-modal-scoped.sass" scoped></style>
