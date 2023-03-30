import { createRouter, createWebHistory } from "vue-router"
import RequestQuotation from './views/RequestQuotation.vue'
import QuoteCalculator from './views/QuoteCalculator.vue'
import YourQuote from './views/YourQuote.vue'

const routes = [
    {
      path: '/',
      component: RequestQuotation
    },
    {
      path: '/QuoteCalculator/:id',
      component: QuoteCalculator
    },
    {
      path: '/YourQuote/:id',
      component: YourQuote
    }
  ]
    
  const router = createRouter({
    history : createWebHistory(),
    routes : routes
})
  
export default router