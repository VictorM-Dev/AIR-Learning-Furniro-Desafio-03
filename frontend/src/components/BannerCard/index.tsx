import clsx from "clsx";
import BreadCrumb from "../BreadCrumb";

type BreadCrumbItem = {
    label: string;
    href?: string;
};

type BannerCardProps = {
    title: string;
    breadcrumbs: BreadCrumbItem[];
};

const BannerCard = ({ title, breadcrumbs }: BannerCardProps) => {
    return (
        <div
            className={clsx(
                "w-full h-79",
                "bg-[url('/Images/Background-Banner.svg')] bg-cover bg-center",
                "flex flex-col items-center justify-center gap-2",
            )}>
            <h1 className="font-poppins font-medium text-[48px] text-black">
                {title}
            </h1>
            <BreadCrumb items={breadcrumbs} />
        </div>
    );
};

export default BannerCard;
