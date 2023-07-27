import type { Cart } from '@/domain/cart'
import type { Order } from '@/domain/order'
import type { User } from '@/domain/user'
import type { Product } from '@/domain/product'
import type { Writable } from 'svelte/store'

export interface UserStorageService {
  user?: User
  updateUser(user: User): void
  clearUser(): void
  store: Writable<User>
}

export interface CartStorageService {
  cart: Cart
  updateCart(cart: Cart): void
  emptyCart(): void
  store: Writable<Cart>
}

export interface OrdersStorageService {
  orders: Order[]
  updateOrders(orders: Order[]): void
  store: Writable<Order[]>
}

export interface ProductStorageService {
  cookies: Product[]
  updateCookies(cookies: Product[]): void
}

export interface NotificationService {
  notify(message: string): void
}

export interface PaymentService {
  tryPay(amount: PriceCents): Promise<boolean>
}
