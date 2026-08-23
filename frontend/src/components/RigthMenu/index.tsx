import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideCart from "../SideCart";

type RightMenuProps = {
  className?: string;
};
const RightMenu = ({ className }: RightMenuProps) => {
  const LinkHover: string = "hover:cursor-pointer hover:scale-110 transition";
  const [visible, setVisible] = useState(false);
  const [log, setLog] = useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };
  const isLogin = async () => {
    const local = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const token = localStorage.getItem("token");

    if (!token) {
      setLog(false);
      return;
    }

    const response = await fetch(`${local}/user/authToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLog(response.ok);
  };
  useEffect(() => {
    isLogin();
  }, []);
  const [visibleCart, setVisibleCart] = useState(false);
  const handleCart = () => {
    setVisibleCart(!visibleCart);
  };
  return (
    <div className={clsx(className)}>
      <div className={clsx("flex gap-[33.66px] md:relative")}>
        <a className={clsx(LinkHover)} onClick={handleClick}>
          <img
            src="/Icons/alert.svg"
            alt="Ícone de alerta"
            className={clsx("max-h-[18.66px]")}
          ></img>
        </a>
        <a className={clsx(LinkHover)} onClick={handleCart}>
          <img
            src="/Icons/shop.svg"
            alt="Ícone do carrinho"
            className="max-h-[22.05px]"
          />
        </a>
        <SideCart visible={visibleCart} handle={handleCart}></SideCart>
      </div>

      <div
        className={clsx("p-2 bg-white shadow-2xl", "absolute top-10 right-0", {
          hidden: !visible,
        })}
      >
        <div
          onClick={() => {
            localStorage.setItem("token", "");
            setLog(false);
          }}
        >
          <button
            className={clsx(
              "bg-over-secundary p-3 py-2 uppercase font-semibold text-white font-poppins tracking-widest text-[14px] cursor-pointer",
              { hidden: !log },
            )}
          >
            Logout
          </button>
          <button
            className={clsx(
              "bg-over-secundary p-3 py-2 uppercase font-semibold text-white font-poppins tracking-widest text-[14px] cursor-pointer",
              { hidden: log },
            )}
          >
            <Link to={"/login"}>Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default RightMenu;
