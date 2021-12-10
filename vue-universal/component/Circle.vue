<template>
    <div :style="{
        'minHeight': $props.size,
        'maxHeight': $props.size,
        'minWidth': $props.size,
        'maxWidth': $props.size,
        'borderRadius': '50%'
    }">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: "v-circle",
    props: {
        size: {
            required: true,
            type: [String, Number]
        }
    }
};
</script>