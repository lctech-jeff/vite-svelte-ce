<script lang="ts">
import { useUserStorage } from '@/services/storageAdapter'
import Btn from "@/components/Btn/index.svelte"

const userStore = useUserStorage()

$: userS = userStore.store
$: user = $userS
$: isLogin = !!user.id
$: username = user.name

const login = () => {
  userStore.updateUser({
    id: '100001',
    name: 'Jeff',
    email: 'jeff@lctech.com',
    preferences: ['cherry'],
    allergies: ['peanuts'],
  })
}

const logout = async () => {
  userStore.clearUser()
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
    <j-btn>Hi</j-btn>
    <j-checkout-btn on:checkout-success={handleCheckoutSuccess} on:checkout-failure={handleCheckoutFailure}>
      結帳按鈕
    </j-checkout-btn>
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
