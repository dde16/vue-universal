<template>

    <div
        :class="[
            $props.dim && 'overlay__backdrop',
            ($data.centre.x && 'items-align-center display-flex'),
            ($data.centre.y && 'content-justify-center display-flex')
        ].filter(v => v != false).join(' ')"
        :style="{'backgroundColor': $props.dim && 'rgba(0, 0, 0, ' + $props.dim + ')'}"
    >
        <component
            class="overlay"
            :is="$props.is"
            v-bind="$data.attrs"
            @close="close"
            v-clickoff="close"
        />
    </div>
</template>

<script>
export default {
    name: "v-overlay",
    props: {
        permanent: {
            type: Boolean,
            default: false
        },
        is: {
            type: [String, Object],
            required: false,
            default: "div"
        },
        top: {
            type: [Number, String],
            required: false,
            default: "auto"
        },
        bottom: {
            type: [Number, String],
            required: false,
            default: "auto"
        },
        left: {
            type: [Number, String],
            required: false,
            default: "auto"
        },
        right: {
            type: [Number, String],
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
                x: ['top', 'bottom'].every(prop => this.$props[prop].trim() === "auto"),
                y: ['left', 'right'].every(prop => this.$props[prop].trim() === "auto")
            },
            attrs: HTMLElement.normaliseAttrs(this.$attrs)
        };

        data.attrs.style = Object.deepAssign(
            {
                top: this.$props.top,
                left: this.$props.left,
                bottom: this.$props.bottom,
                right: this.$props.right
            },
            [data.attrs?.style || {}]
        );


        return data;
    },
    methods: {
        onKeyDown(e) {
            if(e.keyCode === 27) this.close();
        },
        close() {
            if(!this.$props.permanent) {
                if(((this.tolerated++) >= this.$props.tolerance) && this.isOpen) {
                    this.$emit("close");
                    this.tolerated = 0;
                    this.isOpen = false;
                }
            }
        }
    },
    inheritAttrs: false
};
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