import { LuMenu } from "react-icons/lu";
import NavMenu from "../NavMenu";
import { useState } from "react";
import RightMenu from "../RigthMenu";
import clsx from "clsx";

type MobileMenuProps = {
  className?: string;
};
const MobileMenu = ({ className }: MobileMenuProps) => {
  const [ativo, setAtivo] = useState(false);
  return (
    <div className={clsx("relative", className)}>
      <LuMenu
        size={32}
        className={clsx("hover:cursor-pointer hover:scale-110 transition-all")}
        onClick={() => setAtivo(!ativo)}
      ></LuMenu>
      <NavMenu
        className={clsx(
          "h-[calc(100vh-100px)] max-w-[50vw] min-w-62.5",
          "absolute top-16.25 -right-2",
          "flex-col",
          "justify-center items-center gap-5 ",
          "bg-primary",
          {
            flex: ativo,
            hidden: !ativo,
          },
        )}
      >
        <RightMenu className={clsx("mt-6")}></RightMenu>
      </NavMenu>
    </div>
  );
};
export default MobileMenu;
