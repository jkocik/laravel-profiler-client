<script>
    import BTable from './../../../node_modules/buefy/src/components/table/Table';

    export default {
        extends: BTable,
        computed: {
            columnCount() {
                return 2;
            },
        },
    };
</script>

<style lang="sass" scoped src="./../../css/b-tab-table-scoped.sass"></style>
