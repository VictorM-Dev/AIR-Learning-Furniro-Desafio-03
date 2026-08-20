import clsx from "clsx";

const InspirationCard = () => {
  return (
    <div
      className={clsx(
        "bg-[url('/Images/Inspiration.png')] bg-cover bg-no-repeat bg-center",
        "max-w-101 w-[90vw] h-120 p-6","md:h-145.5",
        "flex items-end",
      )}
    >
      <div
        className={clsx(
          "w-54.25 h-32.5 py-9 pl-9",
          "font-poppins",
          "bg-primary opacity-[0.72]",
        )}
      >
        <h1
          className={clsx(
            "flex items-center gap-2",
            "text-[#616161] font-medium text-[16px]",
          )}
        >
          01
          <img src="/Icons/line.png" />
          Bed Room
        </h1>
        <h1 className={clsx("font-semibold text-[25px] text-primary-text-200","md:text[28px]")}>
          Inner Peace
        </h1>
      </div>
      <div
        className={clsx(
          "h-12 w-12",
          "bg-over-secundary",
          "flex items-center justify-center",
        )}
      >
        <img src="/Icons/right.png" />
      </div>
    </div>
  );
};
export default InspirationCard;
