<template>
</template>

<script>
export default {
    props: {
        from: {
            type: Function,
            required: true
        },
        page: {
            type: Number,
            required: false,
            default: 0,
            validator: Number.isInt
        },
    },
    data() {
        this.allData = [];

        return {
            hasNextPage: true,

            currentData: undefined,
            currentPage: this.$props.page ,
            currentMeta: {}
        };
    },
    async mounted() { 
        await this.loadPage(this.currentPage);
    },
    methods: {
        async loadPage(nextPage) {
            if(this.hasNextPage) {
                let [currentData, hasNextPage] = await this.$props.from(nextPage);
                
                this.currentPage = nextPage;
                this.currentData = currentData;

                this.hasNextPage = hasNextPage;
            }
        },
        changePage(nextPage) {
            return this.loadPage(nextPage);
        },
        nextPage() {
            return this.loadPage(++this.currentPage);
        }
    }
}
</script>

<style>

</style>