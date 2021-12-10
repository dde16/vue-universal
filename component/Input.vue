<template>
    <span
        class="ovfy-hidden textarea display-block"
        role="textarea"
        v-if="$props.type === 'textarea'"
        @input="onInput"
        ref="input"
        contenteditable
        v-text="inputValue"
        rows="1"
        v-once
    >
    </span>
    <v-file-input
        v-else-if="$props.type === 'file'"
        v-model="inputValue"
        @input="onInput"
    />
    <input
        ref="input"
        :type="$props.type"
        v-model="inputValue"
        @input="onInput"
        v-else
    />
</template>

<script>
export default {
    name: "v-input",
    props: {
        timeout: {
            type: Number,
            validator: Number.isInt
        },
        modelValue: {
            required: false,
            type: [String, Number, Boolean],
            default: undefined
        },
        type: {
            type: String,
            default: "text"
        }
    },
    emits: ["update:modelValue"],
    data() {
        const data = {
            inputTimeout: undefined,
            inputValue: this.$props.modelValue || undefined
        };

        return data;
    },
    mounted() {
        this.updateClasses();
    },
    methods: {
        updateClasses() {
            if(this.$props.type === "textarea") {
                this.$refs["input"].classList[(this.inputValue === '\n' || !this.inputValue) ? "add" : "remove"]("textarea--placeholder");
            }
        },
        emitUpdate() {
            this.$emit("update:modelValue", this.inputValue);
        },
        onInput(event) {
            if(this.$props.type.toLowerCase() !== "file") {
                if(this.$props.timeout !== null) {
                    if(this.inputTimeout)
                        clearTimeout(this.inputTimeout);

                    if(this.$props.type === "textarea") 
                        this.inputValue = event.target.innerText;

                    this.updateClasses();

                    this.inputTimeout = setTimeout(this.emitUpdate, this.$props.timeout);
                }
                else {
                    this.emitUpdate();
                }
            }
        }
    }
};
</script>

<style lang="scss">
$input-sizes: (
    "vl": 2.12,
    "xl": 1.96,
    "lg": 1.64,
    "md": 1.48,
    "sm": 1.32,
    "xs": 1.16,
    "vs": 0.84
);

@each $name, $size in $input-sizes {
    .input-#{$name} {
        font-size: #{$size}em !important;
        padding: #{$size  * 0.125}em calc(#{$size * 0.175}em - 1px) !important;
    }
}

.textarea:not(textarea) {
    overflow-wrap: break-word;
    -webkit-user-modify: read-write-plaintext-only;
    word-break: break-word;
    white-space: break-spaces;
    padding: 0.522em calc(0.6em);
}

.textarea--placeholder::before {
    position: absolute;
    content: attr(placeholder);
    color: $palette-grey-25;
    opacity: 0.75;
    cursor: text;
}

.input[type="file"],
input[type="file"] {
    padding: 0;
}

input, select, textarea,
.input, .select, .textarea {
    font-size: #{map-get($input-sizes, "lg")}em;
    padding: 0.4em calc(0.6em);
}

input:not([type="file"]), select, textarea,
.input:not([type="file"]), .select, .textarea {
    background-color: $palette-grey-600;
    border-radius: 0.2em;   
    border: 0.1rem solid $palette-grey-400;
}

// input:not([type="file"]),
// select:focus,
// textarea:focus {
//     border-color: @{theme.map.input.shadow.action};
//     background-color: @{theme.map.input.background.action};
// }

input::placeholder
.input::placeholder
select::placeholder,
.select::placeholder,
textarea:focus::placeholder,
.textarea:focus::placeholder {
    color: $palette-grey-25;
}

.input--no-spin::-webkit-inner-spin-button,
.input--no-spin::-webkit-outer-spin-button {
    -webkit-appearance: none; 
    margin: 0; 
}
</style>