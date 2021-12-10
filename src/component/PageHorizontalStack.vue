<template>
    <div class="display-flex h-100" >
        <div class="pagebar bg-grey-800 " v-show="$props.showPagebar">
            <slot name="pagebar-upper-outer">
                <div class="pagebar__header  pd-x6 pd-y6 display-flex ">
                    <slot name="pagebar-upper-inner">
                        <h2>{{$props.heading}}</h2>
                    </slot>
                </div>
            </slot>
            <slot name="pagebar-lower-outer">
                <div class="pagebar__main pd-x6 pd-y2">
                    <slot name="pagebar-lower-inner"></slot>
                </div>
            </slot>
        </div>
        
        <slot name="right-outer">
            <div class="h-100 w-100 ovfy-auto" ref="basin">
                <slot name="right-inner"></slot>
            </div>
        </slot>
    </div>
    
</template>

<script>
export default {
    name: "v-hstack-template",
    props: {
        "heading": String,
        "show-pagebar": Boolean
    },
    provide() {
        return {
            $basin: () => (this.$refs["basin"])
        }
    }
}
</script>

<style>

</style>