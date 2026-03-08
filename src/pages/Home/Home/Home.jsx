import Banner from "../../../components/Banner";
import BookStats from "../../../components/BookStats";
import FeaturedCategories from "../../../components/FeaturedCategories";
import PopularBooks from "../../../components/PopularBooks";
import CommunityReviews from "../../../components/reviews";


const Home = () => {
  return (
    <div>
      <Banner />
      <PopularBooks />
      <FeaturedCategories />
      <BookStats />
      <CommunityReviews />
    </div>
  );
};

export default Home;