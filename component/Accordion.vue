<template>
    <v-card :heading="$props.heading">
        <template #header-right>
            <slot name="header-icon">
                <div class="mg-la pd-r4">
                    <v-icon
                        ref="header-icon"
                        :key="$props.expanded"
                        class="sz-10"
                        :src="$props.expanded ? $props['icon.expanded'] : $props['icon.collapsed']"
                    />
                </div>
            </slot>
        </template>
        <template v-for="(index, name) in $slots" v-slot:[name]>
            <slot :name="name" />
        </template>
    </v-card>
</template>
 
<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "v-accordion",
    props: {
        heading: String,
        "icon.expanded": {
            type: [String, Array],
            default: () => ["zmdi", "zmdi-chevron-down"]
        },
        "icon.collapsed": {
            type: [String, Array],
            default: () => ["zmdi", "zmdi-chevron-right"]
        },
        expanded: {
            type: Boolean,
            default: true
        }
    },
});
</script>

<style>

</style>