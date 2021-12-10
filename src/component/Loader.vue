<template>
    <div class="dot-flashing">
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "v-loader"
});
</script>

<style lang="scss">
.dot-flashing {
    position: relative;
    width: 1.0em;
    height: 1.0em;
    border-radius: .5em;
    background-color: $palette-grey-700;
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: .5s;

    &::before,
    &::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
    }

    
    &::before {
        left: -1.5em;
        width: 1.0em;
        height: 1.0em;
        border-radius: .5em;
        background-color: $palette-grey-700;
        animation: dotFlashing 1s infinite alternate;
        animation-delay: 0s;
    }

    &::after {
        left: 1.5em;
        width: 1.0em;
        height: 1.0em;
        border-radius: .5em;
        background-color: $palette-grey-700;
        animation: dotFlashing 1s infinite alternate;
        animation-delay: 1s;
    }
}




@keyframes dotFlashing {
    50%,
    100% {
        background-color: $palette-grey-200;
    }
}
</style>