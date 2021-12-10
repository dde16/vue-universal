<template>
    <div
        class="button-group"
        :class="VerticalDirections.contains($props.direction) ? ['flex-column', 'button-group--vertical'] : ['flex-row', 'button-group--horizontal']">
        
        <v-button
            v-bind="Object.except(item, ['key', 'is', 'prefabs', 'text'])"
            v-for="(item, key) in mappedItems"
            :key="key"
            @click="$emit(item.key ? 'click:' + item.key.toString() : 'click', $event, item)"
            :prefabs="item.prefabs === undefined ? $props.prefabs : item.prefabs"
            ref="button"
        >
            <p v-if="item.text">{{item.text}}</p>
        </v-button>
    </div>
</template>

<script>
const HorizontalDirections  = ["horizontal", "h", "x"];
const VerticalDirections    = ["vertical",   "v", "y"];

export default {
    name: "v-button-group",
    props: {
        prefabs: {
            type: [String, Array],
            default: ["default", "lg", "black"]
        },
        direction: {
            type: String,
            default: "horizontal",
            validator: (v) => {
                return (VerticalDirections.contains(v) || HorizontalDirections.contains(v));
            }
        },
        items: {
            type: Array,
            default: Array.factory
        }
    },
    emits: ["click"],
    data() {
        const data = {
            mappedItems: this.$props.items.map((item) => {
                return Object.deepAssign(
                    item,
                    [{class: ["button-group__button", item.active && 'bg-grey-700'].filter(x => x)}],
                    {uniqueArrays: true}
                );
            }),
            VerticalDirections,
            HorizontalDirections
        };

        return data;
    }
}
</script>

<style lang="scss">
.button-group {
    display: flex;

    &.button-group--vertical {
        .button-group__button {
            border-color: $palette-grey-400 !important;
            border-width: 0;
            @include multi-stmt(('border-left', 'border-right'), '0.1em solid');


            &:first-child {
                border-top-left-radius: $border-radius-size !important;
                border-top-right-radius: $border-radius-size !important;
                border-top-width: 0.1em !important;
            }

            &:not(:last-child) {
                border-bottom-width: 0.1em !important;
            }

            &:last-child {
                border-bottom-left-radius: $border-radius-size !important;
                border-bottom-right-radius: $border-radius-size !important;
                border-width: 0.1em !important;
            }
        }
    }

    &.button-group--horizontal {
        .button-group__button {
            border-color: $palette-grey-400 !important;

            border-top-width: 0.1em;
            border-bottom-width: 0.1em;

            &:first-child {
                border-top-left-radius: $border-radius-size;
                border-bottom-left-radius: $border-radius-size;
                border-top-right-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                
                border-left-width: 0.1em;
            }

            &:not(:last-child):not(:first-child) {
                border-right-width: 0 !important;
                border-left-width: 0 !important;
                border-radius: 0 !important;
            }

            &:last-child {
                border-top-left-radius: 0 !important;
                border-bottom-left-radius: 0 !important;
                border-top-right-radius: $border-radius-size;
                border-bottom-right-radius: $border-radius-size;
                border-right-width: 0.1em;
            }
        }
    }
}
</style>