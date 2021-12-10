<template>

<!-- @click.prevent.self="clickOff" -->
        <!-- @keydown="onKeyDown"
        @click.self="clickOff"
        @contextmenu.self="clickOff" -->
    <!-- <div
        class="overlay__backdrop"
        :style="{'backgroundColor': $props.dim && 'rgba(0, 0, 0, 0.6)'}"
    >
        <slot></slot>
    </div> -->

    <div
        :class="[
            $props.dim && 'overlay__backdrop',
            ($data.centre.x && 'items-align-center'),
            ($data.centre.y && 'content-justify-center')
        ].filter(v => v != false).join(' ')"
        :style="{'backgroundColor': $props.dim && 'rgba(0, 0, 0, ' + $props.dim + ')'}"
    >
        <component :style="style" class="overlay" :is="$props.is" v-bind="$attrs" @close="close" v-clickoff="close"/>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "v-overlay",
    props: {
        is: {
            type: [String, Object],
            required: false,
            default: "div"
        },
        top: {
            type: Number,
            validator: Number.isInteger,
            required: false,
            default: "auto"
        },
        bottom: {
            type: Number,
            validator: Number.isInteger,
            required: false,
            default: "auto"
        },
        left: {
            type: Number,
            validator: Number.isInteger,
            required: false,
            default: "auto"
        },
        right: {
            type: Number,
            validator: Number.isInteger,
            required: false,
            default: "auto"
        },
        dim: {
            type: Number,
            default: 0
        },
        tolerance: {
            type: Number,
            validator: Number.isInteger,
            required: false,
            default: 0
        }
    },
    emits: ["close"],
    data() {
        this.isOpen = true;

        const data = {
            tolerated: 0,
            centre: {
                x: ['top', 'bottom'].all(prop => this.$props[prop] === "auto"),
                y: ['left', 'right'].all(prop => this.$props[prop] === "auto")
            }
        };

        return data;
    },
    methods: {
        onKeyDown(e) {
            if(e.keyCode === 27) this.close();
        },
        close() {
            if(((this.tolerated++) >= this.$props.tolerance) && this.isOpen) {
                this.$emit("close");
                this.tolerated = 0;
                this.isOpen = false;
            }
        }
    },
    computed: {
        style() {
            const style = {};



            if(!this.centre.y) {
                if(this.$props.top !== undefined)
                    style.top = this.$props.top;
                
                if(this.$props.bottom !== undefined)
                    style.bottom = this.$props.bottom;
            }

            if(!this.centre.x) {
                
                if(this.$props.left !== undefined)
                    style.left = this.$props.left;
                
                if(this.$props.right !== undefined)
                    style.right = this.$props.right;
            }

            return style;

            //  :style="style"
        }
    }

});
</script>

<style>
.overlay {
    position: fixed;
}

.overlay__backdrop {
    display: flex;
    position: fixed;
    left: 0; 
    right: 0;
    top: 0;
    bottom: 0;
    flex-direction: column;
}
</style>