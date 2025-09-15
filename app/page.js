import Banner from "./Components/HomeSection/Banner";
import TotalUser from "./Components/TotoalUser/TotoalUser";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto my-6 md:my-12 lg:my-16">
      <Banner></Banner>
      <TotalUser></TotalUser>
    </div>
  );
}
