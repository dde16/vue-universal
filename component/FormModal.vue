<template>
    <v-action-modal :cond="canRun" :action="run" :state="$data.state" v-if="fields" @close="$emit('close')">
        <template #idle="{ action }">
            <v-form ref="form" v-model="model" :fields="$data.fields" :single-edit="false"></v-form>

            <div class="display-flex mg-ta">
                <button @click="action" class="mg-la display-flex content-justify-center rounded pd-x2 pd-y1 border-1 border-grey-400 bg-hover-grey-700">
                    <span class="sz-7">{{$props.buttonText}}</span>
                </button>
            </div>
        </template>
    </v-action-modal>
</template>

<script>
import ActionModal from "./ActionModal.vue";

const State = {
    IDLE  : 0,
    BUSY  : (1<<0),
    DONE  : (1<<1),
    ERROR : (1<<2)
};

export default {
    name: "v-form-modal",
    components: {
        "v-action-modal": ActionModal,
    },
    props: {
        fields: {
            type: [Array, Object, Function],
            required: true,
        },
        action: {
            type: Function,
            required: true
        },
        "button-text": {
            type: String,
            required: true
        },
        modelValue: {
            type: Object,
            required: false,
            default: () => ({})
        }
    },
    emits: ["close", "success", "update:modelValue"],
    data() {
        return {
            state: 0,
            model: Object.deepClone(this.$props.modelValue),
            fields: undefined
        };
    },
    methods: {
        canRun() {
            return this.$refs["form"].reportValidity();
        },
        async run() {
            let response = this.$props.action(this.$data.model);

            await this.$emitTick("update:modelValue", this.$data.model);

            return response;
        },
        back() {
            this.$data.state = State.IDLE;
            this.error = undefined;
        }
    },
    async created() {
        // try {
            this.$data.fields = await Promise.normalise(
                Object.isFunction(this.$props.fields)
                    ? this.$props.fields()
                    : this.$props.fields
            );

            this.state = State.IDLE;
        // }
        // catch(error) {
        //     this.$data.state = State.ERROR;
        //     this.error = error;

        // }

    }
}
</script>