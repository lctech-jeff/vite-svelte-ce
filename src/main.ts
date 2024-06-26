import '@/app.css'
import App from '@/App.svelte'
import '@/components/Btn/index.svelte'
import '@/components/CheckoutBtn/index.svelte'
import '@/components/CheckoutPanel/index.svelte'
import '@/components/ProductList/index.svelte'

const app = new App({
  target: document.getElementById('app') as Element,
})

export default app
