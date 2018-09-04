import DBBase from './db-base';

export default class DBTransactionCommit extends DBBase {
    get query() {
        return 'commit';
    }

    get class() {
        return 'has-text-success';
    }
}
