import clsx from "clsx";
import MoscaiContent from "../MosaicContent";

const Mosaic = () => {
  return (
    <div
      className={clsx(
        "overflow-hidden",
        "flex flex-col justify-center items-center",
        "pt-16.75 pb-12.5",
      )}
    >
      <h1
        className={clsx(
          "text-[#616161] text-[20px] font-poppins font-semibold",
        )}
      >
        Share your setup with
      </h1>
      <h1
        className={clsx(
          "text-primary-text-200 text-[25px] font-poppins font-bold my-2", "md:text-[40px]",
        )}
      >
        #FuniroFurniture
      </h1>
      <div className={clsx("max-w-360 w-screen overflow-hidden")}>
        <div className={clsx("animate-slide-loop", "w-728", "flex gap-4")}>
          <MoscaiContent></MoscaiContent>
          <MoscaiContent></MoscaiContent>
        </div>
      </div>
    </div>
  );
};
export default Mosaic;
