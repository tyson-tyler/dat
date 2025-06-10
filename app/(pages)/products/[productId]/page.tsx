// app/products/[productId]/page.tsx

import { AuthContextProvider } from "@/context/authcontext";
import Photos from "./components/photo";
import { getProduct } from "@/lib/firebase/products/read_server";
import Details from "./components/Details";
import AddReview from "./components/AddReviews";
import RelatedProducts from "./components/RelatedProduct";
import { notFound } from "next/navigation";
import Reviews from "./components/review";

type PageProps = {
  params: {
    productId: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const product = await getProduct({ id: params.productId });

  return {
    title: `${product?.title ?? "Product"} | Product`,
    description: product?.shortDescription ?? "",
    openGraph: {
      images: [product?.featureImageURL ?? "/default.png"],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { productId } = params;
  const product = await getProduct({ id: params.productId });

  if (!product) return notFound();

  return (
    <main className="p-5 md:pt-[54px] w-full overflow-x-hidden">
      <section className="flex flex-col w-full md:flex-row gap-3">
        <Photos
          imageList={[product.featureImageURL, ...(product.imageList ?? [])]}
        />
        <Details product={product} />
      </section>
      <div className="flex justify-center py-10">
        <AuthContextProvider>
          <div className="flex flex-col  gap-4 md:max-w-[100rem] w-full">
            <AddReview productId={params.productId} />
            <Reviews productId={productId} />
            <RelatedProducts catergoryId={product.catergoryId} />
          </div>
        </AuthContextProvider>
      </div>
    </main>
  );
}
