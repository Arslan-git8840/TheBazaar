import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard, { Product } from "./ProductCard";

const ProductSection = ({
    title,
    seeAllLink,
    products,
    background = "bg-white"
}) => {
    return (
        <section className={`py-8 ${background}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    {seeAllLink && (
                        <Link
                            href={seeAllLink}
                            className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                            See All <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {products?.map((product) => (
                        <ProductCard key={product._id || ""} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
