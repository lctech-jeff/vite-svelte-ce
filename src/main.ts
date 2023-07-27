import '@/app.css'
import App from '@/App.svelte'
import '@/components/Btn/index.svelte'
import '@/components/CheckoutBtn/index.svelte'

const app = new App({
  target: document.getElementById('app'),
})

export default app
