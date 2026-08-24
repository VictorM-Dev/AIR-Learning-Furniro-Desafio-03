import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  slug: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  discountPrice?: number | null;
};

export type AddCartItem = Omit<CartItem, "id">;

type CartStore = {
  items: CartItem[];
  addItem: (item: AddCartItem) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  setItems: (items: CartItem[]) => void;
  clearItems: () => void;
  syncLocalCart: () => Promise<void>;
};

const createItemId = (item: AddCartItem) =>
  `${item.productId}:${item.color}:${item.size}`
    .replace(/:/g, "DOISPONTOS")
    .replace(/#/g, "HASHTAG");

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const existsAuth = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const result = await fetch(`${API_URL}/user/authToken`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.ok;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: async (item) => {
        const id = createItemId(item);

        const current = useCartStore
          .getState()
          .items.find((item) => item.id === id);

        set((state) => {
          const id = createItemId(item);
          const existingItem = state.items.find((current) => current.id === id);

          if (existingItem) {
            return {
              items: state.items.map((current) =>
                current.id === id
                  ? {
                      ...current,
                      ...item,
                      id,
                      quantity: current.quantity + item.quantity,
                    }
                  : current,
              ),
            };
          }

          return { items: [...state.items, { ...item, id }] };
        });
        if (await existsAuth()) {
          const response = await fetch(
            `${API_URL}/productCart/${createItemId(item)}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );
          if (response.status === 404) {
            await fetch(`${API_URL}/productCart/add`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                productSlug: createItemId(item),
                currentColor: item.color,
                currentCount: item.quantity,
                currentSize: item.size,
              }),
            });
          } else if (response.ok) {
            await fetch(`${API_URL}/productCart/update/${createItemId(item)}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                productSlug: createItemId(item),
                currentColor: item.color,
                currentCount: current!.quantity + item.quantity,
                currentSize: item.size,
              }),
            });
          }
        }
      },

      updateQuantity: async (id, quantity) => {
        const current = useCartStore
          .getState()
          .items.find((item) => item.id === id);

        if (!current) return;

        const newQuantity = Math.max(1, quantity);

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item,
          ),
        }));

        if (await existsAuth()) {
          await fetch(`${API_URL}/productCart/update/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              productSlug: id,
              currentColor: current.color,
              currentCount: newQuantity,
              currentSize: current.size,
            }),
          });
        }
      },

      removeItem: async (id) => {
        const current = useCartStore
          .getState()
          .items.find((item) => item.id === id);

        if (!current) return;

        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));

        if (await existsAuth()) {
          await fetch(`${API_URL}/productCart/remove/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        }
      },
      setItems: (items) => {
        set({ items });
      },
      clearItems: () => {
        set({ items: [] });
      },
      syncLocalCart: async () => {
        const token = localStorage.getItem("token");
        const items = useCartStore.getState().items;

        for (const item of items) {
          await fetch(`${API_URL}/productCart/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productSlug: item.id,
              currentColor: item.color,
              currentCount: item.quantity,
              currentSize: item.size,
            }),
          });
        }
      },
    }),

    {
      name: "furniro-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
