<template>
    <div class="display-flex flex-gap-1 flex-wrap">
        <template v-for="(component, index) in value" :key="index">
            <v-select
                v-if="component === undefined"
                :items="optionsRemaining"
                class="bg-black pd-0"
                style="font-size: 1.48em"
                :always="undefined"
                @update:modelValue="updateValue(index, $event)"
            />
            <v-button
                type="button"
                @click="removeValue(index)"
                :prefabs="['default']"
                class="pd-1"
                v-else
            >
                <p>{{$props.options[component]}}</p>
            </v-button>
        </template>

        <v-button class="pd-1" v-if="$props.editable && optionsRemainingCount > 0" :prefabs="['default', 'sm']" type="button" :icon="['codicon', 'codicon-add']" icon-size="1.4em" @click="addValue"/>
    </div>
</template>

<script>
export default {
    name: "v-taglist",
    props: {
        options: Object,
        modelValue: {
            type: [Array, Number],
            required: false,
            validator: ((options) => Object.isNumber(mode.options) ? Number.isInteger(mode.options) : true)
        },
        editable: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        updateValue(index, value) {
            if(this.value[index] === undefined)
                this.hasNew = false;

            this.value[index] = value;
            this.optionsRemainingCount--;

            this.emitValue();
        },
        removeValue(index) {
            if(this.$props.editable) {
                this.value.removeAt(index);
                this.optionsRemainingCount++;

                this.emitValue();
            }
        },
        addValue() {
            if(this.optionsRemainingCount > 0 && !this.hasNew) {
                this.value.push(undefined);
                this.hasNew = true;
            }
        },
        emitValue() {
            this.$emit(
                "update:modelValue",
                (Object.isNumber(this.$props.modelValue)
                    ? this.value.reduce((previous, current) => (previous | current), 0)
                    : this.value)
            );
        }
    },
    computed: {
        optionsRemaining() {
            return Object.filter(
                this.$props.options,
                (function(value, name) {
                    return !this.value.includes(value);
                }).bind(this)
            );
        }
    },
    data() {
        const value = (
            Object.isNumber(this.$props.modelValue)
                ? this.$props.modelValue.unpack(Object.keys(this.$props.options))
                : this.$props.modelValue
        ) || [];

        const data = {
            value,
            hasNew: false,
            optionsRemainingCount: Object.keys(this.$props.options).length - value.length
        };

        return data;
    },
    emits: ["update:modelValue"]
}
</script>

<style>

</style>