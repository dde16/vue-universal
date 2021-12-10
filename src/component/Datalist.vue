<template>
    <div class="position-relative display-block">
        <v-input
            class="bg-black w-100"
            icon-size="2em"
            seamless
            :icon="['codicon', 'codicon-chevron-down']"
            v-bind="$attrs"
            :timeout="200"
            :modelValue="inputValue"
            @click:input="toggleDropdown"
            @click="toggleDropdown"
            @update:modelValue="updateInputValue"
            :key="rerenderInput"
        >

        </v-input>
        <div
            v-show="dropdown"
            :key="rerenderDropdown"
            class="rounded mg-t2 border-1 border-grey-400 bg-black w-100 ovfy-auto"
            :style="{
                position  : 'absolute',
                top       : '100%',
                maxHeight : '20em',
                left      : 0,
                right     : 0,
                zIndex    : 1
            }"
        >
            <template v-if="state === State.IDLE">
                <template v-for="({value: item, pos, only}, index) in filtered.annotate()" :key="staticKey">
                    <button
                        :class="pos !== 1 && !only && 'border-b1 border-grey-400'"
                        class="w-100 bg-hover-grey-700"
                        @click="updateItem(item)"
                    >
                        <div class="input h-100 w-100 border-0 bg-transparent sz-7">
                            {{item.text}}
                        </div>
                    </button>
                </template>
            </template>
            <template v-if="state === State.BUSY">

            </template>
        </div>
    </div>
</template>

<script>
import AggregateInput from "./AggregateInput.vue";

const State = {
    IDLE  : 0,
    BUSY  : 1,
    ERROR : 2
};

export default {
    name: "v-datalist",
    extends: AggregateInput,
    props: {
        items: [Array, Function],
        modelValue: String,
        fallback: {
            type: Boolean,
            default: true
        }
    },
    emits: ["update:modelValue"],
    data() {
        return {
            inputValue       : undefined,
            realValue        : this.$props.modelValue,
            dropdown         : false,
            items            : (Object.isArray(this.$props.items) ? this.mapItems(this.$props.items) : this.$props.items),
            filtered         : [],
            staticKey        : 0,
            rerenderDropdown : 0,
            rerenderInput    : 0,
            state            : State.IDLE,
            State
        }
    },
    async created() {
        if(this.realValue != undefined) {
            let values = await this.getValuesFromReal(this.realValue);

            this.$data.inputValue = values.inputValue;

            await this.$emitTick("update:inputValue", this.$data.inputValue);

            this.$data.realValue  = values.realValue;

            this.filtered = (
                [{ key: values.realValue, text: values.inputValue }]
            );

            this.rerenderInput++;
        }
        else {
            this.filtered = 
                Object.isFunction(this.$data.items)
                    ? this.mapItems(await Promise.normalise(this.$data.items(undefined, undefined)))
                    : this.$data.items
            ;
        }
        
    },
    methods: {
        openDropdown() {
            this.dropdown = true;
            this.rerenderDropdown++;
        },
        toggleDropdown() {
            this.dropdown = !this.dropdown;
            this.rerenderDropdown++;
        },
        async getValuesFromReal(realValue) {
            return {
                realValue,
                inputValue: 
                    (this.$data.filtered.first((item) => item.key === realValue)
                    || ((
                        Object.isFunction(this.$data.items)
                            ? this.mapItems(await Promise.normalise(this.$data.items(realValue, undefined)))
                            : this.$data.items
                    ) || []).first((item) => item.key === realValue)).text
            };
        },
        async updateItem(item) {
            this.realValue = item.key;
            this.inputValue = item.text;
            
            await this.$emitTick("update:modelValue", item.key);
            await this.$emitTick("update:inputValue", item.text);

            this.rerenderInput++;
            this.toggleDropdown();
        },
        async updateInputValue(value) {
            this.dropdown = true;
            this.inputValue = value;

            this.state = State.BUSY;

            let filtered;

            if(Object.isFunction(this.$data.items)) {
                filtered = await Promise.normalise(this.$data.items(undefined, this.inputValue));
            }
            else {
                filtered = (
                    this.inputValue
                        ? this.$data.items.filter((item) => new RegExp(this.inputValue, 'i').test(item.text))
                        : this.$data.items
                );
            }

            this.filtered = 
                Object.isFunction(this.$data.items)
                    ? this.mapItems(filtered)
                    : filtered
                ;

            this.state = State.IDLE;

            if(filtered.isEmpty() && this.$props.fallback)
                this.$emit("update:modelValue", this.inputValue);

            this.rerenderDropdown++;
        }
    },
    inheritAttrs: false
}
</script>

<style>

</style>