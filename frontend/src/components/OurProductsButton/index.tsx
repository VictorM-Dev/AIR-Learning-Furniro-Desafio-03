import clsx from "clsx";

type OurProductsCardProps = {
  handleClick: () => void;
  label: string;
  disabled: boolean;
};
const OurProductsButton = ({
  handleClick,
  label,
  disabled,
}: OurProductsCardProps) => {
  const hoverButton: string =
    "hover:bg-over-secundary hover:text-secundary transition cursor-pointer";
  return (
    <button
      onClick={handleClick}
      className={clsx(
        "h-12 w-61.25",
        "border-over-secundary border",
        "leading-6 text-over-secundary font-semibold font-poppins text-[16px]",
        { [hoverButton]: !disabled },
      )}
      disabled={disabled}
    >
      {disabled ? "No More" : label}
    </button>
  );
};
export default OurProductsButton;
