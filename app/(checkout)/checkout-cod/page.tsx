import Productnav from "@/app/components/navbar/ProductNav";
import Footer from "../../../app/components/footer/footer";
import Link from "next/link";

export const dynamic = "force-dynamic"; // Ensure server-side rendering

async function processCheckout(checkout_id?: string) {
  if (!checkout_id) return { success: false, message: "Missing checkout ID" };

  try {
    const res = await fetch(`http://localhost:3000/api/checkout/process`, {
      method: "POST",
      body: JSON.stringify({ checkout_id }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to process checkout:", err);
    return { success: false, message: "Unexpected server error" };
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: { checkout_id?: string };
}) {
  const result = await processCheckout(searchParams.checkout_id);

  return (
    <main>
      <Productnav />
      <section className="min-h-screen flex flex-col gap-3 justify-center items-center">
        {result.success ? (
          <>
            <div className="flex justify-center w-full">
              <img src="/success.svg" className="h-48" alt="Success" />
            </div>
            <h1 className="text-2xl font-semibold text-green-600">
              Your Order Is <span className="font-bold">Successfully</span>{" "}
              Placed
            </h1>
            <Link href="/account">
              <button className="text-blue-600 border border-blue-600 px-5 py-2 rounded-lg bg-white">
                Go To Orders Page
              </button>
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-red-500">
              {result.message ||
                "Something went wrong while placing your order."}
            </h1>
            <Link href="/support">
              <button className="text-blue-600 border border-blue-600 px-5 py-2 rounded-lg bg-white">
                Contact Support
              </button>
            </Link>
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}
