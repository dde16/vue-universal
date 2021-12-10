<template>
    <div>
        <div class="h-100 w-100">
            <slot></slot>
        </div>
        <div :key="rerender" style="top: -100%; position: relative;">
            <template v-for="(overlay, index) in overlays" :key="index">
                <v-overlay v-bind="overlay" @close="closeOverlay"></v-overlay>
            </template>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "v-overlayed",
    props: {
        limit: {
            type: Number,
            validator: Number.isInt,
            default: 1
        }
    },
    data() {
        this.overlays = [];

        return {
            rerender : 0
        };
    },
    // wants: ["overlay"],
    methods: {
        closeOverlay() {
            this.overlays.pop();
            this.$root.zIndex--;
            this.rerender++;
        },
        async openOverlay(tag, binds) {
            await this.$nextTick();

            console.log("Opening Overlay");

            if(this.overlays.length+1 <= this.limit) {
                console.log("Overlays count within limit");
                let props = Object.deepAssign(
                    {is: tag, ...(binds||{})},
                    [{style: {zIndex: ++this.$root.zIndex}}]
                );

                this.overlays.push(
                    props
                );
                this.rerender++;
            }
        }
    }
});
</script>

<style>

</style>