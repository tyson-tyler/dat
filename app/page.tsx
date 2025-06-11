import {
  getFeaturedProducts,
  getProducts,
} from "@/lib/firebase/products/read_server";
import Collections from "./components/home/collections";

import { getCollections } from "@/lib/firebase/collections/read_server";
import { getCategories } from "@/lib/firebase/catergories/read_server";
import Categories from "./components/home/category";

import CustomerReviews from "./components/home/customerreview";
import Footer from "./components/footer/footer";

import HeroTitle from "./components/navbar/heading";

import BgRotatingSection from "./components/main/swiper/wrape";
import Loader from "./components/main/newarr/slider/MainSlider";
import Minimal from "./components/main/newarr/slider/mini";
import WeddingBanner from "./components/main/newarr/slider/wbanner";
import ProductsGridView, { ProductCard } from "./components/home/Product";

import HeroTitle1 from "./components/navbar/heading1";
import HeroTitle2 from "./components/navbar/heading2";

import ContactForm from "./comman/contact/page";

export default async function Home() {
  const [featuredProducts, collections, categories, products] =
    await Promise.all([
      getFeaturedProducts(),
      getCollections(),
      getCategories(),
      getProducts(),
    ]);

  return (
    <>
      <Loader />
      <BgRotatingSection />

      <div className="flex flex-col w-full justify-center items-center text-black bg-white">
        <HeroTitle />
        <Categories categories={categories} />
      </div>

      <div className="z-50 bg-black h-screen w-full">
        <Minimal />
      </div>

      <div className="bg-white w-full ">
        <HeroTitle1 />
        <Collections collections={collections} />
      </div>

      <div className="px-5">
        <WeddingBanner />
      </div>

      {/* <div className=" w-full mb-8">
        <HeroTitle2 />
        <ProductsGridView products={products} />
      </div> */}

      <div className="bg-white w-full ">
        <CustomerReviews />
      </div>

      <div>
        <ContactForm />
      </div>

      <Footer />
    </>
  );
}
