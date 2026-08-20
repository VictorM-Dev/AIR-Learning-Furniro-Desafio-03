import clsx from "clsx";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};
const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={clsx("flex justify-center", "w-full", className)}>
      <div className={clsx("max-w-360 w-full")}>{children}</div>
    </div>
  );
};
export default Container;