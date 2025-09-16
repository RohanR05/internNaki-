import FAQ from "./Components/FAQ/FAQ";
import FeaturedJobs from "./Components/FeaturedJobs/FeaturedJobs";
import Banner from "./Components/HomeSection/Banner";
import JobStatistic from "./Components/JobStatistic/JobStatistic";
import Testimonials from "./Components/Testimonials/Testimonials";
import TotalUser from "./Components/TotoalUser/TotoalUser";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto my-6 md:my-12 lg:my-16">
      <Banner></Banner>
      <TotalUser></TotalUser>
      <JobStatistic></JobStatistic>
      <FeaturedJobs></FeaturedJobs>
      <Testimonials></Testimonials>
      <FAQ></FAQ>
    </div>
  );
}
