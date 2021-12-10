<template>
    <select v-if="$data.items" @change="updateModelValue">
        <option :value="item.key" v-for="(item, index) in $data.items" :key="index" :selected="item.selected||item.key == $props.modelValue">
            {{item.text}}
        </option>
    </select>
</template>

<script>
import AggregateInput from "./AggregateInput.vue";

export default {
    name: "v-select",
    extends: AggregateInput,
    props: {
        items: {
            type: [Array, Object, Function],
            default: Array.factory
        },
        "icon-left": [Array, String],
        "icon-left.show": {
            type: Boolean,
            default: false
        },
        modelValue: String
    },
    emits: ["update:modelValue"],
    methods: {
        updateModelValue(event) {
            let item = this.$data.items.first(
                (item) => (item.key == event.target.selectedOptions[0].value)
            );

            this.$emit("update:modelValue", item.key, item);
        }
    },
    data() {
        const data = {
            expanded : false,
            items    : undefined,
            randomId : crypto.getRandomValues(new Uint32Array(1))[0],
            rerender : 0
        };

        return data;
    },
    async created() {
        let items = await Promise.normalise(
            Object.isFunction(this.$props.items)
                ? this.$props.items()
                : this.$props.items
        );

        this.$data.items =
                this.mapItems(items, {});

        this.rerender++;
    }
}
</script>

<style>

</style>