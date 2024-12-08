"use client";
import { ProductCard } from "@/components/ProductCard";
import { XIcon } from "@/components/shared/Icons";
import { Title } from "@/components/shared/Title";
import Head from "next/head";
import useWithAuth from "../_authRouter";
import { useWishList } from "@/roupi/wish-list";
import { useRouter } from "next/navigation";

function Profile() {
  const { handleDelete, products } = useWishList();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main className="min-h-[68vh] px-16 pt-8 mb-24">
        <Title text="Saved Products" />
        <div className="mt-8 flex flex-wrap gap-8 items-center">
          {products.length <= 0 && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <p className="text-gray-500 mb-5 text-xl font-bold mt-56">
                Your wish list is empty
              </p>
              <button
                onClick={() => router.push("/products")}
                className="px-6 py-[8px] rounded-md bg-blue-500 text-white font-bold"
              >
                Browse Products
              </button>
            </div>
          )}
          {products.length > 0 &&
            products?.map((product) => (
              <div key={product.id} className="relative">
                <div className="absolute top-0 right-0 z-10">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-sm text-red-400 hover:text-red-500 rounded-full p-1 bg-red-100 focus:outline-none mt-1"
                  >
                    <XIcon />
                  </button>
                </div>
                <ProductCard
                  id={product.id}
                  title={product.title}
                  rating={product.reviews}
                  price={product.price}
                  image={product.image}
                  orders={product.orders}
                  discount={product.discount_value}
                />
              </div>
            ))}
        </div>
      </main>
    </>
  );
}

export default useWithAuth(Profile);
