import clsx from "clsx";
import { useCart } from "../../context/useCart";
import NumberToStringRS from "../../utils/NumberToStringRS";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

type SideCartProps = {
  visible: boolean;
  handle: () => void;
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const getImageUrl = (image: string) =>
  image.startsWith("http") ? image : `${API_URL}${image}`;

const SideCart = ({ visible, handle }: SideCartProps) => {
  const { items, removeItem } = useCart();

  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.discountPrice
      ? item.price - item.price * (item.discountPrice / 100)
      : item.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  return (
    <div
      className={clsx(
        "max-w-104.25 w-screen h-186.5 bg-white absolute",
        "right-0 max-md:top-0",
        "py-6.5",
        "font-poppins",
        {
          hidden: !visible,
        },
      )}
    >
      <div className={clsx("flex justify-between items-center mb-6.5 px-6.5")}>
        <h1 className={clsx("text-[24px] font-semibold")}>Shopping Cart</h1>
        <img
          src="/Icons/shopClose.svg"
          alt=""
          className={clsx("cursor-pointer")}
          onClick={handle}
        />
      </div>
      <div className={clsx("w-71.75 h-px bg-black mb-10.5 ml-6.5")}></div>
      <div className={clsx("max-h-120 h-screen overflow-y-auto")}>
        <div className={clsx("flex flex-col gap-5 px-6.5")}>
          {items.map((item) => {
            const itemPrice = item.discountPrice
              ? item.price - item.price * (item.discountPrice / 100)
              : item.price;
            return (
              <div
                className={clsx("flex gap-8 items-center justify-around")}
                key={item.id}
              >
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className={clsx("w-26.25 h-26.25 rounded-[10px]")}
                />
                <div>
                  <div>
                    <h1>{item.name}</h1>
                    <div className={clsx("flex gap-2")}>
                      <h1>{item.quantity}</h1>
                      <h1>X</h1>
                      <h1>RS {NumberToStringRS(itemPrice)}</h1>
                    </div>
                  </div>
                </div>
                <MdClose
                  size={20}
                  className={clsx(
                    "text-white bg-[#9f9f9f] rounded-full p-0.5 font-bold cursor-pointer",
                  )}
                  onClick={() => removeItem(item.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={clsx("flex justify-between mt-2 border-b pb-5.75 px-6.5")}
      >
        <h1>Subtotal</h1>
        <h1 className={clsx("text-over-secundary font-bold")}>
          RS {NumberToStringRS(subtotal)}
        </h1>
      </div>
      <div className={clsx("flex justify-center items-center mt-5 gap-3.5")}>
        <Link
          className={clsx(
            "px-7.5 py-1.5 border border-black rounded-[50px] hover:bg-over-secundary hover:text-white transition",
          )}
          to={"/cart"}
          onClick={handle}
        >
          Cart
        </Link>

        <Link
          className={clsx(
            "px-7.5 py-1.5 border border-black rounded-[50px] hover:bg-over-secundary hover:text-white transition",
          )}
          to={"/checkout"}
          onClick={handle}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};
export default SideCart;
