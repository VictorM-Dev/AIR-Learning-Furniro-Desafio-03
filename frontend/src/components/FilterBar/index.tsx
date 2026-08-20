import React from "react";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { SlidersHorizontal, LayoutGrid, List } from "lucide-react";

type FilterBarProps = {
    totalResults: number;
    currentPage: number;
    currentLimit: number;
};

const FilterBar = ({ totalResults, currentPage, currentLimit }: FilterBarProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;
        if (newSort) {
            searchParams.set("sort", newSort);
        } else {
            searchParams.delete("sort");
        }
        searchParams.set("page", "1");
        setSearchParams(searchParams);
    };

    const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLimit = e.target.value;
        if (newLimit && Number(newLimit) > 0) {
            searchParams.set("limit", newLimit);
        } else {
            searchParams.delete("limit");
        }
        searchParams.set("page", "1");
        setSearchParams(searchParams);
    };

    const currentSort = searchParams.get("sort") || "";
    
    const startResult = totalResults === 0 ? 0 : (currentPage - 1) * currentLimit + 1;
    const endResult = Math.min(currentPage * currentLimit, totalResults);

    return (
        <div className="w-full bg-[#F9F1E7] py-6 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
                
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                    <SlidersHorizontal size={19} color="black" strokeWidth={2} />
                    <span className="font-poppins text-base font-normal">Filter</span>
                </div>

                <div className="flex items-center gap-4">                    <LayoutGrid size={16} color="black" className="cursor-pointer hover:opacity-80 transition-opacity" />
                    <List size={16} color="black" className="cursor-pointer hover:opacity-80 transition-opacity" />
                </div>

                <div className="h-9 w-px bg-[#9F9F9F] mx-2 hidden md:block"></div>

                <p className="font-poppins text-base font-normal text-black">
                    Showing {startResult}–{endResult} of {totalResults} results
                </p>
            </div>
            
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                    <label htmlFor="limit" className="font-poppins text-base font-normal text-black">Show</label>
                    <input
                        id="limit"
                        type="number"
                        min="1"
                        value={currentLimit}
                        onChange={handleLimitChange}
                        className={clsx(
                            "w-14 h-14 bg-white text-center text-[#9F9F9F]",
                            "font-poppins text-base outline-none",
                            "border-none focus:ring-1 focus:ring-gray-300"
                        )}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label htmlFor="sort" className="font-poppins text-base font-normal text-black">Sort by</label>
                    <select
                        id="sort"
                        value={currentSort}
                        onChange={handleSortChange}
                        className={clsx(
                            "h-14 bg-white px-4 text-[#9F9F9F]",
                            "font-poppins text-base outline-none cursor-pointer",
                            "border-none focus:ring-1 focus:ring-gray-300"
                        )}
                    >
                        <option value="">Default</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;