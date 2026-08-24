import { useEffect, useState } from "react";
import z from "zod";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Navigate } from "react-router-dom";
import Container from "../../components/Container";
import BannerCard from "../../components/BannerCard";
import BenefitsCard from "../../components/BenefitsCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import toast from "react-hot-toast";
import { MapPin } from "lucide-react";

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
  name: z.string().min(1, "Name is required"),
  email: z.email("Valid email is required"),
  subject: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof checkoutSchema>;

const Contact = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    existsAuth().then(setIsAuthenticated);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const onSubmit = () => {
    toast.success("Message sent");
  };

  const inputClass =
    "border border-black rounded-[10px] h-[75px] px-[30px] max-w-[436px] w-full";
  const labelClass = "flex flex-col gap-[22px]";

  return (
    <Container>
      <BannerCard
        title="Contact"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <div className={clsx("flex flex-col justify-center items-center")}>
        <div
          className={clsx(
            "font-poppins py-25 flex flex-col justify-center items-center gap-2",
          )}
        >
          <h1 className={clsx("text-[36px] font-bold text-center")}>
            Get In Touch With Us
          </h1>
          <p className={clsx("max-w-161 text-center text-[#9f9f9f]")}>
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </p>
        </div>
        <div
          className={clsx(
            "font-poppins flex w-full flex-wrap-reverse pb-15.75 max-md:gap-15 gap-40 justify-center",
          )}
        >
          <div className={clsx("flex flex-col gap-10")}>
            <div>
              <div className={clsx("flex gap-2.5 items-center mb-3")}>
                <img src="/Icons/pin.svg" alt="" />
                <h1 className={clsx("font-semibold text-[24px]")}>Addres</h1>
              </div>
              <p className={clsx("max-w-53 ml-8")}>
                236 5th SE Avenue, New York NY10000, United States
              </p>
            </div>
            <div>
              <div className={clsx("flex gap-2.5 items-center mb-3")}>
                <img src="/Icons/phone.svg" alt="" />
                <h1 className={clsx("font-semibold text-[24px]")}>Phone</h1>
              </div>
              <p className={clsx("max-w-53 ml-8")}>
                Mobile: +(84) 546-6789 Hotline: +(84) 456-6789
              </p>
            </div>
            <div>
              <div className={clsx("flex gap-2.5 items-center mb-3")}>
                <img src="/Icons/timer.svg" alt="" />
                <h1 className={clsx("font-semibold text-[24px]")}>
                  Working Time
                </h1>
              </div>
              <p className={clsx("max-w-53 ml-8")}>
                Monday-Friday: 9:00 - 22:00 <br/>Saturday-Sunday: 9:00 - 21:00
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={clsx("flex flex-col gap-9 max-w-111 w-full px-2")}
          >
            <label className={clsx(labelClass)}>
              <h1 className={clsx("font-semibold")}>Your name</h1>
              <input
                type="text"
                placeholder="Abc"
                className={clsx(inputClass)}
                {...register("name")}
              />
              {errors.name && (
                <span className={clsx("text-red-300")}>
                  {errors.name.message}
                </span>
              )}
            </label>

            <label className={clsx(labelClass)}>
              <h1 className={clsx("font-semibold")}>Email address</h1>
              <input
                type="text"
                placeholder="Abc@def.com"
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
              <h1 className={clsx("font-semibold")}>Subject</h1>
              <input
                type="text"
                placeholder="This is an optional"
                className={clsx(inputClass)}
                {...register("subject")}
              />
              {errors.subject && (
                <span className={clsx("text-red-300")}>
                  {errors.subject.message}
                </span>
              )}
            </label>

            <label className={clsx(labelClass)}>
              <h1 className={clsx("font-semibold")}>Message</h1>
              <textarea
                placeholder="Hi! i`d like to ask about"
                className={clsx(inputClass, "resize-none h-30! py-7.5")}
                {...register("message")}
              />
              {errors.message && (
                <span className={clsx("text-red-300")}>
                  {errors.message.message}
                </span>
              )}
            </label>
            <div>
              <button
                type="submit"
                className={clsx(
                  "w-57.5 h-13.75 bg-over-secundary text-white rounded-[5px] cursor-pointer",
                )}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <BenefitsCard />
    </Container>
  );
};
export default Contact;
