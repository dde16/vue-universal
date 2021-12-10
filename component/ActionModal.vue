<template>
    <v-card
        :heading="$props.heading"
        class="bg-black"
    >
        <template v-slot:header-right>
            <button class="mg-la pd-1 mg-r4" @click="$emit('close')">
                <v-icon :src="$props.closeIcon" class="sz-8"/>
            </button>
        </template>
        <template v-slot:body-inner>
            <div class="pd-x4 h-100 pd-y4 display-flex flex-column flex-gap-2" :key="state">
                <template v-if="state === State.IDLE">
                    <slot name="idle" :action="run"></slot>
                </template>
                <template v-else-if="state === State.BUSY">
                    <div class="h-100 w-100 display-flex items-align-center content-justify-center">
                        <v-loader class="sz-6"></v-loader>
                    </div>
                </template>
                <template v-else-if="state === State.ERROR">
                    <slot name="error" :error="$data.error">
                        <v-error :error="$data.error" class="h-100 w-100">
                            <button class="display-flex content-justify-center rounded pd-x2 pd-y1 border-1 border-grey-400 bg-hover-grey-700" @click="back">
                                <v-icon :src="$props.backIcon" class="sz-8"/>
                                <span class="mg-l2">
                                    <span class="sz-7">Back</span>
                                </span>
                            </button>
                        </v-error>
                    </slot>
                </template>
            </div>
        </template>
    </v-card>
</template>

<script>
import { PropifyEmits } from "../middleware/PropifyEmits";

const State = {
    IDLE  : 0,
    BUSY  : (1<<0),
    DONE  : (1<<1),
    ERROR : (1<<2)
};

export default PropifyEmits({
    name: "v-action-modal",
    props: {
        "close-icon": {
            default: () => ["zmdi", "zmdi-close"],
            type: [Array, String]
        },
        "back-icon": {
            default: () => ["zmdi", "zmdi-long-arrow-left"],
            type: [Array, String]
        },
        heading: {
            type: String,
            required: true
        },
        action: {
            type: Function,
            required: true
        },
        state: {
            type: Number,
            default: State.IDLE
        },
        log: {
            type: Boolean,
            default: true
        },
        cond: {
            type: Function,
            default: (() => (() => true))
        }
    },
    emits: ["close", "success"],
    data() {
        return {
            State,
            state: this.$props.state,
            error: undefined
        };
    },
    methods: {
        async run() {
            if(this.$props.cond()) {

                let response;

                this.$data.state = State.BUSY;

                try {
                    response = await this.$props.action();

                    this.$data.state = State.DONE;
                    
                    await this.$emitTick("close");

                    await this.$emitTick("success", response);
                }
                catch(error) {
                    this.$data.state = State.ERROR;
                    this.error = error;

                    if(this.$props.log) {
                        console.error(error);
                    }
                }
            }
        },
        back() {
            this.$data.state = State.IDLE;
            this.error = undefined;
        }
    }
});
</script>