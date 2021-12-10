<template>
    <div
        class="display-block bg-grey-700 rounded"
        :style="[$props.style, $data.finalPosition ? {
            left : $data.finalPosition[0].toString(),
            top  : $data.finalPosition[1].toString(),
            width: $props.width
        } : {}]"
    >
            <button class="display-flex w-100 pd-l3 pd-r4 pd-y2 fg-hover-white items-align-center flex-gap-2" v-for="(item, index) in items" :key="index" @click="onClick($event, item)">
                <v-icon class="sz-10" :src="item.icon" v-if="item.icon">

                </v-icon>
<!-- 
                <i v-if="Object.isArray(item.icon)" :class="item.icon" ></i>
                <img v-else-if="Object.isString(item.icon)" :src="item.icon" style="height: 2em"/> -->

                <p>{{item.caption}}</p>
            </button>
        </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "v-context-menu",
    props: {
        vector: {
            required: true,
            type: [MouseEvent, HTMLElement, Array]
        },
        anchor: {
            required: false,
            default: "left"
        },
        items: {
            required: true,
            type: Array
        },
        style: {
            type: Object,
            default: () => ({})
        },
        width: {
            type: [String, Number],
            default: "16em"
        },
        flow: {
            type: String,
            default: "ltr"
        }
    },
    data() {
        let data=  {
            positionSource: this.$props.vector,
            mapPosition: false,
            initialPosition: [],
            finalPosition: null
        };

        switch(Object.isInstanceOf(data.positionSource, [MouseEvent, HTMLElement, Array])) {
            case Array:
                if(data.positionSource.all(Number.isInt)){
                    data.initialPosition = positionSource;
                }
                else {
                    throw new Error();
                }
                break;
            case HTMLElement:
                data.initialPosition = [
                    parseInt((data.positionSource.offsetLeft )),
                    parseInt((data.positionSource.offsetTop))
                ];
                data.mapPosition = true;
                break;
            case MouseEvent:
                data.initialPosition = [data.positionSource.pageX, data.positionSource.pageY];
                data.mapPosition = true;
                break;
            default:
                throw new Error();
                break;
        }

        return data;
    },
    mounted() {
        if(this.$data.mapPosition) {
            this.$data.finalPosition = [
                this.anchorTransformX(
                    this.$props.anchor,
                    this.$data.initialPosition[0] + "px",
                ),
                this.$data.initialPosition[1] + "px"
            ];
        }
        else {
            this.$data.finalPosition = this.$data.initialPosition;
        }
    },
    methods: {
        async onClick(event, item) {
            if(item.click) {
                await this.$emitTick('close');
                await Promise.normalise(item.click(event, item));
            }
        },
        anchorTransformX(anchor, position) {
            switch(anchor) {
                case "left":
                    position = `calc(${position} - calc(${this.$props.width}))`;
                    break;

                case "centre":
                case "center":
                    position = `calc(${position} - calc(${this.$props.width} / 2))`;
                    break;

                case "right":
                    break;
            }

            console.log(position);

            return position;
        }
    }
});
</script>

<style>

</style>