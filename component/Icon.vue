<template>
    <img v-if="$data.type == 'image' && $data.nsrc" :src="$data.nsrc.src" :style="{
        width: ['b', 'w'].contains($data.nsrc.axis) ? '1em' : 'auto',
        height: ['b', 'h'].contains($data.nsrc.axis) ? '1em' : 'auto'
    }" v-bind="$attrs"/>
    <i v-else-if="$data.type == 'icon' && $data.nsrc" :class="$data.nsrc" v-bind="$attrs"/>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: 'v-icon',
    props: {
        src: {
            type: [Array, String, HTMLImageElement],
            required: false
        }
    },
    data() {
        const data = {
            nsrc: this.$props.src,
            type: 'icon'
        }; 

        if(data.nsrc) {
            if(Object.isString(data.nsrc))
                data.nsrc = [data.nsrc];

            if(data.nsrc instanceof HTMLImageElement) {
                data.type = 'image';

                // if(data.nsrc.loaded || data.nsrc.complete) {
                //     data.type = 'image.loaded';
                // }
                // else {
                //     data.type = 'image.lazy';
                // }
            }
        }

        return data;
    },
    inheritAttrs: false
});
</script>

<style>

</style>