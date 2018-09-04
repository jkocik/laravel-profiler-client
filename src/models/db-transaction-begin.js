import DBBase from './db-base';

export default class DBTransactionBegin extends DBBase {
    get query() {
        return 'begin transaction';
    }

    get class() {
        return 'has-text-primary';
    }
}
