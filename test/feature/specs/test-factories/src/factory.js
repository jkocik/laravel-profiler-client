export class Factory {
    constructor(model) {
        this.model = model;
        this.current = {};
        this.refresh();
    }

    refresh() {
        this.current = Object.assign({}, this.model);
    }

    create(...params) {
        const setter = typeof params[0] === 'string' ? 'setIn' : 'set';
        this[setter](...params);
        const current = this.current;
        this.refresh();
        return current;
    }

    set(props) {
        Object.assign(this.current, props);
        return this;
    }

    setIn(keys, props) {
        const keysSplitted = keys.split('.');
        const deepObjects = [this.current];
        const deepObjectOf = (index) => deepObjects.slice(index)[0];
        const assign = (index, props) => Object.assign({}, deepObjectOf(index), props);

        keysSplitted.forEach(key => deepObjects.push(deepObjectOf(-1)[key]));

        let result = assign(-1, props);

        keysSplitted.reverse().forEach((key, index) => {
            result = assign(-2 - index, { [key]: result });
        });

        this.current = result;
        return this;
    }
}
