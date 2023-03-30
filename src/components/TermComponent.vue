<template>
    <div class="row">
        <div class="col-6">
            <label class="form-label">Term</label>
        </div>
        <div class="col-6">
            <input
                type="range"
                class="form-range"
                min="1"
                max="24"
                step="1"
                v-model="term"
                @input="$emit('eventTermChanged', term)"
                required
            />
            <p v-if="term > 1">{{ term }} months</p>
            <p v-else>{{ term }} month</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TermCompoment',
    props: {
        defaultValue: null
    },
    data() {
        return {
            term: 6
        }
    },
    created() {
        if (this.defaultValue != null) {
            this.term = this.defaultValue
        }
    }
}
</script>
