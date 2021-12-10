<template>
    <div class="input-offset-icon ovfx-hidden"
    v-bind:class="'input-offset-icon--' + (($props['left'] && 'left') || (($props['right']) && 'right'))">
        <div class="input-offset-icon__wrapper">
            <slot name="input">
                <v-input
                    v-bind="$attrs"
                    class="input-offset-icon__input"
                    v-model="$props.modelValue"
                    @click="$emit('click:input', $event)"
                    @update:modelValue="$emit('update:modelValue', $event)"
                />
            </slot>

            <slot name="icon-container" v-bind="$props['icon']">
                <button
                    :class="$props.seamless && 'input-offset-icon__container--seamless'"
                    class="input-offset-icon__container fg-grey-50 fg-hover-white"
                    ref="icon-container"
                    type="button"
                    @click="$emit('click', $event)"
                >
                    <slot name="icon" v-bind="$props['icon']">
                        <v-icon :src="$props['icon']" :style="{fontSize: $props.iconSize}"/>
                    </slot>
                </button>
            </slot>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "v-icon-input",
    props: {
        "left": {
            required: false,
            type: Boolean,
            default: false
        },
        "right": {
            required: false,
            type: Boolean,
            default: true
        },
        "icon": {
            required: false,
            type: String
        },
        "icon-size": {
            default: "1.6em"
        },
        "seamless": Boolean,
        "modelValue": {}
    },
    emits: ["click", "update:modelValue"],
    inheritAttrs: false
});
</script>

<style lang="scss">
$icon-width: 4.2em;

.input-offset-icon {
    min-width: 2.625em;


    .input-offset-icon__wrapper {
        display: flex;
        width: calc(100% + #{$icon-width}) !important;
    }

    .input-offset-icon__input {
        padding-right: $icon-width * 0.73 !important;
        width: 100%;
    }

    .input-offset-icon__container {
        &:not(.input-offset-icon__container--seamless) {
        right: ($icon-width) + 0.1em;
        border-left: 0.1em solid $palette-grey-400;
        }

        &.input-offset-icon__container--seamless {
            right: ($icon-width);
            border-left: 0;
        }

        position: relative;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        
        flex-basis: $icon-width;
        flex-shrink: 0;
        flex-grow: 0;

        .input-offset-icon__icon {
            margin: auto;
        }
    }
}


</style>