<template>
    <div class="paginate-scroll" ref="main" @scroll="onScroll">
        <template v-for="(item, index) in allData" :key="index">
            <slot :item="item">
                <slot name="item" :item="item" ></slot>
            </slot>
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
        },
        direction: {
            required: true,
            type: String,
            default: "bottom"
        }
    },
    created() {
        if(this.$props.anchor)
            this.$props.anchor.onscroll = this.onScroll;
    },
    data() {
        const isInverted = ["left", "top"].contains(this.$props.direction);
        this.scrollTimeout = undefined;
        this.allDataKey = isInverted ? Number.MAX_SAFE_INTEGER : 0;

        return {
            isInverted,
            allData: {},
            staticKey: 0
        };
    },
    methods: {
        async loadPage(nextPage) {
            if(this.hasNextPage) {
                let [currentData, hasNextPage] = await this.$props.from(nextPage);
                
                this.currentPage = nextPage;
                this.hasNextPage = hasNextPage;

                currentData.forEach((function(currentItem) {
                    this.allDataKey = this.allDataKey + (this.isInverted ? -1 : 1);
                    this.allData[this.allDataKey] = currentItem;
                }).bind(this));

                if(this.currentPage === 0)
                    await this.$emitTick("page:first", this, this.currentPage, this.currentData);

                await this.$emitTick("page", this, this.currentPage, this.currentData);
                await this.$emitTick("page:"+nextPage, this, this.currentPage, this.currentData);
            }
        },
        async onScroll(event) {
            let source = event.srcElement;
            let more = false;

            switch(this.$props.direction) {
                case "left":
                case "right":
                    more = (source.offsetWidth + source.scrollLeft) >= source.scrollWidth;
                    break;
                case "top":
                    more = (source.scrollHeight + source.scrollTop) <= source.offsetHeight;
                    break;
                case "bottom":
                    more = (source.offsetHeight + source.scrollTop) >= source.scrollHeight;
                    break;
            }

            if(more) {
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
