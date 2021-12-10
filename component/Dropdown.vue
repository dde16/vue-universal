<template>
    <div class="dropdown">
        <div class="dropdown__header mg-b3">
            <slot name="header">
                <button class="dropdown__heading display-flex fw-500 fg-grey-25" @click="isExpanded = !isExpanded">
                    <p class="sz-7 ">{{$props.heading}}</p>
                    <div class="mg-l2 mg-ya">
                        <i :class="['dropdown__header__icon', $props['icon.'+(isExpanded ? 'expanded' : 'folded')], 'sz-7']"/>
                    </div>
                </button>
            </slot>
        </div>
        <ol class="dropdown__items pd-l4 pd-r2 w-100" v-show="isExpanded">
            <component :is="item.binds.is" :key="index" v-bind="Object.except(item.binds, 'is')" class="dropdown__item display-flex w-100 pd-y1 mg-b3 fg-hover-white" v-for="(item, index) in mappedItems" v-on:click.native="$emit('click', item);">
                <p class="sz-7">{{item.text}}</p>
                <p class="sz-7 mg-la " v-if="item.aside">{{item.aside}}</p>
            </component>
        </ol>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "v-dropdown",
    props: {
        heading: {
            type: String,
            required: true
        },
        items: {
            required: false,
            type: Array,
            default: (v) => []
        },
        "icon.folded": {
            type: String,
            default: "zmdi zmdi-chevron-left"
        },
        "icon.expanded": {
            type: String,
            default: "zmdi zmdi-chevron-down"
        },
        expanded: {
            type: Boolean,
            default: true
        }
    },
    data() {
        const data = {
            isExpanded: this.$props.expanded
        };

        data.mappedItems = this.$props.items.map((item) => {
            item.binds = {
                "is": "button"
            };

            if(item.to) {
                item.binds["to"]  = item.to;
                item.binds["is"] = "router-link";
                item.binds["tag"] = "button";
            }

            return item;
        });

        return data;
    },
});
</script>

<style lang="scss">
.dropdown__heading {
    user-select: none;

    &:hover {
        color: white;
    }
}

</style>