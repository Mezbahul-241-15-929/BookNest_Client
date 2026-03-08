import { motion } from "framer-motion";

const categories = [
    {
        name: "Fiction",
        image:
            "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    },
    {
        name: "Fantasy",
        image:
            "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
    },
    {
        name: "Science",
        image:
            "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    },
    {
        name: "Biography",
        image:
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    },
    {
        name: "Non-Fiction",
        image:
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    },
    {
        name: "Self Development",
        image:
            "https://images.unsplash.com/photo-1474932430478-367dbb6832c1",
    },
];

const FeaturedCategories = () => {
    return (
        <section className="py-16 bg-gray-50">

            <div className="max-w-7xl mx-auto px-4">

                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Featured Categories
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

                    {categories.map((category, index) => (

                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
                        >

                            <img
                                src={category.image}
                                className="h-56 w-full object-cover"
                            />

                            {/* overlay */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">

                                <h3 className="text-white text-2xl font-bold">
                                    {category.name}
                                </h3>

                            </div>

                        </motion.div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default FeaturedCategories;