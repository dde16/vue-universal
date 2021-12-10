<template>
    <slot :binds="$data.prefabBinds"/>
</template>

<script>
export default {
    name: "v-prefab",
    inheritAttrs: false,
    props: {
        defs: {
            type: Object,
            default: Object.factory,
            required: true
        },
        prefabs: {
            type: [Array, String],
            default: undefined
        }
    },
    data() {
        const data = {
            prefabs: this.$props.prefabs,
            prefabBinds: this.$attrs,
            class: this.$props.class
        };

        if(Object.isString(data.prefabs))
            data.prefabs = [data.prefabs];

        if(data.prefabs)
            data.prefabs = data.prefabs.filter(x => x).map(prefab => this.$props.defs[prefab]).filter(x => x)

        if(data.prefabs)
            data.prefabBinds = 
                data.prefabs.reduce(
                    (previous, current) =>
                    Object.deepAssign(
                        previous,
                        [HTMLElement.normaliseAttrs(current())]),
                        HTMLElement.normaliseAttrs(this.$attrs)
                    );

        return data;
    }
}
</script>

<style>

</style>