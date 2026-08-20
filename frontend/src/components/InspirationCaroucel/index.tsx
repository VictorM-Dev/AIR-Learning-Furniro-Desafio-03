import clsx from "clsx";
import { useState } from "react";

import Caroucel1 from "/Caroucel/Caroucel1.png";
import Caroucel2 from "/Caroucel/Caroucel2.png";
import Caroucel3 from "/Caroucel/Caroucel3.png";
import Caroucel4 from "/Caroucel/Caroucel4.png";
const images = [Caroucel1, Caroucel2, Caroucel3, Caroucel4];

const InspirationCaroucel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <div className={clsx("relative", "w-[90vw] max-w-md")}>
      <div className={clsx("max-w-md overflow-hidden")}>
        <div
          className={clsx("flex gap-6", "transition-transform duration-500")}
          style={{
            transform: `translateX(-${396 * currentImage}px)`,
          }}
        >
          {images.map((image) => (
            <div className={clsx("overflow-hidden", "min-w-93 h-121.5")} key={image}>
              <div
                className={clsx(
                  "bg-cover bg-no-repeat bg-center",
                  "w-full h-full",
                  "hover:scale-110 transition",
                )}
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className={clsx("flex gap-2", "mt-10")}>
        {images.map((_, index) => (
          <div
            key={index}
            className={clsx(
              "h-6.75 w-6.75",
              "rounded-full",
              "flex items-center justify-center",
              "cursor-pointer",
              "border-over-secundary",
              {
                border: currentImage === index,
              },
            )}
            onClick={() => setCurrentImage(index)}
          >
            <div
              className={clsx("h-2.75 w-2.75 rounded-full", {
                "bg-[#D8D8D8]": currentImage !== index,
                "bg-over-secundary": currentImage === index,
              })}
            />
          </div>
        ))}
      </div>
      <div>
        <button
          className={clsx(
            "shadow-[0px_4px_14px_1px_rgba(0,0,0,0.16)] bg-primary",
            "w-12 h-12",
            "flex items-center justify-center",
            "rounded-full",
            "absolute md:top-66.75 md:left-84.25",
            "bottom-0 left-60",
            "hover:scale-110 transition cursor-pointer",
            {
              hidden:
                currentImage === images.length - 1,
            }
          )}
          onClick={() => setCurrentImage((prev) => prev + 1)}
        >
          <img src="/Icons/right2.png"/>
        </button>
        <button
          className={clsx(
            "shadow-[0px_4px_14px_1px_rgba(0,0,0,0.16)] bg-primary",
            "w-12 h-12",
            "flex items-center justify-center",
            "rounded-full",
            "absolute md:top-66.75 md:-left-4",
            "bottom-0 left-45",
            "hover:scale-110 transition cursor-pointer",
            {
              hidden: currentImage === 0,
            }
          )}
          onClick={() => setCurrentImage((prev) => prev - 1)}
        >
          <img src="/Icons/right2.png" className={clsx("scale-x-[-1]")}/>
        </button>
      </div>
    </div>
  );
};
export default InspirationCaroucel;
