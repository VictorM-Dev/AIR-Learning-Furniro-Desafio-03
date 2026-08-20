import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type HeroButtonProps = {
  label: string;
  className?: string;
};
const HeroButton = ({ label, className }: HeroButtonProps) => {
  return (
    <button
      className={twMerge(clsx(
        "h-18.5 w-55.5",
        "max-xxs:w-40 max-xxs:h-14",
        "uppercase font-bold font-poppins text-[16px] text-primary",
        "cursor-pointer hover:bg-over-secundary/90 hover:tracking-widest transition",
        "bg-over-secundary",
        className,
      ))}
    >
      {label}
    </button>
  );
};
export default HeroButton;
