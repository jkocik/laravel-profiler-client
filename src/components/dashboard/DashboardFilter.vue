<template>
    <section class="container is-widescreen">
        <b-field>
            <b-checkbox-button
                v-for="env of allEnvs"
                :key="env"
                :native-value="env"
                v-model="selectedEnvs"
                type="is-info"
                size="is-small"
            >
                {{ env }}
            </b-checkbox-button>
        </b-field>
        <b-field>
            <b-checkbox-button
                v-for="running of allRunnings"
                :key="running"
                :native-value="running"
                v-model="selectedRunnings"
                type="is-info"
                size="is-small"
            >
                {{ running }}
            </b-checkbox-button>
        </b-field>
        <b-field>
            <b-checkbox-button
                v-for="typeGroup of allTypeGroups"
                :key="typeGroup"
                :native-value="typeGroup"
                v-model="selectedTypeGroups"
                type="is-info"
                size="is-small"
            >
                {{ typeGroup }}
            </b-checkbox-button>
        </b-field>
        <b-field>
            <b-checkbox-button
                v-for="statusGroup of allStatusGroups"
                :key="statusGroup"
                :native-value="statusGroup"
                v-model="selectedStatusGroups"
                type="is-info"
                size="is-small"
            >
                {{ statusGroup }}
            </b-checkbox-button>
        </b-field>
        <b-field>
            <b-checkbox-button
                v-for="method of allMethods"
                :key="method"
                :native-value="method"
                v-model="selectedMethods"
                type="is-info"
                size="is-small"
            >
                {{ method }}
            </b-checkbox-button>
        </b-field>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'dashboard-filter',
        computed: {
            ...mapGetters('trackers', [
                'allRunnings',
                'allEnvs',
                'allTypeGroups',
                'allStatusGroups',
                'allMethods',
            ]),

            selectedRunnings: {
                get() {
                    return this.$store.state.trackers.filter.running;
                },
                set(selectedRunnings) {
                    this.$store.commit('trackers/updateFilter', { running: selectedRunnings });
                },
            },

            selectedEnvs: {
                get() {
                    return this.$store.state.trackers.filter.env;
                },
                set(selectedEnvs) {
                    this.$store.commit('trackers/updateFilter', { env: selectedEnvs });
                },
            },

            selectedTypeGroups: {
                get() {
                    return this.$store.state.trackers.filter.typeGroup;
                },
                set(selectedTypeGroups) {
                    this.$store.commit('trackers/updateFilter', { typeGroup: selectedTypeGroups });
                },
            },

            selectedStatusGroups: {
                get() {
                    return this.$store.state.trackers.filter.statusGroup;
                },
                set(selectedStatusGroups) {
                    this.$store.commit('trackers/updateFilter', { statusGroup: selectedStatusGroups });
                },
            },

            selectedMethods: {
                get() {
                    return this.$store.state.trackers.filter.method;
                },
                set(selectedMethods) {
                    this.$store.commit('trackers/updateFilter', { method: selectedMethods });
                },
            },
        },
    };
</script>

<style lang="sass" scoped src="./../../css/dashboard-filter-scoped.sass"></style>
