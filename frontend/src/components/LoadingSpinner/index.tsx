import clsx from "clsx";

const LoadingSpinner = () => {
  return (
    <div className={clsx("w-full flex justify-center items-center", "py-20")}>
      <div
        className={clsx(
          "w-12 h-12 rounded-full",
          "border-4 border-card-product border-t-over-secundary",
          "animate-spin"
        )}
      />
    </div>
  );
};

export default LoadingSpinner;
