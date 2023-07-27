<svelte:options customElement="j-checkout-btn" />

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import Btn from "@/components/Btn/index.svelte"
import { useUserStorage, useCartStorage } from '@/services/storageAdapter'
import { useOrderProducts } from '@/application/orderProducts'
import type { User } from '@/domain/user'
import type { Cart } from '@/domain/cart'

const isProd = import.meta.env.PROD;

type CheckoutStatus = 'success' | 'failure'

const dispatch = createEventDispatcher();
const emitList = {
    'checkout-success': ({status, user,cart}:{status:CheckoutStatus, user:User, cart:Cart}) => {
        dispatch('checkout-success',{status,user, cart})
    },
    'checkout-failure': ({status}:{status:CheckoutStatus}) => {
        dispatch('checkout-failure',{status})
    }
}
const emit = (evtName: string, payload:any) => emitList[evtName](payload);

const userStorage = useUserStorage()
const cartStorage = useCartStorage()

$: userStore = userStorage.store
$: user = $userStore
$: isLogin = !!user.id

$: cartStore = cartStorage.store;
$: cart = $cartStore;
$: productsInCart = cart?.products ?? []
$: productsInCartLength =productsInCart.length ?? 0;

const { orderProducts } = useOrderProducts()

const handleCheckout = async () => {
  if (!isLogin) return window.alert('請先登入！')
  const isSuccess = await orderProducts(user, cart)
  if (isSuccess) {
    emit('checkout-success', {
      status: 'success',
      user: user,
      cart: cart,
    })
    console.log('checkout-success')
    return
  }
  emit('checkout-failure', {
    status: 'failure',
  })
}

</script>

{#if isProd}
  <link rel="stylesheet" href="/dist/style.css" />
{/if}
<div>
  <Btn on:click={handleCheckout}><slot />&nbsp;({productsInCartLength})</Btn>
</div>
