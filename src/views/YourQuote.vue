<template>
    <div>
        <h2 class="text-center">Your Quote</h2>
        <hr />

        <!-- EDIT CUSTOMER INFO-->
        <div v-if="isEditingCustomerInfo">
            <div class="row">
                <div class="col">
                    <h4>Your Information</h4>
                </div>
                <div class="col text-end">
                    <a href="#" @click.prevent="saveCustomerInfo">Save</a>
                </div>
            </div>

            <TitleComponent @eventTitleChanged="eventTitleChanged" :defaultValue="model.customerInfo.Title" />

            <div class="row">
                <div class="col-6">
                    <label class="form-label">First Name</label>
                </div>
                <div class="col-6">
                    <input v-model="model.customerInfo.FirstName" type="text" class="form-control" required="" />
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <label class="form-label">Last Name</label>
                </div>
                <div class="col-6">
                    <input v-model="model.customerInfo.LastName" type="text" class="form-control" required="" />
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <label class="form-label">Date of Birth</label>
                </div>
                <div class="col-6">
                    <input v-model="model.customerInfo.DateOfBirth" type="date" class="form-control" required="" />
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <label class="form-label">Mobile</label>
                </div>
                <div class="col-6">
                    <input v-model="model.customerInfo.Mobile" type="text" class="form-control" required="" />
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <label class="form-label">Email</label>
                </div>
                <div class="col-6">
                    <input v-model="model.customerInfo.Email" type="text" class="form-control" required="" />
                </div>
            </div>
        </div>

        <!-- DISPLAY CUSTOMER INFO-->
        <div v-else>
            <div class="row">
                <div class="col">
                    <h4>Your Information</h4>
                </div>
                <div class="col text-end">
                    <a href="#" @click.prevent="showEditCustomerInfo()">Edit</a>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p>Name</p>
                </div>
                <div class="col text-end">
                    <p>{{ model.customerInfo.FirstName + ' ' + model.customerInfo.LastName }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p>Mobile</p>
                </div>
                <div class="col text-end">
                    <p>{{ model.customerInfo.Mobile }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p>Email</p>
                </div>
                <div class="col text-end">
                    <p>{{ model.customerInfo.Email }}</p>
                </div>
            </div>
        </div>

        <!-- EDIT VARIABLES-->
        <div v-if="isEditingVariables">
            <div class="row">
                <div class="col">
                    <h4>Finance details</h4>
                </div>
                <div class="col text-end">
                    <a href="#" @click.prevent="saveVariables">Save</a>
                </div>
            </div>

            <span class="label label-default">Please select Product Type</span>
            <select class="form-select" v-model="model.variables.ProductType" required>
                <option :value="1">Product A</option>
                <option :value="2">Product B</option>
                <option :value="3">Product C</option>
            </select>
            <br />

            <div v-if="isDataLoaded == true">
                <AmountRequiredCompoment @eventAmountRequiredChanged="eventAmountRequiredChanged" :defaultValue="model.variables.AmountRequired" />
                <TermComponent @eventTermChanged="eventTermChanged" :defaultValue="model.variables.Term" />
            </div>
        </div>

        <!-- DIPLAY VARIABLES-->
        <div v-else>
            <div class="row">
                <div class="col">
                    <h4>Finance details</h4>
                </div>
                <div class="col text-end">
                    <a href="#" @click.prevent="showVariables">Edit</a>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p>Finance amount</p>
                </div>
                <div class="col text-end">
                    <p>${{ model.quoteInfo.FinanceAmount }} over {{ model.variables.Term }} months</p>
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col">
                    <p>Repayments</p>
                </div>
                <div class="col text-end">
                    <p>${{ model.quoteInfo.Repayments }} Weekly</p>
                </div>
            </div>
        </div>

        <br />
        <div class="text-center">
            <button type="submit" class="btn btn-primary center">Apply Now</button>
        </div>

        <div class="pt-5">
            <p class="text-center">
                Total repayments of ${{ model.quoteInfo.TotalAmount }}, made up of an establishment fee of
                ${{ model.quoteInfo.EstablishmentFee }}, interest of ${{ model.quoteInfo.Interest }}. The repayment amount is based on the variables
                selected, is subject to our assessment and suitability, and other important terms and conditions apply.
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import AmountRequiredCompoment from '@/components/AmountRequiredCompoment.vue'
import TermComponent from '@/components/TermComponent.vue'
import TitleComponent from '@/components/TitleComponent.vue'

export default {
    name: 'YourQuote',
    components: {
        AmountRequiredCompoment,
        TermComponent,
        TitleComponent,
    },
    data() {
        return {
            isDataLoaded: false,
            isEditingCustomerInfo: false,
            isEditingVariables: false,
            model: {
                customerInfo: {
                    CustomerId: null,
                    Title: null,
                    FirstName: '',
                    LastName: '',
                    DateOfBirth: '',
                    Mobile: '',
                    Email: '',
                },
                quoteInfo: {
                    FinanceAmount: null,
                    EstablishmentFee: null,
                    Interest: null,
                    TotalAmount: null,
                    Repayments: null,
                },
                variables: {
                    QuoteId: null,
                    AmountRequired: null,
                    ProductType: null,
                    Term: null,
                },
            },
        }
    },
    created: function () {
        this.refreshPage()
    },
    methods: {
        refreshPage() {
            this.isDataLoaded = false

            let url = 'https://localhost:44333/api/CalculateQuote/' + this.$route.params.id
            let vm = this

            axios.get(url).then((response) => {
                vm.model.quoteInfo.FinanceAmount = response.data.quoteInfo.financeAmount
                vm.model.quoteInfo.EstablishmentFee = response.data.quoteInfo.establishmentFee
                vm.model.quoteInfo.Interest = response.data.quoteInfo.interest
                vm.model.quoteInfo.TotalAmount = response.data.quoteInfo.totalAmount
                vm.model.quoteInfo.Repayments = response.data.quoteInfo.repayments

                vm.model.customerInfo.CustomerId = response.data.customerInfo.customerId
                vm.model.customerInfo.Title = response.data.customerInfo.title
                vm.model.customerInfo.FirstName = response.data.customerInfo.firstName
                vm.model.customerInfo.LastName = response.data.customerInfo.lastName
                vm.model.customerInfo.DateOfBirth = response.data.customerInfo.dateOfBirth.split('T')[0]
                vm.model.customerInfo.Mobile = response.data.customerInfo.mobile
                vm.model.customerInfo.Email = response.data.customerInfo.email

                vm.model.variables.QuoteId = response.data.variables.quoteId
                vm.model.variables.AmountRequired = response.data.quoteInfo.financeAmount
                vm.model.variables.ProductType = response.data.variables.productType
                vm.model.variables.Term = response.data.variables.term

                vm.isDataLoaded = true
            })
        },
        eventAmountRequiredChanged(amountRequired) {
            this.model.variables.AmountRequired = amountRequired
        },
        eventTermChanged(term) {
            this.model.variables.Term = term
        },
        eventTitleChanged(title) {
            this.model.customerInfo.Title = title
        },
        saveCustomerInfo() {
            event.preventDefault()
            let url = 'https://localhost:44333/api/UpdateCustomerInfo'
            let vm = this

            axios.post(url, this.model.customerInfo).then(() => {
                vm.isEditingCustomerInfo = false
            })
        },
        showEditCustomerInfo() {
            this.isEditingCustomerInfo = true
        },
        saveVariables() {
            event.preventDefault()
            let url = 'https://localhost:44333/api/UpdateQuoteInfo'
            let vm = this

            axios.post(url, this.model.variables).then(() => {
                vm.isEditingVariables = false
                vm.refreshPage()
            })
        },
        showVariables() {
            this.isEditingVariables = true
        },
    },
}
</script>
