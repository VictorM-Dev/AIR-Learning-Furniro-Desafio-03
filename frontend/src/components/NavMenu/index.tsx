import clsx from "clsx";
import { Link } from "react-router-dom";

type NavMenuProps = {
    className?: string;
    children?: React.ReactNode;
};
const NavMenu = ({ className, children }: NavMenuProps) => {
    const LinkHover: string = "hover:cursor-pointer hover:scale-105 transition";
    return (
        <nav
            className={clsx(
                "w-107.5",
                "flex justify-around",
                "font-poppins text-[16px] text-over-primary",
                "lg:justify-between",
                className,
            )}>
            <Link to={"/"} className={clsx(LinkHover)}>
                Home
            </Link>
            <Link to={"/shop"} className={clsx(LinkHover)}>
                Shop
            </Link>
            <a className={clsx(LinkHover)}>About</a>
            <a className={clsx(LinkHover)}>Contact</a>
            {children}
        </nav>
    );
};
export default NavMenu;
