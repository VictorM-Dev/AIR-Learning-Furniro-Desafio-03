import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import Container from "../../components/Container";
import BannerCard from "../../components/BannerCard";
import BenefitsCard from "../../components/BenefitsCard";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "../../context/useCart";
import NumberToStringRS from "../../utils/NumberToStringRS";
import toast from "react-hot-toast";

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

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().optional(),
  zipCode: z.string().min(1, "ZIP Code is required"),
  country: z.string().min(1, "Country is required"),
  addres: z.string().min(1, "Addres is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().optional(),
  onAddres: z.string().optional(),
  email: z.email("Valid email is required"),
  aditional: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { items, clearItems } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [payment, setPayment] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      zipCode: "",
      country: "",
      addres: "",
      city: "",
      province: "",
      onAddres: "",
      email: "",
      aditional: "",
    },
  });

  useEffect(() => {
    existsAuth().then(setIsAuthenticated);
  }, []);

  const onSubmit = async (data: CheckoutFormData) => {
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/productCart/removeAll`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    clearItems();
    toast.success("Purchase completed successfully.");
  };

  const zipCode = watch("zipCode");
  useEffect(() => {
    const cleanZipCode = zipCode.replace(/\D/g, "");
    if (cleanZipCode.length !== 8) {
      return;
    }
    const handleZipCode = async () => {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cleanZipCode}/json/`,
        );
        const data = await response.json();
        setValue("country", data.estado);
        setValue("city", data.localidade);
        setValue("province", data.regiao);
      } catch (error) {
        return;
      }
    };
    handleZipCode();
  }, [zipCode]);

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const inputClass =
    "border border-black rounded-[10px] h-[75px] px-[30px] max-w-[436px] w-full";
  const labelClass = "flex flex-col gap-[22px]";

  return (
    <Container>
      <BannerCard
        title="Checkout"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Checkout" }]}
      />

      <div className={clsx("py-13")}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={clsx("font-poppins", "flex justify-around flex-wrap px-2")}
        >
          <div
            className={clsx(
              "flex flex-col gap-9 flex-wrap w-full max-w-112.5 mb-10",
            )}
          >
            <h1 className={clsx("text-[36px] font-bold")}>Billing details</h1>
            <div className={clsx("flex max-sm:flex-col gap-7.75")}>
              <label className={clsx(labelClass)}>
                <h1>First name</h1>
                <input
                  type="text"
                  className={clsx(inputClass, "sm:max-w-50!")}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <span className={clsx("text-red-300")}>
                    {errors.firstName.message}
                  </span>
                )}
              </label>

              <label className={clsx(labelClass)}>
                <h1>Last name</h1>
                <input
                  type="text"
                  className={clsx(inputClass, "sm:max-w-50!")}
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <span className={clsx("text-red-300")}>
                    {errors.lastName.message}
                  </span>
                )}
              </label>
            </div>

            <label className={clsx(labelClass)}>
              <h1>Company Name (Optional)</h1>
              <input
                type="text"
                className={clsx(inputClass)}
                {...register("companyName")}
              />
              {errors.companyName && (
                <span className={clsx("text-red-300")}>
                  {errors.companyName.message}
                </span>
              )}
            </label>

            <label className={clsx(labelClass)}>
              <h1>ZIP Code</h1>
              <input
                type="text"
                className={clsx(inputClass)}
                {...register("zipCode")}
              />
              {errors.zipCode && (
                <span className={clsx("text-red-300")}>
                  {errors.zipCode.message}
                </span>
              )}
            </label>

            <label className={clsx(labelClass)}>
              <h1>Country / Region</h1>
              <input
                type="text"
                className={clsx(inputClass)}
                {...register("country")}
              />
              {errors.country && (
                <span className={clsx("text-red-300")}>
                  {errors.country.message}
                </span>
              )}
            </label>

            <label className={clsx(labelClass)}>
              <h1>Street Addres</h1>
              <input
                type="text"
                className={clsx(inputClass)}
                {...register("addres")}
              />
              {errors.addres && (
                <span className={clsx("text-red-300")}>
                  {errors.addres.message}
                </span>
              )}
            </label>

            <label className={clsx(labelClass)}>
              <h1>Town / City</h1>
              <input
                type="text"
                className={clsx(inputClass)}
                {...register("city")}
              />
              {errors.city && (
                <span className={clsx("text-red-300")}>
                  {errors.city.message}
                </span>
              )}
            </label>

            <label className={clsx(labelClass)}>
              <h1>Province</h1>
              <input
                type="text"
                className={clsx(inputClass)}
                {...register("province")}
              />
              {errors.province && (
                <span className={clsx("text-red-300")}>
                  {errors.province.message}
                </span>
              )}
            </label>

            <label className={clsx(labelClass)}>
              <h1>Add-on addres</h1>
              <input
                type="text"
                className={clsx(inputClass)}
                {...register("onAddres")}
              />
              {errors.onAddres && (
                <span className={clsx("text-red-300")}>
                  {errors.onAddres.message}
                </span>
              )}
            </label>

            <label className={clsx(labelClass)}>
              <h1>Email address</h1>
              <input
                type="text"
                className={clsx(inputClass)}
                {...register("email")}
              />
              {errors.email && (
                <span className={clsx("text-red-300")}>
                  {errors.email.message}
                </span>
              )}
            </label>

            <label className={clsx(labelClass)}>
              <input
                placeholder="Additional information"
                type="text"
                className={clsx(inputClass)}
                {...register("aditional")}
              />
              {errors.aditional && (
                <span className={clsx("text-red-300")}>
                  {errors.aditional.message}
                </span>
              )}
            </label>
          </div>

          <div className={clsx("w-full max-w-112.5")}>
            <div
              className={clsx(
                "flex justify-between",
                "text-[24px] font-semibold",
                "mb-3.75",
              )}
            >
              <h1>Product</h1>
              <h1>Subtotal</h1>
            </div>
            <div className={clsx("flex flex-col gap-2")}>
              {items.map((item) => (
                <div className={clsx("flex justify-between")}>
                  <div className={clsx("flex gap-2")}>
                    <h1 className={clsx("text-[#9f9f9f]")}>{item.name}</h1>
                    <h1>x</h1>
                    <h1>{item.quantity}</h1>
                  </div>
                  <div className={clsx("flex flex-col items-end gap-1")}>
                    <h1
                      className={clsx({
                        "line-through": item.discountPrice,
                        "text-[#9f9f9f]": item.discountPrice,
                      })}
                    >
                      RS {NumberToStringRS(item.price)}
                    </h1>
                    {item.discountPrice && (
                      <h1>
                        RS{" "}
                        {NumberToStringRS(
                          item.price - item.price * (item.discountPrice / 100),
                        )}
                      </h1>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className={clsx("flex justify-between my-5.5")}>
              <h1 className={clsx("font-semibold")}>Subtotal</h1>
              <h1>
                RS{" "}
                {NumberToStringRS(
                  items.reduce((acc, item) => acc + item.price, 0),
                )}
              </h1>
            </div>
            <div
              className={clsx(
                "flex justify-between my-5.5 items-center",
                "border-b border-[#d9d9d9] pb-8.25",
              )}
            >
              <h1 className={clsx("font-semibold")}>Total</h1>
              <h1 className={clsx("text-[24px] text-over-secundary font-bold")}>
                RS{" "}
                {NumberToStringRS(
                  items.reduce((sum, item) => {
                    const itemPrice = item.discountPrice
                      ? item.price - item.price * (item.discountPrice / 100)
                      : item.price;
                    return sum + itemPrice * item.quantity;
                  }, 0),
                )}
              </h1>
            </div>
            <div className={clsx("flex flex-col gap-3")}>
              <div className={clsx("flex flex-col gap-2")}>
                <label
                  className={clsx("flex items-center gap-2", "cursor-pointer")}
                  onClick={() => setPayment(0)}
                >
                  <div
                    className={clsx("w-4 h-4 border rounded-full", {
                      "bg-black": payment === 0,
                      "border-[#9f9f9f]": payment !== 0,
                    })}
                  ></div>
                  <h1 className={clsx({ "text-[#9f9f9f]": payment !== 0 })}>
                    Direct Bank Transfer
                  </h1>
                </label>
                <p
                  className={clsx("text-[#9f9f9f] text-justify py-2", {
                    hidden: payment !== 0,
                  })}
                >
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not be
                  shipped until the funds have cleared in our account.
                </p>
              </div>
              <div className={clsx("flex flex-col gap-2")}>
                <label
                  className={clsx("flex items-center gap-2", "cursor-pointer")}
                  onClick={() => setPayment(1)}
                >
                  <div
                    className={clsx("w-4 h-4 border rounded-full", {
                      "bg-black": payment === 1,
                      "border-[#9f9f9f]": payment !== 1,
                    })}
                  ></div>
                  <h1 className={clsx({ "text-[#9f9f9f]": payment !== 1 })}>
                    Lorem Bank Transfer
                  </h1>
                </label>
                <p
                  className={clsx("text-[#9f9f9f] text-justify py-2", {
                    hidden: payment !== 1,
                  })}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                  eos soluta doloremque facere consequuntur. Suscipit porro
                  ratione reiciendis, similique qui, laudantium veniam at.
                </p>
              </div>
              <div className={clsx("flex flex-col gap-2")}>
                <label
                  className={clsx("flex items-center gap-2", "cursor-pointer")}
                  onClick={() => setPayment(2)}
                >
                  <div
                    className={clsx("w-4 h-4 border rounded-full", {
                      "bg-black": payment === 2,
                      "border-[#9f9f9f]": payment !== 2,
                    })}
                  ></div>
                  <h1 className={clsx({ "text-[#9f9f9f]": payment !== 2 })}>
                    Cash On Delivery
                  </h1>
                </label>
                <p
                  className={clsx("text-[#9f9f9f] text-justify py-2", {
                    hidden: payment !== 2,
                  })}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Tempore soluta totam ratione dicta? Dolorum, nesciunt eum
                  fugit, maxime commodi suscipit tempore ratione quaerat cumque.
                </p>
              </div>
            </div>
            <p className={clsx("mt-4 text-justify")}>
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <span className={clsx("font-semibold")}>privacy policy</span>.
            </p>
            <div
              className={clsx("flex w-full items-center justify-center my-10")}
            >
              <button
                type="submit"
                className={clsx(
                  "cursor-pointer",
                  "w-79.5 h-16 border",
                  "hover:bg-over-secundary hover:text-white transition",
                  "rounded-[15px]",
                )}
              >
                Place order
              </button>
            </div>
          </div>
        </form>
      </div>

      <BenefitsCard />
    </Container>
  );
};

export default Checkout;
