import clsx from "clsx";
import { Link } from "react-router-dom";

type RightMenuProps = {
    className?: string;
};
const RightMenu = ({ className }: RightMenuProps) => {
    const LinkHover: string = "hover:cursor-pointer hover:scale-110 transition";
    return (
        <div className={clsx("flex gap-[33.66px]", className)}>
            <a className={clsx(LinkHover)}>
                <img
                    src="/Icons/alert.svg"
                    alt="Ícone de alerta"
                    className={clsx("max-h-[18.66px]")}></img>
            </a>
            <a className={clsx(LinkHover)}>
                <Link to={"/cart"} className={clsx(LinkHover)}>
                    <img
                        src="/Icons/shop.svg"
                        alt="Ícone do carrinho"
                        className="max-h-[22.05px]"
                    />
                </Link>
            </a>
        </div>
    );
};
export default RightMenu;
