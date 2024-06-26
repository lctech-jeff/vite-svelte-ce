import { writable, get } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'
import { cookies } from '@/services/fakeData'
import type { User } from '@/domain/user'
import type { Order } from '@/domain/order'
import type { Cart } from '@/domain/cart'
import type { Product } from '@/domain/product'

export const localStore = <T>(key: string, initial: T): Writable<T> => {
  const toString = (value: T) => JSON.stringify(value, null, 2)
  if (localStorage.getItem(key) === null) localStorage.setItem(key, toString(initial))
  const saved = JSON.parse(localStorage.getItem(key) || '')
  const { subscribe, set, update } = writable(saved)

  return {
    subscribe,
    set: value => {
      localStorage.setItem(key, toString(value))
      return set(value)
    },
    update,
  }
}

const USER_STORAGE_KEY = 'my-user'
const userInit: User = {
  id: '',
  name: '',
  email: '',
  preferences: [],
  allergies: [],
}
const user = localStore<User>(USER_STORAGE_KEY, { ...userInit })

export const useUserStore = () => {
  const store: Writable<User> = getContext(USER_STORAGE_KEY) || user
  setContext(USER_STORAGE_KEY, store)
  return {
    store,
    updateUser: store.set,
    clearUser: () => store.set({ ...userInit }),
  }
}

const CART_STORAGE_KEY = 'my-cart'
const cartInit: Cart = { products: [] }
const cart = localStore<Cart>(CART_STORAGE_KEY, { ...cartInit })

export const useCartStore = () => {
  const store: Writable<Cart> = getContext(CART_STORAGE_KEY) || cart
  setContext(CART_STORAGE_KEY, store)

  return {
    store,
    updateCart: store.set,
    emptyCart: () => store.set({ ...cartInit }),
  }
}

const ORDERS_STORAGE_KEY = 'my-order'
const ordersInit: Order[] = []
const orders = localStore<Order[]>(ORDERS_STORAGE_KEY, ordersInit)

export const useOrderStore = () => {
  const store: Writable<Order[]> = getContext(ORDERS_STORAGE_KEY) || orders
  setContext(ORDERS_STORAGE_KEY, store)

  return {
    store,
    updateOrders: store.set,
  }
}

export const useProductStore = () => {
  let cookiesData = writable([...cookies])
  const updateCookies = (cookies: Product[]) => cookiesData.update(() => cookies)
  const cookiesList: Product[] = get(cookiesData)

  return {
    store: cookiesData,
    updateCookies,
  }
}
