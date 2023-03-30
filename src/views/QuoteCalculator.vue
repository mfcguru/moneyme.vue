<template>
    <div class="text-start">
        <form @submit="handleSubmit($event)">
            <h2 class="text-center">Quote Calculator</h2>
            <hr />

            <span class="label label-default">Please select Product Type</span>
            <select class="form-select" v-model="model.ProductType" required>
                <option :value="1">Product A</option>
                <option :value="2">Product B</option>
                <option :value="3">Product C</option>
            </select>
            <br />

            <div v-if="isDataLoaded == true">
                <AmountRequiredCompoment @eventAmountRequiredChanged="eventAmountRequiredChanged" :defaultValue="model.AmountRequired" />
                <TermCompoment @eventTermChanged="eventTermChanged" :defaultValue="model.Term" />
                <TitleComponent @eventTitleChanged="eventTitleChanged" :defaultValue="model.Title" />
            </div>

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
import TitleComponent from '../components/TitleComponent.vue'

export default {
    name: 'QuoteCalculator',
    components: {
        AmountRequiredCompoment,
        TermCompoment,
        TitleComponent,
    },
    data() {
        return {
            isDataLoaded: false,
            model: {
                ProductType: null,
                AmountRequired: null,
                Term: '',
                Title: '',
                FirstName: '',
                LastName: '',
                DateOfBirth: '',
                Mobile: '',
                Email: '',
            },
        }
    },
    created: function () {
        let url = 'https://localhost:44333/api/GetQuote/' + this.$route.params.id
        let vm = this

        axios.get(url).then((response) => {
            vm.model.AmountRequired = response.data.amountRequired
            vm.model.Term = response.data.term
            vm.model.Title = response.data.title
            vm.model.FirstName = response.data.firstName
            vm.model.LastName = response.data.lastName
            vm.model.DateOfBirth = response.data.dateOfBirth.split('T')[0]
            vm.model.Mobile = response.data.mobile
            vm.model.Email = response.data.email
            vm.isDataLoaded = true
        })
    },
    methods: {
        eventAmountRequiredChanged(amountRequired) {
            this.model.AmountRequired = amountRequired
        },
        eventTermChanged(term) {
            this.model.Term = term
        },
        eventTitleChanged(title) {
            this.model.Title = title
        },
        handleSubmit(event) {
            event.preventDefault()
            let vm = this
            let url = 'https://localhost:44333/api/PreCalculateQuote/' + this.$route.params.id

            axios.post(url, this.model).then(() => {
                vm.$router.push('/YourQuote/' + this.$route.params.id)
            })
        },
    },
}
</script>
