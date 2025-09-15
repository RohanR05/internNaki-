import Banner from "./Components/HomeSection/Banner";
import JobStatistic from "./Components/JobStatistic/JobStatistic";
import TotalUser from "./Components/TotoalUser/TotoalUser";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto my-6 md:my-12 lg:my-16">
      <Banner></Banner>
      <TotalUser></TotalUser>
      <JobStatistic></JobStatistic>
    </div>
  );
}
