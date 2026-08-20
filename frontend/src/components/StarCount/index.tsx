import clsx from "clsx";

type StarCountProps = {
  rating: number;
  reviewCount: number;
};
const StarCount = ({ rating, reviewCount }: StarCountProps) => {
  return (
    <div className={clsx("flex items-center gap-5.5 my-3.75")}>
      <div>
        {[1, 2, 3, 4, 5].map((star) => {
          const fill = Math.min(Math.max(rating - (star - 1), 0), 1) * 100;

          return (
            <span
              key={star}
              className={clsx("relative text-[20px] text-transparent")}
            >
              ★
              <span
                className={clsx(
                  "absolute inset-0 overflow-hidden text-yellow-400",
                )}
                style={{ width: `${fill}%` }}
              >
                ★
              </span>
            </span>
          );
        })}
      </div>
      <div className={clsx("h-7.5 w-px bg-[#9f9f9f]")}></div>
      <h1 className={clsx("text-[#9f9f9f]")}>{reviewCount} Custumer Review</h1>
    </div>
  );
};
export default StarCount;
