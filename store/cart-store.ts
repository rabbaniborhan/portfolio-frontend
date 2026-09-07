import { create } from "zustand";

export interface CartItem {
  itemId: string;
  itemType: "Product" | "Course";
  title: string;
  price: number;
  quantity: number;
  emoji?: string;
  coverImage?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => {
    const items = get().items;
    const existing = items.find((i) => i.itemId === item.itemId);
    if (existing) {
      set({
        items: items.map((i) =>
          i.itemId === item.itemId ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] });
    }
  },
  removeItem: (itemId) => {
    set({ items: get().items.filter((i) => i.itemId !== itemId) });
  },
  updateQuantity: (itemId, qty) => {
    set({
      items: get().items.map((i) =>
        i.itemId === itemId ? { ...i, quantity: Math.max(1, qty) } : i
      ),
    });
  },
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));
