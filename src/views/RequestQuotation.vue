<template>
    <div class="text-start">
        <form @submit="handleSubmit($event)">
            <h2 class="text-center">Request Quote</h2>
            <hr />

            <AmountRequiredCompoment @eventAmountRequiredChanged="eventAmountRequiredChanged" />
            <TermCompoment @eventTermChanged="eventTermChanged" />
            <TitleComponent @eventTitleChanged="eventTitleChanged" />

            <div class="row">
                <div class="col-6">
                    <label class="form-label">First Name</label>
                </div>
                <div class="col-6">
                    <input v-model="model.FirstName" type="text" class="form-control" required="" />
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <label class="form-label">Last Name</label>
                </div>
                <div class="col-6">
                    <input v-model="model.LastName" type="text" class="form-control" required="" />
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <label class="form-label">Date of Birth</label>
                </div>
                <div class="col-6">
                    <input v-model="model.DateOfBirth" type="date" class="form-control" required="" />
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <label class="form-label">Mobile</label>
                </div>
                <div class="col-6">
                    <input v-model="model.Mobile" type="text" class="form-control" required="" />
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <label class="form-label">Email</label>
                </div>
                <div class="col-6">
                    <input v-model="model.Email" type="text" class="form-control" required="" />
                </div>
            </div>

            <br />
            <div class="text-center">
                <button type="submit" class="btn btn-primary center">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import AmountRequiredCompoment from '../components/AmountRequiredCompoment.vue'
import TermCompoment from '../components/TermComponent.vue'
import TitleComponent from '@/components/TitleComponent.vue'

export default {
    name: 'RequestQuotation',
    components: {
        AmountRequiredCompoment,
        TermCompoment,
        TitleComponent
    },
    data() {
        return {
            model: {
                AmountRequired: 5000,
                Term: 6,
                Title: null,
                FirstName: '',
                LastName: '',
                DateOfBirth: '',
                Mobile: '',
                Email: '',
            },
        }
    },
    methods: {
        eventAmountRequiredChanged(amountRequired) {
            this.model.AmountRequired = amountRequired
            console.log(this.model)
        },
        eventTermChanged(term) {
            this.model.Term = term
        },
        eventTitleChanged(title) {
            this.model.Title = title
        },
        handleSubmit(event) {
            event.preventDefault()
            this.showAlert = false
            let vm = this
            let url = 'https://localhost:44333/api/RequestQuote'

            axios.post(url, vm.model).then((response) => {
                console.log(response)
                window.location.href = response.data.redirectUrl
            })
        },
    },
}
</script>
