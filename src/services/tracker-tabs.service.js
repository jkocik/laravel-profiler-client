import Tab from './tab.service';

export default class TrackerTabs {
    constructor() {
        this.lastActive = undefined;
        this.all = {};
    }

    add(tab) {
        this.lastActive = tab;
        this.all[tab.parentTab] = tab;
    }

    find(parentTab) {
        return this.all[parentTab] || new Tab();
    }
}
