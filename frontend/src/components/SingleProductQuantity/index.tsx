import clsx from "clsx";

import type { AddCartItem } from "../../context/cartStore";
import { useCart } from "../../context/useCart";
import toast from "react-hot-toast";

type SingleProductQuantityProps = {
  currentQuantity: number;
  handlePlusQuantity: () => void;
  handleMinusQuantity: () => void;
  SingleProductCartProps: AddCartItem;
};

const SingleProductQuantity = ({
  currentQuantity,
  handlePlusQuantity,
  handleMinusQuantity,
  SingleProductCartProps,
}: SingleProductQuantityProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(SingleProductCartProps);
  };

  return (
    <div
      className={clsx(
        "my-8 font-poppins text-[16px] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
      )}
    >
      <div
        className={clsx(
          "flex items-center justify-between w-[106.54px] h-[47px] rounded-[10px] border border-[#9F9F9F] px-1",
        )}
      >
        <button
          type="button"
          aria-label="Diminuir quantidade"
          onClick={handleMinusQuantity}
          className={clsx(
            "w-[38px] h-[38px] rounded-[8px] border border-[#9F9F9F] text-[20px] font-semibold text-[#3A3A3A]",
            "flex items-center justify-center hover:bg-[#E5E5E5] transition",
            "focus:outline-2 focus:outline-over-secundary",
          )}
        >
          -
        </button>
        <span
          className={clsx(
            "text-[16px] font-semibold font-poppins text-[#3A3A3A]",
          )}
        >
          {currentQuantity}
        </span>
        <button
          type="button"
          aria-label="Aumentar quantidade"
          onClick={handlePlusQuantity}
          className={clsx(
            "w-[38px] h-[38px] rounded-[8px] border border-[#9F9F9F] text-[20px] font-semibold text-[#3A3A3A]",
            "flex items-center justify-center hover:bg-[#E5E5E5] transition",
            "focus:outline-2 focus:outline-over-secundary",
          )}
        >
          +
        </button>
      </div>
      <button
        className={clsx(
          "flex justify-around items-center w-53.75 h-16",
          "border-[#9F9F9F] border",
          "rounded-[15px]",
          "text-[20px]",
          "cursor-pointer hover:transform hover:scale-105 transition",
        )}
        onClick={(e)=>{
          e.preventDefault();
          e.stopPropagation();
          toast.success(`${SingleProductCartProps.name} added to cart.`);
          handleAddToCart()
        }}
      >
        Add To Cart
      </button>
    </div>
  );
};
export default SingleProductQuantity;
