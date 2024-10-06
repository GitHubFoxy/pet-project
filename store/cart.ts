import { CartStateItem, getCartDetails } from "@/lib/get-cart-details";
import { Api } from "@/services/api-client";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { create } from "zustand";

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: any) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const cartState = create<CartState>((set, get) => ({
  items: [],
  loading: true,
  error: false,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true, loading: false });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true, loading: false });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set((state) => ({
        loading: true,
        error: false,
        items: state.items.map((item) =>
          item.id === id ? { ...item, deleting: true } : item,
        ),
      }));
      const data = await Api.cart.deleteItem(id);
      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set((state) => ({
        error: true,
        loading: false,
        items: state.items.map((item) =>
          item.id === id ? { ...item, deleting: false } : item,
        ),
      }));
    } finally {
      set((state) => ({
        loading: false,
        items: state.items.map((item) =>
          item.id === id ? { ...item, deleting: false } : item,
        ),
      }));
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true, loading: false });
    } finally {
      set({ loading: false });
    }
  },
}));
