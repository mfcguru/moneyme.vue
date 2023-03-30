<template>
    <div class="row">
        <div class="col-6">
            <label class="form-label">Title</label>
        </div>
        <div class="col-6">
            <select v-model="title" class="form-select" @change="$emit('eventTitleChanged', title)" required>
                <option selected></option>
                <option value="1" selected>Mr</option>
                <option value="2">Ms</option>
                <option value="3">Mrs</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TitleCompoment',
    props: {
        defaultValue: null
    },
    data() {
        return {
            title: null,
        }
    },
    created() {
        if (this.defaultValue != null) {
            this.title = this.defaultValue
        }
    }
}
</script>
