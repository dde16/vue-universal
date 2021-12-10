<template>
    <form class="w-100 display-flex flex-column" :class="$props.stack ? 'flex-gap-4' : 'flex-gap-2'" ref="form">
        <template v-for="(field, key) in $data.fields" :key="key">
            <div  class="display-flex" :class="$props.stack ? ['flex-column', 'flex-gap-2'] : 'items-align-center'">
                <a :style="{ flex: !$props.stack && `50% 0 0` }" :title="field.help">
                    <p :title="field.names[1]">{{field.names[0]}}</p>
                </a>
                <div
                    :style="{
                        flex: `0 0 calc(50%)`,
                        textAlign: 'left'
                    }"
                    v-if="field.options != undefined || (($props.singleEdit ? ($data.editing === key || $data.model[key] == null) : true) && field.modifiable !== false)"
                >
                    <slot :name="key + '-' + 'input'">
                        <v-taglist
                            v-if="field.type == 'unique-list'"
                            :options="field.options"
                            :modelValue="$data.model[key]"
                            @update:modelValue="update(key, $event)"
                            v-bind="field?.binds || {}"
                        >
                        </v-taglist>
                        <v-aggregate-input
                            v-else-if="field.options"
                            :disabled="$props.disabled"
                            :type="field.type ?? 'select'"
                            :items="field.options"
                            :modelValue="$data.model[key]"
                            @update:modelValue="update(key, $event)"
                            class="bg-black fw-400 w-100"
                            :class="$props.size === 'small' && 'pd-0'"
                            :style="$props.size === 'small' && 'font-size: 1.48em'"
                            v-bind="field?.binds || {}"
                        >
                        </v-aggregate-input>
                        <v-input
                            v-else
                            @keypress="onKeyPress"
                            :disabled="$props.disabled"
                            :placeholder="field.placeholder"
                            :timeout="200"
                            :type="field.type || 'text'"
                            :modelValue="$data.model[key]"
                            @update:modelValue="update(key, $event)"
                            :style="$props.size === 'small' && 'font-size: 1.48em; padding-left: 0.2em'"
                            class="bg-black fw-400 w-100"
                            :class="$props.size === 'small' && 'pd-y0 pd-r0'"
                            :required="field.required"
                            v-bind="field?.binds || {}"
                        >
                        </v-input>
                    </slot>
                </div>
                <button v-else :style="{
                    flex: `0 0 calc(100% - ${$props.width})`,
                    whiteSpace: 'nowrap !important',
                    textOverflow: 'ellipsis !important',
                    overflow: 'hidden !important'
                }" class="hover-decoration-underline" style="padding-left: calc(0.296em + 0.1em)" @click="changeEditing(field, key)">
                    <p>{{field.options ? field.options[$data.model[key].toString()] : ($data.model[key] || 'NULL')}}</p>
                </button>
            </div>
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
        fields: {
            type: Object,
            required: true
        },
        modelValue: {
            type: Object,
            required: false,
            default: undefined
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
        },
        showFieldWhenPresent(field, model) {
            return model.hasOwnProperty(field.key);
        }
    },
    data() {
        const model = Object.assign(
            Object.map(
                Object.filter(
                    this.$props.fields,
                    (k, f) => f.hasOwnProperty("default")
                ),
                (key, field) => [key, field.default]
            ),
            this.$props.modelValue || {}
        );

        const data = {
            fields: Object.filter(
                Object.deepClone(this.$props.fields),
                ((key, field) => {
                    if(field.show === undefined && this.$props.modelValue !== undefined)
                        field.show = this.showFieldWhenPresent;

                    if(Object.isFunction(field.show))
                        field.show = field.show(Object.assign(field, {key}), model);

                    if(!field.placeholder && field.names)
                        field.placeholder = field.names.reverse().first();

                    return field.show;
                })
            ),
            model,
            editing: undefined,
            ready: false
        };

        return data;
    }
});
</script>

<style>

</style>