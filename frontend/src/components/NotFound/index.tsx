import clsx from "clsx";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={clsx("w-full flex flex-col justify-center items-center", "py-20 gap-4")}>
      <h1 className={clsx("text-primary-text text-[40px] font-poppins font-bold")}>
        404
      </h1>
      <p className={clsx("text-primary-text-100 text-[20px] font-poppins")}>
        Product not found
      </p>
      <Link
        to="/shop"
        className={clsx(
          "mt-4 h-12 px-8",
          "border border-over-secundary",
          "text-over-secundary font-poppins font-semibold text-[16px]",
          "flex items-center",
          "hover:bg-over-secundary hover:text-secundary transition"
        )}
      >
        View all products
      </Link>
    </div>
  );
};

export default NotFound;
