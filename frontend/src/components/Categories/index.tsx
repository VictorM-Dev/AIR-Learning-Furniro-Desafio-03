import clsx from "clsx";
import CategoriesCard from "../CategoriesCard";

import Categorie1 from "/Categories/Categorie1.png";
import Categorie2 from "/Categories/Categorie2.png";
import Categorie3 from "/Categories/Categorie3.png";

const Categories = () => {
    return (
        <div className={clsx("flex items-center flex-col", "py-[56.47px]")}>
            <div
                className={clsx(
                    "flex items-center flex-col",
                    "pb-[62.29px] px-4",
                )}>
                <h1
                    className={clsx(
                        "text-primary-text text-[32px] font-poppins font-bold text-center",
                    )}>
                    Browse The Range
                </h1>
                <p
                    className={clsx(
                        "text-primary-text-100 text-[20px] font-poppins text-center",
                    )}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </div>
            <div className={clsx("flex gap-5 flex-wrap justify-center")}>
                <CategoriesCard
                    image={Categorie1}
                    label="Dining"
                    to="/shop/dining"
                />
                <CategoriesCard
                    image={Categorie2}
                    label="Living"
                    to="/shop/living"
                />
                <CategoriesCard
                    image={Categorie3}
                    label="Bedroom"
                    to="/shop/bedroom"
                />
            </div>
        </div>
    );
};
export default Categories;
