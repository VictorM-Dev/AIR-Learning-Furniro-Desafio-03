type BenefitItemProps = {
    icon: string
    title: string
    description: string
}

const BenefitItem = ({ icon, title, description }: BenefitItemProps) => {
    return (
        <div className="flex min-w-0 items-center gap-2.5">
            <img src={icon} alt="" className="h-12 w-12 shrink-0 lg:h-[60px] lg:w-[60px]" />
            <div className="flex min-w-0 flex-col">
            <span className="font-poppins text-[20px] font-semibold leading-[1.5] text-[#242424] lg:whitespace-nowrap lg:text-[25px]">
                {title}
            </span>
            <span className="font-poppins text-[16px] font-medium leading-[1.5] text-[#898989] lg:whitespace-nowrap lg:text-[20px]">
                {description}
            </span>
            </div>
        </div>
    )
}

export default BenefitItem
