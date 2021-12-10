<template>
    <ol class="tree " ref="tree">
        <li class="tree__node w-100" ref="node" :class="item.children && 'tree__node--has-children'" v-for="(item, index) in $props.items" :key="index">
            <slot name="node-outer">
                <component  @click="onclick(item, index)" ref="node-button" :to="item.to" :tag="item.to && 'button'" :is="item.to ? 'router-link' : 'button'" class="tree__node__button display-flex items-align-center w-100">
                    <slot name="node-inner">
                        <div class="mg-r2" style="width: 2em;" v-if="iconned">
                            <slot name="icon">
                                <v-icon ref="node-icon" v-if="item.icon" :src="item.icon"/>
                            </slot>
                        </div>
                        <slot name="node-text">
                            <p ref="node-text">{{item.text + (item.count && item.children ? ' (' + item.children.length.toString() + ')' : '')}}</p>
                        </slot>
                        
                        <slot name="node-aside">
                            <v-icon v-if="item['aside.icon'] && !item.children" class="sz-7 mg-la" :src="item['aside.icon']"/>
                            <p v-else-if="item['aside.text'] && !item.children" class="mg-la">{{item['aside.text']}}</p>
                            <div class="mg-la" v-else-if="item.children">
                                <v-icon :key="$data.expanded[index]" :src="$props[$data.expanded[index] ? 'icon.expanded' : 'icon.collapsed']" class="sz-8"/>
                            </div>
                        </slot>
                    </slot>
                </component>
            </slot>

            <component
                :is="propogate"
                v-show="$data.expanded[index]"
                v-if="item.children"
                class="tree__node__subtree pd-l4"
                :items="item.children"
                @click:node="$emit('click:node', $event)"
                @expand="$emit('expand', $event)"
                @collapse="$emit('collapse', $event)"
            />
        </li>
    </ol>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "v-tree",
    props: {
        items: {
            type: Array,
            default: Array.factory
        },
        "icon.expanded": {
            type: [String, Array],
            default: () => ["zmdi", "zmdi-chevron-down"] 
        },
        "icon.collapsed": {
            type: [String, Array],
            default: () => ["zmdi", "zmdi-chevron-right"]
        },
        propogate: {
            type: String,
            default: "v-tree"
        }
    },
    emits: ["click:node", "expand", "collapse"],
    data() {
        return {
            expanded: {...this.$props.items.map((item) => item?.expanded)},
            iconned: (this.$props.items.first(item => item?.icon != null)) != null
        };
    },
    methods: {
        onclick(item, index) {
            if(item.children) {
                this.$data.expanded[index] = !this.$data.expanded[index];

                this.$emit(this.$data.expanded[index] ? "expand" : "collapse", item);
            }
            else {
                this.$emit("click:node", item);
            }
        }
    }
});
</script>

<style lang="scss">
.tree { 
    display: flex;
    flex-direction: column;
}

.tree__node {
    padding-top:    .8em;

    &:not(.tree__node--has-children) > .tree__node__button:hover {
        color: #fff;
    }
}
</style>