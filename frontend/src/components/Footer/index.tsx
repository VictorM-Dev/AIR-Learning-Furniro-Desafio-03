import clsx from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <footer className={clsx("min-h-126.5 w-full px-4 pb-9.5 pt-12 font-poppins leading-normal lg:px-25")}>
      <div
        className={clsx(
          "grid gap-10 md:grid-cols-2 lg:grid-cols-[393px_177px_177px_minmax(0,1fr)]",
          "border-b border-b-[rgba(0,0,0,0.17)]",
          "pb-12",
        )}
      >
        <div className={clsx("flex flex-col gap-12.5")}>
          <h1 className={clsx("text-[24px] font-bold")}>Funiro.</h1>
          <p className={clsx("text-[#9F9F9F] text-[16px]", "max-w-75")}>
            400 University Drive Suite 200 Coral Gables,
            <br />
            FL 33134 USA
          </p>
        </div>
        <div>
          <h1
            className={clsx(
              "text-[#9F9F9F] text-[16px] font-medium",
              "mb-13.75",
            )}
          >
            Links
          </h1>
          <div
            className={clsx(
              "text-[16px] font-medium",
              "flex flex-col gap-11.5",
            )}
          >
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="#">About</Link>
            <Link to="#">Contact</Link>
          </div>
        </div>
        <div>
          <h1
            className={clsx(
              "text-[#9F9F9F] text-[16px] font-medium",
              "mb-13.75",
            )}
          >
            Help
          </h1>
          <div
            className={clsx(
              "text-[16px] font-medium",
              "flex flex-col gap-11.5",
            )}
          >
            <a>Payment Options</a>
            <a>Returns</a>
            <a>Privacy Policies</a>
          </div>
        </div>
        <div>
          <h1
            className={clsx(
              "text-[#9F9F9F] text-[16px] font-medium",
              "mb-13.75",
            )}
          >
            Newsletter
          </h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            className={clsx("flex flex-wrap gap-2.75 text-[16px] font-medium")}
          >
            <input
              type="text"
              placeholder="Enter Your Email Address"
              className={clsx(
                "placeholder:text-[#9F9F9F] placeholder:text-[14px] focus:outline-none",
                "min-w-0 max-w-full py-0.75 w-50",
                "border-b border-b-black",
              )}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <button
              className={clsx(
                "border-b border-b-black",
                "cursor-pointer hover:opacity-70",
              )}
              onClick={() => {
                if (validateEmail(email)) {
                  toast.success("You are subscribed.");
                } else {
                  toast.error("Invalid email.");
                }
              }}
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
      <p className={clsx("mt-8.75", "text-[16px]")}>
        2023 furino. All rights reverved
      </p>
    </footer>
  );
};
export default Footer;
