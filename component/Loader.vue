<template>
    <div class="dot-flashing" :style="{
        '--c-inactive' : $props.inactive,
        '--c-active'   : $props.active
    }"/>
</template>

<script>
export default {
    name: "v-loader",
    props: {
        inactive: {
            type: String,
            default: "var(--c-grey-700)"
        },
        active: {
            type: String,
            default: "var(--c-grey-200)"
        }
    }
}
</script>

<style lang="scss">
.dot-flashing {
    position: relative;
    width: 1.0em;
    height: 1.0em;
    border-radius: .5em;
    background-color: var(--c-active);
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: .5s;

    &::before,
    &::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
        
        border-radius: .5em;
        background-color: var(--c-active);
        animation: dotFlashing 1s infinite alternate;
    }

    
    &::before {
        left: -1.5em;
        width: 1.0em;
        height: 1.0em;
        animation-delay: 0s;
    }

    &::after {
        left: 1.5em;
        width: 1.0em;
        height: 1.0em;
        animation-delay: 1s;
    }
}

@keyframes dotFlashing {
    50%,
    100% {
        background-color: var(--c-inactive);
    }
}
</style>