<template>
    <div class="navbar-menu container is-widescreen">
        <div class="navbar-item">
            <b-field>
                <b-checkbox-button
                        v-for="env of allEnvs"
                        :key="env"
                        :native-value="env"
                        v-model="selectedEnvs"
                        type="is-info"
                >
                    {{ env }}
                </b-checkbox-button>
            </b-field>
        </div>
        <div class="navbar-item">
            <b-field>
                <b-checkbox-button
                        v-for="running of allRunnings"
                        :key="running"
                        :native-value="running"
                        v-model="selectedRunnings"
                        type="is-info"
                >
                    {{ running }}
                </b-checkbox-button>
            </b-field>
        </div>
        <div class="navbar-item">
            <b-field>
                <b-checkbox-button
                        v-for="typeGroup of allTypeGroups"
                        :key="typeGroup"
                        :native-value="typeGroup"
                        v-model="selectedTypeGroups"
                        type="is-info"
                >
                    {{ typeGroup }}
                </b-checkbox-button>
            </b-field>
        </div>
        <div class="navbar-item">
            <b-field>
                <b-checkbox-button
                        v-for="statusGroup of allStatusGroups"
                        :key="statusGroup"
                        :native-value="statusGroup"
                        v-model="selectedStatusGroups"
                        type="is-info"
                >
                    {{ statusGroup }}
                </b-checkbox-button>
            </b-field>
        </div>
        <div class="navbar-item">
            <b-field>
                <b-checkbox-button
                        v-for="method of allMethods"
                        :key="method"
                        :native-value="method"
                        v-model="selectedMethods"
                        type="is-info"
                >
                    {{ method }}
                </b-checkbox-button>
            </b-field>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
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
