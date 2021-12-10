<template>
    <div class="paginate-scroll" ref="main" :key="rerender" @scroll="onScroll">
        <template v-for="(item, index) in allData" :key="index">
            <slot name="item" :item="item" ></slot>
        </template>
    </div>
</template>

<script>
import Lazy from "./Lazy.vue";

export default {
    extends: Lazy,
    name: "v-paginate-scroll",
    props: {
        anchor: {
            required: false,
            type: HTMLElement
        }
    },
    created() {
        if(this.$props.anchor)
            this.$props.anchor.onscroll = this.onScroll;
    },
    data() {
        this.scrollTimeout = undefined;
        

        return {
            staticKey: 0,
            rerender: 0
        };
    },
    methods: {
        async loadPage(nextPage) {
            if(this.hasNextPage) {
                let [currentData, hasNextPage] = await this.$props.from(nextPage);
                
                this.currentPage = nextPage;
                this.hasNextPage = hasNextPage;

                for(let index = 0; index < currentData.length; index++)
                    this.allData.push(currentData[index]);

                this.rerender++;

                await this.$emitTick("page", this, this.currentPage, this.currentData);
                await this.$emitTick("page:"+nextPage, this, this.currentPage, this.currentData);
            }
        },
        async onScroll(event) {
            let source = event.srcElement;

            if((source.offsetHeight + source.scrollTop) >= source.scrollHeight) {
                if(this.scrollTimeout !== undefined) {
                    clearTimeout(this.scrollTimeout);
                }
                else {
                    this.scrollTimeout = setTimeout((async function() {
                        await this.nextPage();

                        this.scrollTimeout = undefined;
                    }).bind(this), 125)
                }
            }
        }
    }
}
</script>

<style></style>
