import type { User } from '@/domain/user'
import type { Cart } from '@/domain/cart'
import type { Order } from '@/domain/order'
import { createOrder } from '@/domain/order'

import { usePayment } from '@/services/paymentAdapter'
import { useNotifier } from '@/services/notificationAdapter'
import { useCartStorage, useOrdersStorage } from '@/services/storageAdapter'

export function useOrderProducts() {
  const notifier = useNotifier()
  const payment = usePayment()
  const orderStorage = useOrdersStorage()
  const cartStorage = useCartStorage()

  const orderProducts = async (user?: User, cart?: Cart, orders?: Order[]): Promise<boolean> => {
    if (!user || !cart || !cart.products.length) return false
    const order = createOrder(user, cart)
    const paid = await payment.tryPay(order.total)
    if (!paid) {
      notifier.notify('付款失敗囉 🤷')
      return false
    }
    orderStorage.updateOrders([...orders, order])
    cartStorage.emptyCart()
    return true
  }

  return { orderProducts }
}
