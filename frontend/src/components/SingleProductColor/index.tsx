import clsx from "clsx";

type SingleProductColorProps = {
  colors: string[];
  handleChangeColor: (index: number) => void;
  selectedColor: string;
};
const SingleProductColor = ({
  colors,
  handleChangeColor,
  selectedColor,
}: SingleProductColorProps) => {
  return (
    <div className={clsx("mt-4.5")}>
      <h1 className={clsx("text-[#9F9F9F] text-[14px]")}>Color</h1>
      <div className={clsx("flex gap-4 my-3")}>
        {colors.map((color, index) => {
          return (
            <div
              key={index}
              className={clsx(
                "w-7.5 h-7.5 rounded-full",
                "cursor-pointer",
                "border border-[#e0e0e0]",
                "flex justify-center items-center",{
                  "scale-125": selectedColor === color,
                }
              )}
              style={{ backgroundColor: color }}
              onClick={() => handleChangeColor(index)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
export default SingleProductColor;
