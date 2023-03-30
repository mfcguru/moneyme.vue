<template>
    <div class="row">
        <div class="col-6">
            <label class="form-label">Amount Required</label>
        </div>
        <div class="col-6">
            <input
                type="range"
                class="form-range"
                min="2000"
                max="15000"
                step="100"
                v-model="amountRequired"
                @input="$emit('eventAmountRequiredChanged', amountRequired)"
                required
            />
            <p>${{ amountRequired }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AmountRequiredCompoment',
    props: {
        defaultValue: null
    },
    data() {
        return {
            amountRequired: 5000,
        }
    },
    created() {
        if (this.defaultValue != null) {
            this.amountRequired = this.defaultValue
        }
    }
}
</script>
