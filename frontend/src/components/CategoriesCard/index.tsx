import clsx from "clsx";
import { Link } from "react-router-dom";

type CategoriesCardProps = {
  image: string;
  label: string;
  to: string;
};
const CategoriesCard = ({ image, label, to }: CategoriesCardProps) => {
  return (
    <Link to={to} className={clsx("flex flex-col gap-7.5 items-center", "group")}>
      <div
        className={clsx(
          "h-120 w-[90vw]",
          "rounded-[10px] overflow-hidden",
          "sm:w-95.25"
        )}
      >
        <div
          className={clsx(
            "h-full w-full",
            "bg-cover bg-no-repeat bg-center",
            "group-hover:scale-110 transition cursor-pointer",
          )}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
      <h1
        className={clsx(
          "text-[24px] font-poppins font-semibold text-primary-text",
          "group-hover:tracking-widest group-hover:text-primary-text-100 transition cursor-pointer"
        )}
      >
        {label}
      </h1>
    </Link>
  );
};
export default CategoriesCard;
