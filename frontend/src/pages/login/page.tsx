import clsx from "clsx";
import Logo from "../../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import z from "zod";
import background from "../../../public/Login/bg_login.jpg";
import { MdEmail, MdLock } from "react-icons/md";

const Login = () => {
  const loginSchema = z.object({
    email: z.email("Invalid email"),
  });
  const navigate = useNavigate();
  const handleLogin = async (email: string, password: string) => {
    const result = loginSchema.safeParse({
      email,
    });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
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
      localStorage.setItem("token", JSON.stringify(data.token));
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
          backgroundImage: `url(${background})`,
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
