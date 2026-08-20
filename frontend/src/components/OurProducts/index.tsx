import OurProductsCard from "../OurProductsCard";
import type Product from "../../interface/Product";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

type OurProductsProps = {
  title: string;
  font: "font-bold" | "font-semibold";
};

const OurProducts = ({ title, font }: OurProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/products?limit=8`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <div className={clsx("w-full", "flex flex-col items-center", "px-4 pb-17.25")}>
      <h1
        className={clsx(
          "text-primary-text-200 text-[40px] font-poppins leading-12",
          "mb-8",
          { font }
        )}
      >
        {title}
      </h1>
      <div
        className={clsx(
          "max-w-309 w-full",
          "flex gap-8 flex-wrap justify-center",
          "mb-8"
        )}
      >
        {products.map((product) => (
          <OurProductsCard key={product.id} produto={product} />
        ))}
      </div>
      <button
        onClick={() => navigate("/shop")}
        className={clsx(
          "h-12 w-61.25",
          "border-over-secundary border",
          "leading-6 text-over-secundary font-semibold font-poppins text-[16px]",
          "hover:bg-over-secundary hover:text-secundary transition cursor-pointer"
        )}
      >
        Show More
      </button>
    </div>
  );
};

export default OurProducts;
