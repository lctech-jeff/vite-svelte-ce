<svelte:options customElement="j-btn" />

<script lang="ts">
const isProd = import.meta.env.PROD;

</script>

{#if isProd}
  <link rel="stylesheet" href="/dist/style.css" />
{/if}
<button on:click type="button" class="btn"><slot>fallback</slot></button>

<style lang="postcss">
.btn {
  @apply cursor-pointer rounded-lg border border-transparent bg-[var(--bg-color)] px-5 py-2.5 font-medium transition-[border-color] duration-[0.25s];
  &:hover{
    @apply border-[#646cff];
  }
  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
}
</style>
