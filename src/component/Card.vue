<template>
    <div class="rounded border-1 border-grey-400 display-flex flex-column">
        <slot name="header">
            <div v-if="$props.heading" ref="header" style="flex: 4.8em 0 0;" class="w-100 display-flex items-align-center" @click="$emit('click:header', $event)">
                <slot name="heading">
                    <slot name="header-left">
                        <div class="mg-l4 mg-r2" v-if="$props.icon">
                            <v-icon class="sz-9" :src="$props.icon"/>
                        </div>
                    </slot>
                    
                    <div
                        ref="heading"
                        :class="!$props.icon && 'mg-l4'"
                    >
                        <slot name="heading.text" v-if="!$props.heading"></slot>
                        <h3 v-else v-text="$props.heading"/>
                    </div>
                    <slot name="header-right"></slot>
                </slot>

            </div>
        </slot>
        <div style="flex: 0 1 100%" class="display-flex flex-column" v-show="$props.expanded">
            <slot name="body">
                <hr
                    ref="separator"
                    class="bg-grey-600"
                    v-show="$props.heading || $slots['heading'] || $slots['header']"
                />

                <div style="flex: 0 1 100%">
                    <slot name="body-inner">
                        <div ref="main" class="w-100 pd-x4 pd-y4">
                            <slot></slot>
                        </div>
                    </slot>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "v-card",
    props: {
        heading: String,
        icon: {},
        expanded: {
            type: Boolean,
            default: true
        }
    },
    emits: ["click:header"]
});
</script>

<style>

</style>