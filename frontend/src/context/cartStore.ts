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
  addItem: (item: AddCartItem) => {};
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
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

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "furniro-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
