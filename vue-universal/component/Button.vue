<template>
    <v-prefab :defs="$data.defs" :prefabs="$props.prefabs">
        <template #default="{ binds }">
            <button
                @click="($props.onClick || (() => {}))"
                v-bind="binds"
            >
                <v-icon
                    v-if="$props.icon"
                    :src="$props.icon"
                    :class="$props.iconSize"
                    :style="{fontSize: $props.iconSize}"
                />
                <slot></slot>
            </button>
        </template>
    </v-prefab>
</template>

<script>

export default {
    name: "v-button",
    props: {
        icon: {
            type: [String, Array, HTMLImageElement]
        },
        "icon-size": {
            type: [String, Number],
            default: "1.6em"
        },
        prefabs: {
            type: [Array, String],
            default: (() => ["default", "lg"]),
            required: false
        }
    },
    emits: ["click"],
    data() {
        const data = {
            defs: {
                lg: this.largePrefab,
                sm: this.smallPrefab,
                black: this.blackPrefab,
                default: this.defaultPrefab
            },
            onClick: this.$props.onClick
        };

        return data;
    },
    methods: {
        defaultPrefab() {
            const binds = {
                "class": ["display-flex", "items-align-center", "border-grey-400", this.$slots.default ? undefined : 'content-justify-center'],
                style: {
                    borderRadius: "0.32em",
                    border: "0.1em solid"
                }
            };

            return binds;
        },
        blackPrefab() {
            const binds = {
                class: ["bg-black", "bg-hover-grey-700"]
            };

            return Object.deepAssign(binds, [this.defaultPrefab()]);
        },
        smallPrefab() {
            const binds = {
                class: ["pd-r2", "pd-y1"]
            };

            binds.class = binds.class.concat(this.$props.icon ? [this.$slots.default ? "pd-l1" : "pd-l2", "flex-gap-1"] : ["pd-l2"]);

            return Object.deepAssign(binds, [this.defaultPrefab()]);
        },
        largePrefab() {
            const rightPad = "pd-r2";

            const binds = {
                class: [rightPad, "pd-y2"]
            };

            binds.class = binds.class.concat(this.$props.icon ? [this.$slots.default ? "pd-l1" : "pd-l2", "flex-gap-2"] : ["pd-l2"]);

            return Object.deepAssign(binds, [this.defaultPrefab()]);
        }
    }
}
</script>