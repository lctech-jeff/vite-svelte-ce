import type { Cart } from '@/domain/cart'
import type { Order } from '@/domain/order'
import type { User } from '@/domain/user'
import type { Product } from '@/domain/product'
import type { Writable } from 'svelte/store'

export interface UserStorageService {
  // user: User
  // ∵ svelte/store 的限制 ∴ 使用 store: Writable<User> 代替
  store: Writable<User>
  updateUser(user: User): void
  clearUser(): void
}

export interface CartStorageService {
  // cart: Cart
  // ∵ svelte/store 的限制 ∴ 使用 store: Writable<Cart> 代替
  store: Writable<Cart>
  updateCart(cart: Cart): void
  emptyCart(): void
}

export interface OrdersStorageService {
  // orders: Order[]
  // ∵ svelte/store 的限制 ∴ 使用 store: Writable<Order> 代替
  store: Writable<Order[]>
  updateOrders(orders: Order[]): void
}

export interface ProductStorageService {
  // cookies: Product[]
  // ∵ svelte/store 的限制 ∴ 使用 store: Writable<Product[]> 代替
  store: Writable<Product[]>
  updateCookies(cookies: Product[]): void
}

export interface NotificationService {
  notify(message: string): void
}

export interface PaymentService {
  tryPay(amount: PriceCents): Promise<boolean>
}
