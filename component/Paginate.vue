<template>
    <div class="pagination mg-b4"  v-if="currentData">
        <slot name="main" v-bind:items="{items: currentData, meta: currentMeta}">
            <div class="pagination__main">
                <slot name="item" v-for="(item, index) in currentData" v-bind:item="{item, meta: currentMeta}"></slot>
            </div>
        </slot>
        <hr class="bg-grey-400 mg-y4">
        <div class="pagination__footer display-flex content-justify-center" v-if="pagesCount != undefined" :key="rerender">
            <v-button-group 
                :items="[
                    {key: 'back', icon: ['zmdi', 'zmdi-chevron-left', 'fg-grey-25', 'sz-magic']}
                ].concat(
                    $data.currentPage.enclose($props.lookahead, $data.pagesCount).map((number) => {return {text: number+1, active: number == currentPage, number}; })
                ).concat([
                    {key: 'next', icon: ['zmdi', 'zmdi-chevron-right', 'fg-grey-25', 'sz-magic']}
                ])"
                @click="changePageClick"
                @click:back="changePage(currentPage-1)"
                @click:next="changePage(currentPage+1)"
            >
            </v-button-group>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import Lazy from "./Lazy.vue";

export default defineComponent({
    name: "v-paginate",
    extends: Lazy,
    props: {
        lookahead: {
            type: Number,
            required: false,
            default: 2,
            validator: Number.isInt
        }
    },
    emits: [],
    data() {
        const data = {
            rerender : 0
        };

        return data;
    },
    methods: {
        getRange(mod) {
            if((mod * 2) >= this.pagesCount)
                return Array.range(0, (mod*2)+1);

            let lowerBound = this.currentPage - mod;
            
            if(this.currentPage < mod) {
                lowerBound += mod;
                mod *= 2;

                if((lowerBound-1) > -1) {
                    
                    lowerBound -= 1;
                    mod -= 1;
                }

            }

            let upperBound = (this.currentPage + mod) + 1;

            if(upperBound > this.maxPage) {
                let overflow = upperBound % this.pagesCount;

                upperBound -= overflow;
                lowerBound -= overflow;
            }

            return Array.range(lowerBound, upperBound);
        },
        changePage(nextPage) {
            return this.loadPage(nextPage).then(() => {
                this.rerender++;
            });
        },
        changePageClick(event, item) {
            return this.changePage(item.number);
        }
    }
});
</script>

<style>

</style>