<script lang="ts">
  import Btn from '@/components/Btn/index.svelte'
import CheckoutBtn from '@/components/CheckoutBtn/index.svelte'
import CheckoutPanel from '@/components/CheckoutPanel/index.svelte'
import ProductList from '@/components/ProductList/index.svelte'

import { useUserStorage } from '@/services/storageAdapter'

const userStorage = useUserStorage()

$: userStore = userStorage.store
$: user = $userStore
$: isLogin = !!user.id
$: username = user.name

const login = () => {
  userStorage.updateUser({
    id: '100001',
    name: 'Jeff',
    email: 'jeff@lctech.com',
    preferences: ['cherry'],
    allergies: ['peanuts'],
  })
}

const logout = async () => {
  userStorage.clearUser()
  setTimeout(() => {
    window.location.href = '/'
  })
}

const handleCheckoutSuccess = (payload: any[]) => {
  console.log(payload)
}
const handleCheckoutFailure = (payload: any[]) => {
  console.log(payload)
}
</script>

<main>
  <div>
    <CheckoutBtn on:checkout-success={() => handleCheckoutSuccess} on:checkout-failure={() => handleCheckoutFailure}>
      結帳按鈕
    </CheckoutBtn>
    <div class="mt-6">
      <CheckoutPanel title="訂單" />
    </div>
    <div class="mt-6">
      <ProductList />
    </div>
  </div>

  <div class="btn">
    <Btn on:click={() => isLogin ? logout() : login()}>{isLogin ? `嗨！${username}`: '登入'}</Btn>
  </div>
</main>

<style lang="postcss">
  .btn {
    @apply fixed right-[5vw] top-[5vh];
  }
</style>
