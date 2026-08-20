import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import clsx from "clsx";
import Container from "../../components/Container";
import BannerCard from "../../components/BannerCard";
import BenefitsCard from "../../components/BenefitsCard";
import OurProductsCard from "../../components/OurProductsCard";
import FilterBar from "../../components/FilterBar";
import LoadingSpinner from "../../components/LoadingSpinner";
import Pagination from "../../components/Pagination";
import { isValidCategory } from "../../utils/validCategories";
import { getProducts } from "../../services/product.service";
import type Product from "../../interface/Product";

function parsePage(raw: string | null): number {
    const value = Number(raw);
    if (!Number.isFinite(value) || value < 1) return 1;
    return Math.floor(value);
}

const Shop = () => {
    const { category } = useParams<{ category?: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const gridRef = useRef<HTMLDivElement>(null);

    const categoryIsValid = !category || isValidCategory(category);

    const page = parsePage(searchParams.get("page"));
    const limit = Number(searchParams.get("limit")) || 16;
    const sort = searchParams.get("sort") as "price_asc" | "price_desc" | null;

    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!categoryIsValid) {
            toast.error("Category not found. Showing all products.");
            navigate("/shop", { replace: true });
        }
    }, [categoryIsValid, navigate]);

    useEffect(() => {
        if (!categoryIsValid) return;

        async function fetchProducts() {
            setLoading(true);
            setError(false);

            try {
                const data = await getProducts({
                    category,
                    page,
                    limit,
                    sort: sort ?? undefined,
                });
                setProducts(data.products);
                setTotal(data.total);
                setTotalPages(data.totalPages);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [category, categoryIsValid, page, limit, sort]);

    useEffect(() => {
        if (loading || error) return;
        if (totalPages > 0 && page > totalPages) {
            const next = new URLSearchParams(searchParams);
            next.set("page", String(totalPages));
            setSearchParams(next, { replace: true });
        }
    }, [loading, error, page, totalPages, searchParams, setSearchParams]);

    const handlePageChange = (newPage: number) => {
        const next = new URLSearchParams(searchParams);
        next.set("page", String(newPage));
        setSearchParams(next);
        gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div>
            <Container>
                <BannerCard
                    title="Shop"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Shop" },
                    ]}
                />

                <FilterBar
                    totalResults={total}
                    currentPage={page}
                    currentLimit={limit}
                />
            </Container>

            <Container className="py-16 px-4">
                {loading && <LoadingSpinner />}

                {!loading && error && (
                    <p className="text-center">
                        Something went wrong while loading products. Please try
                        again.
                    </p>
                )}

                {!loading && !error && products.length === 0 && (
                    <p className="text-center">No products found.</p>
                )}
                {!loading && !error && products.length > 0 && (
                    <div ref={gridRef}>
                        <div
                            className={clsx(
                                "max-w-[1240px] w-full mx-auto",
                                "grid grid-cols-4 gap-8",
                            )}>
                            {products.map((product) => (
                                <OurProductsCard
                                    key={product.id}
                                    produto={product}></OurProductsCard>
                            ))}
                        </div>

                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </Container>

            <Container>
                <BenefitsCard />
            </Container>
        </div>
    );
};

export default Shop;
