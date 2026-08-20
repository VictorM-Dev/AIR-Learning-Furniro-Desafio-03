import clsx from "clsx";
import HeroButton from "../HeroButton";
import InspirationCard from "../InspirationCard";
import InspirationCaroucel from "../InspirationCaroucel";
import {Link} from "react-router-dom";

const Inspiration = () => {
  return (
    <div
      className={clsx("py-11", "flex items-center flex-wrap justify-center gap-10.5")}
    >
      <div className={clsx("w-105.5 p-4")}>
        <h1
          className={clsx(
            "text-[40px] text-primary-text-200 font-bold font-poppins leading-12",
            "mb-1.75",
          )}
        >
          50+ Beautiful rooms inspiration
        </h1>
        <p className={clsx("mb-6.25", "text-[16px] font-poppins font-medium")}>
          Our designer already made a lot of beautiful prototipe of rooms that
          inspire you
        </p>
        <Link to="/shop">
          <HeroButton
            label="Explore More"
            className={clsx("h-12 w-44", "font-semibold text-[16px] normal-case")}
          ></HeroButton>
        </Link>
      </div>

      <div className={clsx("flex flex-wrap gap-6 justify-center")}>
        <InspirationCard></InspirationCard>
        <InspirationCaroucel></InspirationCaroucel>
      </div>
    </div>
  );
};
export default Inspiration;
