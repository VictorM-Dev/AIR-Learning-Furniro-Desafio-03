import clsx from "clsx";

const ALL_SIZES = ["XS", "S", "M", "L", "XL"];

type SingleProductSizeProps = {
  sizes: string[];
  handleChangeSize: (size: string) => void;
  selectedSize: string;
};
const SingleProductSize = ({
  sizes,
  handleChangeSize,
  selectedSize,
}: SingleProductSizeProps) => {
  const availableSet = new Set(sizes.map((s) => s.toUpperCase()));
  return (
    <div className={clsx("font-poppins flex flex-col gap-3")}>
      <h1 className={clsx("text-[#9F9F9F] text-[14px]")}>Size</h1>
      <div className={clsx("flex gap-4")}>
        {ALL_SIZES.map((size) => {
          const available = availableSet.has(size);
          return (
            <div
              key={size}
              onClick={() => available && handleChangeSize(size)}
              className={clsx(
                "w-7.25 h-7.25 rounded-[5px]",
                "flex items-center justify-center",
                "text-[13px] uppercase",
                available ? "bg-[#f9f1e7] cursor-pointer" : "bg-[#e0e0e0] cursor-not-allowed opacity-40",
                { "bg-over-secundary": selectedSize.toUpperCase() === size },
              )}
            >
              {size}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SingleProductSize;
