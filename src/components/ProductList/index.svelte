<svelte:options customElement="j-product-list" />

<script lang="ts">
  import Card from '@/components/ProductList/Card.svelte'
  import { useProductStorage } from '@/services/storageAdapter'

  const productStorage = useProductStorage()

  $: productStore = productStorage.store
  $: cookies = $productStore
</script>

<div class="list">
  {#each cookies as cookie}
    <Card product={cookie} />
  {/each}
</div>

<style lang="postcss">
  .list {
    @apply grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3;
  }
</style>
