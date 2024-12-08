"use client";
import { useGetProducts } from "@/roupi/product";
import { FiltersSideBar } from "@/components/FiltersSideBar";
import { ProductCard } from "@/components/ProductCard";
import { Loading } from "@/components/shared/Loading";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";


export default function Products() {
  const productsRef = useRef(null);
  const [filter, setFilter] = useState({
    category_id: [],
  });
  const { products, setOffset, loading } = useGetProducts({ params: filter });
  const handleScroll = (e) => {
    const scrollHeight = e.target.scrollHeight;
    const currentHeight = e.target.scrollTop;
    if (currentHeight >= scrollHeight - 1065) {
      setOffset((prev) => prev + 1);
    }
  };
  useEffect(() => {
    const productsWindowElement = productsRef.current;
    productsWindowElement.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <main className="w-full">
        <FiltersSideBar setFilter={setFilter} />
        <div className="flex-1 pl-6 pt-6 h-full">
          <div
            ref={productsRef}
            className="hover:overflow-y-auto border-t overflow-hidden h-[90vh] p-4 max-sm:-mb-[71px]"
          >
            <div className="flex items-start justify-center flex-wrap gap-4 pb-32 relative">
              {products?.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    rating={product.reviews}
                    price={product.price}
                    image={product.image}
                  />
                );
              })}

              {loading && (
                <div className="w-full flex items-center justify-center">
                  <Loading />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
