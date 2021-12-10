<template>
    <div class="display-flex flex-column items-align-center content-justify-center">
        <div class="mg-b4">
            <v-icon style="font-size: 9.6em" :src="$props.icon" class="fg-red-600"/>
        </div>

        <div class="mg-b2">
            <h3>{{
                $props.errorType === 'server'
                    ? $props.error.httpCode + ' '  + $props.error.httpMessage
                    : 'Script ' + $props.error.name
            }}</h3>
        </div>

        <div class="mg-b2">
            <pre>{{$props.error.message}}</pre>
        </div>

        <slot></slot>
    </div>
</template>

<script>
import { ApiError } from "../api";

export default {
    name: "v-error",
    props: {
        error: {
            required: true
        },
        icon: {
            default: () => ['codicon', 'codicon-error'],
            type: [Array, String]
        }
    },
    data() {
        return {
            errorType: this.$props.error instanceof ApiError ? 'server' : 'client'
        };
    }
}
</script>