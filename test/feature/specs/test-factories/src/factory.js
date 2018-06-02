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
        this.set(...params);
        const current = this.current;
        this.refresh();
        return current;
    }

    set(...params) {
        if (typeof params[0] === 'string') {
            return this.setIn(...params);
        }

        Object.assign(this.current, ...params);
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

    dump() {
        this.log(this.current);
    }

    log(params) {
        console.log(params);
    }
}
