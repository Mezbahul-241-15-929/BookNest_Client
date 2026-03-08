import { motion } from "framer-motion";

const BookStats = () => {

  return (

    <section className="py-16 bg-indigo-50">

      <div className="max-w-6xl mx-auto px-4 text-center">

        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          BookNest Community
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          <motion.div whileHover={{ scale: 1.1 }} className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-3xl font-bold text-indigo-600">500+</h3>
            <p>Books Added</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-3xl font-bold text-indigo-600">200+</h3>
            <p>Readers</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-3xl font-bold text-indigo-600">1000+</h3>
            <p>Reviews</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-3xl font-bold text-indigo-600">50+</h3>
            <p>Categories</p>
          </motion.div>

        </div>

      </div>

    </section>

  );

};

export default BookStats;