<template>
    <v-select v-if="$props.type === 'select'"></v-select>
    <v-datalist v-else-if="$props.type === 'datalist'"></v-datalist>
</template>

<script>
export default {
    name: "v-aggregate-input",
    props: {
        type: String,
        always: {
            type: [Array, Object],
            default: () => [{
                key: undefined,
                text: "None"
            }]
        }
    },
    methods: {
        mapItems(mappedItems, aggrItems = true) {
            if(Object.isObject(mappedItems)) {
                mappedItems = Object.values(
                    Object.map(
                        mappedItems,
                        (key, item) => {
                            if(Object.isString(item))
                                item = {text: item};

                            item.key = key;

                            return [key, item];
                        }
                    )
                );
            }
            else {
                mappedItems = mappedItems.map(
                    (item, index) => {
                        if(Object.isString(item))
                            item = {text: item, key: index};

                        return item;
                    }
                );
            }

            if(this.$props.always && aggrItems) {
                mappedItems = [
                    ...this.mapItems(this.$props.always, false),
                    ...mappedItems
                ];
            }

            return mappedItems;
        }
    }
}
</script>