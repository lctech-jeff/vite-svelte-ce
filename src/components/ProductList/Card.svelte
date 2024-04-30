<script lang="ts">
  import type { Product } from '@/domain/product'
  import { hasAllergy, hasPreference } from '@/domain/user'
  import { useAddToCart } from '@/application/addToCart'
  import { useUserStorage, useCartStorage } from '@/services/storageAdapter'

  export let product: Product

  const userStorage = useUserStorage()
  $: userStore = userStorage.store
  $: user = $userStore

  const cartStorage = useCartStorage()
  $: cartStore = cartStorage.store
  $: cart = $cartStore

  const { addToCart } = useAddToCart()

  $: productHasPreference = product.toppings.some(v => hasPreference(user, v))
  $: productHasAllergy = product.toppings.some(v => hasAllergy(user, v))

  type icon = '⚠️' | '👍' | ''
  let iconAfterTitle: icon = ''
  $: {
    if (productHasAllergy) {
      iconAfterTitle = '⚠️'
    } else if (productHasPreference) {
      iconAfterTitle = '👍'
    } else iconAfterTitle = ''
  }
</script>

<div class="card">
  <div class="image-wrapper">
    <img src={`https://fakeimg.pl/350x200/?text=${product.title}`} loading="lazy" alt={product.title} />
  </div>
  <div class="card--footer">
    <div class="card-footer__detail">
      <div>{product.title}&nbsp;{iconAfterTitle}</div>
      <div>{product.price}</div>
    </div>
    <j-btn onClick={() => addToCart(user, product, cart)}>加入購物車</j-btn>
  </div>
</div>

<style lang="postcss">
  .card {
    .image-wrapper {
      @apply w-full;
      img {
        @apply aspect-video w-full object-cover;
      }
    }
    .card--footer {
      @apply flex justify-between py-2;
      .card-footer__detail {
        @apply text-start;
      }
    }
  }
</style>
