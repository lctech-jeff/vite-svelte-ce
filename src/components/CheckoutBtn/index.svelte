<svelte:options customElement="j-checkout-btn" />

<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { useUserStorage, useCartStorage, useOrdersStorage } from '@/services/storageAdapter'
  import { useOrderProducts } from '@/application/orderProducts'
  import type { User } from '@/domain/user'
  import type { Cart } from '@/domain/cart'

  type CheckoutStatus = 'success' | 'failure'

  const dispatch = createEventDispatcher()
  const emitList = {
    'checkout-success': ({ status, user, cart }: { status: CheckoutStatus; user: User; cart: Cart }) => {
      dispatch('checkout-success', { status, user, cart })
    },
    'checkout-failure': ({ status }: { status: CheckoutStatus }) => {
      dispatch('checkout-failure', { status })
    },
  }

  // @ts-ignore
  const emit = (evtName: string, payload: any) => emitList[evtName](payload)

  const userStorage = useUserStorage()
  const cartStorage = useCartStorage()
  const ordersStorage = useOrdersStorage()

  $: userStore = userStorage.store
  $: user = $userStore
  $: isLogin = !!user.id

  $: cartStore = cartStorage.store
  $: cart = $cartStore
  $: productsInCart = cart?.products ?? []
  $: productsInCartLength = productsInCart.length ?? 0

  $: ordersStore = ordersStorage.store
  $: orders = $ordersStore

  const { orderProducts } = useOrderProducts()

  const handleCheckout = async () => {
    if (!isLogin) return window.alert('請先登入！')
    try {
      const isSuccess = await orderProducts(user, cart, orders)
      if (!isSuccess) throw new Error('checkout-failure')
      emit('checkout-success', {
        status: 'success',
        user,
        cart,
      })
    } catch (e) {
      console.log(e)
      emit('checkout-failure', {
        status: 'failure',
      })
    }
  }
</script>

<div>
  <j-btn onClick={handleCheckout}><slot />&nbsp;({productsInCartLength})</j-btn>
</div>
