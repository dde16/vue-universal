<template>
    <label class="display-flex flex-column flex-gap-2">
        <div
            style="cursor: pointer" 
            v-if="$props.preview != undefined"
            :style="{height: $props.preview, width: $props.preview}"
            class="border-1 border-grey-200 ovf-hidden"
        >
            <img v-if="previewImage" :src="previewImage" class="h-100 w-100"/>
        </div>
        <input type="file" :style="{display: $props.preview && 'none'}" :multiple="$props.multiple" ref="input" @change="onChange"/>
    </label>
</template>

<script>
export default {
    name: "v-file-input",
    props: {
        type: undefined,
        "max-size": Number,
        preview: {
            type: [String, Number],
            default: undefined
        },
        multiple: {
            type: Boolean,
            required: false,
            default: false
        },
        modelValue: {
            type: String,
            required: false,
            default: undefined
        }
    },
    emits: ["update:modelValue"],
    created() {
        if(this.$props.multiple && this.$props.preview)
            throw new Error("Multiple file input cannot have preview enabled.");

        if(this.$props.modelValue) {
            this.$data.previewImage =
                (this.$props.modelValue instanceof HTMLImageElement)
                    ? this.$props.modelValue.src
                    : this.$props.modelValue
            ;
        }
    },
    methods: {
        onChange(event) {
            let files = event.target.files;

            if(this.$props.maxSize !== undefined) {
                let largeFiles = Array.from(files).filter(file => file.size > this.$props.maxSize);

                if(largeFiles.length > 0)
                    throw new Error("File".pluralise("s", largeFiles.length) + " " + largeFiles.map(file => file.name).join(", ") + " " + (largeFiles.length > 1 ? "are" : "is") + " too large.");
            }

            if(!event.target.multiple) {
                files = files[0];

                if(this.$props.preview)
                    this.previewImage = URL.createObjectURL(files);
            }

            this.$emit("input", files);
            this.$emit("update:modelValue", files);
        }
    },
    data() {
        return {
            previewImage: undefined
        };
    }
}
</script>

<style>

</style>