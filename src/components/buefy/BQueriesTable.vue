<script>
    import BTable from './../../../node_modules/buefy/src/components/table/Table';

    export default {
        extends: BTable,
        computed: {
            columnCount() {
                return 3;
            },
        },
    };
</script>

<style lang="sass" scoped src="./../../css/b-queries-table-scoped.sass"></style>
