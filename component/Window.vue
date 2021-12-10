<script>
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        top: { type: String, default: "2.8em" },
        bottom: { type: String, default: "auto" },
        left: { type: String, default: "auto" },
        right: { type: String, default: "auto" },
    }
});
</script>