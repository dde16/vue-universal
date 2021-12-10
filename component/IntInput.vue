<template>
    <v-input
        type="number"
        :timeout="$props.timeout"
        @keydown="onKeyDown"
        :class="this.$props.nospin ? 'input--no-spin' : ''"
        :placeholder="this.$props.max"
        :max="$props.max"
        @input="$emit('input', $event);"
    ></v-input>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "v-int-input",
    props: {
        nospin: {
            required: false,
            type: Boolean,
            default: false 
        },
        max: {
            required: false,
            type: Number,
            validator: Number.isInt
        },
        timeout: {
            required: false, 
            type: Number,
            validator: Number.isInt
        }
    },
    methods: {
        onKeyDown(event) {
            let prevent = false;

            if(this.$props.max != null && !prevent) {
                if(parseInt(event.target.value+event.key) > this.$props.max) {
                    event.preventDefault();
                    return false;
                }
            }
        }
    }
});
</script>

<style lang="scss">
.input--no-spin::-webkit-inner-spin-button,
.input--no-spin::-webkit-outer-spin-button {
    -webkit-appearance: none; 
    margin: 0; 
}
</style>