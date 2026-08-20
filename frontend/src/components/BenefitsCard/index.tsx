import clsx from "clsx";
import BenefitItem from "../BenefitItem";

const benefits = [
  {
    icon: "/Icons/trophy.svg",
    title: "High Quality",
    description: "crafted from top materials",
  },
  {
    icon: "/Icons/warranty.svg",
    title: "Warranty Protection",
    description: "Over 2 years",
  },
  {
    icon: "/Icons/shipping.svg",
    title: "Free Shipping",
    description: "Order over 150 $",
  },
  {
    icon: "/Icons/support.svg",
    title: "24 / 7 Support",
    description: "Dedicated support",
  },
];

const BenefitsCard = () => {
  return (
    <div
      className={clsx(
        "min-h-[270px] w-full bg-[#FAF3EA] py-12",
        "flex items-center justify-center",
      )}
    >
      <div
        className={clsx(
          "w-full max-w-[1334px] px-6 sm:px-8 lg:px-6",
          "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between",
        )}
      >
        {benefits.map((benefit) => (
          <BenefitItem
            key={benefit.title}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </div>
  );
};

export default BenefitsCard;
