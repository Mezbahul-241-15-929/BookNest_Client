import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const Banner = () => {
  return (
    <div className="w-full h-[300px] md:h-[500px]">

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3500 }}
        loop={true}
        className="h-full"
      >

        <SwiperSlide>
          <div className="h-full bg-[url('https://images.unsplash.com/photo-1512820790803-83ca734da794')] bg-cover bg-center flex items-center justify-center">
            <div className="bg-black/50 p-6 md:p-10 rounded-xl text-white text-center max-w-xl">
              <h1 className="text-2xl md:text-5xl font-bold mb-3">
                Welcome to BookNest
              </h1>
              <p className="text-sm md:text-lg">
                Build your personal digital bookshelf
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-full bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')] bg-cover bg-center flex items-center justify-center">
            <div className="bg-black/50 p-6 md:p-10 rounded-xl text-white text-center max-w-xl">
              <h1 className="text-2xl md:text-5xl font-bold">
                Discover Popular Books
              </h1>
              <p className="text-sm md:text-lg">
                See what the community loves
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-full bg-[url('https://images.unsplash.com/photo-1495446815901-a7297e633e8d')] bg-cover bg-center flex items-center justify-center">
            <div className="bg-black/50 p-6 md:p-10 rounded-xl text-white text-center max-w-xl">
              <h1 className="text-2xl md:text-5xl font-bold">
                Track Your Reading Journey
              </h1>
              <p className="text-sm md:text-lg">
                Organize books easily
              </p>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>

    </div>
  );
};

export default Banner;