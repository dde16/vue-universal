<template>
    <textarea v-if="$props.type === 'textarea'" v-model="inputValue" @input="onInput"></textarea>
    <input
        :type="$props.type"
        v-model="inputValue"
        @input="onInput"
        @change="onChange"
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
        modelValue: {},
        type: {
            type: String,
            default: "text"
        },
        'empty-as': Function
    },
    emits: ["update:modelValue"],
    data() {
        this.middleware = {
            file: {
                change(event) {
                    let files = event.target.files;

                    if(!event.target.multiple)
                        files = files[0];

                    this.$emit("update:modelValue", files);
                }
            }
        };

        const data = {
            inputTimeout: undefined,
            inputValue: this.$props.modelValue
        };

        return data;
    },
    methods: {
        emitUpdate() {
            console.log("emtting");
            console.log(this.inputValue);
            this.$emit(
                "update:modelValue",
                this.inputValue
                // (Object.isString(this.inputValue) && this.inputValue.isEmpty()) ? (Object.isFunction(this.$props.emptyAs)
                //     ? this.$props.emptyAs()
                //     : (this.$props.emptyAs != undefined
                //         ? this.$props.emptyAs
                //         : this.inputValue
                //     )
                // ) : this.inputValue
            );
        },
        onInput(event) {
            if(this.$props.type.toLowerCase() !== "file") {
                if(this.$props.timeout !== null) {
                    if(this.inputTimeout) clearTimeout(this.inputTimeout);

                    this.inputTimeout = setTimeout(
                        (function() {
                            this.emitUpdate();
                        }).bind(this),
                        this.$props.timeout
                    );
                }
                else {
                    this.emitUpdate();
                }
            }
        },
        async onChange() {
            if(this.middleware.hasOwnProperty(this.$props.type)) {
                if(this.middleware[this.$props.type]?.change) {
                    return await Promise.normalise(this.middleware[this.$props.type].change.call(this, ...arguments));
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

.input[type="file"],
input[type="file"] {
    padding: 0;
}

input, select, textarea,
.input, .select, .textarea {
    font-size: #{map-get($input-sizes, "lg")}em;
    padding: 0.4em calc(0.6em - 0.5px);
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