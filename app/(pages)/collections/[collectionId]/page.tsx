"use server";

import { ProductCard } from "@/app/components/home/Product";
import {
  getCollection,
  Collection,
} from "@/lib/firebase/collections/read_server";
import { getProduct } from "@/lib/firebase/products/read_server";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";

interface PageParams {
  params: {
    collectionId: string;
  };
}
export type Product = {
  id: string;
  title: string;
  imageURL: string;
  price: number;
  // Add other fields you use in ProductCard
};

// ✅ Type the generateMetadata function
export async function generateMetadata(
  { params }: PageParams,
  _parent?: ResolvingMetadata
): Promise<Metadata> {
  const { collectionId } = params;
  const collection = await getCollection({ id: collectionId });

  return {
    title: `${collection?.title ?? "Collection"} | Collection`,
    description: collection?.subtitle ?? "",
    openGraph: {
      images: collection?.imageURL ? [collection.imageURL] : [],
    },
  };
}

export default async function Page({ params }: PageParams) {
  const collection = await getCollection({ id: params.collectionId });

  if (!collection) {
    return (
      <main className="flex justify-center items-center p-10">
        <p className="text-gray-500 text-lg">Collection not found.</p>
      </main>
    );
  }

  // ✅ Ensure products is typed properly
  const products: Product[] = await Promise.all(
    (collection.products ?? []).map(async (id: string) => {
      const product = await getProduct({ id });
      return product!;
    })
  );

  return (
    <main className="flex justify-center p-5 md:px-10 md:py-5 w-full">
      <div className="flex flex-col gap-6 max-w-[100rem] p-5">
        <div className="w-full flex justify-center">
          {collection.imageURL && (
            <Image
              src={collection.imageURL}
              alt={collection.title}
              width={300}
              height={120}
              className="object-cover w-full h-[310px] rounded-md"
            />
          )}
        </div>

        <h1 className="text-center font-semibold text-4xl">
          {collection.title}
        </h1>
        <p className="text-center text-gray-500">{collection.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products.map((product) =>
            product ? <ProductCard product={product} key={product.id} /> : null
          )}
        </div>
      </div>
    </main>
  );
}
