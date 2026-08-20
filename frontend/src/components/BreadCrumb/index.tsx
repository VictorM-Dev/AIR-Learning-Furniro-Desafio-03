import { Link } from 'react-router-dom'

type BreadCrumbItem = {
    label: string
    href?: string
}

type BreadCrumbProps = {
    items: BreadCrumbItem[]
}

const BreadCrumb = ({ items }: BreadCrumbProps) => {
    return (
    <div className="flex items-center gap-2 w-28.75 h-6">
        {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
            {index > 0 && <img src="/Icons/dashicons_arrow.svg" className="w-5 h-5"/>}
            {item.href ? (
            <Link to={item.href} className="font-poppins font-medium text-[16px] text-black hover:underline">
                {item.label}
            </Link>
            ) : (
            <span className="font-light text-[16px] text-black">{item.label}</span>
            )}
        </span>
        ))}
    </div>
    )
}

export default BreadCrumb