const Reviews = () => {

  return (

    <section className="py-16">

      <div className="max-w-6xl mx-auto px-4 text-center">

        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          What Readers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white shadow-lg p-6 rounded-xl">
            ⭐⭐⭐⭐⭐
            <p className="mt-4">
              BookNest helped me organize my reading list!
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-xl">
            ⭐⭐⭐⭐
            <p className="mt-4">
              Best platform to track books.
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-xl">
            ⭐⭐⭐⭐⭐
            <p className="mt-4">
              Discovering books is so easy now.
            </p>
          </div>

        </div>

      </div>

    </section>

  );

};

export default Reviews;