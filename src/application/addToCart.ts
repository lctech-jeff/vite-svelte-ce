import type { Product } from '@/domain/product'
import { hasAllergy } from '@/domain/user'
import type { User } from '@/domain/user'
import { addProduct } from '@/domain/cart'
import type { Cart } from '@/domain/cart'

import type { CartStorageService, NotificationService } from '@/application/ports'
import { useCartStorage } from '@/services/storageAdapter'
import { useNotifier } from '@/services/notificationAdapter'

export function useAddToCart() {
  const storage: CartStorageService = useCartStorage()
  const notifier: NotificationService = useNotifier()

  function addToCart(user: User, product: Product, cart: Cart): void {
    const warning = '這個商品不適合您! 😱'
    const isDangerous = product.toppings.some(item => hasAllergy(user, item))
    if (isDangerous) return notifier.notify(warning)
    const updated = addProduct(cart, product)
    storage.updateCart(updated)
  }

  return { addToCart }
}
