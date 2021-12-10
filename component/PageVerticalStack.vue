<template>
    <div>
        <slot name="upper-outer">
            <div class="pd-y6 bg-black">
                <slot name="upper-inner">
                    <div class="pd-x2 display-flex items-align-center" :class="$slots.header && 'mg-b4'">
                        <button @click="$root.store.panel.visible = !$root.store.panel.visible">
                            <i class="zmdi zmdi-sort-amount-desc sz-12"/>
                        </button>
                        <div class="mg-l3">
                            <h2>{{$props.heading}}</h2>
                        </div>
                    </div>

                    <slot name="header"></slot>
                </slot>
            </div>
            <hr class="bg-grey-500"/>
        </slot>
        <slot name="lower-outer">
            <div class="display-flex w-100 pd-y6">
                <slot name="lower-inner"></slot>
            </div>
        </slot>
    </div>
</template>

<script>
export default {
    name: "v-vstack-template",
    props: {
        heading: String
    }
}
</script>

<style>

</style>