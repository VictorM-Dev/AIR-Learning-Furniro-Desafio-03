import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import clsx from "clsx";
import Container from "../../components/Container";
import BenefitsCard from "../../components/BenefitsCard";
import { useCart } from "../../context/useCart";
import toast from "react-hot-toast";
import BannerCard from "../../components/BannerCard";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const getImageUrl = (image: string) =>
    image.startsWith("http") ? image : `${API_URL}${image}`;

const formatRs = (value: number) =>
    new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

const Cart = () => {
    const { items, updateQuantity, removeItem } = useCart();

    const subtotal = items.reduce((sum, item) => {
        const itemPrice = item.discountPrice
            ? item.price - item.price * (item.discountPrice / 100)
            : item.price;
        return sum + itemPrice * item.quantity;
    }, 0);

    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <Container className="bg-[#FFF]">
            <div className="w-full overflow-x-clip font-poppins leading-normal">
                <BannerCard
                    title="Cart"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Cart" },
                    ]}
                />

                <main className="mx-auto box-border min-h-[525px] w-full max-w-[1240px] px-4 py-10 md:py-[72px]">
                    <div className="grid w-full min-w-0 gap-[30px] xl:grid-cols-[817px_393px]">
                        <div className="min-w-0">
                            <div className="bg-white xl:min-w-[817px]">
                                <div
                                    className={clsx(
                                        "hidden h-[55px] grid-cols-[142px_177px_156px_106px_162px_74px] pl-4 items-center bg-[#F9F1E7] text-[16px] font-medium text-black xl:grid",
                                    )}>
                                    <div />
                                    <div>Product</div>
                                    <div>Price</div>
                                    <div>Quantity</div>
                                    <div>Subtotal</div>
                                    <div />
                                </div>

                                <div className="space-y-4 xl:space-y-3 xl:pt-10">
                                    {items.length === 0 ? (
                                        <div className="flex min-h-[220px] flex-col items-center justify-center gap-6 p-10 text-center font-poppins">
                                            <p className="text-[18px] text-[#9F9F9F]">
                                                Your cart is empty.
                                            </p>
                                            <Link
                                                to="/shop"
                                                className="inline-flex h-12 items-center justify-center rounded-[10px] border border-black px-8 text-[16px] font-medium text-black transition hover:bg-[#F9F1E7]">
                                                Go to Shop
                                            </Link>
                                        </div>
                                    ) : (
                                        items.map((item) => {
                                            const itemPrice = item.discountPrice
                                                ? item.price -
                                                  item.price *
                                                      (item.discountPrice / 100)
                                                : item.price;
                                            return (
                                                <div
                                                    key={item.id}
                                                    className={clsx(
                                                        "relative grid min-h-[145px] max-w-full grid-cols-[88px_minmax(0,1fr)] justify-center items-center gap-x-3 gap-y-2 rounded-[10px] border border-[#F0E7DB] bg-white p-3 pr-12 text-[14px] sm:grid-cols-[105px_minmax(0,1fr)] sm:text-[16px] xl:min-h-[105px] xl:grid-cols-[142px_177px_156px_106px_162px_74px] xl:gap-0 xl:rounded-none xl:border-0 xl:p-0",
                                                    )}>
                                                    <div className="row-span-4 flex h-[88px] w-[88px] items-center justify-center self-start sm:h-[105px] sm:w-[105px] xl:row-auto xl:self-center">
                                                        <img
                                                            src={getImageUrl(
                                                                item.image,
                                                            )}
                                                            alt={item.name}
                                                            className={clsx(
                                                                "h-[82px] w-[88px] object-contain sm:h-[95px] sm:w-[105px]",
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="col-start-2 row-start-1 self-end sm:self-center xl:col-auto xl:row-auto">
                                                        <p className="font-medium text-black xl:font-normal xl:text-[#9F9F9F]">
                                                            {item.name}
                                                        </p>
                                              </div>

                                                    <div className="col-start-2 row-start-2 text-[#9F9F9F] xl:col-auto xl:row-auto">
                                                        <span className="mr-1 xl:hidden">
                                                            Price:
                                                        </span>
                                                        Rs.{" "}
                                                        {formatRs(itemPrice)}
                                                    </div>

                                                    <div
                                                        className={clsx(
                                                            "col-start-2 row-start-3 flex h-[42px] w-[106px] items-center justify-between rounded-[10px] border border-[#9F9F9F] px-2 xl:col-auto xl:row-auto xl:h-[47px]",
                                                        )}>
                                                        <button
                                                            type="button"
                                                            aria-label="Decrease quantity"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.quantity -
                                                                        1,
                                                                )
                                                            }
                                                            className={clsx(
                                                                "flex h-full w-6 cursor-pointer items-center justify-center text-[16px] hover:text-[#B88E2F]",
                                                            )}>
                                                            -
                                                        </button>
                                                        <span
                                                            className={clsx(
                                                                "text-[16px] font-medium text-black",
                                                            )}>
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            aria-label="Increase quantity"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.quantity +
                                                                        1,
                                                                )
                                                            }
                                                            className={clsx(
                                                                "flex h-full w-6 cursor-pointer items-center justify-center text-[16px] hover:text-[#B88E2F]",
                                                            )}>
                                                            +
                                                        </button>
                                                    </div>

                                                    <div className="col-start-2 row-start-4 pl-5 font-medium text-black xl:col-auto xl:row-auto xl:font-normal">
                                                        <span className="mr-1 text-[#9F9F9F] xl:hidden">
                                                            Subtotal:
                                                        </span>
                                                        Rs.{" "}
                                                        {formatRs(
                                                            itemPrice *
                                                                item.quantity,
                                                        )}
                                                    </div>

                                                    <button
                                                        type="button"
                                                        aria-label="Remove item"
                                                        onClick={() =>
                                                            removeItem(item.id)
                                                        }
                                                        className={clsx(
                                                            "absolute right-2 top-2 flex h-10 w-10 cursor-pointer items-center justify-center text-[#B88E2F] transition hover:bg-[#F8E6C5] xl:static xl:col-auto xl:row-auto",
                                                        )}>
                                                        <AiOutlineDelete
                                                            size={28}
                                                        />
                                                    </button>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>

                        <aside className="box-border h-[390px] min-w-0 w-full max-w-full overflow-hidden bg-[#F9F1E7] px-6 pt-[15px] sm:px-[75px] xl:w-[393px]">
                            <div>
                                <h2 className="whitespace-nowrap text-center text-[28px] font-semibold text-black sm:text-[32px]">
                                    Cart Totals
                                </h2>
                                <div className="mt-[63px] flex min-w-0 flex-col items-start gap-1 text-[16px] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                                    <span className="shrink-0 font-medium text-black">
                                        Subtotal
                                    </span>
                                    <span className="max-w-full text-[14px] text-[#9F9F9F] sm:text-right sm:text-[16px]">
                                        Rs. {formatRs(subtotal)}
                                    </span>
                                </div>
                                <div className="mt-[25px] flex min-w-0 flex-col items-start gap-1 text-[16px] sm:mt-[31px] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                                    <span className="shrink-0 font-medium text-black">
                                        Total
                                    </span>
                                    <span className="max-w-full whitespace-nowrap text-[16px] font-medium text-[#B88E2F] sm:text-right sm:text-[20px]">
                                        Rs. {formatRs(total)}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    disabled={items.length === 0}
                                    onClick={() => {
                                        toast.success(
                                            "check-out realizado com sucesso!",
                                        );
                                    }}
                                    className={clsx(
                                        "mx-auto mt-[50px] inline-flex h-[59px] w-full max-w-[222px] cursor-pointer items-center justify-center rounded-[15px] border border-black bg-transparent text-[20px] text-black transition hover:bg-white/50",
                                        items.length === 0 &&
                                            "opacity-50 cursor-not-allowed",
                                    )}>
                                    Check Out
                                </button>
                            </div>
                        </aside>
                    </div>
                </main>

                <BenefitsCard />
            </div>
        </Container>
    );
};

export default Cart;
