import clsx from "clsx";
import Logo from "../../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { MdEmail, MdLock } from "react-icons/md";
import { useCart } from "../../context/useCart";
import type { CartItem } from "../../context/cartStore";

type ProductCartDTO = {
  id: string;
  userId: string;
  productSlug: string;
  currentColor: string;
  currentCount: number;
  currentSize: string;
};

const Login = () => {
  const { setItems, clearItems, syncLocalCart } = useCart();

  const loginSchema = z.object({
    email: z.email("Invalid email"),
  });
  const navigate = useNavigate();
  const handleLogin = async (email: string, password: string) => {
    const result = loginSchema.safeParse({
      email,
    });

    if (!result.success) {
      toast.error("Is not valid email!");
      return;
    }
    const local = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const response = await fetch(`${local}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      toast.error(error.error);
    } else {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      if (data.userExists.productsCart.length > 0) {
        clearItems();
        const getProduct = async (item: ProductCartDTO) => {
          const result = item.productSlug.match(/^(.+?)DOISPONTOS/)?.[1];
          if (!result) {
            throw new Error("Invalid productSlug");
          }
          const response = await fetch(`${local}/products/id/${result}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Product not found");
          }
          return response.json();
        };
        const cartItems: CartItem[] = await Promise.all(
          data.userExists.productsCart.map(async (item: ProductCartDTO) => {
            const product = await getProduct(item);
            const cartItem: CartItem = {
              id: item.productSlug,
              productId: product.id,
              name: product.name,
              slug: product.slug,
              image: product.images[0],
              color: item.currentColor,
              size: item.currentSize,
              quantity: item.currentCount,
              price: product.price,
              discountPrice: product.discountPrice,
            };
            return cartItem;
          }),
        );
        setItems(cartItems);
      } else {
        await syncLocalCart();
      }
      navigate("/");
    }
  };

  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  return (
    <>
      <div
        className={clsx(
          "flex justify-center items-center",
          "w-screen h-screen",
          "bg-no-repeat bg-center bg-cover",
        )}
        style={{
          backgroundImage: "url('/Login/bg_login.jpg')",
        }}
      >
        <div
          className={clsx(
            "w-80 h-100",
            "flex flex-col justify-around items-center",
            "p-2",
            "font-poppins",
            "bg-white p-5 opacity-95",
          )}
        >
          <Logo></Logo>
          <form
            className={clsx("flex flex-col w-full gap-4")}
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(currentEmail, currentPassword);
            }}
          >
            <label className={clsx("flex flex-col relative")}>
              <h1>Email:</h1>
              <MdEmail
                size={20}
                className={clsx("absolute text-over-secundary right-0")}
              />
              <input
                className={clsx(
                  "outline-none bg-white p-2 w-full",
                  "border-b border-over-secundary",
                )}
                type="email"
                placeholder="email"
                required
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
              />
            </label>
            <label className={clsx("flex flex-col relative")}>
              <h1>Password:</h1>
              <MdLock
                size={20}
                className={clsx("absolute text-over-secundary right-0")}
              />
              <input
                className={clsx(
                  "outline-none bg-white p-2 w-full",
                  "border-b border-over-secundary",
                )}
                type="password"
                placeholder="password"
                required
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
              />
            </label>
            <button
              type="submit"
              className={clsx(
                "bg-over-secundary w-1/2 self-center p-2 text-white text-[16px] uppercase tracking-widest",
              )}
            >
              Login
            </button>
          </form>
          <h1>
            Not registered yet?{" "}
            <Link to="/register" className={clsx("font-bold")}>
              Sign up
            </Link>
          </h1>
        </div>
      </div>
    </>
  );
};
export default Login;
