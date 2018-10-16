<script>
    import BTable from './../../../node_modules/buefy/src/components/table/Table';

    export default {
        extends: BTable,
        computed: {
            columnCount() {
                return 11;
            },
        },
    };
</script>

<style lang="sass" scoped src="./../../css/b-dashboard-table-scoped.sass"></style>
