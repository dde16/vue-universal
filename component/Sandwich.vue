<template>
    <div class="ovf-hidden position-relative">
        <slot name="underlay"></slot>
        <div class="h-100 w-100 position-absolute">
            <slot name="overlay"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "v-sandwich",
    props: {
        'axis': {
            type: Boolean,
            default: "x"
        }
    }
}
</script>