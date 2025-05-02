import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=500&fit=crop",
    link: "/electronics"
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=500&fit=crop",
    link: "/fashion"
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&h=500&fit=crop",
    link: "/home-kitchen"
  },
  {
    id: 4,
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
    link: "/beauty"
  },
  {
    id: 5,
    name: "Books",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&h=500&fit=crop",
    link: "/books"
  },
  {
    id: 6,
    name: "Sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=500&fit=crop",
    link: "/sports"
  }
];

const CategorySection = () => {
  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/product${category.link}`}
              className="group flex flex-col items-center transition-transform hover:translate-y-[-5px]"
            >
              <div className="w-full aspect-square rounded-full overflow-hidden border-2 border-white shadow-md mb-3">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="font-medium text-center">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;