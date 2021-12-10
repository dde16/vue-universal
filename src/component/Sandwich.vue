<template>
    <div class="ovf-hidden" :class="$props.axis === 'y' && 'flex-column-reverse'">
        <slot name="underlay-outer">
            <div style="flex: 0 0 100%; height: 100%; width: 100%">
                <slot name="underlay">
                </slot>
            </div>
        </slot>
        <div
            class="position-relative min-w-100 min-h-100"
            :style="$props.axis === 'x' ? 'right: 100%;' : 'top: 100%'"
        >
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