import clsx from "clsx";

type LogoProps = {
  className?: string;
};
const Logo = ({ className }: LogoProps) => {
  return (
    <div className={clsx("flex gap-1.25 items-center", className)}>
      <img
        src="/Logo/Logo.svg"
        alt="Logo furniro"
        className={clsx("w-12.5 h-8")}
      />
      <h1 className={clsx("font-montserrat text-[34px] font-bold leading-normal")}>Furniro</h1>
    </div>
  );
};
export default Logo;
