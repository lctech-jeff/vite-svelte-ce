<svelte:options customElement="j-checkout-panel" />

<script lang="ts">
  import { useOrdersStorage } from '@/services/storageAdapter'

  export let title: String = ''

  const ordersStorage = useOrdersStorage()
  $: ordersStore = ordersStorage.store
  $: orders = $ordersStore
</script>

<div>
  <h1>{title}</h1>
  <div class="order-list">
    {#each orders as item}
      <div class="order-item">
        <div>{new Date(item.created).toLocaleString()}</div>
        <div>{item.cart.products.map(v => v.title).join(', ')}</div>
      </div>
    {/each}
  </div>
</div>

<style lang="postcss">
  .order-list {
    @apply grid gap-6;
    .order-item {
      @apply text-start;
    }
  }
</style>
