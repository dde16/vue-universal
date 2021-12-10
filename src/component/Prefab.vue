<template>
    <slot v-bind="{ binds: $data.prefabBinds }"></slot>
</template>

<script>
export default {
    name: "v-prefab",
    props: {
        defs: {
            type: Object,
            default: Object.factory
        },
        prefabs: {
            type: [Array, String],
            default: undefined
        },
        class: {
            type: [Array, String],
            default: Array.factory
        },
        style: {
            type: [String, Object],
            default: Object.factory
        }
    },
    data() {

        const data = {
            prefabs: this.$props.prefabs,
            prefabBinds: {},
            class: this.$props.class
        };

        if(Object.isString(data.prefabs))
            data.prefabs = [data.prefabs];

        if(data.prefabs)
            data.prefabs = data.prefabs.map(prefab => this.$props.defs[prefab]).filter()

        if(data.prefabs)
            data.prefabBinds = 
                data.prefabs.reduce(
                    (previous, current) =>
                    Object.deepAssign(
                        previous,
                        [HTMLElement.normaliseAttrs(current())]),
                        HTMLElement.normaliseAttrs({class: this.$props.class, style: this.$props.style})
                    );

        return data;
    }
}
</script>

<style>

</style>