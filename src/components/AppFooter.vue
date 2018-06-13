<template>
    <footer>
        <div class="container is-widescreen">
            <div>
            </div>
            <div v-if="isConnected">
                {{ $t('footer.connected', { url }) }}
            </div>
            <div v-if="! isConnected">
                {{ $t('footer.not-connected') }}
            </div>
        </div>
    </footer>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'app-footer',
        computed: {
            ...mapGetters('sockets', [
                'isConnected',
                'url',
            ]),
        },
    };
</script>

<style lang="sass" src="./../css/app-footer-scoped.sass" scoped></style>
