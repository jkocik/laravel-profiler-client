<template>
    <ul>
        <li v-for="(key, index) of keys()" :key="index">
            <span v-if="! hasValue(key)" :class="toggleableClass(key)" @click="toggle(key)">
                <span :key="`${index}-right`" v-if="count(key) && ! opened[key]"><i class="fas fa-angle-right"></i></span>
                <span :key="`${index}-down`" v-if="count(key) && opened[key]"><i class="fas fa-angle-down"></i></span>
                {{ key }} <span class="desc">({{ descOf(key) }}: {{ count(key) }})</span>
            </span>
            <span v-if="hasValue(key)">
                {{ key }}: <span :class="typeClass(key)">{{ data[key] }}</span>
            </span>
            <tree-view-single-level
                v-if="opened[key]"
                :data="data[key]"
            ></tree-view-single-level>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'tree-view-single-level',
        props: {
            data: [Array, Object],
        },
        data() {
            return {
                opened: {},
            };
        },
        methods: {
            keys() {
                return Object.keys(this.data);
            },
            hasArray(key) {
                return this.data[key] instanceof Array;
            },
            hasObject(key) {
                return ! this.hasArray(key) && this.data[key] instanceof Object;
            },
            hasValue(key) {
                return ! this.hasArray(key) && ! this.hasObject(key);
            },
            count(key) {
                return Object.keys(this.data[key]).length;
            },
            descOf(key) {
                return this.hasArray(key) ? 'array' : 'object';
            },
            toggle(key) {
                this.opened = Object.assign({}, this.opened, { [key]: ! this.opened[key] });
            },
            toggleableClass(key) {
                return { 'is-toggleable': this.count(key) };
            },
            typeClass(key) {
                return `is-${this.typeOf(key)}`;
            },
            typeOf(key) {
                return this.data[key] === null ? null : typeof this.data[key];
            },
        },
    };
</script>

<style lang="sass" src="./../css/tree-view-single-level-scoped.sass" scoped></style>
