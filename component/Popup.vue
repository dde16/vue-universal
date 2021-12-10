<template>
    <div class="max-h-100 ovfy-auto" :style="{ margin: [$props.top, $props.right, $props.bottom, $props.left].join(' ') }">
        <slot></slot>
    </div>
</template>

<script>
import vWindow from "./Window.vue";

export default {
    name: "v-popup",
    extends: vWindow
}
</script>