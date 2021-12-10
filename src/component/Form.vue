<template>
    <form class="w-100 display-flex  flex-gap-2 flex-column" v-if="ready" ref="form">
        <template v-for="(field, key) in $data.fields" :key="key">
            <template v-if="field.show !== false">
                <div  class="items-align-center" :class="$props.stack ? 'display-block' : 'display-flex'">
                    <a :style="{ flex: `${$props.width} 0 0` }" :title="field.help">
                        <p>{{field.title}}</p>
                    </a>
                    <div :style="{ flex: `0 0 calc(100% - ${$props.width})`, textAlign: 'left' }" v-if="field.options != undefined || (($props.singleEdit ? ($data.editing === key || $data.model[key] == null) : true) && field.modifiable !== false)">
                        <slot :name="key + '-' + 'input'">
                            <v-aggregate-input
                                v-if="field.options"
                                :disabled="$props.disabled"
                                :type="field.type"
                                :items="field.options"
                                :modelValue="$data.model[key]"
                                @update:modelValue="update(key, $event)"
                                class="bg-black fw-400 w-100"
                                :class="$props.size === 'small' && 'pd-0'"
                                :style="$props.size === 'small' && 'font-size: 1.48em'"
                            >
                            </v-aggregate-input>
                            <v-input
                                @keypress="onKeyPress"
                                v-else
                                :disabled="$props.disabled"
                                :placeholder="field.placeholder || field.title"
                                :timeout="200"
                                :type="field.type || 'text'"
                                :modelValue="$data.model[key]"
                                @update:modelValue="update(key, $event)"
                                :style="$props.size === 'small' && 'font-size: 1.48em; padding-left: 0.2em'"
                                class="bg-black fw-400 w-100"
                                :class="$props.size === 'small' && 'pd-y0 pd-r0'"
                                :required="field.required"
                            ></v-input>
                        </slot>
                    </div>
                    <button v-else  :style="{
                        flex: `0 0 calc(100% - ${$props.width})`,
                        whiteSpace: 'nowrap !important',
                        textOverflow: 'ellipsis !important',
                        overflow: 'hidden !important'
                    }" class="hover-decoration-underline" style="padding-left: calc(0.296em + 0.1em)" @click="changeEditing(field, key)">
                        <p>{{field.options ? field.options[$data.model[key].toString()] : ($data.model[key] || 'NULL')}}</p>
                    </button>
                </div>
            </template>
        </template>
    </form>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "v-form",
    props: {
        stack: {
            type: Boolean,
            default: false
        },
        width: { default: "50%" },
        fields: {
            type: Object,
            required: true
        },
        modelValue: {
            type: Object,
            required: false,
            default: Object.factory
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        'single-edit': {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: "small"
        }
    },
    emits: ["update:field", "update:modelValue", "created"],
    methods: {
        update(key, value) {
            this.$data.model[key] = value;

            this.$emit("update:field", key, value);
            this.$emit("update:modelValue", this.$data.model);
        },
        onKeyPress(event) {
            if(event.charCode === 13)
                this.editing = null;
        },
        changeEditing(field, key) {
            if(field.modifiable !== false)
                this.editing = key;
        },
        reportValidity() {
            return this.$refs["form"].reportValidity();
        }
    },
    data() {
        const data = {
            fields: this.$props.fields,
            model: Object.assign(
                Object.map(
                    Object.filter(this.$props.fields, (k, f) => f.hasOwnProperty("default")),
                    function(key, field) {
                        return [key, field.default];
                    }
                ),
                this.$props.modelValue
            ),
            editing: undefined,
            ready: false
        };

        return data;
    },
    async created() {
        if(Object.isObject(this.$data.fields)) {
            this.$data.fields = await Object.mapAsync(
                this.$data.fields,
                (async function(key, field) {
                    if(Object.isString(field))
                        field = {title: field};

                    if(field.options)  
                        field.type = "select";

                    if(Object.isString(field.options)) {
                        var entity = (field.options);

                        field.options = (async function(realValue, inputValue) {
                            if(realValue != undefined) {
                                let res = (await this.$api.entity.get({ entity, key: realValue, view: "map" })).data.data;

                                return res;
                            }
                  
                            return (await this.$api.entity.quickSearch({ entity, search: inputValue })).data.data;

                        }).bind(this);

                        field.type = "datalist";
                    }
                    
                    return [key, field];
                }).bind(this)
            );

        }

        this.$data.ready = true;
    }
});
</script>

<style>

</style>