import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type Product from "../../interface/Product";
import Container from "../../components/Container";
import SingleProductImages from "../../components/SingleProductImages";
import SingleProductCard from "../../components/SingleProductCard";
import clsx from "clsx";
import SingleProductCardAdditional from "../../components/SingleProductCardAdditional";
import OurProducts from "../../components/OurProducts";
import LoadingSpinner from "../../components/LoadingSpinner";
import NotFound from "../../components/NotFound";
import MenuSingleProduct from "../../components/MenuSingleProduct";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const ProductPage = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!slug) return;
        fetch(`${API_URL}/products/${slug}`)
            .then((res) => {
                if (!res.ok) {
                    setNotFound(true);
                    return null;
                }
                return res.json();
            })
            .then((data) => {
                if (data) setProduct(data);
            });
    }, [slug]);

    if (notFound) return <NotFound />;
    if (!product) return <LoadingSpinner />;
    return (
        <div>
           <Container className={clsx("bg-[#F9F1E7] w-max-[144px] h-25 flex items-center justify-center px-2 md:px-0")}>
              <MenuSingleProduct productName={product.name} />
            </Container>  
            <Container className={clsx("border-b border-[#D9D9D9]")}>
                <div
                    className={clsx(
                        "flex gap-26.5 justify-center flex-wrap-reverse md:px-0 px-2 pt-8.75 pb-15",
                    )}>
                    <SingleProductImages images={product.images} />
                    <SingleProductCard produto={product} />
                </div>
            </Container>
            <Container className={clsx("border-b border-[#D9D9D9]")}>
                <SingleProductCardAdditional produto={product} />
            </Container>
            <Container className={clsx("py-10")}>
                <OurProducts title="Related Products" font="font-semibold" />
            </Container>
        </div>
    );
};

export default ProductPage;
