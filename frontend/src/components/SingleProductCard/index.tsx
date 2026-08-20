import clsx from "clsx";
import type Product from "../../interface/Product";
import NumberToStringRS from "../../utils/NumberToStringRS";
import StarCount from "../StarCount";
import SingleProductSize from "../SingleProductSize";
import { useState } from "react";
import SingleProductColor from "../SingleProductColor";
import SingleProductQuantity from "../SingleProductQuantity";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

type SingleProductCardProps = {
  produto: Product;
};

type SigleProductCardStages = {
  name: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
};

const sizePrice: Record<string, number> = {
  xl: 20,
  l: 10,
  m: 0,
  s: -10,
  xs: -20,
};

const SingleProductCard = ({ produto }: SingleProductCardProps) => {
  const [productStages, setProductStages] = useState<SigleProductCardStages>({
    name: produto.name,
    image: produto.images[0],
    color: produto.colors[0],
    size: produto.sizes[0],
    quantity: 1,
  });
  const handleChangeSize = (size: string) => {
    setProductStages((prev) => ({
      ...prev,
      size,
    }));
  };
  const handleChangeColor = (index: number) => {
    setProductStages((prev) => ({
      ...prev,
      color: produto.colors[index],
    }));
  };
  const handlePlusQuantity = () => {
    setProductStages((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  };
  const handleMinusQuantity = () => {
    setProductStages((prev) => ({
      ...prev,
      quantity: prev.quantity == 1 ? prev.quantity : prev.quantity - 1,
    }));
  };
  const priceWithSizeAndQuantity =
    (produto.price + (produto.price * (sizePrice[productStages.size.toLowerCase()] ?? 0)) / 100) *
    productStages.quantity;
  const priceWithSize =
    produto.price +
    (produto.price *
      (sizePrice[productStages.size.toLowerCase()] ?? 0)) /
      100;

  return (
    <div className={clsx("font-poppins", "max-w-150 md:w-full")}>
      <h1 className={clsx("text-[42px]")}>{produto.name}</h1>
      <div className={clsx("flex gap-6 items-end", "text-[#9f9f9f] ")}>
        <h1 className={clsx("text-[24px]")}>
          Rs.{" "}
          {produto.discountPrice
            ? NumberToStringRS(
                priceWithSizeAndQuantity -
                  produto.price *
                    (produto.discountPrice / 100) *
                    productStages.quantity,
              )
            : NumberToStringRS(priceWithSizeAndQuantity)}
        </h1>
        {produto.discountPrice && (
          <h1 className="line-through">
            Rs. {NumberToStringRS(priceWithSizeAndQuantity)}
          </h1>
        )}
      </div>
      <StarCount
        rating={produto.rating}
        reviewCount={produto.reviewCount}
      ></StarCount>
      <p className={clsx("max-w-106 text-[13px] mb-5.5")}>
        {produto.shortDescription}
      </p>
      <SingleProductSize
        sizes={produto.sizes}
        handleChangeSize={handleChangeSize}
        selectedSize={productStages.size}
      ></SingleProductSize>
      <SingleProductColor
        colors={produto.colors}
        handleChangeColor={handleChangeColor}
        selectedColor={productStages.color}
      ></SingleProductColor>
      <SingleProductQuantity
        currentQuantity={productStages.quantity}
        handlePlusQuantity={handlePlusQuantity}
        handleMinusQuantity={handleMinusQuantity}
        SingleProductCartProps={{
          ...productStages,
          image: productStages.image.startsWith("http")
            ? productStages.image
            : `${API_URL}${productStages.image}`,
          productId: produto.id,
          slug: produto.slug,
          price: priceWithSize,
          discountPrice: produto.discountPrice,
        }}
      ></SingleProductQuantity>
      <div
        className={clsx(
          "mt-10 border-t border-[#d9d9d9] w-full pt-10",
          "font-poppins text-[#9f9f9f] text-[16px]",
        )}
      >
        <ul className={clsx("flex flex-col gap-4 text-[16px]")}>
          <li className={clsx("flex")}><div className={clsx("flex justify-between w-25 mr-2")}><span>SKU</span>:</div>{produto.sku}</li>
          <li className={clsx("flex")}><div className={clsx("flex justify-between w-25 mr-2")}><span>Category</span>:</div>{produto.category}</li>
          <li className={clsx("flex")}><div className={clsx("flex justify-between w-25 mr-2")}><span>Tags</span>:</div>lorem, ipsum</li>
          <li className={clsx("flex")}><div className={clsx("flex justify-between w-25 mr-2")}><span>SKU</span>:</div>
            <div className={clsx("flex gap-4")}>
              <a
                className={clsx(
                  "h-5 w-5",
                  "rounded-full",
                  "flex justify-center items-center",
                  "cursor-pointer hover:scale-110 transition",
                  "bg-white invert"
                )}
                href="https://www.facebook.com/compass.uol/?locale=pt_BR"
                target="_blank"
              >
                <img src="/Social/facebook.png" alt="" />
              </a>
              <a
                className={clsx(
                  "h-5 w-5",
                  "rounded-full",
                  "flex justify-center items-center",
                  "cursor-pointer hover:scale-110 transition",
                  "bg-white invert"
                )}
                href="https://x.com/compassuol"
                target="_blank"
              >
                <img src="/Social/twitter.png" alt="" />
              </a>
              <a
                className={clsx(
                  "h-5 w-5",
                  "rounded-full",
                  "flex justify-center items-center",
                  "cursor-pointer hover:scale-110 transition",
                  "bg-white invert"
                )}
                href="https://www.linkedin.com/company/compass-uol/posts/?feedView=all"
                target="_blank"
              >
                <img src="/Social/linkedin.png" alt="" />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SingleProductCard;
