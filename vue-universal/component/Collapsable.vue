<template>
    <div class="collapsable " :class="[$props.show && 'collapsable__peek--shown', $props.offset && 'collapsable__peek--offset']">
        <slot/>
        <div class="collapsable__peek">
            <div class="collapsable__peek__children">
                <button style="height: 4em" @click="$emit(!$props.show ? 'show' : 'hide', $event); $emit('toggle', $event);" class="display-flex content-justify-center items-align-center w-100 mg-ya  rounded-right">
                    <i class="sz-10 zmdi" :class="'zmdi-chevron-' + ($props.show ? 'left' : 'right')"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "v-collapsable",
    props: {
        show: {
            type: Boolean
        },
        offset:  {
            type: Boolean,
            default: true
        }
    }
});
</script>

<style lang="scss">
.collapsable {
    &:not(.collapsable__peek--offset) {
        display: flex;
    }

    &.collapsable__peek--offset {
        &.collapsable__peek--shown {
            .collapsable__peek  {
                top: -100%;
                left: calc(100% - 2.4em);
            }
        }
    }
    
}
.collapsable__peek {
    position: relative;
    height: 100%;
    width: 2.4em;
    flex: 0 0 2.4em;

    .collapsable__peek__children {
        // display: none;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }

    // &:hover .collapsable__peek__children {
    //     display: flex;
    // }
}
</style>