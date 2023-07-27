import { writable, get } from 'svelte/store'
import { cookies } from "@/services/fakeData";
import type { User } from "@/domain/user";
import type { Order } from "@/domain/order";
import type { Cart } from "@/domain/cart";
import type { Product } from "@/domain/product";

const userEmpty: User = {
  id: "",
  name: "",
  email: "",
  preferences: [],
  allergies: [],
};

export const useUserStore = () => {
  const userData = writable({ ...userEmpty });
  const updateUser = (user: User) => userData.update(() => user);
  const user = get(userData);

  return {
    user,
    updateUser,
    clearUser: () => updateUser({ ...userEmpty }),
  }
}

export const useCartStore = () => {
  const cartData = writable({ products: [] });
  const updateCart = (cart: Cart) => cartData.update(() => cart);
  const cart:Cart = get(cartData);

  return {
    cart,
    updateCart,
    emptyCart: () => updateCart({ products: [] }),
  }
}

export const useOrderStore = () => {
  const orderData = writable([]);
  const updateOrders = (orders: Order[]) => orderData.update(() => orders);
  const orders:Order[] = get(orderData);

  return {
    orders,
    updateOrders,
  }
}

export const useProductStore = () => {
  const cookiesData = writable([...cookies]);
  const updateCookies = (cookies: Product[]) => cookiesData.update(() => cookies);
  const cookiesList:Product[] = get(cookiesData);

  return {
    cookies: cookiesList,
    updateCookies,
  }
}