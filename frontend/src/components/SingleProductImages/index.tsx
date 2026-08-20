import clsx from "clsx";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

type SingleProductImagesProps = {
  images: string[];
};
const SingleProductImages = ({ images }: SingleProductImagesProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentImage = `${API_URL}${images[selectedIndex] ?? images[0]}`;
  const handleClickImage = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <div className={clsx("flex gap-7 flex-col-reverse min-w-0", "md:flex-row", "max-sm: items-start")}>
      <div className={clsx("max-sm:w-[90%] max-sm:overflow-x-scroll")}>
        <div
          className={clsx("flex gap-6.75","md:flex-col max-md:justify-center", "max-sm:min-w-100")}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={`${API_URL}${image}`}
              className={clsx(
                "w-19 h-20 rounded-[10px]",
                "bg-[#F9F1E7]",
                "overflow-hidden",
                "cursor-pointer",
              )}
              onClick={() => handleClickImage(index)}
            ></img>
          ))}
        </div>
      </div>

      <div className={clsx("h-125 max-w-105.75 w-[90%]", "overflow-hidden", "bg-[#F9F1E7]", "rounded-[10px]")}>
        <img
          src={currentImage}
          className={clsx("h-full w-full", "hover:scale-110 transition")}
        ></img>
      </div>
    </div>
  );
};
export default SingleProductImages;
