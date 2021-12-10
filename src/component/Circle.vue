<template>
    <div :style="{
        'minHeight': $props.size,
        'maxHeight': $props.size,
        'minWidth': $props.size,
        'maxWidth': $props.size,
        'borderRadius': '50%'
    }" ></div>
</template>

<script lang="ts">
import  {defineComponent} from "vue";
import { PropType } from "vue";

export default defineComponent({
    name: "v-circle",
    props: {
        size: {
            required: true,
            type: [String, Number]
        }
    }
});
</script>