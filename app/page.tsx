import Heading1 from "./components/main/newarr/heading";
import CardCarousel from "./components/main/newarr/slider/Cardslider";
import BgRotatingSection from "./components/main/swiper/wrape";
import TopHeader from "./components/navbar/topheader";

export default function Home() {
  return (
    <div className="flex flex-col items-center ">
      <div className="">
        <TopHeader />
      </div>
      <div>
        <BgRotatingSection />
      </div>
      <div>
        <Heading1 title="New Arrivals" desc="Explore Our New Trend Tshirts" />
        <CardCarousel
          image="/slider/1.webp"
          title="OFFICIAL DISNEY MERCHANDISE"
          desc="Women's Pink No Worries Graphic Printed Oversized T-shirt"
        />
      </div>

      <div></div>

      {/* <TshirtCoursel /> */}
    </div>
  );
}
