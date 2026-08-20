import clsx from "clsx";
import Logo from "../Logo";
import MobileMenu from "../MobileMenu";
import NavMenu from "../NavMenu";
import RightMenu from "../RigthMenu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div
        className={clsx(
          "flex justify-center items-center",
          "h-25 w-full max-w-360",
          "fixed z-50",
          "bg-primary",
        )}
      >
        <div
          className={clsx(
            "flex justify-between items-center",
            "w-full px-2 max-h-10.25",
            "md:px-4",
            "lg:px-12.5",
          )}
        >
          <Link to={"/"}>
            <Logo></Logo>
          </Link>
          <NavMenu className={clsx("hidden", "md:flex")}></NavMenu>
          <RightMenu className={clsx("hidden", "md:flex")}></RightMenu>
          <MobileMenu className={clsx("flex", "md:hidden")}></MobileMenu>
        </div>
      </div>
      {/*Essa div serve apenas como elemento para preencher o espaço do fixed*/}
      <div className={clsx("h-25", "-z-50")}></div>
    </div>
  );
};
export default Header;
