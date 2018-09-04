import DBBase from './db-base';

export default class DBTransactionRollback extends DBBase {
    get query() {
        return 'rollback';
    }

    get class() {
        return 'has-text-danger';
    }
}
