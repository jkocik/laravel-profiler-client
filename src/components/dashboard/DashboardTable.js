import BTable from './../../../node_modules/buefy/src/components/table/Table';

export default {
    extends: BTable,
    computed: {
        columnCount() {
            return 6;
        },
    },
};
