<template>
    <ol class="tablist">
        <slot name="items">
            <li v-for="(item, index) in $data.mappedItems.filter(item => item)" :key="index">
                <slot name="item"  v-bind="item">
                    <button @click="$emit('click:tab', item)" class="tablist__item " :class="item.icon && 'tablist__item--has-icon'" v-context-menu.large.right.rightClick="$props.contextMenu && $props.contextMenu(item)">
                        <slot name="item.inner" v-bind="item">
                            <div v-if="item.icon" class="mg-r3">
                                <v-icon :src="item.icon" style="font-size: 3.6em"/>
                            </div>
                            <div>
                                <slot name="title" :item="item">
                                    <h4 ref="item.title">{{item.title}}</h4>
                                </slot>
                                <slot name="subtitle" :item="item">
                                    <h5 ref="item.subtitle" class="fg-grey-25">{{item.subtitle}}</h5>
                                </slot>
                            </div>
                        </slot>
                    </button>
                </slot>
            </li>            
        </slot>
    </ol>
</template>

<script>
import Vue from "vue";

export default {
    name: "v-tablist",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        'context-menu': {
            type: [Array, Object, Function],
            required: false
        }
    },
    data() {
        const data = {
            mappedItems: this.$props.items
        };

        if(Object.isObject(data.mappedItems)) {
            data.mappedItems = Object.values(
                Object.map(data.mappedItems, (key, item) => {
                    if(Object.isString(item)) {
                        item = {title: item};
                    }

                    item.key = key;

                    return [key, item];
                })
            );
        }
        else {
            data.mappedItems = data.mappedItems.map((item) => {
                if(Object.isString(item))
                    item = {title: item, key: item};

                return item;
            });
        }

        return data;
    }
}
</script>

<style lang="scss">
.tablist {
    display: flex;
    flex-wrap: wrap;
    gap: 1.6em;
}

.tablist__item {
    display: flex;
    padding: 1.2em 1.6em;
    border-radius: 0.4em;

    &.tablist__item--has-icon {
        padding-right: 2em !important;
    }

    border: 1px solid $palette-grey-500;

    &:hover {
        background-color: $palette-grey-800;
    }
}
</style>